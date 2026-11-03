import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../theme/styles';

export default function SplashScreen() {
  return (
    <View style={styles.splash}>
      <Image
        source={require('../../assets/images/splash.png')}
        style={styles.imagemSplash}
        resizeMode="contain"
      />

      <Text style={styles.textoSplash}>
        Agenda de Estudos
      </Text>
    </View>
  );
}