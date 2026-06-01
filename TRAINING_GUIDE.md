# ARGUS Safety Training Program
## Pharmacovigilance Case Processing Workflow
### Corporate Training Guide | Release 8.4

---

## 📋 Table of Contents
1. [Introduction](#introduction)
2. [Case Lifecycle Overview](#case-lifecycle-overview)
3. [Step-by-Step Workflow](#step-by-step-workflow)
4. [Regulatory Requirements](#regulatory-requirements)
5. [System Navigation](#system-navigation)
6. [Key Responsibilities](#key-responsibilities)
7. [Quick Reference](#quick-reference)

---

## 🎯 Introduction

Welcome to the ARGUS Safety Training Program. This guide teaches you how to manage adverse event cases in a professional pharmacovigilance environment. You will learn to:

- **Receive and evaluate** safety reports from healthcare professionals and patients
- **Process cases** through a structured quality workflow
- **Apply regulatory timelines** (7-day and 15-day expedited rules)
- **Generate compliance reports** for authorities like FDA, EMA, and CDSCO
- **Maintain data integrity** throughout the case lifecycle

**Training Duration:** 4-6 hours  
**Skill Level:** Beginner to Intermediate  
**Prerequisite:** Basic knowledge of pharmaceuticals and safety reporting

---

## 📊 Case Lifecycle Overview

```
CASE RECEIVED
    ↓
1️⃣  INTAKE (Assessment)
    ↓
2️⃣  TRIAGE (Route Assignment)
    ↓
3️⃣  DATA ENTRY (Information Capture)
    ↓
4️⃣  MEDICAL REVIEW (Medical Assessment)
    ↓
5️⃣  QUALITY CHECK (Compliance Verification)
    ↓
6️⃣  LOCKED (Final Submission)
    ↓
📤 SUBMIT TO AUTHORITIES
    ↓
✅ CLOSED
```

**Total Processing Time:** 5-15 business days (depending on seriousness and regulatory requirements)

---

## 📖 Step-by-Step Workflow

### STAGE 1️⃣: INTAKE (📥 Newly Received Cases)

**Purpose:** Initial assessment of incoming safety reports

**What You Receive:**
- Adverse event report from physician, pharmacist, nurse, or patient
- May come via phone, email, paper form, or clinical trial database
- Can be a single adverse event or multiple related events

**Your Tasks:**
1. **Log the Case**
   - Open Argus Safety dashboard
   - Click **"+ New Case"** button
   - Enter case number (auto-generated as ARG-XXXX)
   - Enter **Receipt Date** (date we received the report)

2. **Gather Initial Information**
   - Product name and strength (e.g., "Metformin 500mg")
   - Reporter type: Physician / Pharmacist / Patient / Other
   - Country where event occurred
   - Is it serious? (Y/N)

3. **Classify Report Type**
   - **Spontaneous** - Unsolicited report from healthcare professional or patient
   - **Study** - From clinical trial or research study
   - **Literature** - Published medical literature
   - **Solicited** - From safety call or promotional event

4. **Assess Seriousness** (Click all that apply)
   - ☐ Death
   - ☐ Life-threatening
   - ☐ Hospitalization
   - ☐ Disability/Permanent Damage
   - ☐ Congenital Abnormality
   - ☐ Other Serious Outcome

**Decision Point:** Is this serious? → Goes to **TRIAGE**

**⏱️ Timeline:** Same business day  
**Status:** → **Move to TRIAGE**

---

### STAGE 2️⃣: TRIAGE (🔍 Route Assignment)

**Purpose:** Determine case handling pathway based on seriousness and regulatory requirements

**Regulatory Classification:**
```
SERIOUS CASES (Expedited Reporting Required)
├── FATAL or LIFE-THREATENING (7-day rule)
│   └── Report to authorities within 7 calendar days
└── ALL OTHER SERIOUS (15-day rule)
    └── Report to authorities within 15 calendar days

NON-SERIOUS CASES
└── Periodical Summary Report (PSU/PBRER) - Aggregate reporting
```

**Your Tasks:**
1. **Review Case Seriousness** from Intake information
2. **Determine Reporting Category:**
   - **7-Day (Expedited)** if Death or Life-threatening
   - **15-Day (Expedited)** if Other serious outcome
   - **Periodic Summary** if Non-serious

3. **Set Regulatory Clock Start Date**
   - Day 0 = Receipt date
   - This date triggers countdown for reporting deadlines

4. **Assign to Appropriate Team**
   - Serious cases → Expedited pathway
   - Non-serious cases → Periodic summary pathway

5. **Add Initial Medical Comment**
   - Brief assessment of potential product association
   - Any obvious medication errors or misuse?

**Decision Point:** Level of detail needed? → Assign to **DATA ENTRY** team

**⏱️ Timeline:** Within 1-2 hours  
**Status:** → **Move to DATA ENTRY**

---

### STAGE 3️⃣: DATA ENTRY (📝 Information Capture)

**Purpose:** Comprehensive case documentation with all required information

**Required Information Sections:**

#### A. PATIENT INFORMATION
- **Demographics:** Age, Sex, Weight
- **Medical History:** Relevant conditions, allergies, concomitant medications
- **Pregnancy Status:** If applicable
- **Renal/Hepatic Function:** If relevant to product safety

#### B. PRODUCT INFORMATION
- **Name & Dose:** Exact product and strength administered
- **Indication:** What was the patient being treated for?
- **Route of Administration:** Oral, IV, IM, Patch, etc.
- **Dosing Schedule:** How often was it given?
- **Start & Stop Dates:** When did patient take the product?
- **Batch/Lot Number:** For traceability

#### C. ADVERSE EVENT DETAILS
- **Event Name (MedDRA Term):** Medical Dictionary for Regulatory Activities
  - Example: "Nausea" not "stomach upset"
  - Use the MedDRA Coding utility in system
- **Onset Date:** When did adverse event start?
- **Severity:** Mild / Moderate / Severe
- **Causality Assessment:** Is it related to our product?
  - Probable/Likely
  - Possible
  - Unlikely
  - Unrelated
- **Outcome:** Recovered / Recovering / Permanent / Fatal / Unknown

#### D. CONCOMITANT MEDICATIONS
- Other drugs patient was taking (may interact)
- Can contribute to adverse event

#### E. LAB RESULTS (if applicable)
- Clinical lab values
- ECG findings
- Vital signs at time of event

**How to Use MedDRA Coding Utility:**
1. Click **"💊 MedDRA"** in navigation
2. Search for symptom (e.g., "nausea", "dizziness", "rash")
3. Select appropriate **Preferred Term** (standardized medical term)
4. System links to regulatory classification

**Your Tasks:**
1. Go to case you created in Intake
2. Click **"Edit Case"** or **"Continue"**
3. Fill in **PATIENT** tab with demographics
4. Fill in **PRODUCTS** tab with product details
5. Fill in **EVENTS / REACTIONS** tab with adverse event
   - Use **MedDRA Coding** for correct medical terminology
6. Fill in **ANALYSIS** tab with causality assessment
7. Click **"Save"** to progress

**⚠️ Critical Points:**
- Use **exact medical terminology** (not patient's words)
- Capture **all relevant information** - don't assume
- If information is missing, note as "Unknown" or "Not reported"
- Never assume - always verify from source document

**Decision Point:** Is all required info captured? → Ready for **MEDICAL REVIEW**

**⏱️ Timeline:** 2-4 hours for complete data entry  
**Status:** → **Move to MEDICAL REVIEW**

---

### STAGE 4️⃣: MEDICAL REVIEW (👨‍⚕️ Medical Assessment)

**Purpose:** Medical professional evaluates case for regulatory submission quality

**Reviewed By:** Physician or Safety Scientist (Medical degree required)

**Medical Review Checklist:**
- ✓ Is causality assessment reasonable?
- ✓ Are adverse event terms correctly coded (MedDRA)?
- ✓ Is outcome information complete and reasonable?
- ✓ Are any additional investigations recommended?
- ✓ Does case meet serious adverse event criteria?
- ✓ Does case require expedited reporting?

**What Happens:**
1. **Medical professional accesses case** in Argus
2. **Reviews all data** entered in previous stage
3. **Assess causality** with medical judgment:
   - Product-related or other causes?
   - Is temporal relationship reasonable?
   - Any confounding factors?
4. **May request additional information:**
   - Contact reporter for missing details
   - Request lab reports or hospital records
   - Verify product batch/lot authenticity
5. **Approves or returns for revision**
   - If issues found → Sends back to Data Entry
   - If acceptable → Approves for QC

**Your Role (as analyst):**
- Wait for medical professional feedback
- If case returned: Make requested corrections
- Resubmit for medical review
- If approved: Move to next stage

**Decision Point:** Medical approval received? → Ready for **QUALITY CHECK**

**⏱️ Timeline:** 2-4 hours for medical review  
**Status:** → **Move to QUALITY CHECK**

---

### STAGE 5️⃣: QUALITY CHECK (✓ Compliance Verification)

**Purpose:** Final regulatory and completeness check before submission

**Reviewed By:** QC Specialist or Regulatory Affairs

**QC Checklist:**
- ✓ All required fields completed
- ✓ MedDRA coding is correct
- ✓ Dates are logical (no future dates, consistent timeline)
- ✓ Regulatory clock timing met (7-day or 15-day)
- ✓ Causality assessment documented
- ✓ Case meets criteria for submission type
- ✓ No duplicate with existing cases
- ✓ Report quality meets regulatory standards

**Regulatory Deadline Check:**
```
Example: Case received January 15
├─ If Death/Life-threatening → Due by January 22 (7 days)
└─ If Other Serious → Due by January 30 (15 days)
```

**What Happens:**
1. QC specialist reviews complete case
2. Checks against **ICH E2A guidelines** (international standard)
3. Verifies **expedited timeline compliance**
4. Approves or returns with corrections
5. If approved → Case ready for **SUBMISSION**

**Common QC Issues Found:**
- Missing patient age or demographics
- Unclear temporal relationship
- Missing diagnosis information
- Incorrect MedDRA coding
- Incomplete causality assessment

**Decision Point:** Case passes all QC checks? → Ready for **SUBMISSION**

**⏱️ Timeline:** 1-2 hours  
**Status:** → **Move to LOCKED** (Ready for Submission)

---

### STAGE 6️⃣: LOCKED (🔒 Final Submission)

**Purpose:** Case is locked and submitted to regulatory authorities

**What Happens:**
1. Case is marked as **LOCKED** (cannot be edited)
2. Case is formatted for regulatory submission:
   - FDA E2B(R3) format (Electronic submission)
   - EudraVigilance format for EU
   - National formats for other authorities
3. **Report is generated** and submitted to authorities:
   - FDA (USA) - MedWatch
   - EMA (Europe) - EudraVigilance
   - CDSCO (India)
   - PMDA (Japan)
   - TGA (Australia)
   - Others based on product registration

4. **Confirmation of receipt** obtained from authorities
5. Case moves to **CLOSED** status

**Follow-up Reporting:**
- If patient provides **Follow-up information** later:
  - Case is **REOPENED**
  - Additional info added as "Follow-up Report"
  - Goes back through Medical Review → QC → Submission

---

## 🏛️ Regulatory Requirements

### ICH E2A Guideline (International Standard)

**Definition of Serious Adverse Event:**
- Requires hospitalization
- Results in disability
- Is life-threatening
- Results in death
- Is congenital abnormality
- Other medically important conditions

### Expedited Reporting Timelines

#### 7-Day Rule (CRITICAL)
**Applies to:** Fatal or Life-threatening reactions that are **UNLISTED** (not in product information)

**Clock:** 7 calendar days from receipt
- Weekend/Holidays: Clock does NOT stop
- Includes weekends and holidays
- Counting starts on Day 0 (receipt date)

**Example:** Received Jan 15 → Due Jan 22

#### 15-Day Rule (SERIOUS)
**Applies to:** All other serious unexpected reactions

**Clock:** 15 calendar days from receipt
- Same as 7-day rule regarding weekends/holidays

**Example:** Received Jan 15 → Due Jan 30

### Periodic Summary Report (PSU)
**Applies to:** Non-serious adverse events

**Submission:** Quarterly or Annual (depending on regulatory requirement)

---

## 💻 System Navigation

### Accessing Cases

**1. Dashboard View**
- Shows all active cases
- Personal worklist filtered by your assignments
- Quick link: **"Search Cases"**

**2. Creating a New Case**
- Click **"+ New Case"** button (top right)
- Complete form with initial information
- Auto-saves as you enter data

**3. Finding Existing Case**
- Click **"Cases"** in main navigation
- Use search filters:
  - Case ID: ARG-XXXX
  - Product name
  - Reporter name
  - Date range
  - Workflow stage
  - Seriousness level

**4. Workflow Dashboard**
- Click **"Workflow"** to see all cases by stage
- Visualize bottlenecks
- See cases needing action

**5. Reports**
- Click **"Reports"** → **"Expedited"**
- See all cases with deadline clock
- Track compliance with 7-day / 15-day rules
- Get alerts for overdue cases

**6. MedDRA Coding**
- Click **"MedDRA"** to search medical terms
- Essential for data entry stage
- Ensures regulatory compliance

### Case Status Indicators

```
🟢 GREEN = On Track (plenty of time)
🟡 YELLOW = Due Soon (< 2 days)
🔴 RED = Overdue (CRITICAL PRIORITY)
```

---

## 👥 Key Responsibilities by Role

### Intake Analyst (Your Role Initially)
- ✓ Receive new safety reports
- ✓ Create cases in system
- ✓ Log initial information
- ✓ Classify seriousness level
- ✓ Route to appropriate team

### Data Entry Specialist
- ✓ Complete comprehensive case documentation
- ✓ Use MedDRA coding for medical terms
- ✓ Gather missing information from reporters
- ✓ Perform preliminary causality assessment
- ✓ Save and move case forward

### Medical Reviewer (PharmD / MD)
- ✓ Evaluate medical appropriateness
- ✓ Verify causality assessment
- ✓ Assess product safety implications
- ✓ Request additional investigations if needed
- ✓ Approve cases for submission

### QC Specialist
- ✓ Verify completeness
- ✓ Check regulatory compliance
- ✓ Validate medical coding
- ✓ Verify deadline compliance
- ✓ Approve for final submission

### Regulatory Affairs
- ✓ Format cases for authority submission
- ✓ Submit to FDA, EMA, CDSCO, etc.
- ✓ Track submission confirmations
- ✓ Manage follow-up reporting
- ✓ Maintain regulatory records

---

## 🚀 Quick Reference

### Case Seriousness Decision Tree

```
Is the adverse event serious?
│
├─ YES
│  ├─ Is it fatal or life-threatening?
│  │  ├─ YES → 7-Day Expedited Reporting
│  │  └─ NO → 15-Day Expedited Reporting
│  └─ → Move to Triage Stage
│
└─ NO
   └─ Periodic Summary Report (Quarterly/Annual)
      → Move to Data Entry (Non-expedited)
```

### Regulatory Timeline Quick Check

| Seriousness | Type | Deadline | Status |
|---|---|---|---|
| Fatal/Life-threatening | Unlisted | 7 days | EXPEDITED |
| Other Serious | Unexpected | 15 days | EXPEDITED |
| Non-Serious | Any | Quarterly | PERIODIC |
| Duplicate | Known case | None | NOT REPORTED |

### Common Abbreviations

- **PV** = Pharmacovigilance (safety monitoring)
- **AE** = Adverse Event
- **SAE** = Serious Adverse Event
- **CDSCO** = Central Drugs Standard Control Organisation (India)
- **FDA** = Food and Drug Administration (USA)
- **EMA** = European Medicines Agency
- **PMDA** = Pharmaceuticals and Medical Devices Agency (Japan)
- **TGA** = Therapeutic Goods Administration (Australia)
- **ICH** = International Council for Harmonisation
- **MedDRA** = Medical Dictionary for Regulatory Activities
- **PSU** = Periodic Safety Update (periodic report)
- **PBRER** = Periodic Benefit-Risk Evaluation Report

### System Shortcuts

- **New Case:** `+ New Case` button (top right)
- **Search Cases:** Click "Cases" → Use filters
- **View Workflow:** Click "Workflow" → See pipeline
- **Check Deadlines:** Click "Reports" → "Expedited"
- **Code Terms:** Click "MedDRA" → Search
- **Admin Access:** Click Admin dropdown → "User Management"

---

## 📚 Training Exercises

### Exercise 1: Create Your First Case (30 min)
1. Log in to Argus (admin@argus.com / password123)
2. Click "+ New Case"
3. Enter a patient case:
   - Product: Ibuprofen 400mg
   - Event: Severe nausea and vomiting
   - Severity: SERIOUS (hospitalized)
   - Reporter: Physician
4. Save and move to Data Entry

### Exercise 2: Complete Data Entry (45 min)
1. Open the case you created
2. Fill in Patient tab:
   - Age: 45, Female
   - Medical history: Hypertension
3. Fill in Products tab:
   - Dose: 400mg twice daily
   - Duration: 5 days
4. Fill in Events tab:
   - Use MedDRA to code "nausea" and "vomiting"
   - Onset: Day 3 of therapy
   - Outcome: Recovered after stopping product
5. Fill in Analysis tab:
   - Causality: Probable (temporal relationship clear)
6. Save case

### Exercise 3: Understand Regulatory Timeline (20 min)
- Scenario: Case received on January 10, marked as SERIOUS (other than fatal/life-threatening)
- Question: What is the reporting deadline?
- Answer: January 25 (15 days including weekends)
- How to check: Go to "Reports" → "Expedited" → See countdown timer

---

## ✅ Training Completion Checklist

By end of training, you should be able to:

- [ ] Understand pharmacovigilance workflow stages
- [ ] Identify serious vs. non-serious adverse events
- [ ] Know 7-day and 15-day expedited reporting rules
- [ ] Create a new case in Argus system
- [ ] Complete all data entry sections
- [ ] Use MedDRA coding utility
- [ ] Assess causality appropriately
- [ ] Navigate dashboard and workflow views
- [ ] Understand regulatory requirements
- [ ] Know your role and responsibilities
- [ ] Handle a complete case from intake to QC

---

## 📞 Support & Questions

**Still confused about:**
- **Case Creation?** → Review "Step-by-Step Workflow" section
- **Medical Coding?** → Use MedDRA Coding utility with help text
- **Deadlines?** → Check "Regulatory Timeline Quick Check" table
- **Your Role?** → See "Key Responsibilities by Role" section

**Practice Cases Available:**
- ARG-001: Metformin case (Serious, expedited)
- ARG-002: Aspirin case (Non-serious, periodic)
- ARG-003: Ibuprofen case (Serious, expedited)

---

**Training Guide Version:** 8.4  
**Last Updated:** June 1, 2026  
**© 2026 Oracle Corporation. All Rights Reserved.**

---
