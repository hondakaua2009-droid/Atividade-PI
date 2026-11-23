import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, sombra } from '../theme/styles';

export default function Tarefa({ item, onToggle, onRemove }) {
  return (
    <View style={s.linha}>
      <TouchableOpacity onPress={() => onToggle(item)} style={s.check}>
        <Ionicons
          name={item.concluida ? 'checkmark-circle' : 'ellipse-outline'}
          size={28}
          color={cores.verde}
        />
      </TouchableOpacity>

      <Text style={[s.titulo, item.concluida && s.feita]} numberOfLines={2}>
        {item.titulo}
      </Text>

      {onRemove && (
        <TouchableOpacity onPress={() => onRemove(item)} hitSlop={10}>
          <Ionicons name="trash-outline" size={20} color={cores.textoSuave} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.branco,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginBottom: 10,
    ...sombra,
  },
  check: { marginRight: 12 },
  titulo: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: cores.texto,
  },
  feita: {
    textDecorationLine: 'line-through',
    color: cores.textoSuave,
  },
});