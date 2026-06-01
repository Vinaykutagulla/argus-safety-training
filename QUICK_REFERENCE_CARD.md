# ARGUS PV TRAINING - QUICK REFERENCE CARD
## Print this and keep at your desk! 📋

---

## 🔄 CASE WORKFLOW STAGES (In Order)

```
1️⃣  INTAKE (📥)          → Initial assessment & case creation
2️⃣  TRIAGE (🔍)          → Route assignment based on seriousness  
3️⃣  DATA ENTRY (📝)      → Complete all patient/product/event info
4️⃣  MEDICAL REVIEW (👨‍⚕️) → Medical professional evaluates
5️⃣  QUALITY CHECK (✓)    → Final compliance verification
6️⃣  LOCKED (🔒)          → Case submitted to authorities
```

---

## ⏰ DEADLINES YOU MUST KNOW

| Situation | Rule | Deadline | Status |
|-----------|------|----------|--------|
| **DEATH** (unlisted) | 7-Day | Within 7 calendar days | 🔴 CRITICAL |
| **Life-threatening** (unlisted) | 7-Day | Within 7 calendar days | 🔴 CRITICAL |
| **Other SERIOUS** (unexpected) | 15-Day | Within 15 calendar days | 🟡 URGENT |
| **Non-serious** | Quarterly | Every 3 months aggregate | 🟢 Normal |

**Remember:** Weekends & holidays COUNT toward the clock! 

---

## 🎯 YOUR TASKS AT INTAKE STAGE

### ✅ When you receive a new safety report:

