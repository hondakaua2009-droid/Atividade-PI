
import React from 'react';

import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { cores, sombra } from '../../theme/styles';

export default function ModalEditarPerfil({
  visivel,
  onFechar,
  nome,
  setNome,
  email,
  setEmail,
  senhaAtual,
  setSenhaAtual,
  novaSenha,
  setNovaSenha,
  foto,
  onEscolherFoto,
  onSalvar,
  salvando
}) {
  return (
    <Modal
      visible={visivel}
      animationType="slide"
      transparent
      onRequestClose={onFechar}
    >
      <View style={s.fundo}>
        <View style={s.modal}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={s.cabecalho}>
              <Text style={s.titulo}>Editar perfil</Text>

              <TouchableOpacity onPress={onFechar}>
                <Ionicons
                  name="close"
                  size={27}
                  color={cores.texto}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={s.areaFoto}
              onPress={onEscolherFoto}
            >
              {foto ? (
                <Image
                  source={{ uri: foto }}
                  style={s.foto}
                />
              ) : (
                <Ionicons
                  name="person"
                  size={45}
                  color={cores.verde}
                />
              )}

              <Text style={s.textoFoto}>
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Text style={s.label}>Nome</Text>
            <TextInput
              style={s.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
            />

            <Text style={s.label}>E-mail</Text>
            <TextInput
              style={s.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={s.label}>Senha atual</Text>
            <TextInput
              style={s.input}
              value={senhaAtual}
              onChangeText={setSenhaAtual}
              placeholder="Digite sua senha atual"
              secureTextEntry
            />

            <Text style={s.label}>Nova senha</Text>
            <TextInput
              style={s.input}
              value={novaSenha}
              onChangeText={setNovaSenha}
              placeholder="Digite a nova senha"
              secureTextEntry
            />

            <TouchableOpacity
              style={s.botaoSalvar}
              onPress={onSalvar}
              disabled={salvando}
            >
              {salvando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={s.textoSalvar}>
                  Salvar alterações
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={s.botaoCancelar}
              onPress={onFechar}
            >
              <Text style={s.textoCancelar}>
                Cancelar
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 18
  },

  modal: {
    backgroundColor: cores.branco,
    borderRadius: 22,
    padding: 20,
    maxHeight: '90%',
    ...sombra
  },

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },

  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: cores.texto
  },

  areaFoto: {
    alignItems: 'center',
    marginBottom: 18
  },

  foto: {
    width: 90,
    height: 90,
    borderRadius: 45
  },

  textoFoto: {
    color: cores.verde,
    fontWeight: '700',
    marginTop: 8
  },

  label: {
    color: cores.texto,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 10
  },

  input: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    padding: 13,
    color: cores.texto,
    backgroundColor: cores.branco
  },

  botaoSalvar: {
    backgroundColor: cores.verde,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 22
  },

  textoSalvar: {
    color: '#FFFFFF',
    fontWeight: '800'
  },

  botaoCancelar: {
    padding: 14,
    alignItems: 'center',
    marginTop: 5
  },

  textoCancelar: {
    color: cores.textoSuave,
    fontWeight: '700'
  }
});
