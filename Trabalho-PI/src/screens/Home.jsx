import React from 'react';
import { Text, ScrollView, View } from 'react-native';

import Tarefa from '../components/Tarefa';
import CardProva from '../components/CardProva';
import Botao from '../components/Botao';
import styles from '../theme/styles';

export default function Home({ tarefas, onConcluir, irParaTarefas }) {
  const pendentes = tarefas.filter(t => !t.concluida);

  return (
    <ScrollView style={styles.tela}>
      <Text style={styles.saude}>Olá, estudante! 👋</Text>

      <Text style={styles.subtitulo}>
        Organize seus estudos e alcance seus objetivos.
      </Text>

      <CardProva />

      <View style={styles.linhaTitulo}>
        <Text style={styles.tituloSecao}>Minhas tarefas</Text>
        <Text style={styles.contador}>
          {pendentes.length} pendentes
        </Text>
      </View>

      {tarefas.slice(0, 3).map(tarefa => (
        <Tarefa
          key={tarefa.id}
          tarefa={tarefa}
          onConcluir={() => onConcluir(tarefa.id)}
        />
      ))}

      <Botao
        titulo="Ver todas as tarefas"
        onPress={irParaTarefas}
      />
    </ScrollView>
  );
}