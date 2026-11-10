import React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import styles from '../theme/styles';

export default function Perfil({ tarefas, usuario, onSair }) {
  const concluidas = tarefas.filter(t => t.concluida).length;
  const pendentes = tarefas.length - concluidas;

  function confirmarSaida() {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: onSair },
      ]
    );
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.tituloPagina}>Meu perfil</Text>

      <View style={styles.avatar}>
        <Text style={styles.letraAvatar}>
          {(usuario?.displayName || 'E').charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.nomePerfil}>
        {usuario?.displayName || 'Estudante'}
      </Text>

      <Text style={styles.subtitulo}>
        {usuario?.email}
      </Text>

      <View style={styles.cardPerfil}>
        <Text style={styles.numeroPerfil}>{tarefas.length}</Text>
        <Text style={styles.textoSecundario}>Total de tarefas</Text>
      </View>

      <View style={styles.cardPerfil}>
        <Text style={styles.numeroPerfil}>{concluidas}</Text>
        <Text style={styles.textoSecundario}>Tarefas concluídas</Text>
      </View>

      <View style={styles.cardPerfil}>
        <Text style={styles.numeroPerfil}>{pendentes}</Text>
        <Text style={styles.textoSecundario}>Tarefas pendentes</Text>
      </View>

      <TouchableOpacity
        style={styles.botaoSair}
        onPress={confirmarSaida}
      >
        <Text style={styles.textoBotao}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}