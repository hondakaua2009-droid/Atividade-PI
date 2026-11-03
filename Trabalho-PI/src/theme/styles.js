import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8F4',
  },

  areaConteudo: {
    flex: 1,
  },

  tela: {
    flex: 1,
    padding: 20,
  },

  saude: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#17452F',
    marginTop: 20,
  },

  subtitulo: {
    fontSize: 14,
    color: '#718078',
    marginTop: 8,
    marginBottom: 20,
  },

  tituloPagina: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#17452F',
    marginTop: 15,
    marginBottom: 15,
  },

  tituloSecao: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#17452F',
    marginTop: 20,
    marginBottom: 12,
  },

  linhaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  contador: {
    color: '#43AD80',
    fontWeight: 'bold',
  },

  cardProva: {
    backgroundColor: '#17452F',
    borderRadius: 18,
    padding: 20,
    marginVertical: 15,
  },

  textoProva: {
    color: '#BDE8D0',
    fontSize: 12,
    fontWeight: 'bold',
  },

  tituloProva: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
  },

  detalheProva: {
    color: '#FFFFFF',
    marginTop: 8,
  },

  diasProva: {
    color: '#BDE8D0',
    marginTop: 12,
    fontWeight: 'bold',
  },

  cardTarefa: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  checkTarefa: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#43AD80',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkAtivo: {
    backgroundColor: '#43AD80',
  },

  checkTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  infoTarefa: {
    marginLeft: 12,
    flex: 1,
  },

  tituloTarefa: {
    color: '#17452F',
    fontSize: 15,
    fontWeight: 'bold',
  },

  tarefaConcluida: {
    textDecorationLine: 'line-through',
    color: '#9AA69F',
  },

  textoSecundario: {
    color: '#718078',
    fontSize: 13,
    marginTop: 5,
  },

  botao: {
    backgroundColor: '#43AD80',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 15,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  label: {
    color: '#17452F',
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE9E1',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },

  cardCalendario: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#43AD80',
  },

  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#43AD80',
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  letraAvatar: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  nomePerfil: {
    textAlign: 'center',
    fontSize: 22,
    color: '#17452F',
    fontWeight: 'bold',
    marginTop: 15,
  },

  cardPerfil: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    marginTop: 15,
    alignItems: 'center',
  },

  numeroPerfil: {
    color: '#43AD80',
    fontSize: 28,
    fontWeight: 'bold',
  },

  menuInferior: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E4EEE8',
    justifyContent: 'space-around',
  },

  itemMenu: {
    alignItems: 'center',
    flex: 1,
  },

  iconeMenu: {
    fontSize: 22,
    color: '#9AA69F',
  },

  textoMenu: {
    fontSize: 11,
    color: '#9AA69F',
    marginTop: 4,
  },

  menuAtivo: {
    color: '#43AD80',
    fontWeight: 'bold',
  },

  splash: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagemSplash: {
    width: '100%',
    height: '75%',
  },

  textoSplash: {
    fontSize: 22,
    color: '#17452F',
    fontWeight: 'bold',
  },
});

export default styles;