'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import ArgusLayout from '@/components/ArgusLayout';
import SectionHeader from '@/components/SectionHeader';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'analyst',
    department: '',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await api.users.list();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.users.create(formData);
      await loadUsers();
      setFormData({ name: '', email: '', password: '', role: 'analyst', department: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Failed to create user');
    }
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'admin': 'bg-red-100 text-red-800 border-red-300',
      'supervisor': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'safety_officer': 'bg-blue-100 text-blue-800 border-blue-300',
      'analyst': 'bg-green-100 text-green-800 border-green-300',
    };
    return colors[role] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <ArgusLayout>
        <div className="text-center py-8 text-argus-text-muted">
          ⏳ Loading users...
        </div>
      </ArgusLayout>
    );
  }

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Page Title */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-13 font-bold text-argus-navy uppercase">
            👥 USER MANAGEMENT
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-3 py-1 text-10 font-bold border ${
              showForm
                ? 'bg-red-600 text-white border-red-700 hover:bg-red-700'
                : 'bg-argus-blue text-white border-argus-border-dark hover:bg-argus-light'
            }`}
          >
            {showForm ? '✕ Cancel' : '+ Add User'}
          </button>
        </div>

        {/* Add User Form */}
        {showForm && (
          <div className="border-2 border-argus-border bg-white p-3">
            <SectionHeader title="NEW USER REGISTRATION" />
            <form onSubmit={handleAddUser} className="space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-10 font-bold text-argus-text-label mb-1">
                    Full Name: <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-10 font-bold text-argus-text-label mb-1">
                    Email: <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-10 font-bold text-argus-text-label mb-1">
                    Department:
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-10 font-bold text-argus-text-label mb-1">
                    Role: <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                  >
                    <option value="analyst">Analyst</option>
                    <option value="safety_officer">Safety Officer</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-10 font-bold text-argus-text-label mb-1">
                  Initial Password: <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  type="submit"
                  className="px-4 py-1 bg-argus-blue text-white text-10 font-bold border border-argus-border-dark hover:bg-argus-light"
                >
                  ✓ Create User
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-1 bg-gray-400 text-white text-10 font-bold border border-gray-600 hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div className="border-2 border-argus-border bg-white overflow-auto">
          <SectionHeader title={`USERS (${users.length} total)`} />
          <div className="overflow-x-auto">
            <table className="w-full text-10 border-collapse">
              <thead>
                <tr className="bg-argus-blue text-white">
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Name</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Email</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Department</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Role</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Created Date</th>
                  <th className="border border-argus-border px-2 py-1 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`${idx % 2 === 1 ? 'bg-argus-bg-row-alt' : 'bg-white'} border-b border-argus-border`}
                  >
                    <td className="border border-argus-border px-2 py-1 font-bold">{user.name}</td>
                    <td className="border border-argus-border px-2 py-1">{user.email}</td>
                    <td className="border border-argus-border px-2 py-1">{user.department || 'N/A'}</td>
                    <td className="border border-argus-border px-2 py-1">
                      <span className={`px-2 py-0.5 text-9 font-bold border rounded ${getRoleColor(user.role)}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="border border-argus-border px-2 py-1 text-argus-text-muted">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-argus-border px-2 py-1 text-center">
                      <button className="px-2 py-0.5 bg-argus-orange text-white text-9 hover:bg-yellow-600 mr-1">
                        Edit
                      </button>
                      <button className="px-2 py-0.5 bg-red-600 text-white text-9 hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-4 text-argus-text-muted">
              No users found. Create a new user to get started.
            </div>
          )}
        </div>
      </div>
    </ArgusLayout>
  );
}

                  <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getRoleColor(user.role) as any}>
                        {user.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{user.department}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.isActive ? 'success' : 'danger'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : 'Never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Role Permissions Matrix */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Role Permissions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2 px-4">Permission</th>
                <th className="text-center py-2 px-4">Analyst</th>
                <th className="text-center py-2 px-4">Safety Officer</th>
                <th className="text-center py-2 px-4">Supervisor</th>
                <th className="text-center py-2 px-4">Admin</th>
              </tr>
            </thead>
            <tbody>
              {[
                'View Cases',
                'Create Cases',
                'Edit Cases',
                'Lock Cases',
                'Submit Reports',
                'View Users',
                'Create Users',
                'Edit Users',
              ].map((perm) => (
                <tr key={perm} className="border-b border-gray-200">
                  <td className="py-2 px-4">{perm}</td>
                  <td className="text-center py-2 px-4">
                    {['View Cases', 'Create Cases', 'Edit Cases'].includes(perm) && '✓'}
                  </td>
                  <td className="text-center py-2 px-4">
                    {!['View Users', 'Create Users', 'Edit Users'].includes(perm) && '✓'}
                  </td>
                  <td className="text-center py-2 px-4">
                    {perm !== 'Create Users' && perm !== 'Edit Users' && '✓'}
                  </td>
                  <td className="text-center py-2 px-4">✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
