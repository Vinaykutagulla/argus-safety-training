const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Get stored token from localStorage (client-side)
function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('auth-token');
  } catch {
    return null;
  }
}

export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_BASE}/api${endpoint}`;
  const token = getStoredToken();

  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API error');
  }

  return data;
}

export const api = {
  auth: {
    register: (payload: any) =>
      apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    login: (payload: any) =>
      apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    logout: () =>
      apiCall('/auth/logout', { method: 'POST' }),
    getCurrentUser: () =>
      apiCall('/auth/me'),
  },
  cases: {
    list: (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return apiCall(`/cases?${query}`);
    },
    create: (payload: any) =>
      apiCall('/cases', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    get: (id: string) =>
      apiCall(`/cases/${id}`),
    update: (id: string, payload: any) =>
      apiCall(`/cases/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      }),
    delete: (id: string) =>
      apiCall(`/cases/${id}`, { method: 'DELETE' }),
    lock: (id: string) =>
      apiCall(`/cases/${id}/lock`, { method: 'POST' }),
    unlock: (id: string) =>
      apiCall(`/cases/${id}/unlock`, { method: 'POST' }),
    assign: (id: string, payload: any) =>
      apiCall(`/cases/${id}/assign`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
  },
  reports: {
    list: (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return apiCall(`/reports?${query}`);
    },
    create: (payload: any) =>
      apiCall('/reports', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    get: (id: string) =>
      apiCall(`/reports/${id}`),
    update: (id: string, payload: any) =>
      apiCall(`/reports/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      }),
  },
  users: {
    list: () =>
      apiCall('/users'),
    create: (payload: any) =>
      apiCall('/users', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    update: (id: string, payload: any) =>
      apiCall(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      }),
  },
};
