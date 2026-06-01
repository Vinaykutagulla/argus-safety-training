# ARGUS PV CORPORATE TRAINING PROGRAM
## 5-Week Structured Hands-On Training for Safety Analysts

**Program Duration:** 5 weeks (25 business days)  
**Time Commitment:** 2 hours/day + assignments  
**Completion Certificate:** Upon passing final assessment  
**Certification Valid:** 1 year  

---

## 📊 TRAINING PROGRAM OVERVIEW

This is a **PRACTICAL, HANDS-ON** program where students learn by actually working with real cases in the ARGUS system - exactly like a corporate onboarding.

```
WEEK 1: Foundation (Understanding PV)
WEEK 2: System Mastery (Using ARGUS)
WEEK 3: Case Processing (Data Entry Expert)
WEEK 4: Compliance (Regulatory Requirements)
WEEK 5: Mastery (Speed & Accuracy)
```

**Daily Structure:**
- 8:00 AM: Review today's objectives
- 8:30 AM: Learning module (30 min)
- 9:00 AM: Hands-on exercise in ARGUS (60 min)
- 10:00 AM: Supervisor review & feedback (30 min)

---

## ✅ WEEK 1: FOUNDATION - Understanding Pharmacovigilance

### Day 1: PV Basics & Your Role
**Objectives:**
- [ ] Understand what pharmacovigilance is
- [ ] Know your responsibilities
- [ ] Understand case lifecycle
- [ ] Know when to escalate

**Morning Lesson (30 min):**
1. Read: TRAINING_GUIDE.md "What is Pharmacovigilance?"
2. Watch: Overview of safety reporting (5 min internal video)
3. Q&A: Ask supervisor questions

**Hands-On Exercise (60 min):**
1. Log into ARGUS at http://localhost:3000/dashboard
2. Demo Login: `admin@argus.com` / `password123`
3. Navigate to all main sections:
   - Dashboard (see overview)
   - Cases (see existing cases)
   - Reports (see reporting structure)
   - MedDRA (see medical coding tool)
   - Workflow (see pipeline)
4. **Assignment:** Write down what each section does (5 sentences)

**Supervisor Review:**
- Confirm you can navigate system
- Answer: "What are the 6 workflow stages?"
- Answer: "When would you escalate a case?"

**Certificate Requirement:** ✅ Complete

---

### Day 2: Seriousness & Escalation
**Objectives:**
- [ ] Understand what makes a case "serious"
- [ ] Know the seriousness decision rules
- [ ] Recognize escalation triggers
- [ ] Know your authority limitations

**Morning Lesson (30 min):**
1. Read: QUICK_REFERENCE_CARD.md "Seriousness Decision Matrix"
2. Read: TRAINING_GUIDE.md "Regulatory Requirements" section
3. Study the 4 escalation levels

**Hands-On Exercise (60 min):**
1. Open Argus → Dashboard → My Worklist
2. Find case ARG-001 (Metformin - Death case)
3. Click to view case details
4. In the case details, find:
   - [ ] Seriousness reasons (check all that apply)
   - [ ] Date case was received
   - [ ] Adverse event description
   - [ ] Patient outcome
5. **Assignment:** Write: "Why is ARG-001 serious? What's the regulatory deadline?"

**Supervisor Review:**
- Show your answers
- Discuss: "How would you know if a case needs immediate action?"

**Certificate Requirement:** ✅ Complete

---

### Day 3: Regulatory Requirements & Deadlines
**Objectives:**
- [ ] Understand 7-day reporting rule
- [ ] Understand 15-day reporting rule
- [ ] Know which cases get expedited reporting
- [ ] Calculate deadlines correctly

**Morning Lesson (30 min):**
1. Read: TRAINING_GUIDE.md "ICH E2A Requirements" section
2. Study deadline table: 7-day vs 15-day vs Quarterly
3. Understand: "Weekends count!"

**Hands-On Exercise (60 min):**
1. Open Argus → Reports → Expedited
2. See the expedited cases with deadline clocks
3. For each case, identify:
   - [ ] Receipt date (Day 0)
   - [ ] Due date (7 or 15 days later)
   - [ ] Days remaining
   - [ ] Regulatory authority (FDA/EMA/CDSCO)
4. **Assignment:** Create a deadline table:
   ```
   Case | Received | Serious? | Due Date | Days Left | Priority
   ----|----------|----------|----------|-----------|----------
   ```

**Supervisor Review:**
- Check your deadline calculations
- Quiz: "If today is Friday and deadline is Monday, how many hours do you have?"

**Certificate Requirement:** ✅ Complete + 100% deadline accuracy

---

