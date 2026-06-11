/**
 * Case API Integration Tests
 * Tests all case CRUD operations and filtering
 */

describe('Cases API', () => {
  const API_URL = 'http://localhost:3000/api';
  let authToken: string;
  let testCaseId: string;

  beforeAll(async () => {
    // Login to get auth token
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@argus.com',
        password: 'demo123',
      }),
    });
    const loginData = await loginRes.json();
    authToken = loginData.token || loginData.auth_token;
  });

  describe('POST /api/cases - Create Case', () => {
    it('should create a new adverse event case', async () => {
      const casePayload = {
        administration: {
          receiptDate: new Date().toISOString().split('T')[0],
          countryOfOccurrence: 'India',
          awarenessDate: new Date().toISOString().split('T')[0],
        },
        reporter: {
          name: 'Dr. Test User',
          type: 'Healthcare Professional',
          institution: 'Test Hospital',
        },
        reportType: 'Spontaneous',
        serious: 'yes',
        patient: {
          initials: 'AB',
          gender: 'Male',
          ageAtOnset: '45',
        },
        products: [
          {
            tradeName: 'TestDrug 500mg',
            genericName: 'testdruginum',
            role: 'Suspect',
            dose: '500',
          },
        ],
        reactions: [
          {
            verbatimTerm: 'Severe headache',
            outcomeTerm: 'Recovered',
            meddraPreferredTerm: 'Headache',
          },
        ],
        status: 'New',
      };

      const res = await fetch(`${API_URL}/cases`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(casePayload),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data._id).toBeDefined();
      expect(data.caseId).toMatch(/^CASE-/);
      expect(data.status).toBe('New');
      testCaseId = data._id;
    });
  });

  describe('GET /api/cases - List Cases', () => {
    it('should retrieve list of cases', async () => {
      const res = await fetch(`${API_URL}/cases`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(Array.isArray(data.cases)).toBe(true);
      expect(data.total).toBeGreaterThanOrEqual(0);
    });

    it('should filter cases by country', async () => {
      const res = await fetch(`${API_URL}/cases?country=India`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      const allIndian = data.cases.every(
        (c: any) => c.administration?.countryOfOccurrence === 'India'
      );
      expect(allIndian).toBe(true);
    });

    it('should filter cases by status', async () => {
      const res = await fetch(`${API_URL}/cases?status=New`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      const allNew = data.cases.every((c: any) => c.status === 'New');
      expect(allNew).toBe(true);
    });
  });

  describe('GET /api/cases/:id - Get Single Case', () => {
    it('should retrieve a specific case', async () => {
      if (!testCaseId) {
        throw new Error('Test case ID not available');
      }

      const res = await fetch(`${API_URL}/cases/${testCaseId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data._id).toBe(testCaseId);
      expect(data.caseId).toBeDefined();
    });

    it('should return 404 for non-existent case', async () => {
      const res = await fetch(`${API_URL}/cases/000000000000000000000000`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/cases/:id - Update Case', () => {
    it('should update case data', async () => {
      if (!testCaseId) {
        throw new Error('Test case ID not available');
      }

      const updatePayload = {
        status: 'Open',
        patient: {
          initials: 'XY',
        },
      };

      const res = await fetch(`${API_URL}/cases/${testCaseId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatePayload),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe('Open');
    });
  });

  describe('POST /api/cases/:id/lock - Lock Case', () => {
    it('should lock a case', async () => {
      if (!testCaseId) {
        throw new Error('Test case ID not available');
      }

      const res = await fetch(`${API_URL}/cases/${testCaseId}/lock`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe('Locked');
    });

    it('should prevent updates to locked case', async () => {
      if (!testCaseId) {
        throw new Error('Test case ID not available');
      }

      const updatePayload = { status: 'Open' };

      const res = await fetch(`${API_URL}/cases/${testCaseId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatePayload),
      });

      expect(res.status).toBe(403);
    });
  });

  describe('Authentication', () => {
    it('should reject requests without auth token', async () => {
      const res = await fetch(`${API_URL}/cases`, {
        method: 'GET',
      });

      expect(res.status).toBe(401);
    });

    it('should reject requests with invalid token', async () => {
      const res = await fetch(`${API_URL}/cases`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer invalid.token.here',
        },
      });

      expect(res.status).toBe(401);
    });
  });
});
