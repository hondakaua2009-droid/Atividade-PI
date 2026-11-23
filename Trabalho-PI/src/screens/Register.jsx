
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

import {
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';

import { auth, db } from '../services/firebase';
import { cores, sombra } from '../theme/styles';

export default function Register({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  function aviso(titulo, mensagem) {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  }

  async function cadastrar() {
    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      aviso('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha.length < 6) {
      aviso('Atenção', 'A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      aviso('Atenção', 'As senhas não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      const resultado = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        senha
      );

      const usuario = resultado.user;

      await updateProfile(usuario, {
        displayName: nome.trim()
      });

      await setDoc(doc(db, 'users', usuario.uid), {
        nome: nome.trim(),
        email: usuario.email,
        criadoEm: serverTimestamp()
      });

      aviso('Sucesso', 'Conta criada com sucesso!');

    } catch (erro) {
      console.log('Erro no cadastro:', erro);

      let mensagem = 'Não foi possível realizar o cadastro.';

      if (erro.code === 'auth/email-already-in-use') {
        mensagem = 'Este e-mail já está cadastrado.';
      } else if (erro.code === 'auth/invalid-email') {
        mensagem = 'Digite um e-mail válido.';
      } else if (erro.code === 'auth/weak-password') {
        mensagem = 'A senha é muito fraca.';
      } else if (erro.code === 'permission-denied') {
        mensagem = 'Sem permissão para salvar os dados.';
      }

      aviso('Erro', mensagem);

    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={s.tela}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={s.conteudo}
          keyboardShouldPersistTaps="handled"
        >
          <View style={s.cabecalho}>
            <Text style={s.titulo}>Criar conta</Text>
            <Text style={s.subtitulo}>
              Organize seus estudos em um só lugar.
            </Text>
          </View>

          <View style={s.card}>
            <Text style={s.label}>Nome completo</Text>
            <TextInput
              style={s.input}
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

            <Text style={s.label}>E-mail</Text>
            <TextInput
              style={s.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={s.label}>Senha</Text>
            <TextInput
              style={s.input}
              placeholder="Mínimo de 6 caracteres"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />

            <Text style={s.label}>Confirmar senha</Text>
            <TextInput
              style={s.input}
              placeholder="Digite a senha novamente"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />

            <Text style={s.info}>
              Sua senha será protegida pelo Firebase Authentication.
            </Text>

            <TouchableOpacity
              style={s.botao}
              onPress={cadastrar}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={s.textoBotao}>Criar conta</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={s.voltar}
              onPress={() => navigation.navigate('Login')}
              disabled={carregando}
            >
              <Text style={s.textoVoltar}>
                Já possui uma conta? Entrar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.verdeSuave
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  cabecalho: {
    marginBottom: 24
  },
  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: cores.verdeEscuro
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSuave,
    marginTop: 8
  },
  card: {
    backgroundColor: cores.branco,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: cores.borda,
    ...sombra
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: 7
  },
  input: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    marginBottom: 16,
    color: cores.texto
  },
  info: {
    fontSize: 12,
    color: cores.textoSuave,
    marginBottom: 18
  },
  botao: {
    backgroundColor: cores.verde,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center'
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  voltar: {
    marginTop: 20,
    alignItems: 'center'
  },
  textoVoltar: {
    color: cores.verdeEscuro,
    fontWeight: '600'
  }
});
