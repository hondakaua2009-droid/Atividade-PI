import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebase';
import { ouvirTarefas, adicionarTarefa, alternarTarefa, removerTarefa } from '../data/tarefas';
import Tarefa from '../components/Tarefa';
import { cores, estilos } from '../theme/styles';

export default function Tarefas() {
  const uid = auth.currentUser.uid;
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');

  useEffect(() => ouvirTarefas(uid, setTarefas, (e) => Alert.alert('Erro', e.message)), [uid]);

  async function adicionar() {
    const titulo = texto.trim();
    if (!titulo) return;
    setTexto('');
    try { await adicionarTarefa(uid, titulo); }
    catch (e) { Alert.alert('Erro', e.message); }
  }

  return (
    <SafeAreaView edges={['top']} style={estilos.tela}>
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <Text style={estilos.titulo}>Tarefas</Text>
        <View style={s.linhaInput}>
          <TextInput
            style={[estilos.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Nova tarefa..."
            placeholderTextColor={cores.textoSuave}
            value={texto}
            onChangeText={setTexto}
            onSubmitEditing={adicionar}
            returnKeyType="done"
          />
          <TouchableOpacity style={s.add} onPress={adicionar}>
            <Ionicons name="add" size={26} color={cores.branco} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhuma tarefa ainda.</Text>}
        renderItem={({ item }) => (
          <Tarefa
            item={item}
            onToggle={(i) => alternarTarefa(uid, i.id, !i.concluida)}
            onRemove={(i) => removerTarefa(uid, i.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  linhaInput: { flexDirection: 'row', gap: 10, marginTop: 16, alignItems: 'center' },
  add: { width: 48, height: 48, borderRadius: 12, backgroundColor: cores.verde, alignItems: 'center', justifyContent: 'center' },
});
