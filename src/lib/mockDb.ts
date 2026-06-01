// Mock in-memory database for development when MongoDB is not available
import bcrypt from 'bcryptjs';

interface MockUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'analyst' | 'safety_officer' | 'supervisor' | 'admin';
  department: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

interface MockCase {
  _id: string;
  caseId: string;
  status: string;
  reportType: string;
  receiptDate: Date;
  createdAt: Date;
  [key: string]: any;
}

let users: Map<string, MockUser> = new Map();
let cases: Map<string, MockCase> = new Map();
let isConnected = false;

// Initialize with demo data
async function initializeMockData() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const demoUsers: MockUser[] = [
    {
      _id: '1',
      name: 'Admin User',
      email: 'admin@argus.com',
      password: hashedPassword,
      role: 'admin',
      department: 'Safety',
      isActive: true,
      createdAt: new Date(),
    },
    {
      _id: '2',
      name: 'Safety Analyst',
      email: 'analyst@argus.com',
      password: hashedPassword,
      role: 'analyst',
      department: 'PV',
      isActive: true,
      createdAt: new Date(),
    },
  ];

  demoUsers.forEach(user => {
    users.set(user.email, user);
  });
}

export const mockDb = {
  async connect() {
    if (!isConnected) {
      await initializeMockData();
      isConnected = true;
    }
    return { connection: 'mock' };
  },

  async findUser(email: string) {
    return users.get(email) || null;
  },

  async createUser(userData: Omit<MockUser, '_id' | 'createdAt'>) {
    const id = Math.random().toString(36).substr(2, 9);
    const user: MockUser = {
      ...userData,
      _id: id,
      createdAt: new Date(),
    };
    users.set(userData.email, user);
    return user;
  },

  async getCases() {
    return Array.from(cases.values());
  },

  async getCaseById(id: string) {
    return cases.get(id) || null;
  },

  async createCase(caseData: any) {
    const id = Math.random().toString(36).substr(2, 9);
    const newCase: MockCase = {
      ...caseData,
      _id: id,
      createdAt: new Date(),
    };
    cases.set(id, newCase);
    return newCase;
  },

  async updateCase(id: string, caseData: any) {
    const existingCase = cases.get(id);
    if (!existingCase) return null;
    
    const updated = { ...existingCase, ...caseData };
    cases.set(id, updated);
    return updated;
  },

  async deleteCase(id: string) {
    return cases.delete(id);
  },

  async getUsers() {
    return Array.from(users.values()).map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  },

  isConnected() {
    return isConnected;
  },
};
