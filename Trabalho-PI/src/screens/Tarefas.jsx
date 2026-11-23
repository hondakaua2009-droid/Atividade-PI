import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebase';

import {
  ouvirTarefas,
  adicionarTarefa,
  alternarTarefa,
  removerTarefa
} from '../data/tarefas';

import Tarefa from '../components/Tarefa';
import { cores, estilos } from '../theme/styles';

export default function Tarefas() {
  const uid = auth.currentUser.uid;

  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');

  useEffect(() => ouvirTarefas(uid, setTarefas), [uid]);

  async function adicionar() {
    const titulo = texto.trim();

    if (!titulo) return;

    setTexto('');
    await adicionarTarefa(uid, titulo);
  }

  const pendentes = tarefas.filter((t) => !t.concluida).length;

  const cabecalho = (
    <View>
      <View style={estilos.hero}>
        <Text style={estilos.heroTitulo}>Tarefas</Text>

        <Text style={estilos.heroSub}>
          {pendentes === 0
            ? 'Nada pendente'
            : `${pendentes} pendente${pendentes > 1 ? 's' : ''}`}
        </Text>
      </View>

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

        <TouchableOpacity
          style={s.add}
          onPress={adicionar}
        >
          <Ionicons
            name="add"
            size={28}
            color={cores.branco}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: cores.verde }}
    >
      <FlatList
        style={{ flex: 1, backgroundColor: cores.verdeSuave }}
        data={tarefas}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={cabecalho}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <Text style={estilos.vazio}>
            Nenhuma tarefa ainda.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <Tarefa
              item={item}
              onToggle={(i) =>
                alternarTarefa(uid, i.id, !i.concluida)
              }
              onRemove={(i) =>
                removerTarefa(uid, i.id)
              }
            />
          </View>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  linhaInput: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    alignItems: 'center',
  },
  add: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: cores.verde,
    alignItems: 'center',
    justifyContent: 'center',
  },
});