1. **Log into Argus** → https://argus-flax.vercel.app
2. **Click "+ New Case"** (top right)
3. **Enter these critical fields:**
   - Product name & strength (e.g., "Metformin 500mg")
   - Case ID (auto-generated as ARG-XXXX)
   - Receipt date (today's date)
   - Reporter type (Physician/Pharmacist/Patient/Other)
   - Country of occurrence
   - **Is it serious? YES or NO**

4. **Classify Report Type:**
   - ☐ Spontaneous (unsolicited from healthcare provider/patient)
   - ☐ Study (from clinical trial)
   - ☐ Literature (published article)
   - ☐ Solicited (from safety call)

5. **Check Seriousness Criteria** (select ALL that apply):
   - ☐ Death
   - ☐ Life-threatening
   - ☐ Hospitalization
   - ☐ Permanent Disability
   - ☐ Congenital Abnormality
   - ☐ Other Serious Outcome

6. **Click SAVE** → Case moves to TRIAGE

---

## 🏥 SERIOUSNESS DECISION MATRIX

**Is the adverse event SERIOUS?**

```
SERIOUS MEANS (Pick any that apply):
✓ Patient died
✓ Patient's life was in danger
✓ Patient had to go to hospital
✓ Patient has permanent disability/damage
✓ Baby born with abnormality (pregnancy cases)
✓ Other medically important condition (per medical judgment)

NOT SERIOUS:
✗ Mild headache
✗ Minor rash that resolves
✗ Slight nausea (if patient doesn't seek care)
✗ Expected side effect listed in product info
```

---

## 📊 EXPEDITED vs PERIODIC

### EXPEDITED REPORTING (Fast Track)
- **Cases:** Fatal, Life-threatening, or Other serious
- **Timeline:** 7 or 15 days
- **Submission to:** FDA, EMA, CDSCO immediately
- **Your priority:** HIGH
- **Dashboard alert:** 🔴 Red = Overdue, 🟡 Yellow = Due Soon

### PERIODIC REPORTING (Aggregate)
- **Cases:** Non-serious adverse events
- **Timeline:** Quarterly or Annual (no rush)
- **Submission to:** Authorities in bulk summary
- **Your priority:** Normal
- **Dashboard alert:** 🟢 Green = On Track

---

## 💻 SYSTEM SHORTCUTS

| Task | Location |
|------|----------|
| **Create New Case** | Dashboard → "+ New Case" (top right) |
| **View My Cases** | Dashboard → "My Worklist" section |
| **Search for Case** | Navigation → "Cases" → Use filters |
| **See Workflow** | Navigation → "Workflow" → Pipeline view |
| **Check Deadlines** | Navigation → "Reports" → "Expedited" |
| **Code Medical Terms** | Navigation → "MedDRA" → Search |
| **View All Users** | Admin dropdown → "User Management" |

---

## 📝 DATA ENTRY CHECKLIST

When moving case to Data Entry stage, ensure:

- [ ] **PATIENT Tab:** Age, Sex, Medical History, Allergies
- [ ] **PRODUCTS Tab:** Drug name, dose, dates, route, indication
- [ ] **EVENTS Tab:** Use MedDRA for event names (not patient words!)
- [ ] **ANALYSIS Tab:** Causality assessment (Probable/Possible/Unlikely)
- [ ] All fields filled OR marked "Unknown/Not reported"
- [ ] No gaps or incomplete information

---

## 🔍 CAUSALITY ASSESSMENT SIMPLE GUIDE

**How likely is the product causing the adverse event?**

| Level | Definition | Example |
|-------|-----------|---------|
| **PROBABLE** | Strong temporal relationship, consistent pattern | Started drug 2 days ago, severe rash appears on day 3 → Probable |
| **POSSIBLE** | Reasonable temporal relationship, could be other factors | Started drug, developed infection 10 days later → Possible |
| **UNLIKELY** | Temporal relationship doesn't fit, other clear cause | Started drug, patient hit by car next day → Unlikely |
| **UNRELATED** | Clear other cause, no temporal relationship | Hereditary disease in family unrelated to new drug → Unrelated |

---

## 🚨 REGULATORY AUTHORITIES

Your cases may be reported to:

| Country | Authority | Abbreviation |
|---------|-----------|--------------|
| 🇺🇸 USA | Food & Drug Administration | FDA |
| 🇪🇺 Europe | European Medicines Agency | EMA |
| 🇮🇳 India | Central Drugs Standard Control Organisation | CDSCO |
| 🇯🇵 Japan | Pharmaceuticals & Medical Devices Agency | PMDA |
| 🇦🇺 Australia | Therapeutic Goods Administration | TGA |

---

## ❌ COMMON MISTAKES TO AVOID

1. **❌ Using patient's words** → Use MedDRA medical terms instead
2. **❌ Forgetting receipt date** → This is Day 0 of your regulatory clock
3. **❌ Incomplete data** → Mark as "Unknown/Not reported" if missing
4. **❌ Wrong seriousness level** → Understand what "serious" means (our definition above)
5. **❌ Missing MedDRA codes** → Medical terminology must be standardized
6. **❌ Wrong causality assessment** → Consider timeline carefully
7. **❌ Forgetting deadlines** → Check dashboard daily for overdue cases

---

## 🎓 TRAINING DEMO CASES

Use these real cases to practice:

- **ARG-001:** Metformin case (Serious, expedited) → Good intro case
- **ARG-002:** Aspirin case (Non-serious, periodic) → Learn periodic pathway
- **ARG-003:** Ibuprofen case (Serious, expedited) → Practice deadlines

---

## 📞 QUICK ANSWERS

**Q: What if I don't know patient's age?**
A: Mark as "Unknown" - don't guess. Medical Reviewer can request clarification.

**Q: Case is serious but not listed in product info - what's the rule?**
A: UNLISTED serious adverse event = 7-day rule (fastest timeline).

**Q: Today is Friday, deadline is Monday - is that 3 days?**
A: YES. Weekends COUNT in our clock. Monday deadline means you have 72 hours.

**Q: Can I edit a case after it's locked?**
A: NO. Locked cases cannot be edited. If new info arrives, it's a "Follow-up Report" and reopens the case.

**Q: What's MedDRA?**
A: Medical Dictionary for Regulatory Activities - standardized medical terminology required for all submissions.

**Q: Who approves a case?**
A: 1️⃣ Medical professional (safety check), 2️⃣ QC specialist (compliance check), then submitted.

---

## 🎯 TODAY'S GOAL

By end of your shift, you should:

✅ Create 1 new case  
✅ Complete data entry on 1 case  
✅ Understand your case's deadline  
✅ Know why seriousness matters  
✅ Be able to use MedDRA coding  

**Questions?** Ask your supervisor or check the full TRAINING_GUIDE.md

---

**Keep me handy! 📎**
Print this card and tape to your monitor.

**ARGUS Safety v8.4 | © 2026 Oracle Corporation**
