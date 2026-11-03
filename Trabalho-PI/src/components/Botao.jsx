import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../theme/styles';

export default function Botao({ titulo, onPress }) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.textoBotao}>{titulo}</Text>
    </TouchableOpacity>
  );
}