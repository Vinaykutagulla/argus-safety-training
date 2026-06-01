# SETUP 10 STUDENTS FOR TRAINING
## Add Bulk Student Accounts + Training Environment

---

## 🎯 OVERVIEW

You have **10 new hires**. Here's what you'll do:

1. **Create 10 student accounts** in ARGUS
2. **Use practice/simulated cases** for training (NOT real patient data)
3. **Keep training data separate** from production
4. **Each student logs in** and completes 5-week training
5. **After certification**, they access real cases

---

## 📋 STEP 1: Create 10 Student Accounts

### Option A: Quick Manual Setup (10 minutes)

**In ARGUS Dashboard:**
1. Go to Admin → User Management
2. Click "+ Add User" for each student

**Use these credentials:**

```
Student 1:
Email: student1@argus.com
Password: Training123
Role: analyst
Name: Student One

Student 2:
Email: student2@argus.com
Password: Training123
Role: analyst
Name: Student Two

[Continue for students 3-10]
```

**Full List of 10 Accounts:**
```
1. student1@argus.com / Training123
2. student2@argus.com / Training123
3. student3@argus.com / Training123
4. student4@argus.com / Training123
5. student5@argus.com / Training123
6. student6@argus.com / Training123
7. student7@argus.com / Training123
8. student8@argus.com / Training123
9. student9@argus.com / Training123
10. student10@argus.com / Training123
```

---

## 📝 Student Tracking Sheet

**Print this and keep at your desk:**

```
═══════════════════════════════════════════════════════════════
STUDENT TRAINING TRACKER - COHORT 1
Training Period: June 1 - July 1, 2026

STUDENT | EMAIL | LOGIN | WEEK 1 | WEEK 2 | WEEK 3 | WEEK 4 | WEEK 5 | CERT
--------|-------|-------|--------|--------|--------|--------|--------|------
1       | stud1 |  ✓    |        |        |        |        |        |
2       | stud2 |  ✓    |        |        |        |        |        |
3       | stud3 |  ✓    |        |        |        |        |        |
4       | stud4 |  ✓    |        |        |        |        |        |
5       | stud5 |  ✓    |        |        |        |        |        |
6       | stud6 |  ✓    |        |        |        |        |        |
7       | stud7 |  ✓    |        |        |        |        |        |
8       | stud8 |  ✓    |        |        |        |        |        |
9       | stud9 |  ✓    |        |        |        |        |        |
10      | stud10|  ✓    |        |        |        |        |        |

Legend:
✓ = Passed that week
✗ = Needs retrain
CERT = Final certification date

═══════════════════════════════════════════════════════════════
```

---

## 🎯 STEP 2: Practice Cases (Training Data - NOT Real Patient Data)

**You already have 3 practice cases ready:**

### **ARG-001: Practice Case - Serious (7-day deadline)**
```
Patient: RK, 58 years old
Product: Metformin 500mg
Event: DEATH (cardiac)
Seriousness: YES - SERIOUS
Deadline: 7-day expedited
Status: For learning
Purpose: Teach serious cases & urgent deadlines
```

### **ARG-002: Practice Case - Non-serious (Quarterly)**
```
Patient: JD, 51 years old
Product: Aspirin 75mg
Event: Rash (mild)
Seriousness: NO - Non-serious
Deadline: Quarterly (no rush)
Status: For learning
Purpose: Teach non-serious pathway
```

### **ARG-003: Practice Case - Special (Pregnancy)**
```
Patient: SM, 33 years old (pregnant)
Product: Ibuprofen 200mg
Event: Potential birth defect
Seriousness: YES - Special case
Deadline: 7-day (congenital)
Status: For learning
Purpose: Teach special case handling
```

**All 3 are PRACTICE cases - completely SIMULATED with fake patient data**

---

## 🔐 STEP 3: Separate Training Environment

### How It Works:

