import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../services/firebase';
import { ouvirTarefas, ouvirProvas } from '../data/tarefas';
import { aviso } from '../services/aviso';
import Botao from '../components/Botao';
import { cores, estilos, sombra } from '../theme/styles';

export default function Perfil() {
  const user = auth.currentUser;

  const [nome, setNome] = useState(user.displayName || '');
  const [salvando, setSalvando] = useState(false);
  const [feitas, setFeitas] = useState(0);
  const [provas, setProvas] = useState(0);

  useEffect(() => {
    const u1 = ouvirTarefas(user.uid, (t) =>
      setFeitas(t.filter((x) => x.concluida).length)
    );

    const u2 = ouvirProvas(user.uid, (p) =>
      setProvas(p.length)
    );

    return () => {
      u1();
      u2();
    };
  }, [user.uid]);

  async function salvar() {
    if (!nome.trim()) {
      return aviso('Atenção', 'Digite um nome.');
    }

    setSalvando(true);

    try {
      await updateProfile(user, {
        displayName: nome.trim(),
      });

      await setDoc(
        doc(db, 'users', user.uid),
        {
          nome: nome.trim(),
          email: user.email,
        },
        { merge: true }
      );

      aviso('Pronto', 'Nome atualizado.');
    } catch (e) {
      aviso('Erro', 'Não foi possível salvar o nome.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: cores.verde }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: cores.verdeSuave }}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            estilos.hero,
            { alignItems: 'center', paddingBottom: 44 }
          ]}
        >
          <View style={s.avatar}>
            <Ionicons
              name="person"
              size={44}
              color={cores.verde}
            />
          </View>

          <Text style={[estilos.heroTitulo, { marginTop: 12 }]}>
            {user.displayName || 'Estudante'}
          </Text>

          <Text style={estilos.heroSub}>
            {user.email}
          </Text>
        </View>

        <View style={s.stats}>
          <View style={s.stat}>
            <Text style={s.num}>{feitas}</Text>
            <Text style={s.rot}>tarefas feitas</Text>
          </View>

          <View style={s.stat}>
            <Text style={s.num}>{provas}</Text>
            <Text style={s.rot}>provas</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <Text style={estilos.secao}>Editar nome</Text>

          <TextInput
            style={estilos.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome"
            placeholderTextColor={cores.textoSuave}
          />

          <Botao
            titulo="Salvar"
            onPress={salvar}
            carregando={salvando}
          />

          <Botao
            titulo="Sair"
            variante="contorno"
            onPress={() => signOut(auth)}
            style={{ marginTop: 12 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: cores.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: -26,
  },
  stat: {
    flex: 1,
    backgroundColor: cores.branco,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    ...sombra,
  },
  num: {
    fontSize: 28,
    fontWeight: '800',
    color: cores.verde,
  },
  rot: {
    color: cores.textoSuave,
    fontSize: 12,
    marginTop: 2,
  },
});