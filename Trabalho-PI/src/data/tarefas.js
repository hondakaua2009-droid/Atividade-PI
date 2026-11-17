import {
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';

const tarefasRef = (uid) => collection(db, 'users', uid, 'tarefas');
const provasRef = (uid) => collection(db, 'users', uid, 'provas');

// ---------- TAREFAS ----------
export function ouvirTarefas(uid, callback, onError) {
  const q = query(tarefasRef(uid), orderBy('criadaEm', 'desc'));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export const adicionarTarefa = (uid, titulo) =>
  addDoc(tarefasRef(uid), { titulo, concluida: false, criadaEm: serverTimestamp() });

export const alternarTarefa = (uid, id, concluida) =>
  updateDoc(doc(db, 'users', uid, 'tarefas', id), { concluida });

export const removerTarefa = (uid, id) =>
  deleteDoc(doc(db, 'users', uid, 'tarefas', id));

// ---------- PROVAS ----------
export function ouvirProvas(uid, callback, onError) {
  const q = query(provasRef(uid), orderBy('data', 'asc'));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export const adicionarProva = (uid, { materia, titulo, data }) =>
  addDoc(provasRef(uid), { materia, titulo, data, criadaEm: serverTimestamp() });

export const removerProva = (uid, id) =>
  deleteDoc(doc(db, 'users', uid, 'provas', id));
