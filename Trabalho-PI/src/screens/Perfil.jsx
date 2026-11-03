import React from 'react';
import { Text, View } from 'react-native';
import styles from '../theme/styles';

export default function Perfil({ tarefas }) {
  const concluidas = tarefas.filter(t => t.concluida).length;
  const pendentes = tarefas.length - concluidas;

  return (
    <View style={styles.tela}>
      <Text style={styles.tituloPagina}>Meu perfil</Text>

      <View style={styles.avatar}>
        <Text style={styles.letraAvatar}>E</Text>
      </View>

      <Text style={styles.nomePerfil}>Estudante</Text>

      <Text style={styles.subtitulo}>
        Minha agenda de estudos
      </Text>

      <View style={styles.cardPerfil}>
        <Text style={styles.numeroPerfil}>{tarefas.length}</Text>
        <Text style={styles.textoSecundario}>Total de tarefas</Text>
      </View>

      <View style={styles.cardPerfil}>
        <Text style={styles.numeroPerfil}>{concluidas}</Text>
        <Text style={styles.textoSecundario}>Concluídas</Text>
      </View>

      <View style={styles.cardPerfil}>
        <Text style={styles.numeroPerfil}>{pendentes}</Text>
        <Text style={styles.textoSecundario}>Pendentes</Text>
      </View>
    </View>
  );
}