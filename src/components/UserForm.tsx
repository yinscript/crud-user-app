import { useEffect, useState } from 'react';
import type { User } from '../types/User';

interface Props {
  onSubmit: (user: User) => void;
  editingUser: User | null;
}

export default function UserForm({ onSubmit, editingUser }: Props) {
  const [user, setUser] = useState<User>({ id: 0, name: '', email: '', phone: '' });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ id: 0, name: '', email: '', phone: '' });
    }
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.name.trim() || !user.email.trim() || !user.phone.trim()) {
      alert('All fields are required.');
      return;
    }
    onSubmit(user);
    setUser({ id: 0, name: '', email: '', phone: '' });
  };

  const handleCancel = () => {
    setUser({ id: 0, name: '', email: '', phone: '' });
    onSubmit({ id: -1, name: '', email: '', phone: '' }); // reset editing state in parent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-6"
      aria-label={user.id === 0 ? 'Add User Form' : 'Edit User Form'}
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        {user.id === 0 ? 'Add User' : 'Edit User'}
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter full name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[.5] focus:ring-blue-500 focus:border-blue-500 transition"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email address"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[.5] focus:ring-blue-500 focus:border-blue-500 transition"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter phone number"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[.5] focus:ring-blue-500 focus:border-blue-500 transition"
          value={user.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        {user.id !== 0 && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {user.id === 0 ? 'Add User' : 'Update User'}
        </button>
      </div>
    </form>
  );
}
