import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { cores } from '../theme/styles';

export default function Botao({ titulo, onPress, variante = 'cheio', carregando = false, desabilitado = false, style }) {
  const contorno = variante === 'contorno';
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={desabilitado || carregando}
      style={[s.base, contorno ? s.contorno : s.cheio, (desabilitado || carregando) && s.off, style]}
    >
      {carregando ? (
        <ActivityIndicator color={contorno ? cores.verde : cores.branco} />
      ) : (
        <Text style={[s.texto, contorno && { color: cores.verde }]}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  base: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  cheio: { backgroundColor: cores.verde },
  contorno: { backgroundColor: cores.branco, borderWidth: 1.5, borderColor: cores.verde },
  off: { opacity: 0.6 },
  texto: { color: cores.branco, fontWeight: '700', fontSize: 15 },
});
