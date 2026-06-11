const axios = require('axios');

async function testCasePersistence() {
  try {
    console.log('🧪 Testing case persistence...\n');
    
    // 1. First, login to get a token
    console.log('1️⃣  Logging in as admin...');
    const loginRes = await axios.post('https://argus-flax.vercel.app/api/auth/login', {
      email: 'admin@argus.com',
      password: 'password123'
    });
    
    const token = loginRes.data.token;
    console.log(`✅ Logged in successfully. Token: ${token.substring(0, 20)}...\n`);
    
    // 2. Create a test case
    console.log('2️⃣  Creating a test case...');
    const caseRes = await axios.post('https://argus-flax.vercel.app/api/cases', {
      receiptDate: new Date().toISOString(),
      caseClassification: 'Spontaneous',
      primaryReporterType: 'Physician',
      countryOfOccurrence: 'USA',
      products: [{
        productName: 'Test Product',
        activeSubstance: 'Test Substance'
      }],
      reporter: {
        name: 'Dr. Test User',
        email: 'test@example.com'
      }
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const caseId = caseRes.data.caseId;
    console.log(`✅ Case created: ${caseId}\n`);
    
    // 3. Immediately search for the case
    console.log('3️⃣  Searching for the case immediately...');
    const searchRes = await axios.get(`https://argus-flax.vercel.app/api/cases?search=${caseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (searchRes.data.cases && searchRes.data.cases.length > 0) {
      console.log(`✅ Case found in search! Cases returned: ${searchRes.data.cases.length}`);
      console.log(`📊 Case data: ${JSON.stringify(searchRes.data.cases[0], null, 2)}\n`);
    } else {
      console.log(`❌ Case NOT found in search! This indicates data is not persisting to MongoDB.\n`);
      console.log(`📊 Response: ${JSON.stringify(searchRes.data, null, 2)}\n`);
    }
    
    // 4. Try to retrieve by ID
    console.log('4️⃣  Retrieving case by ID...');
    try {
      const getRes = await axios.get(`https://argus-flax.vercel.app/api/cases/${caseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`✅ Case retrieved: ${JSON.stringify(getRes.data, null, 2)}\n`);
    } catch (err) {
      console.log(`❌ Case retrieval failed: ${err.response?.data?.error || err.message}\n`);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 DIAGNOSIS:');
    if (searchRes.data.cases && searchRes.data.cases.length > 0) {
      console.log('✅ Cases ARE persisting to MongoDB');
      console.log('✅ Verification passed - database is working correctly');
    } else {
      console.log('❌ Cases are NOT persisting');
      console.log('❌ Application is likely using mock database');
      console.log('❌ Check MongoDB connection string on Vercel');
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response?.data) {
      console.error('Response:', error.response.data);
    }
  }
}

testCasePersistence();
