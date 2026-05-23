# Argus Safety Training Platform - SETUP GUIDE

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd argus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/argus-pv
   JWT_SECRET=your-super-secret-key-change-in-production
   NODE_ENV=development
   ```

4. **Seed the database** (optional - creates demo data)
   ```bash
   npx ts-node src/scripts/seed.ts
   ```
   
   Demo users created:
   - admin@argus.com / password123 (Admin)
   - analyst@argus.com / password123 (Analyst)
   - safety@argus.com / password123 (Safety Officer)
   - supervisor@argus.com / password123 (Supervisor)
   - reviewer@argus.com / password123 (Analyst)

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Server runs on: http://localhost:3000

6. **Access the application**
   - Login at: http://localhost:3000/login
   - Dashboard: http://localhost:3000/dashboard

## 📚 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── api/                      # REST API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── cases/                # Case management endpoints
│   │   ├── reports/              # Report management endpoints
│   │   └── users/                # User management endpoints (admin)
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── cases/                # Case listing, detail, new
│   │   ├── reports/              # Expedited and periodic reports
│   │   ├── meddra/               # MedDRA coding interface
│   │   ├── assessment/           # Safety assessment tools
│   │   ├── workflow/             # Case workflow management
│   │   ├── admin/                # Admin user management
│   │   └── layout.tsx            # Dashboard layout
│   ├── login/                    # Login page
│   ├── register/                 # Registration page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── models/                       # Mongoose schemas
│   ├── User.ts                   # User model
│   ├── AECase.ts                 # Adverse event case model
│   └── SafetyReport.ts           # Safety report model
├── components/                   # Reusable React components
│   ├── Button.tsx                # Button component
│   ├── Input.tsx                 # Form input component
│   ├── Card.tsx                  # Card and metric card components
│   ├── Badge.tsx                 # Status badge component
│   ├── Tabs.tsx                  # Tabbed interface
│   └── Navigation.tsx            # Top navigation bar
├── lib/                          # Utility functions
│   ├── db.ts                     # MongoDB connection
│   ├── auth.ts                   # JWT utilities
│   ├── middleware.ts             # Authentication middleware
│   ├── api-client.ts             # Client-side API calls
│   └── constants.ts              # MedDRA and drug data
└── scripts/                      # Utility scripts
    └── seed.ts                   # Database seeding script
```

## 🔐 Authentication Flow

1. User registers or logs in with email/password
2. Backend validates credentials and generates JWT token
3. Token stored in HTTP-only cookie (secure)
4. Client automatically includes cookie in subsequent requests
5. Protected routes check for valid token

## 📋 Database Schema

### User
- name, email, password (bcrypt hashed), role, department, isActive, lastLogin

### AECase (Adverse Event Case)
- ICH E2B(R3) compliant structure with tabs:
  - Administration: Receipt date, case type, reporter info
  - Patient: Demographics, medical history
  - Reaction: Verbatim term, MedDRA codes, severity
  - Drug: Trade name, substance, causality
  - Narrative: Case summary, lab tests
  - Reporter: Contact and qualification
  - Assessment: Listedness, causality, expedited report decision
  - Workflow: Current step, assignment, lock status
  - Audit trail: All modifications logged

### SafetyReport
- Report type (7-day, 15-day, PSUR, DSUR, etc.)
- Due date, submission status
- Case counts (total, serious, fatal)
- Related cases

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Cases
- `GET /api/cases` - List cases with filtering
- `POST /api/cases` - Create new case
- `GET /api/cases/[id]` - Get case detail
- `PUT /api/cases/[id]` - Update case
- `DELETE /api/cases/[id]` - Delete case (admin only)
- `POST /api/cases/[id]/lock` - Lock case (safety officer+)
- `POST /api/cases/[id]/unlock` - Unlock case (supervisor+)
- `POST /api/cases/[id]/assign` - Assign to user (safety officer+)

### Reports
- `GET /api/reports` - List reports
- `POST /api/reports` - Create report
- `GET /api/reports/[id]` - Get report detail
- `PUT /api/reports/[id]` - Update report

### Users (Admin only)
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `PUT /api/users/[id]` - Update user

## 🔑 Key Features

✅ **Authentication & Authorization**
- Email/password login with JWT
- Role-based access control (analyst, safety_officer, supervisor, admin)
- Protected routes and API endpoints

✅ **Case Management**
- Multi-tab case intake form (E2B R3 compliant)
- Full CRUD operations
- Case status workflow tracking
- Audit trail for all modifications

✅ **MedDRA Coding**
- 30+ MedDRA terms covering major disease areas
- Full 5-level hierarchy (LLT → PT → HLT → HLGT → SOC)
- Search functionality

✅ **Drug Dictionary**
- 15 common drugs with trade names and substances
- ATC classification

✅ **Expedited Reporting**
- Automatic 7-day and 15-day report classification
- Regulatory clock tracking
- Overdue alert system
- Multiple jurisdiction support (CDSCO, FDA, EMA)

✅ **Safety Assessment**
- WHO-UMC causality criteria reference
- Listedness assessment tools
- Regulatory requirement guidelines

✅ **Dashboard**
- Real-time metrics (total cases, serious cases, due reports)
- Recent cases timeline
- Overdue alert banner
- Quick links to all modules

✅ **Workflow Management**
- Case routing and assignment
- Step-by-step workflow tracking
- User-based task management

✅ **User Management** (Admin only)
- Create/edit/deactivate users
- Role permissions matrix
- Activity logging

## 🛠️ Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
npm start
```

### Debugging
- Enable verbose logging by setting `DEBUG=*` environment variable
- Check browser DevTools for client-side errors
- Check server logs for API errors

## 📦 Technology Stack

- **Frontend**: Next.js 16+, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **UI**: Custom components (no external UI libraries)
- **Deployment**: Ready for Vercel, Docker, traditional servers

## 🔒 Security Best Practices Implemented

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens in HTTP-only cookies (CSRF protection)
- API routes require authentication
- Role-based access control enforced
- Environment variables for sensitive data
- Input validation on backend

## 📄 License

This project is for educational and training purposes.

## 📞 Support

For issues or questions, refer to the code comments and inline documentation.

---

**Happy pharmacovigilance tracking! 🚀**
