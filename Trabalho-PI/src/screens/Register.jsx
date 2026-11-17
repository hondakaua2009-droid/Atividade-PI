import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import Botao from '../components/Botao';
import { mensagemErro } from './Login';
import { cores, estilos } from '../theme/styles';

export default function Register({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    if (!nome.trim() || !email.trim() || !senha) return setErro('Preencha todos os campos.');
    if (senha !== confirmar) return setErro('As senhas não coincidem.');
    setErro('');
    setCarregando(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), senha);
      await updateProfile(cred.user, { displayName: nome.trim() });
      await setDoc(doc(db, 'users', cred.user.uid), {
        nome: nome.trim(),
        email: email.trim(),
        criadoEm: serverTimestamp(),
      });
    } catch (e) {
      setErro(mensagemErro(e.code));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        <View style={s.topo}>
          <Text style={s.titulo}>Criar conta</Text>
          <Text style={s.sub}>Leva menos de um minuto</Text>
        </View>
        <View style={s.form}>
          <TextInput style={estilos.input} placeholder="Nome" placeholderTextColor={cores.textoSuave} value={nome} onChangeText={setNome} />
          <TextInput style={estilos.input} placeholder="E-mail" placeholderTextColor={cores.textoSuave}
            autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={estilos.input} placeholder="Senha" placeholderTextColor={cores.textoSuave}
            secureTextEntry value={senha} onChangeText={setSenha} />
          <TextInput style={estilos.input} placeholder="Confirmar senha" placeholderTextColor={cores.textoSuave}
            secureTextEntry value={confirmar} onChangeText={setConfirmar} />
          {!!erro && <Text style={estilos.erro}>{erro}</Text>}
          <Botao titulo="Cadastrar" onPress={cadastrar} carregando={carregando} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 18 }}>
            <Text style={s.link}>Já tem conta? <Text style={{ fontWeight: '800' }}>Entrar</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: cores.verde },
  topo: { alignItems: 'center', paddingTop: 80, paddingBottom: 32 },
  titulo: { color: cores.branco, fontSize: 28, fontWeight: '800' },
  sub: { color: cores.verdeClaro, marginTop: 4 },
  form: { flex: 1, backgroundColor: cores.branco, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingTop: 32 },
  link: { color: cores.verdeEscuro, textAlign: 'center' },
});
