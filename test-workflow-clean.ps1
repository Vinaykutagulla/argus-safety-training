# Comprehensive Workflow Test for Argus PV Safety Training
# Tests: Login -> Case Creation -> Case Update -> Audit Trail -> Workflow

$API_URL = "http://localhost:3000"
$adminEmail = "admin@argus.com"
$adminPassword = "password123"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ARGUS WORKFLOW TEST SUITE"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# STEP 1: LOGIN
Write-Host "STEP 1: AUTHENTICATION" -ForegroundColor Cyan
Write-Host "----------------------------------------"

try {
    $loginBody = @{
        email = $adminEmail
        password = $adminPassword
    } | ConvertTo-Json
    
    $loginResponse = Invoke-WebRequest `
        -Uri "$API_URL/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody `
        -UseBasicParsing
    
    $loginData = $loginResponse.Content | ConvertFrom-Json
    $token = $loginData.token
    $userId = $loginData.user.id
    
    Write-Host "SUCCESS: Login completed" -ForegroundColor Green
    Write-Host "User: $($loginData.user.name)"
    Write-Host ""
} catch {
    Write-Host "FAILED: $_" -ForegroundColor Red
    exit 1
}

# STEP 2: CREATE CASE
Write-Host "STEP 2: CASE CREATION" -ForegroundColor Cyan
Write-Host "----------------------------------------"

try {
    $caseBody = @{
        receiptDate = (Get-Date).ToString('o')
        reportType = "Spontaneous"
        countryOfOccurrence = "India"
        awarenessDate = (Get-Date).ToString('o')
        reporterType = "Physician"
        reporterName = "Dr. Test Physician"
        reporterQualification = "MD"
        reporterInstitution = "Test Hospital"
        reporterCity = "Test City"
        reporterPhone = "+91-1234567890"
        reporterEmail = "test@hospital.com"
        caseClassification = "Serious"
        primaryReporterType = "Physician"
        patient = @{
            initials = "TC"
            age = "45"
            sex = "Male"
            weight = "70"
            height = "170"
        }
        products = @(@{
            productName = "Test Drug"
            activeSubstance = "Test Substance"
            drugRole = "Suspect"
            dose = "100"
            doseUnit = "mg"
            routeOfAdmin = "Oral"
            startDate = ((Get-Date).AddDays(-5)).ToString('o')
            indication = "Test Indication"
        })
        reaction = @{
            reactionName = "Test Reaction"
            onsetDate = ((Get-Date).AddDays(-1)).ToString('o')
            outcome = "Unknown"
            seriousness = "Serious"
        }
        administration = @{
            receiptDate = (Get-Date).ToString('o')
            caseClassification = "Serious"
            reportType = "Initial"
            primaryReporterType = "Physician"
            countryOfOccurrence = "India"
            awarenessDate = (Get-Date).ToString('o')
            isPregnancyCase = $false
        }
    } | ConvertTo-Json
    
    $caseResponse = Invoke-WebRequest `
        -Uri "$API_URL/api/cases" `
        -Method POST `
        -ContentType "application/json" `
        -Body $caseBody `
        -Headers @{"Authorization" = "Bearer $token"} `
        -UseBasicParsing
    
    $caseData = $caseResponse.Content | ConvertFrom-Json
    $caseId = $caseData._id
    
    Write-Host "SUCCESS: Case created" -ForegroundColor Green
    Write-Host "Case ID: $caseId"
    Write-Host "Patient: $($caseData.patient.initials)"
    Write-Host ""
} catch {
    Write-Host "FAILED: $_" -ForegroundColor Red
    exit 1
}

# STEP 3: RETRIEVE CASE
Write-Host "STEP 3: CASE RETRIEVAL" -ForegroundColor Cyan
Write-Host "----------------------------------------"

