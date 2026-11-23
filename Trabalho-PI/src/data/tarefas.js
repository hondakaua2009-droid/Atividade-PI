// Tarefas e provas ficam salvas no aparelho (AsyncStorage), separadas por usuário.
// O Firebase é usado apenas para login e perfil.

import AsyncStorage from '@react-native-async-storage/async-storage';

const ouvintes = {};

const chave = (uid, tipo) => `@pi:${uid}:${tipo}`;

const novoId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

async function ler(uid, tipo) {
  try {
    const bruto = await AsyncStorage.getItem(chave(uid, tipo));
    return bruto ? JSON.parse(bruto) : [];
  } catch (e) {
    return [];
  }
}

async function gravar(uid, tipo, lista) {
  await AsyncStorage.setItem(chave(uid, tipo), JSON.stringify(lista));

  const k = chave(uid, tipo);

  if (ouvintes[k]) {
    ouvintes[k].forEach((cb) => cb(lista));
  }
}

function ouvir(uid, tipo, callback) {
  const k = chave(uid, tipo);

  if (!ouvintes[k]) ouvintes[k] = new Set();

  ouvintes[k].add(callback);

  let ativo = true;

  ler(uid, tipo).then((lista) => {
    if (ativo) callback(lista);
  });

  return () => {
    ativo = false;
    ouvintes[k].delete(callback);
  };
}

// ---------- TAREFAS ----------

export const ouvirTarefas = (uid, callback) =>
  ouvir(uid, 'tarefas', callback);

export async function adicionarTarefa(uid, titulo) {
  const lista = await ler(uid, 'tarefas');

  await gravar(uid, 'tarefas', [
    {
      id: novoId(),
      titulo,
      concluida: false,
      criadaEm: Date.now(),
    },
    ...lista,
  ]);
}

export async function alternarTarefa(uid, id, concluida) {
  const lista = await ler(uid, 'tarefas');

  await gravar(
    uid,
    'tarefas',
    lista.map((t) =>
      t.id === id ? { ...t, concluida } : t
    )
  );
}

export async function removerTarefa(uid, id) {
  const lista = await ler(uid, 'tarefas');

  await gravar(
    uid,
    'tarefas',
    lista.filter((t) => t.id !== id)
  );
}

// ---------- PROVAS ----------

export const ouvirProvas = (uid, callback) =>
  ouvir(uid, 'provas', (lista) =>
    callback(
      [...lista].sort((a, b) =>
        a.data.localeCompare(b.data)
      )
    )
  );

export async function adicionarProva(uid, { materia, titulo, data }) {
  const lista = await ler(uid, 'provas');

  await gravar(uid, 'provas', [
    ...lista,
    {
      id: novoId(),
      materia,
      titulo,
      data,
      criadaEm: Date.now(),
    },
  ]);
}

export async function removerProva(uid, id) {
  const lista = await ler(uid, 'provas');

  await gravar(
    uid,
    'provas',
    lista.filter((p) => p.id !== id)
  );
}