### Day 4: Case Workflow in Detail
**Objectives:**
- [ ] Understand each workflow stage
- [ ] Know who does what at each stage
- [ ] Know stage entry/exit criteria
- [ ] Understand handoff process

**Morning Lesson (30 min):**
1. Read: TRAINING_GUIDE.md "6-Stage Workflow" sections (pages 3-8)
2. Watch: Workflow visualization in ARGUS
3. Understand: Who → What → When at each stage

**Hands-On Exercise (60 min):**
1. Open Argus → Workflow (Pipeline View)
2. See all 6 stages with case counts
3. For each stage, document in your workbook:
   - Stage name
   - What happens here
   - Who does this work
   - Exit criteria (when case moves forward)
   - How long it usually takes
4. **Assignment:** Create workflow checklist

**Supervisor Review:**
- Review your workflow documentation
- Role-play: "A case is stuck in Medical Review - what do you do?"

**Certificate Requirement:** ✅ Complete

---

### Day 5: WEEK 1 PRACTICAL ASSESSMENT

**Morning Review (30 min):**
- Recap all 5 learning objectives
- Review your notes

**Hands-On Assessment (60 min):**
You must complete this WITHOUT help:

**ASSESSMENT EXERCISE:**
1. Log into Argus
2. Go to Cases → Open case ARG-001
3. Without looking at notes, tell supervisor:
   - [ ] Is this case serious? Why?
   - [ ] What regulatory deadline applies?
   - [ ] Who would handle Medical Review stage?
   - [ ] What would you do if deadline is tomorrow?
   - [ ] Where would you find MedDRA coding?

4. Supervisor fills out WEEK 1 ASSESSMENT FORM:
   ```
   Student: ___________
   Date: ___________
   
   Assessment Questions:    PASS / NEEDS WORK
   1. Seriousness identification      □        □
   2. Deadline calculation            □        □
   3. Workflow understanding         □        □
   4. System navigation               □        □
   5. Escalation awareness           □        □
   
   Comments:
   ________________________
   
   Supervisor Signature: _______________
   ```

**Certificate Requirement:** ✅ Pass 4/5 questions minimum

---

## ✅ WEEK 2: SYSTEM MASTERY - Using ARGUS Like a Pro

### Day 6: Creating Your First Case
**Objectives:**
- [ ] Create a new case from scratch
- [ ] Understand required vs optional fields
- [ ] Know data validation rules
- [ ] Handle incomplete information

**Morning Lesson (30 min):**
1. Read: TRAINING_GUIDE.md "INTAKE Stage" section
2. Review: Data Entry Checklist in QUICK_REFERENCE_CARD.md
3. Study: Example case ARG-002 structure

**Hands-On Exercise (60 min):**
1. Open Argus → Dashboard → "+ New Case" button
2. **Create a PRACTICE case with this scenario:**
   ```
   SCENARIO: "Patient Mrs. Johnson took Ibuprofen 200mg yesterday
   for her headache. Today she developed a mild rash on her arms.
   She's 45 years old, female, from California. The pharmacist
   reported it."
   ```

3. Fill in the form:
   - [ ] Product: Ibuprofen 200mg
   - [ ] Receipt date: Today
   - [ ] Reporter: Pharmacist
   - [ ] Country: USA
   - [ ] Patient initials: JJ
   - [ ] Patient age: 45
   - [ ] Is it serious: NO
   - [ ] Event: Rash

4. **Assignment:** Click SAVE and screenshot the created case

**Supervisor Review:**
- Check if case created successfully
- Review: "Did you mark it serious? Why not?"
- Feedback: Any fields you struggled with?

**Certificate Requirement:** ✅ Case created & saved

---

### Day 7: Data Entry Expert Mode
**Objectives:**
- [ ] Complete all sections of a case
- [ ] Use proper medical terminology (MedDRA)
- [ ] Validate data before saving
- [ ] Manage incomplete information

**Morning Lesson (30 min):**
1. Read: TRAINING_GUIDE.md "DATA ENTRY Stage" section
2. Review: MedDRA coding introduction
3. Study: Patient history best practices

