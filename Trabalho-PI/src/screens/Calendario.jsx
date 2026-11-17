import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { auth } from '../services/firebase';
import { ouvirProvas, adicionarProva, removerProva } from '../data/tarefas';
import CardProva, { formatarData } from '../components/CardProva';
import Botao from '../components/Botao';
import { cores, estilos } from '../theme/styles';

LocaleConfig.locales.pt = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt';

const hojeISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function Calendario() {
  const uid = auth.currentUser.uid;
  const [provas, setProvas] = useState([]);
  const [dia, setDia] = useState(hojeISO());
  const [materia, setMateria] = useState('');
  const [titulo, setTitulo] = useState('');

  useEffect(() => ouvirProvas(uid, setProvas, (e) => Alert.alert('Erro', e.message)), [uid]);

  const marcadas = useMemo(() => {
    const m = {};
    provas.forEach((p) => { m[p.data] = { marked: true, dotColor: cores.verde }; });
    m[dia] = { ...(m[dia] || {}), selected: true, selectedColor: cores.verde };
    return m;
  }, [provas, dia]);

  const doDia = provas.filter((p) => p.data === dia);

  async function adicionar() {
    if (!materia.trim()) return Alert.alert('Atenção', 'Informe a matéria.');
    try {
      await adicionarProva(uid, { materia: materia.trim(), titulo: titulo.trim(), data: dia });
      setMateria(''); setTitulo('');
    } catch (e) { Alert.alert('Erro', e.message); }
  }

  return (
    <SafeAreaView edges={['top']} style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={estilos.titulo}>Calendário</Text>
        <View style={{ marginTop: 14, borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: cores.borda }}>
          <Calendar
            onDayPress={(d) => setDia(d.dateString)}
            markedDates={marcadas}
            theme={{
              calendarBackground: cores.branco,
              todayTextColor: cores.verde,
              arrowColor: cores.verde,
              monthTextColor: cores.verdeEscuro,
              selectedDayBackgroundColor: cores.verde,
              selectedDayTextColor: cores.branco,
              textMonthFontWeight: '800',
            }}
          />
        </View>

        <Text style={estilos.secao}>Provas em {formatarData(dia)}</Text>
        {doDia.length === 0 ? (
          <Text style={estilos.vazio}>Nenhuma prova neste dia.</Text>
        ) : (
          doDia.map((p) => <CardProva key={p.id} prova={p} onRemove={(x) => removerProva(uid, x.id)} />)
        )}

        <Text style={estilos.secao}>Adicionar prova neste dia</Text>
        <TextInput style={estilos.input} placeholder="Matéria (ex: Matemática)" placeholderTextColor={cores.textoSuave}
          value={materia} onChangeText={setMateria} />
        <TextInput style={estilos.input} placeholder="Descrição (opcional)" placeholderTextColor={cores.textoSuave}
          value={titulo} onChangeText={setTitulo} />
        <Botao titulo="Salvar prova" onPress={adicionar} />
      </ScrollView>
    </SafeAreaView>
  );
}