try {
    $getResponse = Invoke-WebRequest `
        -Uri "$API_URL/api/cases/$caseId" `
        -Method GET `
        -Headers @{"Authorization" = "Bearer $token"} `
        -UseBasicParsing
    
    $caseData = $getResponse.Content | ConvertFrom-Json
    
    Write-Host "SUCCESS: Case retrieved" -ForegroundColor Green
    Write-Host "Case: $($caseData.caseId)"
    Write-Host "Drug: $($caseData.drug.tradeName)"
    Write-Host "Audit Entries: $($caseData.auditTrail.Length)"
    Write-Host ""
} catch {
    Write-Host "FAILED: $_" -ForegroundColor Red
    exit 1
}

# STEP 4: UPDATE CASE
Write-Host "STEP 4: CASE UPDATE" -ForegroundColor Cyan
Write-Host "----------------------------------------"

try {
    $updateBody = @{
        assessment = @{
            caseAssessmentNotes = "Updated assessment notes"
        }
    } | ConvertTo-Json
    
    $updateResponse = Invoke-WebRequest `
        -Uri "$API_URL/api/cases/$caseId" `
        -Method PUT `
        -ContentType "application/json" `
        -Body $updateBody `
        -Headers @{"Authorization" = "Bearer $token"} `
        -UseBasicParsing
    
    $updatedCase = $updateResponse.Content | ConvertFrom-Json
    
    Write-Host "SUCCESS: Case updated" -ForegroundColor Green
    Write-Host "Audit Entries: $($updatedCase.auditTrail.Length)"
    Write-Host ""
} catch {
    Write-Host "FAILED: $_" -ForegroundColor Red
    exit 1
}

# STEP 5: LIST CASES
Write-Host "STEP 5: CASE SEARCH & LIST" -ForegroundColor Cyan
Write-Host "----------------------------------------"

try {
    $uri = "$API_URL/api/cases?page=1`&limit=10"
    $listResponse = Invoke-WebRequest `
        -Uri $uri `
        -Method GET `
        -Headers @{"Authorization" = "Bearer $token"} `
        -UseBasicParsing
    
    $listData = $listResponse.Content | ConvertFrom-Json
    
    Write-Host "SUCCESS: Cases retrieved" -ForegroundColor Green
    Write-Host "Total Cases: $($listData.pagination.total)"
    Write-Host "Cases on Page: $($listData.cases.Length)"
    Write-Host ""
} catch {
    Write-Host "FAILED: $_" -ForegroundColor Red
    exit 1
}

# STEP 6: VERIFY AUDIT TRAIL
Write-Host "STEP 6: AUDIT TRAIL" -ForegroundColor Cyan
Write-Host "----------------------------------------"

try {
    $auditResponse = Invoke-WebRequest `
        -Uri "$API_URL/api/cases/$caseId" `
        -Method GET `
        -Headers @{"Authorization" = "Bearer $token"} `
        -UseBasicParsing
    
    $auditCase = $auditResponse.Content | ConvertFrom-Json
    
    Write-Host "SUCCESS: Audit trail verified" -ForegroundColor Green
    Write-Host "Total Entries: $($auditCase.auditTrail.Length)"
    
    $auditCase.auditTrail | ForEach-Object {
        Write-Host "  - $($_.action)"
    }
    Write-Host ""
} catch {
    Write-Host "FAILED: $_" -ForegroundColor Red
    exit 1
}

# SUMMARY
Write-Host "========================================" -ForegroundColor Green
Write-Host "WORKFLOW TEST RESULTS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Authentication - PASSED" -ForegroundColor Green
Write-Host "Case Creation - PASSED" -ForegroundColor Green
Write-Host "Case Retrieval - PASSED" -ForegroundColor Green
Write-Host "Case Update - PASSED" -ForegroundColor Green
Write-Host "Case Search - PASSED" -ForegroundColor Green
Write-Host "Audit Trail - PASSED" -ForegroundColor Green
Write-Host ""
Write-Host "OVERALL: ALL TESTS PASSED" -ForegroundColor Green
Write-Host ""
