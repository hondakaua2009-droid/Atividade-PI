
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import {
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

import * as ImagePicker from 'expo-image-picker';

import { auth, db, app } from '../services/firebase';
import { ouvirTarefas, ouvirProvas } from '../data/tarefas';
import { aviso } from '../services/aviso';
import Botao from '../components/Botao';

import { cores, estilos, sombra } from '../theme/styles';

import ModalEditarPerfil from '../components/modais/ModalEditarPerfil';

const storage = getStorage(app);

export default function Perfil() {
  const user = auth.currentUser;

  const [nome, setNome] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const [foto, setFoto] = useState(user?.photoURL || '');
  const [fotoNova, setFotoNova] = useState(null);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [feitas, setFeitas] = useState(0);
  const [provas, setProvas] = useState(0);

  useEffect(() => {
    if (!user) return;

    const u1 = ouvirTarefas(user.uid, (tarefas) => {
      setFeitas(tarefas.filter((t) => t.concluida).length);
    });

    const u2 = ouvirProvas(user.uid, (lista) => {
      setProvas(lista.length);
    });

    return () => {
      u1();
      u2();
    };
  }, [user?.uid]);

  async function escolherFoto() {
    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      aviso(
        'Permissão necessária',
        'Permita o acesso à galeria para escolher uma foto.'
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7
    });

    if (!resultado.canceled) {
      setFotoNova(resultado.assets[0].uri);
      setFoto(resultado.assets[0].uri);
    }
  }

  async function salvar() {
    if (!user) return;

    if (!nome.trim() || !email.trim()) {
      aviso('Atenção', 'Preencha o nome e o e-mail.');
      return;
    }

    const mudouEmail = email.trim() !== user.email;
    const mudouSenha = novaSenha.trim().length > 0;

    if ((mudouEmail || mudouSenha) && !senhaAtual) {
      aviso(
        'Atenção',
        'Digite sua senha atual para alterar o e-mail ou a senha.'
      );
      return;
    }

    if (mudouSenha && novaSenha.length < 6) {
      aviso(
        'Atenção',
        'A nova senha precisa ter pelo menos 6 caracteres.'
      );
      return;
    }

    setSalvando(true);

    try {
      // Confirma a senha atual
      if (mudouEmail || mudouSenha) {
        const credencial = EmailAuthProvider.credential(
          user.email,
          senhaAtual
        );

        await reauthenticateWithCredential(user, credencial);
      }

      // Atualiza o e-mail
      if (mudouEmail) {
        await updateEmail(user, email.trim());
      }

      // Atualiza a senha
      if (mudouSenha) {
        await updatePassword(user, novaSenha);
      }

      // Envia a foto para o Storage
      let fotoURL = user.photoURL || '';

      if (fotoNova) {
        const resposta = await fetch(fotoNova);
        const arquivo = await resposta.blob();

        const caminho = ref(
          storage,
          `fotosPerfil/${user.uid}/perfil.jpg`
        );

        await uploadBytes(caminho, arquivo);
        fotoURL = await getDownloadURL(caminho);
      }

      // Atualiza o Authentication
      await updateProfile(user, {
        displayName: nome.trim(),
        photoURL: fotoURL
      });

      // Atualiza o Firestore
      await setDoc(
        doc(db, 'users', user.uid),
        {
          nome: nome.trim(),
          email: email.trim(),
          fotoURL: fotoURL
        },
        { merge: true }
      );

      setFoto(fotoURL);
      setFotoNova(null);
      setSenhaAtual('');
      setNovaSenha('');

      setModalVisivel(false);

      aviso('Sucesso', 'Perfil atualizado!');

    } catch (erro) {
      console.log('Erro ao atualizar perfil:', erro);

      aviso(
        'Erro',
        'Não foi possível atualizar o perfil. Confira sua senha atual e tente novamente.'
      );
    } finally {
      setSalvando(false);
    }
  }

  function abrirModal() {
    setNome(user?.displayName || '');
    setEmail(user?.email || '');
    setFoto(user?.photoURL || '');
    setFotoNova(null);
    setSenhaAtual('');
    setNovaSenha('');
    setModalVisivel(true);
  }

  if (!user) return null;

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: cores.verde }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: cores.verdeSuave
        }}
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
            {foto ? (
              <Image
                source={{ uri: foto }}
                style={s.foto}
              />
            ) : (
              <Ionicons
                name="person"
                size={44}
                color={cores.verde}
              />
            )}
          </View>

          <Text style={[estilos.heroTitulo, { marginTop: 12 }]}>
            {nome || 'Estudante'}
          </Text>

          <Text style={estilos.heroSub}>
            {email}
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

          <Text style={estilos.secao}>
            Minha conta
          </Text>

          <TouchableOpacity
            style={s.botaoEditar}
            onPress={abrirModal}
          >
            <Ionicons
              name="create-outline"
              size={21}
              color="#FFFFFF"
            />

            <Text style={s.textoBotao}>
              Editar perfil
            </Text>
          </TouchableOpacity>

          <Botao
            titulo="Sair"
            variante="contorno"
            onPress={() => signOut(auth)}
            style={{ marginTop: 12 }}
          />

        </View>
      </ScrollView>

      {/* CHAMADA DO MODAL SEPARADO */}
      <ModalEditarPerfil
        visivel={modalVisivel}
        onFechar={() => setModalVisivel(false)}
        nome={nome}
        setNome={setNome}
        email={email}
        setEmail={setEmail}
        senhaAtual={senhaAtual}
        setSenhaAtual={setSenhaAtual}
        novaSenha={novaSenha}
        setNovaSenha={setNovaSenha}
        foto={foto}
        onEscolherFoto={escolherFoto}
        onSalvar={salvar}
        salvando={salvando}
      />

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
    overflow: 'hidden'
  },

  foto: {
    width: '100%',
    height: '100%',
    borderRadius: 50
  },

  stats: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: -26
  },

  stat: {
    flex: 1,
    backgroundColor: cores.branco,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    ...sombra
  },

  num: {
    fontSize: 28,
    fontWeight: '800',
    color: cores.verde
  },

  rot: {
    color: cores.textoSuave,
    fontSize: 12,
    marginTop: 2
  },

  botaoEditar: {
    backgroundColor: cores.verde,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800'
  }
});
