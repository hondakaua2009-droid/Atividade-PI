import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../services/firebase';
import { ouvirTarefas, ouvirProvas, alternarTarefa } from '../data/tarefas';
import Tarefa from '../components/Tarefa';
import CardProva, { diasRestantes } from '../components/CardProva';
import { cores, estilos } from '../theme/styles';

export default function Home() {
  const user = auth.currentUser;
  const [tarefas, setTarefas] = useState([]);
  const [provas, setProvas] = useState([]);

  useEffect(() => {
    const u1 = ouvirTarefas(user.uid, setTarefas, console.warn);
    const u2 = ouvirProvas(user.uid, setProvas, console.warn);
    return () => { u1(); u2(); };
  }, [user.uid]);

  const pendentes = tarefas.filter((t) => !t.concluida);
  const proximas = provas.filter((p) => diasRestantes(p.data) >= 0).slice(0, 3);
  const primeiroNome = (user.displayName || 'estudante').split(' ')[0];

  return (
    <SafeAreaView edges={['top']} style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Text style={estilos.titulo}>Olá, {primeiroNome} 👋</Text>
        <Text style={estilos.subtitulo}>Veja o que vem pela frente</Text>

        <View style={s.resumo}>
          <View style={s.box}>
            <Text style={s.num}>{pendentes.length}</Text>
            <Text style={s.rot}>tarefas pendentes</Text>
          </View>
          <View style={[s.box, { backgroundColor: cores.verdeEscuro }]}>
            <Text style={s.num}>{proximas.length}</Text>
            <Text style={s.rot}>próximas provas</Text>
          </View>
        </View>

        <Text style={estilos.secao}>Próximas provas</Text>
        {proximas.length === 0 ? (
          <Text style={estilos.vazio}>Nenhuma prova marcada.</Text>
        ) : (
          proximas.map((p) => <CardProva key={p.id} prova={p} />)
        )}

        <Text style={estilos.secao}>Tarefas pendentes</Text>
        {pendentes.length === 0 ? (
          <Text style={estilos.vazio}>Tudo em dia! 🎉</Text>
        ) : (
          pendentes.slice(0, 5).map((t) => (
            <Tarefa key={t.id} item={t} onToggle={(i) => alternarTarefa(user.uid, i.id, !i.concluida)} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  resumo: { flexDirection: 'row', gap: 12, marginTop: 18 },
  box: { flex: 1, backgroundColor: cores.verde, borderRadius: 18, padding: 18 },
  num: { color: cores.branco, fontSize: 34, fontWeight: '800' },
  rot: { color: cores.verdeClaro, fontSize: 13, marginTop: 2 },
});
