import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import styles from '../theme/styles';

export default function Calendario({ tarefas }) {
  return (
    <ScrollView style={styles.tela}>
      <Text style={styles.tituloPagina}>Calendário</Text>

      <Text style={styles.subtitulo}>
        Acompanhe seus compromissos de estudo.
      </Text>

      {tarefas.map(tarefa => (
        <View key={tarefa.id} style={styles.cardCalendario}>
          <Text style={styles.tituloTarefa}>
            {tarefa.titulo}
          </Text>

          <Text style={styles.textoSecundario}>
            {tarefa.materia} • {tarefa.horario}
          </Text>
        </View>
      ))}

      {tarefas.length === 0 && (
        <Text style={styles.textoSecundario}>
          Nenhuma tarefa cadastrada.
        </Text>
      )}
    </ScrollView>
  );
}