**Training Mode (Cases ARG-001, 002, 003):**
```
✓ Students create practice versions
✓ Students modify and edit freely
✓ No real patient data
✓ Can delete without consequence
✓ Used for 5-week training
```

**Production Mode (After Certification):**
```
✓ Real patient adverse events
✓ Real pharmaceutical products
✓ Real regulatory deadlines
✓ Cannot delete (audit trail required)
✓ Only certified analysts access
```

**Key Separation:**
- Students practice on: ARG-001, ARG-002, ARG-003 (practice data)
- Production cases: ARG-004+, real cases (after they're certified)

---

## 📅 TRAINING SCHEDULE FOR 10 STUDENTS

### Option 1: All 10 Together (Cohort Training)
```
WEEK 1-5 (Same group training):
Monday-Friday, 8:00 AM - 10:30 AM

Group of 10 sits with you
All follow CORPORATE_TRAINING_PROGRAM.md
Each gets their own workbook
All certified at end of Week 5

PROS:
- Efficient (you teach once to all)
- Peer learning
- Cost effective
- Quick turnaround

CONS:
- Takes your full time
- Some may be slower/faster than others
- Need 10 computers
```

### Option 2: Two Groups of 5 (Split Cohorts)
```
GROUP A: Monday-Friday, 8:00-10:30 AM (5 students)
GROUP B: Monday-Friday, 11:00 AM-1:30 PM (5 students)

PROS:
- Smaller groups = more attention
- You teach same lesson twice/day
- Better pace matching

CONS:
- You teach double the hours
- Requires 2 rooms or time slots
```

### Option 3: Staggered (Individual Path)
```
Student 1: Week 1
Student 2: Week 1 (following student 1)
Student 3: Week 1 (following student 2)

PROS:
- Individualized pace
- Work around schedules

CONS:
- Takes very long
- You're training continuously
- No peer support
```

**RECOMMENDATION: Option 1 (Cohort Training) - All 10 together**
- Most efficient
- 5 weeks, they're all certified
- Done by end of June

---

## 💻 WHAT STUDENTS WILL DO ON THEIR COMPUTERS

### **Week 1: Explore the System**
```
Each student logs in to ARGUS:
Email: studentX@argus.com (their assigned email)
Password: Training123

They see:
- Dashboard (their personal view)
- Cases (search cases - they see ARG-001, 002, 003)
- Reports (see practice cases with deadlines)
- MedDRA (search medical terms)
- Workflow (see pipeline)
- Admin (view only, don't edit)
```

### **Week 2: Create Practice Cases**
```
They use the practice data to:
- Create NEW cases based on scenarios
- Complete data entry
- Code medical terms
- Save and submit

Example scenario:
"A 52-year-old patient took Ibuprofen,
developed rash on day 2.
Create case, code the rash, assess deadline"

They create it, you review it, they get feedback
```

### **Week 3: Process Real Practice Cases**
```
They work with the 3 practice cases:
- ARG-001 (serious)
- ARG-002 (non-serious)
- ARG-003 (pregnancy)

They:
- View complete information
- Analyze seriousness
- Calculate deadlines
- Make decisions
- Get assessed
```

### **Week 4-5: Speed & Accuracy**
```
They do timed drills:
- 3 cases in 90 minutes
- 95%+ accuracy required
- No help from you

If they pass: CERTIFIED ✓
If they fail: More training
```

---

## 🎓 TIMELINE FOR 10 STUDENTS

### **June 1-5: WEEK 1 (Foundation)**
```
Monday-Friday, 8-10:30 AM
All 10 students together

Learning:
- What is pharmacovigilance
- System navigation
- Seriousness assessment
- Deadline rules
- Workflow stages

Friday Assessment:
- Pass/Fail based on comprehension
- All 10 assessed same day
```

### **June 8-12: WEEK 2 (System Mastery)**
```
Monday-Friday, 8-10:30 AM
All 10 students together

Learning:
- Create cases
- Enter data
- Code medical terms
- Search cases

Friday Assessment:
- Create 3 test cases
- Must achieve 70%+ accuracy
- All 10 pass or retrain
```

### **June 15-19: WEEK 3 (Case Processing)**
```
All 10 students together
Process practice cases
Speed drills
Accuracy focus
```

### **June 22-26: WEEK 4 (Compliance)**
```
All 10 students together
Regulatory requirements
Deadline management
Quality assurance
```

### **June 29 - July 3: WEEK 5 (Mastery & Certification)**
```
All 10 students together

Day 1-4: Speed & accuracy drills
Day 5: FINAL COMPREHENSIVE EXAM

RESULTS:
- All 10 PASS: Certified Safety Analysts ✓
- Some FAIL: Extended training
```

### **July 4+: Production Ready**
```
Certified students get:
1. Production system login
2. Real case access
3. Mentor assignment
4. Ready to work!
```

---

## 🔄 WEEKLY GROUP TRAINING SCHEDULE

### **Each Day (8:00 AM - 10:30 AM):**

**All 10 students in one room:**

**8:00-8:30 AM - You Teach (All 10 listen)**
```
You explain today's topic:
"Today we learn about seriousness assessment"

You show:
- Example case on screen
- Why it's serious or not
- Where in ARGUS to find it

All 10 listen and take notes
```

**8:30-9:00 AM - Students Study**
```
They each read assigned section:
"TRAINING_GUIDE.md - Seriousness Assessment"

You walk around:
- Answer questions
- Keep them focused
- Note who's struggling
```

**9:00-10:00 AM - Hands-On Practice**
```
They each sit at their computer

Scenario:
"Open case ARG-001, why is it serious?"

They:
1. Log in
2. Find ARG-001
3. Answer the question
4. Fill out workbook exercise
5. Show you when done

You:
- Walk between computers
- Answer questions
- Check their progress
- Help anyone stuck
```

**10:00-10:30 AM - Group Review**
```
Everyone comes together

You ask:
"Why is ARG-001 serious?"

Students answer (hands up)
You correct any misunderstandings
You sign off their workbooks
```

---

## 📊 SPACE & COMPUTER REQUIREMENTS

### **For Training 10 Students:**

**Space:**
```
✓ Training room with:
  - 10 computers (or 5 computers they rotate)
  - 10 desks/tables
  - 1 projector (you show examples)
  - 1 whiteboard (for notes)
  - Your desk (at front)
```

**Computers:**
```
✓ Each computer needs:
  - Access to ARGUS (localhost:3000)
  - Chrome or Firefox browser
  - Their student login
  - Stable internet connection
  - No other distractions open
```

**Materials (10 sets):**
```
✓ For each student:
  - STUDENT_WORKBOOK.md (printed, 75 pages)
  - QUICK_REFERENCE_CARD.md (printed, 5 pages)
  - Pen/pencil
  - Folder for their work
  - Your contact info
```

---

## 👥 Group Dynamics Tips

### **Day 1: Introduction**
```
"Welcome to the team! You're now part of our
pharmacovigilance safety team. Over the next 5 weeks,
you'll learn to process cases that go to FDA/EMA/CDSCO.

Let me introduce the 10 people you'll be training with:
[Go around, each introduces themselves]

You'll learn together, help each other, and graduate together.
By July 1st, you'll all be certified Safety Analysts."
```

### **Managing Different Speeds:**
```
Fast learners: Give advanced exercises
Slow learners: Extra practice sessions (after hours)
Struggling: 1-on-1 help during lunch

KEY: Nobody falls behind. Assess weekly.
If someone struggles, reteach before moving forward.
```

### **Group Accountability:**
```
"You're not competing. You're a team.
If someone needs help, help them.
When someone passes assessment, celebrate it.
When someone struggles, we all help."
```

### **Peer Teaching:**
```
Advanced students help others:
"Can you show this student how to code MedDRA?"
"Help this person find their case in the system"

This helps both:
- Student asking learns
- Student teaching reinforces their own learning
```

---

## ✅ WEEK 1 - DETAILED AGENDA FOR ALL 10 STUDENTS

### **MONDAY (Day 1)**

**8:00-8:30 AM - Welcome & System Overview**
```
You:
- Welcome all 10
- Explain 5-week program
- Show what they'll learn
- Show ARGUS system on projector (5 min)
- Explain: "Week 1 = Foundation, understand PV"

Students:
- Listen
- Take notes
- Ask questions
```

**8:30-9:00 AM - Read Training Material**
```
Students read: TRAINING_GUIDE.md "What is Pharmacovigilance"
(About 5 minutes reading)

You:
- Walk around
- Answer questions
- Help anyone confused
```

**9:00-10:00 AM - Hands-On: System Navigation**
```
Each student at their own computer

You demo on projector:
- "This is how you log in"
- "Here's the Dashboard"
- "Here's where you find cases"
- etc.

Students:
- Follow along on their computer
- Navigate to: Dashboard, Cases, Reports, MedDRA, Workflow
- Fill out EXERCISE 1.1 in workbook

You:
- Walk between desks
- Help anyone having trouble
- Answer questions
```

**10:00-10:30 AM - Group Review**
```
All 10 come together

You ask:
"Show me how you get to the Cases section"
"Click on Reports and tell me what you see"

You check workbooks:
- Everyone filled in Exercise 1.1
- Sign off their work ✓

Send off:
"Great first day! See you tomorrow!"
```

### **TUESDAY-THURSDAY: Same Structure**
```
Day 2: Seriousness Assessment
Day 3: Deadline Calculations
Day 4: Workflow Stages
```

### **FRIDAY: Week 1 Assessment**

**8:00-10:00 AM - Individual Assessments**
```
Each student gets a NEW case scenario (different from training):

Scenario:
"A 35-year-old female took Aspirin, developed severe
allergic reaction within 1 hour. This was reported today
by the hospital. Is this serious? What's the deadline?"

WITHOUT their notes:
They must:
1. Say if it's serious
2. Identify the deadline rule
3. Calculate the due date
4. Name who should review it

SCORING:
- Correct seriousness: 25 points
- Correct deadline rule: 25 points
- Correct due date: 25 points
- Correct next person: 25 points

PASS: 80+ points (at least 3/4 correct)
FAIL: Below 80 (needs retrain)
```

**10:00-10:30 AM - Results**
```
You announce:
"I'll tell you your scores"

For those who PASSED:
"Great! You're ready for Week 2"

For those who FAILED (if any):
"Don't worry, we'll review and retest tomorrow.
See me for 30 minutes extra training"
```

---

## 🎓 CERTIFICATION - WEEK 5 FINAL

### **Friday of Week 5 - Graduation Day**

**8:00-11:00 AM - Comprehensive Final Exam**

All 10 students take comprehensive exam together:
```
3-hour test
5 complex case scenarios
100 points total
Pass: 80+ points

Test scenarios:
1. Serious cardiac case (7-day deadline)
2. Non-serious rash case (quarterly)
3. Pregnancy case (special handling)
4. Complex multi-drug case
5. High-priority case with missing data
```

**11:00-12:00 PM - Results & Celebration**

```
You grade while they wait

PASS (80+): 
"Congratulations! You're CERTIFIED!"
You sign their certificate
Give them production login
Shake hands for each

FAIL:
"You were close. Let's do retrain and retest tomorrow"
Schedule makeup exam for next day

CELEBRATION:
Coffee/cake for all who passed
Team photo
Announce their new titles: "Safety Analysts"
```

---

## 📋 WHAT YOU TELL STUDENTS ON DAY 1

**Opening Speech:**
```
"Welcome to the Argus Pharmacovigilance Training Program!

Here's what happens over the next 5 weeks:

WEEK 1: You'll learn WHAT pharmacovigilance is
WEEK 2: You'll learn HOW to use the ARGUS system
WEEK 3: You'll learn to PROCESS cases efficiently
WEEK 4: You'll learn REGULATORY requirements
WEEK 5: You'll get CERTIFIED

You'll practice on training cases - not real patient data.
These practice cases help you learn safely.

By July 1st, you'll be certified Safety Analysts.
Then you'll work on REAL cases for FDA/EMA/CDSCO.

This is REAL responsibility. Patient safety depends on you.

Any questions?"
```

---

## 🚀 YOUR PREPARATION CHECKLIST (Before June 1)

### **Computer Setup:**
- [ ] 10 computers ready
- [ ] All can access http://localhost:3000/dashboard
- [ ] Student accounts created (stud1-stud10@argus.com)
- [ ] Test each login works
- [ ] Projector works for demos

### **Materials:**
- [ ] Print STUDENT_WORKBOOK.md × 10 (75 pages each)
- [ ] Print QUICK_REFERENCE_CARD.md × 15 (extra copies)
- [ ] Get binders/folders × 10
- [ ] Pens/pencils ready
- [ ] Whiteboard + markers
- [ ] Timer (for timed drills)

### **Your Prep:**
- [ ] Read TRAINER_GUIDE.md (understand approach)
- [ ] Read CORPORATE_TRAINING_PROGRAM.md (know the curriculum)
- [ ] Practice the exercises yourself
- [ ] Create all student accounts
- [ ] Test system thoroughly
- [ ] Prepare Week 1 lesson on projector

### **Logistics:**
- [ ] Room reserved for 5 weeks
- [ ] Time 8:00-10:30 AM confirmed
- [ ] All 10 students confirmed attendance
- [ ] Backup computer if one fails
- [ ] Your desk set up at front of room

---

## 💡 PRO TIPS

**Make it Real:**
- Show actual FDA warning letters
- Discuss real drug recalls
- Emphasize: "Your work = patient safety"

**Keep Energy:**
- Day 1-2: Excitement (new system!)
- Day 3-5: Focus hard (first assessment)
- Week 2: More confident
- Week 3: Getting fast
- Week 4: Understanding regulations
- Week 5: Mastery and pride

**Manage Differences:**
- Some will be naturally faster
- Some will struggle more
- Don't let fast ones get bored
- Don't let slow ones feel pressured
- Everyone gets to certified level

**Group Cohesion:**
- They'll support each other
- Peers teaching peers helps everyone
- By end of 5 weeks, they're a team
- Ready to work together

---

## 📞 STUDENT ACCOUNTS TO PRINT & POST

**Print this and tape to your desk:**

```
ARGUS TRAINING STUDENT LOGINS
Cohort 1 - June 1 to July 1, 2026

STUDENT 1: student1@argus.com / Training123
STUDENT 2: student2@argus.com / Training123
STUDENT 3: student3@argus.com / Training123
STUDENT 4: student4@argus.com / Training123
STUDENT 5: student5@argus.com / Training123
STUDENT 6: student6@argus.com / Training123
STUDENT 7: student7@argus.com / Training123
STUDENT 8: student8@argus.com / Training123
STUDENT 9: student9@argus.com / Training123
STUDENT 10: student10@argus.com / Training123

URL: http://localhost:3000/dashboard
Support: [Your email]
```

---

## ✅ GO-LIVE CHECKLIST (June 1, 8:00 AM)

**30 minutes before training starts:**
- [ ] All 10 computers turned on
- [ ] All 10 logins tested
- [ ] Projector working
- [ ] ARGUS system loaded on projector
- [ ] Whiteboard clean
- [ ] Materials on each desk
- [ ] Your coffee ready ☕

**You're ready!** 🎓

