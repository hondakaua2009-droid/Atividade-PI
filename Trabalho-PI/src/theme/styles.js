import { StyleSheet, Platform } from 'react-native';

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

export const espaco = { p: 8, m: 16, g: 24 };

export const sombra = Platform.select({
  web: { boxShadow: '0 4px 14px rgba(22,101,52,0.10)' },
  default: {
    shadowColor: '#166534',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
});

export const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.verdeSuave },
  conteudo: { padding: espaco.m, paddingBottom: 40 },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.verde,
  },
  hero: {
    backgroundColor: cores.verde,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTitulo: {
    color: cores.branco,
    fontSize: 28,
    fontWeight: '800',
  },
  heroSub: {
    color: cores.verdeClaro,
    fontSize: 14,
    marginTop: 4,
  },
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
  input: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: cores.texto,
    marginBottom: 12,
  },
  card: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: 10,
    ...sombra,
  },
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
  ok: {
    color: cores.verdeEscuro,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '600',
  },
});