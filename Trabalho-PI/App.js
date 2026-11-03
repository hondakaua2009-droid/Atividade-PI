import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Home from './src/screens/Home';
import Tarefas from './src/screens/Tarefas';
import Calendario from './src/screens/Calendario';
import Perfil from './src/screens/Perfil';
import styles from './src/theme/styles';

export default function App() {
  const [tela, setTela] = useState('Home');

  const [tarefas, setTarefas] = useState([
    {
      id: '1',
      titulo: 'Estudar React Native',
      materia: 'Programação',
      horario: '14:00',
      concluida: false,
    },
    {
      id: '2',
      titulo: 'Revisar matemática',
      materia: 'Matemática',
      horario: '16:00',
      concluida: false,
    },
    {
      id: '3',
      titulo: 'Atividade de inglês',
      materia: 'Inglês',
      horario: '19:00',
      concluida: true,
    },
  ]);

  function adicionarTarefa(novaTarefa) {
    setTarefas(lista => [
      ...lista,
      {
        ...novaTarefa,
        id: Date.now().toString(),
        concluida: false,
      },
    ]);
  }

  function concluirTarefa(id) {
    setTarefas(lista =>
      lista.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
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
          <Perfil tarefas={tarefas} />
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