**Hands-On Exercise (60 min):**
1. Open Argus → Cases → Your practice case from Day 6
2. Click to EDIT and complete ALL tabs:
   - [ ] **Patient Tab:** Add full patient info (DOB, sex, medical history)
   - [ ] **Products Tab:** Add dosing details (frequency, route, dates)
   - [ ] **Events Tab:** Use MedDRA coding (not patient's words!)
   - [ ] **Analysis Tab:** Select causality assessment
   - **For "Rash" case:** Click MedDRA → Search "rash" → Select proper code
3. Validate each section before saving
4. **Assignment:** Complete full case with all data

**Supervisor Review:**
- Check MedDRA coding accuracy
- Review: "How did you find the correct medical term?"
- Feedback: Data quality assessment

**Certificate Requirement:** ✅ All sections completed + MedDRA coded

---

### Day 8: Medical Terminology (MedDRA) Deep Dive
**Objectives:**
- [ ] Understand MedDRA structure
- [ ] Search for correct medical terms
- [ ] Understand SOC, HLGT, HLT, PT hierarchy
- [ ] Code like a professional

**Morning Lesson (30 min):**
1. Read: TRAINING_GUIDE.md "MedDRA Coding" section
2. Learn: SOC → HLGT → HLT → PT hierarchy
3. Study: Real MedDRA examples

**Hands-On Exercise (60 min):**
1. Open Argus → Navigation → MedDRA Utility
2. Search for these patient descriptions (convert to MedDRA codes):
   - [ ] "Patient had severe headache" → Code it
   - [ ] "Patient felt dizzy and faint" → Code it
   - [ ] "Patient had stomach pain and vomiting" → Code it
   - [ ] "Patient had redness and itching in eyes" → Code it
   - [ ] "Patient developed fever" → Code it

3. For EACH search:
   - Write the patient's words
   - Write the MedDRA preferred term (PT)
   - Write the MedDRA code
   - Explain why this term is correct

4. **Assignment:** Complete MedDRA coding worksheet

**Supervisor Review:**
- Check coding accuracy
- Quiz: "Why do we use MedDRA instead of patient's words?"
- Real-world scenario: Code a new symptom

**Certificate Requirement:** ✅ Code 5/5 terms correctly

---

### Day 9: Case Search & Filtering Skills
**Objectives:**
- [ ] Search for existing cases
- [ ] Use all 7 filters effectively
- [ ] Understand why filtering matters
- [ ] Find what you need quickly

**Morning Lesson (30 min):**
1. Read: TRAINING_GUIDE.md "Case Search & Management"
2. Review: Filter types (Status, Seriousness, Authority, etc.)
3. Understand: Why quick search saves time

**Hands-On Exercise (60 min):**
1. Open Argus → Cases → Use Search/Filters
2. **Search Exercise 1:** Find all SERIOUS cases
   - [ ] Filter: Seriousness = Yes
   - How many found?
   - Which ones need expedited reporting?

3. **Search Exercise 2:** Find all cases due THIS WEEK
   - [ ] Filter: Status = Pending
   - [ ] Filter: Authority = Any
   - How many found?

4. **Search Exercise 3:** Find non-serious cases
   - [ ] Filter: Seriousness = No
   - How many found?
   - Do any need expedited reporting?

5. **Assignment:** Create a "search scenarios" cheat sheet

**Supervisor Review:**
- Time your search speed
- Goal: Find cases in under 30 seconds
- Real scenario: "Find all overdue cases for FDA"

**Certificate Requirement:** ✅ All searches complete in < 1 min

---

### Day 10: WEEK 2 PRACTICAL ASSESSMENT

**Hands-On Assessment (90 min):**
You must complete this scenario WITHOUT help:

**WEEK 2 ASSESSMENT SCENARIO:**
```
SITUATION: "A pharmacist called at 9 AM with an urgent adverse event.
An 65-year-old male patient (initials: RC) took Aspirin and developed
a severe allergic reaction with anaphylaxis. It happened today (date).
The pharmacist is still on the phone waiting for confirmation that
the case was logged. Serious? YES."
```

**YOUR TASK (timed - 60 minutes):**
1. [ ] Create new case in ARGUS
2. [ ] Fill all required fields correctly
3. [ ] Use proper MedDRA coding for "anaphylaxis"
4. [ ] Mark as serious with correct reason
5. [ ] Identify regulatory deadline (7-day? 15-day? Quarterly?)
6. [ ] Save and show supervisor

**Scoring Rubric:**
```
Completed on time (under 60 min):           __ / 10 points
All fields filled correctly:                __ / 15 points
Correct MedDRA term chosen:                 __ / 15 points
Correct seriousness assessment:             __ / 15 points
Correct deadline identified:                __ / 15 points
Professional presentation:                  __ / 15 points
TOTAL:                                      __ / 85 points
```

**Pass Requirement:** 60+ points (70%)

---

## ✅ WEEK 3: CASE PROCESSING - Data Entry Expert

### Day 11-13: Complex Case Processing
**Real cases that become progressively harder:**

**Day 11 - ARG-001 (Serious Death Case):**
- Work through complete case workflow
- Understand escalation triggers
- Learn regulatory obligations

**Day 12 - ARG-002 (Non-serious Case):**
- Complete non-serious pathway
- Understand quarterly reporting
- Learn when NOT to escalate

**Day 13 - ARG-003 (Pregnancy Case):**
- Handle special case type
- Understand congenital outcome
- Learn prospective follow-up

### Day 14-15: Speed & Accuracy Drills
**Process multiple cases in one day:**
- Process 3 cases in 90 minutes
- Accuracy: 95%+
- Learn to work efficiently

---

## ✅ WEEK 4: COMPLIANCE - Regulatory Mastery

### Day 16-20: Deep Regulatory Dive
- Understand ICH E2A in detail
- Learn FDA submission requirements
- Learn EMA/CDSCO requirements
- Practice deadline management
- Learn quality assurance processes

---

## ✅ WEEK 5: MASTERY - Real World Performance

### Day 21-25: Integration & Assessment
- Work with real case scenarios
- Final comprehensive exam
- Receive safety analyst certification
- Graduation exercise

---

## 🎓 STUDENT DAILY CHECKLIST TEMPLATE

**Print this and use EVERY DAY:**

```
═══════════════════════════════════════════════════════════════
ARGUS PV TRAINING - DAILY CHECKLIST
Date: ________     Week: __     Day: __     Student: __________

MORNING (8:00-8:30 AM)
□ Review today's learning objectives
□ Ask supervisor clarifying questions
□ Ensure you have required materials

LEARNING (8:30-9:00 AM)
□ Read assigned training material
□ Take notes on key points
□ Understand the concepts

HANDS-ON PRACTICE (9:00-10:00 AM)
□ Log into ARGUS system
□ Complete assigned exercise
□ Follow checklists provided
□ Troubleshoot issues (ask for help!)

SUPERVISOR REVIEW (10:00-10:30 AM)
□ Present work to supervisor
□ Answer assessment questions
□ Get feedback on performance
□ Understand corrections needed

END OF DAY
□ Save all work
□ Log out of system
□ Summarize what you learned
□ Ask about tomorrow

DAILY SCORE: __ / 10
SUPERVISOR INITIALS: _____
═══════════════════════════════════════════════════════════════
```

---

## 🎯 COMPLETION REQUIREMENTS

To graduate, you must:

### ✅ Week 1-5 Completion
- [ ] Attend all 25 days
- [ ] Complete all exercises
- [ ] Pass daily assessments

### ✅ System Proficiency
- [ ] Create case in < 5 minutes
- [ ] Complete data entry in < 20 minutes
- [ ] Search any case in < 30 seconds
- [ ] Code medical terms accurately

### ✅ Knowledge Assessment
- [ ] Pass Week 1 assessment (4/5)
- [ ] Pass Week 2 assessment (70%)
- [ ] Pass Week 3 final exam (80%)
- [ ] Pass Week 4-5 comprehensive exam (80%)

### ✅ Real-World Performance
- [ ] Process 3 real cases correctly
- [ ] Calculate all deadlines accurately
- [ ] Use MedDRA coding perfectly
- [ ] Demonstrate escalation judgment

---

## 🏆 GRADUATION REQUIREMENTS

### Final Exam (Friday, Week 5):
```
TIME: 3 hours
FORMAT: Hands-on case processing + Written assessment
CASES: 5 realistic scenarios of varying complexity
SCORING: 
  - Case processing accuracy: 40%
  - System efficiency: 20%
  - Regulatory knowledge: 25%
  - Professional judgment: 15%
PASSING SCORE: 80%
```

### Upon Graduation:
- **Certificate of Completion** signed by supervisor
- **Login Credentials** for production cases
- **Mentor Assignment** for ongoing support
- **Role:** Safety Analyst (Ready for real cases!)

---

## 📞 HELP & ESCALATION

**If you get stuck:**
1. Check QUICK_REFERENCE_CARD.md
2. Read relevant TRAINING_GUIDE.md section
3. Ask your supervisor
4. Never: Skip a step, guess at data, or submit incomplete work

**Red Flags (Escalate Immediately):**
- Case marked serious but no deadline showing
- System error creating case
- MedDRA search returns no results
- Unsure about seriousness assessment
- Unsure about regulatory requirement

---

## 💡 PRO TIPS FOR SUCCESS

✅ **Read the regulations once, understand them forever**
✅ **Slow & accurate beats fast & wrong**
✅ **When in doubt, mark serious and escalate**
✅ **MedDRA is not optional - use it every time**
✅ **Weekends COUNT in regulatory clock**
✅ **Your work goes to FDA/EMA - be professional**
✅ **Ask questions - they save lives**

---

**Welcome to Argus! You're now a Pharmacovigilance Professional.** 🎓

*Next: Open STUDENT_WORKBOOK.md for hands-on exercises with step-by-step instructions.*
