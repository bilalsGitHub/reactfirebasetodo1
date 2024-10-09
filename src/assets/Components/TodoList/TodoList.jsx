import React, { useState, useEffect } from "react";
import { db } from "../../../firebase.js";
import "./TodoList.css";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Firestore işlemleri
import { auth } from "../../../firebase"; // Kullanıcıyı almak için auth kullan
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [user, setUser] = useState(null); // Giriş yapan kullanıcıyı takip etmek için state

  // Giriş yapan kullanıcıyı auth ile al
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchTodos(user.uid); // Kullanıcıya özel ToDo'ları çek
      } else {
        setUser(null);
        setTodos([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore'dan kullanıcıya özel ToDo'ları getir
  const fetchTodos = async (userId) => {
    const q = query(collection(db, "todos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const todosArray = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTodos(todosArray);
  };

  // Yeni ToDo ekle
  const addTodo = async () => {
    if (newTodo.trim() !== "" && user) {
      await addDoc(collection(db, "todos"), {
        text: newTodo, // ToDo metni
        userId: user.uid, // Kullanıcının UID'si
        createdAt: new Date(), // Oluşturulma tarihi (isteğe bağlı)
      });
      setNewTodo("");
      fetchTodos(user.uid); // Listeyi güncelle
    }
  };

  // ToDo sil
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTodos(user.uid); // Listeyi güncelle
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.displayName}'s Todo List</h2>
          <input
            type="text"
            placeholder="Yeni görev ekleyin"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>ADD</button>
          <ul>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
            ))}
          </ul>
        </div>
      ) : (
        <h2></h2>
      )}
    </div>
  );
};

export default TodoList;
