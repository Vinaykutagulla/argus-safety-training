# Argus PV Safety Training - Getting Started Guide

## Quick Setup (2 minutes)

### 1. **Seed Training Data into MongoDB**
```bash
# In a terminal at project root:
curl -X POST http://localhost:3000/api/admin/seed \
  -H "x-seed-password: dev-seed-key" \
  -H "Content-Type: application/json"
```

This loads 3 realistic training cases (ARG-001, ARG-002, ARG-003) into your MongoDB database.

### 2. **Start the Application**
```bash
# Terminal 1: Backend/Frontend (Next.js)
npm run dev

# Terminal 2 (Optional): MongoDB (if local)
mongod
```

App runs at: **http://localhost:3000**

### 3. **Login**
- **Email:** admin@argus.com
- **Password:** demo123

---

## Feature Overview

### ✅ Core Pages Built
1. **Login Page** - Argus-branded authentication
2. **Dashboard/Home** - Personal case worklist + action items
3. **Case Search** - Searchable, filterable case database with pagination
4. **Case Form (8-Tab Interface)** - Comprehensive case entry per ICH E2A
5. **Expedited Reports** - Regulatory clock monitor with color-coded urgency
6. **Audit Trail** - Full case revision history with user tracking

### 🎓 Training Mode System (NEW)
- **Training Mode Toggle** - 🎓 button at top-right of Case Form
- **Field Tooltips** - Hover over 🎓 icons for guidance on key fields
- **Tutorial Mode** - 7-step guided workflow for new case entry
- **Quiz Mode** - Knowledge assessment after completing a case
- **Regulatory Reference Panel** - Collapsible sidebar with ICH E2A rules, MedDRA coding, causality assessment

### 📊 UI Component Library
- ArgusFormField (right-aligned labels, Oracle style)
- ArgusInput / ArgusSelect / ArgusDateField (Argus-styled form controls)
- SectionHeader (navy blue headers with optional actions)
- CaseHeader / WorkflowBar (case metadata + workflow progress)
- MedDRABrowser (hierarchical term search modal)
- TrainingTooltip / TutorialMode / QuizMode / RegulatoryReferencePanel

---

## Training Cases Included

Three realistic training cases are pre-loaded:

### **ARG-001** - Expedited 7-day Cardiac (CRITICAL)
- **Outcome:** Fatal myocardial infarction
- **Causality:** WHO-UMC Probable
- **Reporting:** 7-day CDSCO (India), 15-day FDA (USA)
- **Learning:** Recognize death, apply 7-day rule, manage regulatory clock

### **ARG-002** - Non-Serious Rash (LOW)
- **Outcome:** Recovered spontaneously
- **Causality:** Possible
- **Reporting:** None required
- **Learning:** Distinguish serious vs non-serious, no expedited reporting needed

### **ARG-003** - Pregnancy Exposure (HIGH)
- **Outcome:** Pending fetal development follow-up
- **Causality:** Probable
- **Reporting:** 15-day EMA (Europe)
- **Learning:** Handle pregnancy cases, manage prospective follow-up

---

## User Workflows

### **Student Using Training Mode**
1. Navigate to **Case Form (new case)**
2. Click **🎓 Training Mode: OFF** → **ON**
3. Regulatory Reference Panel appears on right side
4. Hover over 🎓 icons for field-level guidance
5. Complete 7-step tutorial (optional)
6. After saving, take knowledge assessment quiz
7. Review results with explanations and guideline references

### **Safety Officer Reviewing Cases**
1. Go to **Case Search** to find case by ID/product/country
2. Click case ID to open **Case Form**
3. Review all 8 tabs (General → Patient → Products → Events → Analysis → Activities → Add'l Info → Attachments)
4. Check **Expedited Reporting** tab for regulatory clock status (color-coded by days remaining)
5. Click **Audit Trail** link to see complete revision history
6. Save changes or Lock case for submission

### **Manager Monitoring Workload**
1. Go to **Dashboard** to see:
   - Personal worklist by status (New, Open, Review, Locked, Closed)
   - Action items due soon
   - Reports due soon with regulatory clock countdown
2. Click "Export PDF" to generate regulatory submission documents
3. View **Expedited Reports** page for cross-case reporting status

---

## API Endpoints Available

- `POST /api/admin/seed` - Load training cases (requires seed password)
- `GET /api/cases` - List all cases (paginated, searchable, filterable)
- `GET /api/cases/[id]` - Get single case
- `POST /api/cases` - Create new case
- `PUT /api/cases/[id]` - Update case
- `GET /api/reports` - List all reports
- `POST /api/reports` - Create report

---

## Database Models

### Training Case Data Structure
```javascript
{
  caseId: "ARG-001",
  status: "Under Review",
  priority: "Critical",
  
  // Administrative info
  administration: {
    receiptDate, caseClassification, reportType,
    primaryReporterType, countryOfOccurrence
  },
  
  // Reaction/Event details
  reaction: {
    verbatimReaction, reactionOnsetDate, outcome,
    seriousnessReasons, meddraSoc, meddraPt, meddraCode
  },
  
  // Patient demographics
  patient: {
    patientInitials, dateOfBirth, gender, weight,
    height, medicalHistory, pregnancyInformation
  },
  
  // Drug information
  drug: {
    tradeName, genericName, productRole, dose,
    routeOfAdministration, startDate, endDate,
    indication, actionTaken
  },
  
  // Regulatory requirements
  expeditedReporting: [
    { authority, reportType, dueDate, status, submitted }
  ],
  
  // Audit trail
  auditTrail: [
    { timestamp, userId, action, fieldChanged, oldValue, newValue }
  ]
}
```

---

## Customization Points

### Add More Training Cases
Edit `/src/app/api/admin/seed/route.ts` - Add to the `trainingCases` array

### Customize Training Tutorial
Edit `/src/app/dashboard/cases/[id]/page.tsx` - Modify `tutorialSteps` array

### Change Regulatory Rules
Edit `/src/components/RegulatoryReferencePanel.tsx` - Update `referenceSections` array

### Modify Form Fields
Edit `/src/app/dashboard/cases/[id]/page.tsx` - Update form sections in each tab

---

## Keyboard Shortcuts (Future Enhancement)
- `Shift + T` - Toggle Training Mode
- `Shift + R` - Open Regulatory Reference
- `Shift + H` - Show tutorial hints
- `Ctrl + S` - Save case

---

## Support & Documentation

- **API Docs:** See `backend/README.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Database Setup:** See `MONGODB_SETUP.md`
- **Development Guide:** See `DEVELOPMENT.md`

---

**Last Updated:** January 2024
**Version:** 3.0 - Advanced Features Complete
