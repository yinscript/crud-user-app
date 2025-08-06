import { useState, useEffect } from 'react';
import axios from 'axios';
import type { User } from './types/User';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Fetch users on mount
  useEffect(() => {
    setLoading(true);
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data);
        setError(null);
      })
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  // Handle add or update user (adds or updates from UI only)
const handleAddOrUpdate = (user: User) => {
  if (user.id === -1) {
    setEditingUser(null); // Reset form on cancel
    return;
  }

  if (user.id === 0) {
    const newUser = { ...user, id: Date.now() };
    setUsers(prev => [...prev, newUser]);
  } else {
    setUsers(prev => prev.map(u => (u.id === user.id ? user : u)));
  }

  setEditingUser(null);
};

  // Handle delete user locally (deletes from UI only)
  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="w-full bg-blue-500 text-white text-2xl py-4 px-6 text-center">
        Simple CRUD User App
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading && <p className="text-center">Loading users...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            <UserForm onSubmit={handleAddOrUpdate} editingUser={editingUser} />
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
      </div>

      {/* Foooter */}
      <footer className="mt-8 text-center text-white text-sm bg-gray-600 p-4">
        Made by <a href="https://github.com/yinscript" target="_blank" className="underline">yinscript</a> &copy; 2025
      </footer>
    </div>
  );
}

