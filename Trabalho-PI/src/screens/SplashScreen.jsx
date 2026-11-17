import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, estilos } from '../theme/styles';

export default function SplashScreen() {
  return (
    <View style={estilos.centro}>
      <View style={s.logo}>
        <Ionicons name="school" size={52} color={cores.verde} />
      </View>
      <Text style={s.nome}>Projeto Integrador</Text>
      <ActivityIndicator color={cores.branco} style={{ marginTop: 24 }} />
    </View>
  );
}

const s = StyleSheet.create({
  logo: { width: 104, height: 104, borderRadius: 52, backgroundColor: cores.branco, alignItems: 'center', justifyContent: 'center' },
  nome: { color: cores.branco, fontSize: 24, fontWeight: '800', marginTop: 18 },
});
