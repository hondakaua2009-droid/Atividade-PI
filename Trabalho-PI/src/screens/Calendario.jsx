
import React, { useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Calendar, LocaleConfig } from 'react-native-calendars';

import { Ionicons } from '@expo/vector-icons';

import { auth } from '../services/firebase';

import {
  ouvirProvas,
  adicionarProva,
  removerProva
} from '../data/tarefas';

import { cores, sombra } from '../theme/styles';

// IDIOMA PORTUGUÊS

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],

  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],

  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira',
    'Quarta-feira', 'Quinta-feira',
    'Sexta-feira', 'Sábado'
  ],

  dayNamesShort: [
    'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
  ],

  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';

// DATA ATUAL

function hojeISO() {
  const d = new Date();

  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// FORMATAR DATA

function formatarData(data) {
  if (!data) return '';

  const partes = data.split('-');

  if (partes.length !== 3) return data;

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

export default function Calendario() {
  const [provas, setProvas] = useState([]);
  const [dia, setDia] = useState(hojeISO());

  const [materia, setMateria] = useState('');
  const [titulo, setTitulo] = useState('');

  const [erro, setErro] = useState('');
  const [ok, setOk] = useState('');

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // USUÁRIO ATUAL

  const uid = auth.currentUser?.uid;

  // CARREGAR PROVAS

  useEffect(() => {
    if (!uid) {
      setProvas([]);
      setCarregando(false);
      return;
    }

    setCarregando(true);

    const unsubscribe = ouvirProvas(uid, (lista) => {
      setProvas(lista);
      setCarregando(false);
    });

    return () => {
      unsubscribe();
    };
  }, [uid]);

  // DIAS MARCADOS

  const marcadas = useMemo(() => {
    const marcacoes = {};

    provas.forEach((p) => {
      marcacoes[p.data] = {
        marked: true,
        dotColor: cores.verde
      };
    });

    marcacoes[dia] = {
      ...(marcacoes[dia] || {}),
      selected: true,
      selectedColor: cores.verde,
      selectedTextColor: cores.branco
    };

    return marcacoes;
  }, [provas, dia]);

  // PROVAS DO DIA

  const provasDoDia = provas.filter(
    (p) => p.data === dia
  );

  // SELECIONAR DATA

  function escolherDia(data) {
    setDia(data.dateString);
    setErro('');
    setOk('');
  }

  // SALVAR PROVA

  async function salvar() {
    setErro('');
    setOk('');

    if (!uid) {
      setErro('Usuário não identificado. Entre novamente.');
      return;
    }

    if (!materia.trim()) {
      setErro('Informe a matéria da prova.');
      return;
    }

    setSalvando(true);

    try {
      await adicionarProva(uid, {
        materia: materia.trim(),
        titulo: titulo.trim(),
        data: dia
      });

      setMateria('');
      setTitulo('');

      setOk(`Prova salva para ${formatarData(dia)}!`);

    } catch (e) {
      console.log('Erro ao salvar:', e);
      setErro('Não foi possível salvar a prova.');

    } finally {
      setSalvando(false);
    }
  }

  // EXCLUIR PROVA

  async function excluir(id) {
    if (!uid) return;

    try {
      await removerProva(uid, id);
      setOk('Prova excluída com sucesso!');
      setErro('');

    } catch (e) {
      console.log('Erro ao excluir:', e);
      setErro('Não foi possível excluir a prova.');
    }
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={s.tela}
    >
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* CABEÇALHO */}

        <View style={s.hero}>
          <Text style={s.heroTitulo}>
            Calendário
          </Text>

          <Text style={s.heroSub}>
            Organize suas provas e avaliações
          </Text>
        </View>

        {/* CALENDÁRIO */}

        <View style={s.calendario}>
          <Calendar
            current={dia}
            onDayPress={escolherDia}
            markedDates={marcadas}
            firstDay={0}
            enableSwipeMonths={true}
            theme={{
              calendarBackground: cores.branco,
              monthTextColor: cores.verdeEscuro,
              textMonthFontWeight: '800',
              textMonthFontSize: 18,
              dayTextColor: cores.texto,
              todayTextColor: cores.verde,
              arrowColor: cores.verde,
              selectedDayBackgroundColor: cores.verde,
              selectedDayTextColor: cores.branco,
              textDisabledColor: '#B8C8BE'
            }}
          />
        </View>

        {/* PROVAS CADASTRADAS */}

        <Text style={s.secao}>
          Provas em {formatarData(dia)}
        </Text>

        {carregando ? (
          <ActivityIndicator
            size="large"
            color={cores.verde}
            style={s.carregando}
          />
        ) : provasDoDia.length === 0 ? (
          <View style={s.vazio}>
            <Ionicons
              name="calendar-outline"
              size={32}
              color={cores.textoSuave}
            />

            <Text style={s.textoVazio}>
              Nenhuma prova neste dia.
            </Text>
          </View>
        ) : (
          provasDoDia.map((p) => (
            <View
              key={p.id}
              style={s.cardProva}
            >
              <View style={s.infoProva}>
                <Text style={s.materia}>
                  {p.materia}
                </Text>

                {!!p.titulo && (
                  <Text style={s.descricao}>
                    {p.titulo}
                  </Text>
                )}

                <Text style={s.data}>
                  {formatarData(p.data)}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => excluir(p.id)}
                style={s.botaoExcluir}
              >
                <Ionicons
                  name="trash-outline"
                  size={21}
                  color="#DC2626"
                />
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* FORMULÁRIO */}

        <Text style={s.secao}>
          Adicionar prova
        </Text>

        <View style={s.formulario}>
          <Text style={s.label}>
            Matéria
          </Text>

          <TextInput
            style={s.input}
            placeholder="Ex: Matemática"
            placeholderTextColor={cores.textoSuave}
            value={materia}
            onChangeText={(t) => {
              setMateria(t);
              setErro('');
            }}
          />

          <Text style={s.label}>
            Descrição (opcional)
          </Text>

          <TextInput
            style={s.input}
            placeholder="Ex: Prova do capítulo 3"
            placeholderTextColor={cores.textoSuave}
            value={titulo}
            onChangeText={setTitulo}
          />

          {!!erro && (
            <Text style={s.erro}>
              {erro}
            </Text>
          )}

          {!!ok && (
            <Text style={s.ok}>
              {ok}
            </Text>
          )}

          <TouchableOpacity
            style={s.botaoSalvar}
            onPress={salvar}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color="#FFFFFF"
                />

                <Text style={s.textoBotao}>
                  Salvar prova
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ESTILOS

const s = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.verdeSuave
  },

  scroll: {
    flex: 1,
    backgroundColor: cores.verdeSuave
  },

  conteudo: {
    paddingBottom: 35
  },

  hero: {
    backgroundColor: cores.verde,
    padding: 22,
    paddingBottom: 38,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },

  heroTitulo: {
    fontSize: 28,
    fontWeight: '800',
    color: cores.branco
  },

  heroSub: {
    color: cores.branco,
    fontSize: 14,
    marginTop: 6
  },

  calendario: {
    backgroundColor: cores.branco,
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: -20,
    overflow: 'hidden',
    ...sombra
  },

  secao: {
    fontSize: 18,
    fontWeight: '800',
    color: cores.verdeEscuro,
    marginTop: 25,
    marginBottom: 12,
    marginHorizontal: 16
  },

  carregando: {
    margin: 20
  },

  vazio: {
    backgroundColor: cores.branco,
    borderRadius: 16,
    padding: 22,
    marginHorizontal: 16,
    alignItems: 'center',
    gap: 8
  },

  textoVazio: {
    color: cores.textoSuave,
    fontSize: 14
  },

  cardProva: {
    backgroundColor: cores.branco,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: cores.borda
  },

  infoProva: {
    flex: 1
  },

  materia: {
    color: cores.verdeEscuro,
    fontSize: 16,
    fontWeight: '800'
  },

  descricao: {
    color: cores.textoSuave,
    fontSize: 13,
    marginTop: 5
  },

  data: {
    color: cores.textoSuave,
    fontSize: 12,
    marginTop: 6
  },

  botaoExcluir: {
    padding: 10
  },

  formulario: {
    backgroundColor: cores.branco,
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    ...sombra
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: 7
  },

  input: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: cores.texto,
    marginBottom: 16
  },

  botaoSalvar: {
    backgroundColor: cores.verde,
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15
  },

  erro: {
    color: '#DC2626',
    fontSize: 13,
    marginBottom: 12
  },

  ok: {
    color: cores.verdeEscuro,
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '600'
  }
});
