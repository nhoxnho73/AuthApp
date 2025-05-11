import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

export default function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userTodosRef = collection(db, 'todos', user.uid, 'items');
    const q = query(userTodosRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(list);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (text) => {
    const user = auth.currentUser;
    if (!user || text.trim() === '') return;

    const todosRef = collection(db, 'todos', user.uid, 'items');
    await addDoc(todosRef, {
      text,
      completed: false,
      createdAt: new Date(),
    });
  };

  const toggleComplete = async (id, currentStatus) => {
    const user = auth.currentUser;
    const todoRef = doc(db, 'todos', user.uid, 'items', id);
    await updateDoc(todoRef, { completed: !currentStatus });
  };

  const deleteTodo = async (id) => {
    const user = auth.currentUser;
    const todoRef = doc(db, 'todos', user.uid, 'items', id);
    await deleteDoc(todoRef);
  };

  const editTodo = async (id, newText) => {
    const user = auth.currentUser;
    const todoRef = doc(db, 'todos', user.uid, 'items', id);
    await updateDoc(todoRef, { text: newText });
  };

  return {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
  };
}