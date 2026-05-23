module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Desktop/Argus/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateToken",
    ()=>generateToken,
    "getAuthToken",
    ()=>getAuthToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "removeAuthCookie",
    ()=>removeAuthCookie,
    "setAuthCookie",
    ()=>setAuthCookie,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';
function generateToken(userId, email, role) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        userId,
        email,
        role
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}
function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}
async function setAuthCookie(token) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
    });
}
async function removeAuthCookie() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('auth-token');
}
async function getAuthToken() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('auth-token')?.value;
    return token || null;
}
async function getCurrentUser() {
    const token = await getAuthToken();
    if (!token) return null;
    return verifyToken(token);
}
}),
"[project]/Desktop/Argus/src/lib/mockDb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockDb",
    ()=>mockDb
]);
// Mock in-memory database for development when MongoDB is not available
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
let users = new Map();
let cases = new Map();
let isConnected = false;
// Initialize with demo data
async function initializeMockData() {
    const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash('password123', 10);
    const demoUsers = [
        {
            _id: '1',
            name: 'Admin User',
            email: 'admin@argus.com',
            password: hashedPassword,
            role: 'admin',
            department: 'Safety',
            isActive: true,
            createdAt: new Date()
        },
        {
            _id: '2',
            name: 'Safety Analyst',
            email: 'analyst@argus.com',
            password: hashedPassword,
            role: 'analyst',
            department: 'PV',
            isActive: true,
            createdAt: new Date()
        }
    ];
    demoUsers.forEach((user)=>{
        users.set(user.email, user);
    });
}
const mockDb = {
    async connect () {
        if (!isConnected) {
            await initializeMockData();
            isConnected = true;
        }
        return {
            connection: 'mock'
        };
    },
    async findUser (email) {
        return users.get(email) || null;
    },
    async createUser (userData) {
        const id = Math.random().toString(36).substr(2, 9);
        const user = {
            ...userData,
            _id: id,
            createdAt: new Date()
        };
        users.set(userData.email, user);
        return user;
    },
    async getCases () {
        return Array.from(cases.values());
    },
    async getCaseById (id) {
        return cases.get(id) || null;
    },
    async createCase (caseData) {
        const id = Math.random().toString(36).substr(2, 9);
        const newCase = {
            ...caseData,
            _id: id,
            createdAt: new Date()
        };
        cases.set(id, newCase);
        return newCase;
    },
    async updateCase (id, caseData) {
        const existingCase = cases.get(id);
        if (!existingCase) return null;
        const updated = {
            ...existingCase,
            ...caseData
        };
        cases.set(id, updated);
        return updated;
    },
    async deleteCase (id) {
        return cases.delete(id);
    },
    isConnected () {
        return isConnected;
    }
};
}),
"[project]/Desktop/Argus/src/lib/db.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dbConnect",
    ()=>dbConnect
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Desktop/Argus/node_modules/mongoose)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$mockDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/src/lib/mockDb.ts [app-route] (ecmascript)");
;
;
const MONGODB_URI = process.env.MONGODB_URI;
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g;
let useMockDb = false;
if (!cached.mongoose) {
    cached.mongoose = {
        conn: null,
        promise: null,
        useMock: false
    };
}
async function dbConnect() {
    // Return cached connection if available
    if (cached.mongoose.conn) {
        return cached.mongoose.conn;
    }
    // If using mock database, return immediately
    if (cached.mongoose.useMock) {
        if (!useMockDb) {
            useMockDb = true;
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$mockDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockDb"].connect();
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$mockDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockDb"];
    }
    if (!cached.mongoose.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 3000,
            connectTimeoutMS: 3000
        };
        // Try to connect to MongoDB, fall back to mock if it fails
        cached.mongoose.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI || 'mongodb://localhost:27017/argus-pv', opts).then((mongoose)=>{
            console.log('✓ Connected to MongoDB');
            return mongoose;
        }).catch(async (error)=>{
            console.warn('⚠ MongoDB connection failed, using mock database for development');
            console.warn('Error:', error.message);
            cached.mongoose.useMock = true;
            useMockDb = true;
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$mockDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockDb"].connect();
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$mockDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockDb"];
        });
    }
    cached.mongoose.conn = await cached.mongoose.promise;
    return cached.mongoose.conn;
}
;
}),
"[project]/Desktop/Argus/src/models/AECase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AECase",
    ()=>AECase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Desktop/Argus/node_modules/mongoose)");
