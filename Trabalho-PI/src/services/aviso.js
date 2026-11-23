import { Alert, Platform } from 'react-native';

// Alert.alert não aparece no navegador, então usamos window.alert na web.
export function aviso(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(mensagem ? `${titulo}\n${mensagem}` : titulo);
  } else {
    Alert.alert(titulo, mensagem);
  }
}