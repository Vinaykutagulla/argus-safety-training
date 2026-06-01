// Script to create 10 student accounts for training
// Copy this into your backend API or run via seed command

const studentAccounts = [
  {
    name: "Student One",
    email: "student1@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group A"
  },
  {
    name: "Student Two",
    email: "student2@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group A"
  },
  {
    name: "Student Three",
    email: "student3@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group A"
  },
  {
    name: "Student Four",
    email: "student4@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group A"
  },
  {
    name: "Student Five",
    email: "student5@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group A"
  },
  {
    name: "Student Six",
    email: "student6@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group B"
  },
  {
    name: "Student Seven",
    email: "student7@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group B"
  },
  {
    name: "Student Eight",
    email: "student8@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group B"
  },
  {
    name: "Student Nine",
    email: "student9@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group B"
  },
  {
    name: "Student Ten",
    email: "student10@argus.com",
    password: "Training123",
    role: "analyst",
    department: "Training Cohort 1",
    status: "active",
    trainingGroup: "Group B"
  }
];

// HOW TO USE:
// Option 1: Via API (RECOMMENDED - easiest)
// -----------------------------------------
// 1. Go to http://localhost:3000/dashboard
// 2. Login as admin@argus.com / password123
// 3. Go to Admin → User Management
// 4. Click "+ Add User" 
// 5. For EACH student in the list above, fill in:
//    - Name: Student One, Two, etc.
//    - Email: student1@argus.com, student2@argus.com, etc.
//    - Password: Training123 (all same)
//    - Role: analyst
// 6. Click Save
// 7. Repeat for all 10 students

// Option 2: Via MongoDB (ADVANCED - if you know MongoDB)
// -------------------------------------------------------
// If you have direct MongoDB access, use these fields:
// db.users.insertMany(studentAccounts.map(student => ({
//   ...student,
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isActive: true
// })))

// Testing the accounts:
// ---------------------
// After creating accounts, test each one:
// 1. Go to http://localhost:3000/login
// 2. Enter: student1@argus.com / Training123
// 3. Should login successfully
// 4. Repeat for student2, 3, etc.

// Display the accounts for reference:
console.log("═══════════════════════════════════════════════════════════");
console.log("ARGUS TRAINING - 10 STUDENT ACCOUNTS");
console.log("═══════════════════════════════════════════════════════════");
console.log("");

studentAccounts.forEach((student, index) => {
  console.log(`STUDENT ${index + 1}: ${student.name}`);
  console.log(`  Email:    ${student.email}`);
  console.log(`  Password: ${student.password}`);
  console.log(`  Role:     ${student.role}`);
  console.log(`  Group:    ${student.trainingGroup}`);
  console.log("");
});

console.log("═══════════════════════════════════════════════════════════");
console.log("INSTRUCTIONS:");
console.log("═══════════════════════════════════════════════════════════");
console.log("");
console.log("1. Go to: http://localhost:3000/dashboard");
console.log("2. Login: admin@argus.com / password123");
console.log("3. Click: Admin → User Management");
console.log("4. For each student above, click '+ Add User'");
console.log("5. Fill in Name, Email, Password (Training123), Role (analyst)");
console.log("6. Click Save");
console.log("7. Repeat for all 10 students");
console.log("");
console.log("VERIFICATION:");
console.log("Test each login after creating:");
console.log("  URL: http://localhost:3000/login");
console.log("  Try: student1@argus.com / Training123");
console.log("");
console.log("═══════════════════════════════════════════════════════════");
