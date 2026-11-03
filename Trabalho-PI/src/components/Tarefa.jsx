import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../theme/styles';

export default function Tarefa({ tarefa, onConcluir }) {
  return (
    <View style={styles.cardTarefa}>
      <TouchableOpacity
        style={[
          styles.checkTarefa,
          tarefa.concluida && styles.checkAtivo,
        ]}
        onPress={onConcluir}
      >
        <Text style={styles.checkTexto}>
          {tarefa.concluida ? '✓' : ''}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoTarefa}>
        <Text style={[
          styles.tituloTarefa,
          tarefa.concluida && styles.tarefaConcluida,
        ]}>
          {tarefa.titulo}
        </Text>

        <Text style={styles.textoSecundario}>
          {tarefa.materia} • {tarefa.horario}
        </Text>
      </View>
    </View>
  );
}