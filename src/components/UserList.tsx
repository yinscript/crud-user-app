import type { User } from '../types/User';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserList({ users, onEdit, onDelete }: Props) {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-[600px] w-full text-left text-gray-700">
        <thead className="bg-white">
          <tr>
            {['Name', 'Email', 'Phone', 'Actions'].map((heading, i) => (
              <th
                key={heading}
                className={`px-6 py-3 font-semibold ${
                  i === 0
                    ? 'rounded-tl-lg'
                    : i === 3
                    ? 'text-center rounded-tr-lg'
                    : ''
                }`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-8 text-center italic text-gray-400">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr
                key={user.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 text-center space-x-4">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:text-blue-800 text-xl"
                    title={`Edit ${user.name}`}
                    aria-label={`Edit user ${user.name}`}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this user?')) {
                        onDelete(user.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 text-xl"
                    title={`Delete ${user.name}`}
                    aria-label={`Delete user ${user.name}`}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
