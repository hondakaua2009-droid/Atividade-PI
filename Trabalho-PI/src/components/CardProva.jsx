import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme/styles';

export function diasRestantes(dataStr) {
  const [a, m, d] = dataStr.split('-').map(Number);
  const alvo = new Date(a, m - 1, d);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return Math.round((alvo - hoje) / 86400000);
}

export function formatarData(dataStr) {
  const [a, m, d] = dataStr.split('-');
  return `${d}/${m}/${a}`;
}

export default function CardProva({ prova, onRemove }) {
  const dias = diasRestantes(prova.data);
  const rotulo = dias < 0 ? 'Passou' : dias === 0 ? 'Hoje' : dias === 1 ? 'Amanhã' : `${dias} dias`;
  return (
    <View style={s.card}>
      <View style={s.faixa} />
      <View style={{ flex: 1 }}>
        <Text style={s.materia}>{prova.materia}</Text>
        {!!prova.titulo && <Text style={s.titulo}>{prova.titulo}</Text>}
        <Text style={s.data}>{formatarData(prova.data)}</Text>
      </View>
      <View style={[s.badge, dias < 0 && { backgroundColor: cores.borda }]}>
        <Text style={[s.badgeTexto, dias < 0 && { color: cores.textoSuave }]}>{rotulo}</Text>
      </View>
      {onRemove && (
        <TouchableOpacity onPress={() => onRemove(prova)} hitSlop={10} style={{ marginLeft: 10 }}>
          <Ionicons name="trash-outline" size={20} color={cores.textoSuave} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco,
    borderRadius: 14, borderWidth: 1, borderColor: cores.borda,
    padding: 12, marginBottom: 8, overflow: 'hidden',
  },
  faixa: { width: 5, alignSelf: 'stretch', backgroundColor: cores.verde, borderRadius: 4, marginRight: 12 },
  materia: { fontSize: 16, fontWeight: '700', color: cores.texto },
  titulo: { fontSize: 13, color: cores.textoSuave, marginTop: 2 },
  data: { fontSize: 12, color: cores.textoSuave, marginTop: 4 },
  badge: { backgroundColor: cores.verdeClaro, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  badgeTexto: { color: cores.verdeEscuro, fontWeight: '700', fontSize: 12 },
});
