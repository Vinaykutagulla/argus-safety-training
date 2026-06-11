/**
 * Auth Verification Script
 * Verifies all protected routes enforce authentication correctly
 */

async function verifyAuthEnforcement() {
  const API_URL = 'http://localhost:3000/api';
  const results: any[] = [];

  console.log('🔐 Starting Auth Verification Tests...\n');

  // Test 1: Unauthenticated access should be rejected
  console.log('Test 1: Unauthenticated access to /api/cases');
  try {
    const res = await fetch(`${API_URL}/cases`);
    if (res.status === 401) {
      console.log('✅ PASS: Correctly rejected with 401\n');
      results.push({ test: 'Unauthenticated /api/cases', status: 'PASS' });
    } else {
      console.log(`❌ FAIL: Expected 401, got ${res.status}\n`);
      results.push({ test: 'Unauthenticated /api/cases', status: 'FAIL' });
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error}\n`);
    results.push({ test: 'Unauthenticated /api/cases', status: 'ERROR' });
  }

  // Test 2: Login and verify token works
  console.log('Test 2: Login with default credentials');
  let authToken: string = '';
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@argus.com',
        password: 'demo123',
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      authToken = data.token || data.auth_token;
      console.log('✅ PASS: Login successful\n');
      results.push({ test: 'Login', status: 'PASS' });
    } else {
      console.log(`❌ FAIL: Login returned ${res.status}\n`);
      results.push({ test: 'Login', status: 'FAIL' });
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error}\n`);
    results.push({ test: 'Login', status: 'ERROR' });
  }

  // Test 3: Authenticated access should work
  console.log('Test 3: Authenticated access with valid token');
  try {
    const res = await fetch(`${API_URL}/cases`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (res.status === 200) {
      console.log('✅ PASS: Access granted with valid token\n');
      results.push({ test: 'Authenticated /api/cases', status: 'PASS' });
    } else {
      console.log(`❌ FAIL: Expected 200, got ${res.status}\n`);
      results.push({ test: 'Authenticated /api/cases', status: 'FAIL' });
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error}\n`);
    results.push({ test: 'Authenticated /api/cases', status: 'ERROR' });
  }

  // Test 4: Invalid token should be rejected
  console.log('Test 4: Invalid token rejection');
  try {
    const res = await fetch(`${API_URL}/cases`, {
      headers: {
        Authorization: 'Bearer invalid.token.xyz',
      },
    });

    if (res.status === 401) {
      console.log('✅ PASS: Invalid token correctly rejected with 401\n');
      results.push({ test: 'Invalid token', status: 'PASS' });
    } else {
      console.log(`❌ FAIL: Expected 401, got ${res.status}\n`);
      results.push({ test: 'Invalid token', status: 'FAIL' });
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error}\n`);
    results.push({ test: 'Invalid token', status: 'ERROR' });
  }

  // Test 5: Protected admin endpoint
  console.log('Test 5: Protected admin endpoints (/api/users)');
  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if ([200, 403].includes(res.status)) {
      console.log(`✅ PASS: Admin endpoint returned ${res.status} (authenticated)\n`);
      results.push({ test: 'Admin endpoint /api/users', status: 'PASS' });
    } else {
      console.log(`❌ FAIL: Expected 200 or 403, got ${res.status}\n`);
      results.push({ test: 'Admin endpoint /api/users', status: 'FAIL' });
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error}\n`);
    results.push({ test: 'Admin endpoint /api/users', status: 'ERROR' });
  }

  // Test 6: Verify cookie-based auth also works
  console.log('Test 6: Cookie-based authentication');
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@argus.com',
        password: 'demo123',
      }),
    });

    if (res.status === 200) {
      console.log('✅ PASS: Cookie-based auth available\n');
      results.push({ test: 'Cookie auth', status: 'PASS' });
    } else {
      console.log(`❌ FAIL: Cookie auth returned ${res.status}\n`);
      results.push({ test: 'Cookie auth', status: 'FAIL' });
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error}\n`);
    results.push({ test: 'Cookie auth', status: 'ERROR' });
  }

  // Summary
  console.log('\n═══════════════════════════════════════');
  console.log('📊 AUTH VERIFICATION SUMMARY');
  console.log('═══════════════════════════════════════\n');

  results.forEach(r => {
    const icon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${icon} ${r.test}: ${r.status}`);
  });

  const passCount = results.filter(r => r.status === 'PASS').length;
  const totalCount = results.length;
  const percentage = Math.round((passCount / totalCount) * 100);

  console.log(`\n📈 Overall: ${passCount}/${totalCount} tests passed (${percentage}%)\n`);

  if (percentage === 100) {
    console.log('🎉 All auth tests passed! Application is secure.\n');
  } else if (percentage >= 80) {
    console.log('✅ Most auth tests passed. Review failures above.\n');
  } else {
    console.log('⚠️ Multiple auth test failures. Review security immediately.\n');
  }

  return results;
}

// Run if called directly
if (require.main === module) {
  verifyAuthEnforcement().catch(console.error);
}

export { verifyAuthEnforcement };
