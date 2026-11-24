
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../services/firebase';

import {
  ouvirTarefas,
  ouvirProvas,
  alternarTarefa
} from '../data/tarefas';

import Tarefa from '../components/Tarefa';
import CardProva from '../components/CardProva';
import { cores, estilos, sombra } from '../theme/styles';

// Calcula quantos dias faltam para uma prova
function diasRestantes(data) {
  if (!data) return -1;

  const partes = data.split('-');

  if (partes.length !== 3) return -1;

  const prova = Date.UTC(
    Number(partes[0]),
    Number(partes[1]) - 1,
    Number(partes[2])
  );

  const agora = new Date();

  const hoje = Date.UTC(
    agora.getFullYear(),
    agora.getMonth(),
    agora.getDate()
  );

  return Math.round((prova - hoje) / (1000 * 60 * 60 * 24));
}

export default function Home() {
  const user = auth.currentUser;

  const [tarefas, setTarefas] = useState([]);
  const [provas, setProvas] = useState([]);

  useEffect(() => {
    if (!user) return;

    const u1 = ouvirTarefas(user.uid, setTarefas);
    const u2 = ouvirProvas(user.uid, setProvas);

    return () => {
      u1();
      u2();
    };
  }, [user?.uid]);

  const pendentes = tarefas.filter(
    (t) => !t.concluida
  );

  const proximas = provas
    .filter((p) => diasRestantes(p.data) >= 0)
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(0, 3);

  const primeiroNome = (
    user?.displayName || 'estudante'
  ).split(' ')[0];

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flex: 1,
        backgroundColor: cores.verde
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: cores.verdeSuave
        }}
        contentContainerStyle={{
          paddingBottom: 30
        }}
      >
        <View style={estilos.hero}>
          <Text style={estilos.heroTitulo}>
            Olá, {primeiroNome} 👋
          </Text>

          <Text style={estilos.heroSub}>
            Veja o que vem pela frente
          </Text>
        </View>

        <View style={s.resumo}>
          <View style={s.box}>
            <Text style={s.num}>
              {pendentes.length}
            </Text>

            <Text style={s.rot}>
              tarefas pendentes
            </Text>
          </View>

          <View style={s.box}>
            <Text style={s.num}>
              {proximas.length}
            </Text>

            <Text style={s.rot}>
              próximas provas
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <Text style={estilos.secao}>
            Próximas provas
          </Text>

          {proximas.length === 0 ? (
            <Text style={estilos.vazio}>
              Nenhuma prova marcada.
            </Text>
          ) : (
            proximas.map((p) => (
              <CardProva
                key={p.id}
                prova={p}
              />
            ))
          )}

          <Text style={estilos.secao}>
            Tarefas pendentes
          </Text>

          {pendentes.length === 0 ? (
            <Text style={estilos.vazio}>
              Tudo em dia! 🎉
            </Text>
          ) : (
            pendentes.slice(0, 5).map((t) => (
              <Tarefa
                key={t.id}
                item={t}
                onToggle={(i) =>
                  alternarTarefa(
                    user.uid,
                    i.id,
                    !i.concluida
                  )
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  resumo: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: -26,
  },

  box: {
    flex: 1,
    backgroundColor: cores.branco,
    borderRadius: 18,
    padding: 18,
    ...sombra,
  },

  num: {
    color: cores.verde,
    fontSize: 34,
    fontWeight: '800',
  },

  rot: {
    color: cores.textoSuave,
    fontSize: 13,
    marginTop: 2,
  },
});
