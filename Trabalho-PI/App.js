import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { onAuthStateChanged, signOut } from 'firebase/auth';

import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { auth, db } from './src/services/firebase';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Tarefas from './src/screens/Tarefas';
import Calendario from './src/screens/Calendario';
import Perfil from './src/screens/Perfil';

import styles from './src/theme/styles';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [tela, setTela] = useState('Login');
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const inscricao = onAuthStateChanged(auth, (usuarioAtual) => {
      setUsuario(usuarioAtual);
      setTela(usuarioAtual ? 'Home' : 'Login');
      setCarregando(false);
    });

    return inscricao;
  }, []);

  useEffect(() => {
    if (!usuario) {
      setTarefas([]);
      return;
    }

    const referencia = collection(
      db,
      'usuarios',
      usuario.uid,
      'tarefas'
    );

    const cancelar = onSnapshot(
      referencia,
      (snapshot) => {
        const lista = snapshot.docs.map(item => ({
          id: item.id,
          ...item.data(),
        }));

        setTarefas(lista);
      },
      () => Alert.alert('Erro', 'Não foi possível carregar as tarefas.')
    );

    return cancelar;
  }, [usuario]);

  async function adicionarTarefa(novaTarefa) {
    try {
      await addDoc(
        collection(db, 'usuarios', usuario.uid, 'tarefas'),
        {
          ...novaTarefa,
          concluida: false,
          criadoEm: new Date().toISOString(),
        }
      );
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    }
  }

  async function concluirTarefa(id) {
    try {
      await updateDoc(
        doc(db, 'usuarios', usuario.uid, 'tarefas', id),
        { concluida: !tarefas.find(t => t.id === id)?.concluida }
      );
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  }

  async function sair() {
    await signOut(auth);
  }

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#43AD80" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        {tela === 'Login' ? (
          <Login irParaRegistro={() => setTela('Register')} />
        ) : (
          <Register irParaLogin={() => setTela('Login')} />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.areaConteudo}>
        {tela === 'Home' && (
          <Home
            tarefas={tarefas}
            onConcluir={concluirTarefa}
            irParaTarefas={() => setTela('Tarefas')}
          />
        )}

        {tela === 'Tarefas' && (
          <Tarefas
            tarefas={tarefas}
            onAdicionar={adicionarTarefa}
            onConcluir={concluirTarefa}
          />
        )}

        {tela === 'Calendario' && (
          <Calendario tarefas={tarefas} />
        )}

        {tela === 'Perfil' && (
          <Perfil
            tarefas={tarefas}
            usuario={usuario}
            onSair={sair}
          />
        )}
      </View>

      <View style={styles.menuInferior}>
        {[
          ['Home', '⌂'],
          ['Tarefas', '✓'],
          ['Calendario', '▦'],
          ['Perfil', '♙'],
        ].map(([nome, icone]) => (
          <TouchableOpacity
            key={nome}
            style={styles.itemMenu}
            onPress={() => setTela(nome)}
          >
            <Text style={[
              styles.iconeMenu,
              tela === nome && styles.menuAtivo,
            ]}>
              {icone}
            </Text>

            <Text style={[
              styles.textoMenu,
              tela === nome && styles.menuAtivo,
            ]}>
              {nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}