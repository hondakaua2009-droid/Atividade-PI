
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { cores, sombra } from '../theme/styles';

export function formatarData(data) {
  if (!data) return '';

  const partes = data.split('-');

  if (partes.length !== 3) return data;

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

export function diasRestantes(data) {
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

  return Math.round(
    (prova - hoje) / (1000 * 60 * 60 * 24)
  );
}

export default function CardProva({ prova, onRemove }) {
  if (!prova) return null;

  const dias = diasRestantes(prova.data);

  return (
    <View style={s.card}>
      <View style={s.info}>
        <Text style={s.materia}>
          {prova.materia || 'Prova'}
        </Text>

        {!!prova.titulo && (
          <Text style={s.descricao}>
            {prova.titulo}
          </Text>
        )}

        <Text style={s.data}>
          <Ionicons name="calendar-outline" size={14} />
          {' '}{formatarData(prova.data)}
        </Text>

        <Text style={s.prazo}>
          {dias === 0
            ? 'É hoje!'
            : dias === 1
            ? 'Falta 1 dia'
            : dias > 1
            ? `Faltam ${dias} dias`
            : 'Data passada'}
        </Text>
      </View>

      {onRemove && (
        <TouchableOpacity
          onPress={() => onRemove(prova)}
          style={s.excluir}
        >
          <Ionicons
            name="trash-outline"
            size={21}
            color="#DC2626"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: cores.branco,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: cores.borda,
    ...sombra
  },

  info: {
    flex: 1
  },

  materia: {
    fontSize: 16,
    fontWeight: '800',
    color: cores.verdeEscuro
  },

  descricao: {
    fontSize: 13,
    color: cores.textoSuave,
    marginTop: 5
  },

  data: {
    fontSize: 13,
    color: cores.textoSuave,
    marginTop: 7
  },

  prazo: {
    fontSize: 13,
    color: cores.verde,
    fontWeight: '700',
    marginTop: 5
  },

  excluir: {
    padding: 10
  }
});
