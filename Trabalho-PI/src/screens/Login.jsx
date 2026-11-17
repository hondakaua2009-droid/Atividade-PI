import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import Botao from '../components/Botao';
import { cores, estilos } from '../theme/styles';

export function mensagemErro(code) {
  switch (code) {
    case 'auth/invalid-email': return 'E-mail inválido.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'E-mail ou senha incorretos.';
    case 'auth/email-already-in-use': return 'Este e-mail já está cadastrado.';
    case 'auth/weak-password': return 'A senha precisa ter pelo menos 6 caracteres.';
    case 'auth/too-many-requests': return 'Muitas tentativas. Tente novamente em instantes.';
    case 'auth/network-request-failed': return 'Sem conexão com a internet.';
    default: return 'Algo deu errado. Tente novamente.';
  }
}

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email.trim() || !senha) return setErro('Preencha e-mail e senha.');
    setErro('');
    setCarregando(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), senha);
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
          <View style={s.logo}><Ionicons name="school" size={40} color={cores.verde} /></View>
          <Text style={s.bemvindo}>Bem-vindo!</Text>
          <Text style={s.sub}>Entre para organizar seus estudos</Text>
        </View>

        <View style={s.form}>
          <TextInput style={estilos.input} placeholder="E-mail" placeholderTextColor={cores.textoSuave}
            autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={estilos.input} placeholder="Senha" placeholderTextColor={cores.textoSuave}
            secureTextEntry value={senha} onChangeText={setSenha} />
          {!!erro && <Text style={estilos.erro}>{erro}</Text>}
          <Botao titulo="Entrar" onPress={entrar} carregando={carregando} />
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 18 }}>
            <Text style={s.link}>Não tem conta? <Text style={{ fontWeight: '800' }}>Cadastre-se</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: cores.verde },
  topo: { alignItems: 'center', paddingTop: 90, paddingBottom: 40 },
  logo: { width: 80, height: 80, borderRadius: 40, backgroundColor: cores.branco, alignItems: 'center', justifyContent: 'center' },
  bemvindo: { color: cores.branco, fontSize: 28, fontWeight: '800', marginTop: 16 },
  sub: { color: cores.verdeClaro, marginTop: 4 },
  form: { flex: 1, backgroundColor: cores.branco, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingTop: 32 },
  link: { color: cores.verdeEscuro, textAlign: 'center' },
});
