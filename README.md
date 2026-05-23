# Argus Safety Training Platform - Production Grade

A comprehensive pharmacovigilance (PV) training platform built with Next.js, TypeScript, MongoDB, and Tailwind CSS. This is a production-ready application for managing adverse event cases, expedited reporting, and safety assessments following ICH E2B(R3) standards.

## 🎯 Features

### ✅ Complete Implementation
- **Authentication System** - User registration, login, role-based access control
- **Case Management** - Multi-tab case intake form, full CRUD, workflow tracking
- **MedDRA Coding** - 30+ terms, full hierarchy support, search functionality
- **Expedited Reporting** - Automatic 7-day/15-day classification, regulatory clock
- **Safety Assessment** - WHO-UMC causality criteria, listedness assessment
- **Dashboard** - Real-time metrics, recent cases, alert system
- **User Management** - Admin panel, role permissions matrix
- **Audit Trail** - Complete modification history for all cases

### 🔐 Security
- JWT authentication with HTTP-only cookies
- Bcrypt password hashing (10 rounds)
- Role-based access control on API routes
- CSRF protection built-in
- Environment-based configuration

### 📊 Database
- MongoDB Atlas integration
- Mongoose schemas with validation
- Indexes for performance
- Comprehensive audit logging

### 🎨 UI/UX
- Clean, professional design
- Responsive layout (mobile-friendly)
- Status badges with semantic colors
- Intuitive navigation
- Toast notifications (can be added)
- Form validation with inline errors

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and JWT secret

# 3. Seed demo data (optional)
npx ts-node src/scripts/seed.ts

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000/login
```

### Demo Credentials
```
Email: admin@argus.com
Password: password123
```

## 📁 Project Structure

Complete source code organization with clear separation of concerns:

- **API Routes** (`src/app/api/`) - RESTful endpoints with authentication
- **Pages** (`src/app/dashboard/`) - User-facing components
- **Models** (`src/models/`) - MongoDB Mongoose schemas
- **Components** (`src/components/`) - Reusable React components
- **Utilities** (`src/lib/`) - Helper functions and constants

## 🔗 API Endpoints

All endpoints protected with JWT authentication:

**Auth**
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`

**Cases**
- GET/POST `/api/cases`
- GET/PUT/DELETE `/api/cases/[id]`
- POST `/api/cases/[id]/lock`
- POST `/api/cases/[id]/unlock`
- POST `/api/cases/[id]/assign`

**Reports**
- GET/POST `/api/reports`
- GET/PUT `/api/reports/[id]`

**Users** (Admin only)
- GET/POST `/api/users`
- PUT `/api/users/[id]`

## 📋 Database Models

### User
```typescript
{
  name: string
  email: string (unique)
  password: string (bcrypt hashed)
  role: 'analyst' | 'safety_officer' | 'supervisor' | 'admin'
  department: string
  isActive: boolean
  lastLogin?: Date
}
```

### AECase
ICH E2B(R3) compliant structure with:
- Administration data
- Patient demographics
- Reaction/Event details with MedDRA coding
- Drug information with causality
- Case narrative
- Reporter information
- Assessment and workflow status
- Complete audit trail

### SafetyReport
```typescript
{
  reportId: string (unique)
  reportType: 'PSUR' | 'DSUR' | 'PBRER' | 'PADER' | '7-day' | '15-day'
  product: string
  dueDate: Date
  status: 'Pending' | 'Submitted' | 'Overdue'
  totalCases: number
  seriousCases: number
  fatalCases: number
}
```

## 🎓 Learning Resources

The code includes:
- Complete type definitions (TypeScript)
- Inline comments for complex logic
- Proper error handling
- Input validation
- Security best practices
- RESTful API design patterns

## 🛠️ Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker Support
```dockerfile
# Dockerfile ready for containerization
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

## 📈 Performance

- Optimized database queries with indexes
- Pagination support (10 items per page)
- Filtered data retrieval
- Client-side form validation
- Efficient re-renders with React

## ✨ Code Quality

- TypeScript for type safety
- ESLint ready
- Consistent code style
- Modular architecture
- Clean component separation

## 📝 Documentation

- **README.md** - This file
- **SETUP.md** - Detailed setup guide
- **Inline comments** - Throughout codebase
- **API documentation** - In route files

## 🔄 Workflow Features

- **Case Status Tracking** - New → Open → Under Review → Closed/Locked
- **Workflow Steps** - Intake → Triage → Data Entry → Medical Review → QC → Lock → Submit
- **Case Assignment** - Assign to specific users
- **Lock/Unlock** - Prevent unauthorized modifications
- **Audit Trail** - Track all changes with user and timestamp

## 🌍 Regulatory Support

- **CDSCO** (India) - 7-day and 15-day requirements
- **FDA** (USA) - Expedited reporting rules
- **EMA** (Europe) - ICH E2A compliance
- **WHO-UMC** - Causality assessment criteria

## 🎨 UI Components

Custom-built components (no external libraries):
- Button with variants (primary, secondary, danger, warning)
- Input with validation
- Card and MetricCard
- Badge for status indicators
- Tabs for multi-section forms
- Navigation bar
- Tables with sorting

## 🚀 Next Steps

1. Customize branding and colors in `tailwind.config.ts`
2. Add email notifications for overdue reports
3. Implement chart visualizations for dashboard
4. Add PDF export for reports
5. Set up CI/CD pipeline
6. Deploy to production (Vercel, AWS, etc.)

## 📞 Support

For questions about features or implementation, refer to:
- Source code comments
- Model definitions in `src/models/`
- API route implementations in `src/app/api/`
- Component examples in `src/components/`

---

**Built with ❤️ for pharmacovigilance training and practice**

Last Updated: May 2024 | Version: 1.0.0
