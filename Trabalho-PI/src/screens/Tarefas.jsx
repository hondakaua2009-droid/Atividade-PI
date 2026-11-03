import React, { useState } from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import Tarefa from '../components/Tarefa';
import Botao from '../components/Botao';
import styles from '../theme/styles';

export default function Tarefas({ tarefas, onAdicionar, onConcluir }) {
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState('');
  const [horario, setHorario] = useState('');

  function cadastrar() {
    if (!titulo.trim() || !materia.trim() || !horario.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    onAdicionar({
      titulo: titulo.trim(),
      materia: materia.trim(),
      horario: horario.trim(),
    });

    setTitulo('');
    setMateria('');
    setHorario('');

    Alert.alert('Sucesso', 'Tarefa adicionada!');
  }

  return (
    <ScrollView style={styles.tela}>
      <Text style={styles.tituloPagina}>Minhas tarefas</Text>

      <Text style={styles.label}>Nome da tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar para a prova"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Matéria</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Matemática"
        value={materia}
        onChangeText={setMateria}
      />

      <Text style={styles.label}>Horário</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 14:00"
        value={horario}
        onChangeText={setHorario}
      />

      <Botao titulo="Adicionar tarefa" onPress={cadastrar} />

      <Text style={styles.tituloSecao}>Lista de tarefas</Text>

      {tarefas.map(tarefa => (
        <Tarefa
          key={tarefa.id}
          tarefa={tarefa}
          onConcluir={() => onConcluir(tarefa.id)}
        />
      ))}
    </ScrollView>
  );
}