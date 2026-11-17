
import { StyleSheet } from 'react-native';

export const cores = {
  verde: '#16A34A',
  verdeEscuro: '#166534',
  verdeClaro: '#DCFCE7',
  verdeSuave: '#F0FDF4',

  branco: '#FFFFFF',

  texto: '#14301F',
  textoSuave: '#5B7A66',

  borda: '#D1E7D8',
  erro: '#DC2626',
};

export const espaco = {
  p: 8,
  m: 16,
  g: 24,
};

export const estilos = StyleSheet.create({

  tela: {
    flex: 1,
    backgroundColor: cores.verdeSuave,
  },

  conteudo: {
    padding: espaco.m,
    paddingBottom: 40,
  },

  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.verde,
  },

  // Textos
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: cores.verdeEscuro,
  },

  subtitulo: {
    fontSize: 14,
    color: cores.textoSuave,
    marginTop: 2,
  },

  secao: {
    fontSize: 17,
    fontWeight: '700',
    color: cores.texto,
    marginTop: 22,
    marginBottom: 10,
  },

  // Campos de entrada
  input: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: cores.texto,
    marginBottom: 12,
  },

  // Cartões
  card: {
    backgroundColor: cores.branco,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: 10,
  },

  // Mensagens
  vazio: {
    color: cores.textoSuave,
    textAlign: 'center',
    paddingVertical: 16,
  },

  erro: {
    color: cores.erro,
    marginBottom: 10,
    fontSize: 13,
  },

});
