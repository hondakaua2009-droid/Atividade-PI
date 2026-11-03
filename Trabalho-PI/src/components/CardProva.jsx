import React from 'react';
import { View, Text } from 'react-native';
import styles from '../theme/styles';

export default function CardProva() {
  return (
    <View style={styles.cardProva}>
      <Text style={styles.textoProva}>PRÓXIMA PROVA</Text>
      <Text style={styles.tituloProva}>Matemática</Text>
      <Text style={styles.detalheProva}>
        06 de novembro • 08:00
      </Text>
      <Text style={styles.diasProva}>Em 3 dias</Text>
    </View>
  );
}