;
const aeCaseSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__["Schema"]({
    caseId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: [
            'New',
            'Open',
            'Under Review',
            'Closed',
            'Locked'
        ],
        default: 'New'
    },
    priority: {
        type: String,
        enum: [
            'Low',
            'Medium',
            'High',
            'Critical'
        ],
        default: 'Medium'
    },
    administration: {
        receiptDate: {
            type: Date,
            required: true
        },
        caseClassification: {
            type: String,
            required: true
        },
        reportType: {
            type: String,
            enum: [
                'Initial',
                'Follow-up'
            ],
            required: true
        },
        primaryReporterType: {
            type: String,
            required: true
        },
        countryOfOccurrence: {
            type: String,
            required: true
        },
        awarenessDate: {
            type: Date,
            required: true
        },
        isPregnancyCase: {
            type: Boolean,
            default: false
        }
    },
    patient: {
        initials: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        sex: {
            type: String,
            enum: [
                'M',
                'F',
                'Unknown'
            ],
            required: true
        },
        weight: {
            type: Number
        },
        height: {
            type: Number
        },
        ethnicity: {
            type: String
        },
        medicalHistory: {
            type: String
        },
        concomitantMeds: {
            type: String
        }
    },
    reaction: {
        verbatimTerm: {
            type: String,
            required: true
        },
        meddraPreferredTerm: {
            type: String,
            required: true
        },
        meddraCode: {
            type: String,
            required: true
        },
        meddraSoc: {
            type: String,
            required: true
        },
        onsetDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        outcome: {
            type: String,
            required: true
        },
        dateOfDeath: {
            type: Date
        },
        seriousnessCriteria: [
            {
                type: String
            }
        ]
    },
    drug: {
        tradeName: {
            type: String,
            required: true
        },
        activeSubstance: {
            type: String,
            required: true
        },
        drugRole: {
            type: String,
            enum: [
                'Suspect',
                'Concomitant',
                'Interacting'
            ],
            required: true
        },
        indication: {
            type: String
        },
        dose: {
            type: String
        },
        doseUnit: {
            type: String
        },
        routeOfAdmin: {
            type: String
        },
        frequency: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        lotNumber: {
            type: String
        },
        dechallenge: {
            type: String
        },
        rechallenge: {
            type: String
        },
        causality: {
            type: String
        }
    },
    narrative: {
        caseNarrative: {
            type: String,
            required: true
        },
        labTests: {
            type: String
        },
        additionalNotes: {
            type: String
        }
    },
    reporter: {
        title: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        qualification: {
            type: String,
            required: true
        },
        institution: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        },
        reporterCausality: {
            type: String
        }
    },
    assessment: {
        listedness: {
            type: String
        },
        companyCausality: {
            type: String
        },
        expeditedReportRequired: {
            type: Boolean
        },
        reportType: {
            type: String
        },
        reviewerComments: {
            type: String
        }
    },
    workflow: {
        currentStep: {
            type: String,
            default: 'Intake'
        },
        assignedTo: {
            type: String
        },
        lockedBy: {
            type: String
        },
        lockedAt: {
            type: Date
        }
    },
    auditTrail: [
        {
            action: {
                type: String,
                required: true
            },
            performedBy: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
            details: {
                type: String
            }
        }
    ],
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String
    }
}, {
    timestamps: true
});
aeCaseSchema.index({
    caseId: 1
});
aeCaseSchema.index({
    status: 1
});
aeCaseSchema.index({
    'administration.receiptDate': 1
});
const AECase = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__["default"].models.AECase || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__["default"].model('AECase', aeCaseSchema);
}),
"[project]/Desktop/Argus/src/app/api/cases/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Argus/src/lib/db.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$models$2f$AECase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/src/models/AECase.ts [app-route] (ecmascript)");
;
;
;
;
function generateCaseId() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `CASE-${year}-${random}`;
}
async function GET(req) {
    try {
        // Try to get token from cookies first, then from Authorization header
        let token = req.cookies.get('auth-token')?.value;
        if (!token) {
            const authHeader = req.headers.get('authorization');
            if (authHeader?.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!payload) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dbConnect"])();
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        // Check if using mock database
        if (db && typeof db.getCases === 'function') {
            // Mock database
            const allCases = await db.getCases();
            const skip = (page - 1) * limit;
            const cases = allCases.slice(skip, skip + limit);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                cases,
                pagination: {
                    page,
                    limit,
                    total: allCases.length
                }
            });
        }
        // MongoDB path - ensure connection is established
        if (!db.connection || db.connection.readyState !== 1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Database not available'
            }, {
                status: 503
            });
        }
        const status = searchParams.get('status');
        const product = searchParams.get('product');
        const seriousness = searchParams.get('seriousness');
        const search = searchParams.get('search');
        const filter = {};
        if (status) filter.status = status;
        if (product) filter['drug.tradeName'] = {
            $regex: product,
            $options: 'i'
        };
        if (seriousness) filter['reaction.seriousnessCriteria'] = seriousness;
        if (search) {
            filter.$or = [
                {
                    caseId: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    'drug.tradeName': {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ];
        }
        const skip = (page - 1) * limit;
        const cases = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$models$2f$AECase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AECase"].find(filter).sort({
            'administration.receiptDate': -1
        }).skip(skip).limit(limit);
        const total = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$models$2f$AECase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AECase"].countDocuments(filter);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            cases,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get cases error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const token = req.cookies.get('auth-token')?.value;
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!payload) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dbConnect"])();
        const data = await req.json();
        const caseId = generateCaseId();
        const aeCase = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$models$2f$AECase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AECase"]({
            ...data,
            caseId,
            createdBy: payload.userId,
            auditTrail: [
                {
                    action: 'Case Created',
                    performedBy: payload.userId,
                    timestamp: new Date(),
                    details: 'Case intake initiated'
                }
            ]
        });
        await aeCase.save();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(aeCase, {
            status: 201
        });
    } catch (error) {
        console.error('Create case error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__03xnntp._.js.map