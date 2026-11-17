import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { ouvirTarefas, ouvirProvas } from '../data/tarefas';
import Botao from '../components/Botao';
import { cores, estilos } from '../theme/styles';

export default function Perfil() {
  const user = auth.currentUser;
  const [nome, setNome] = useState(user.displayName || '');
  const [salvando, setSalvando] = useState(false);
  const [feitas, setFeitas] = useState(0);
  const [provas, setProvas] = useState(0);

  useEffect(() => {
    const u1 = ouvirTarefas(user.uid, (t) => setFeitas(t.filter((x) => x.concluida).length), () => {});
    const u2 = ouvirProvas(user.uid, (p) => setProvas(p.length), () => {});
    return () => { u1(); u2(); };
  }, [user.uid]);

  async function salvar() {
    if (!nome.trim()) return;
    setSalvando(true);
    try {
      await updateProfile(user, { displayName: nome.trim() });
      await updateDoc(doc(db, 'users', user.uid), { nome: nome.trim() });
      Alert.alert('Pronto', 'Nome atualizado.');
    } catch (e) {
      Alert.alert('Erro', e.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView edges={['top']} style={estilos.tela}>
      <View style={estilos.conteudo}>
        <View style={s.avatarBox}>
          <View style={s.avatar}>
            <Ionicons name="person" size={44} color={cores.branco} />
          </View>
          <Text style={s.nome}>{user.displayName || 'Estudante'}</Text>
          <Text style={estilos.subtitulo}>{user.email}</Text>
        </View>

        <View style={s.stats}>
          <View style={s.stat}><Text style={s.num}>{feitas}</Text><Text style={s.rot}>tarefas feitas</Text></View>
          <View style={s.stat}><Text style={s.num}>{provas}</Text><Text style={s.rot}>provas</Text></View>
        </View>

        <Text style={estilos.secao}>Editar nome</Text>
        <TextInput style={estilos.input} value={nome} onChangeText={setNome} placeholder="Seu nome" placeholderTextColor={cores.textoSuave} />
        <Botao titulo="Salvar" onPress={salvar} carregando={salvando} />
        <Botao titulo="Sair" variante="contorno" onPress={() => signOut(auth)} style={{ marginTop: 12 }} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  avatarBox: { alignItems: 'center', marginTop: 10 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: cores.verde, alignItems: 'center', justifyContent: 'center' },
  nome: { fontSize: 22, fontWeight: '800', color: cores.verdeEscuro, marginTop: 12 },
  stats: { flexDirection: 'row', gap: 12, marginTop: 20 },
  stat: { flex: 1, backgroundColor: cores.branco, borderRadius: 16, borderWidth: 1, borderColor: cores.borda, padding: 16, alignItems: 'center' },
  num: { fontSize: 28, fontWeight: '800', color: cores.verde },
  rot: { color: cores.textoSuave, fontSize: 12, marginTop: 2 },
});
