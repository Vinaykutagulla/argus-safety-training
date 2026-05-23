'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
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
    const colors: Record<string, any> = {
      'admin': 'danger',
      'supervisor': 'warning',
      'safety_officer': 'info',
      'analyst': 'success',
    };
    return colors[role] || 'gray';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add User'}
        </Button>
      </div>

      {/* Add User Form */}
      {showForm && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create New User</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <Input
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Department"
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <Input
              label="Role"
              type="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: 'analyst', label: 'Analyst' },
                { value: 'safety_officer', label: 'Safety Officer' },
                { value: 'supervisor', label: 'Supervisor' },
                { value: 'admin', label: 'Admin' },
              ]}
            />
            <Button type="submit" variant="primary" fullWidth>
              Create User
            </Button>
          </form>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No users yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-bold">Name</th>
                  <th className="text-left py-3 px-4 font-bold">Email</th>
                  <th className="text-left py-3 px-4 font-bold">Role</th>
                  <th className="text-left py-3 px-4 font-bold">Department</th>
                  <th className="text-left py-3 px-4 font-bold">Status</th>
                  <th className="text-left py-3 px-4 font-bold">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
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
