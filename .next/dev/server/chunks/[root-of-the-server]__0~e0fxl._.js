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
"[project]/Desktop/Argus/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dbConnect",
    ()=>dbConnect
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Desktop/Argus/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g;
if (!cached.mongoose) {
    cached.mongoose = {
        conn: null,
        promise: null
    };
}
async function dbConnect() {
    if (cached.mongoose.conn) {
        return cached.mongoose.conn;
    }
    if (!cached.mongoose.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.mongoose.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    cached.mongoose.conn = await cached.mongoose.promise;
    return cached.mongoose.conn;
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Desktop/Argus/src/models/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "User",
    ()=>User
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Desktop/Argus/node_modules/mongoose)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
const userSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: [
            'analyst',
            'safety_officer',
            'supervisor',
            'admin'
        ],
        default: 'analyst'
    },
    department: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].genSalt(10);
        this.password = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.methods.comparePassword = async function(candidatePassword) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(candidatePassword, this.password);
};
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$mongoose$29$__["default"].model('User', userSchema);
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
"[project]/Desktop/Argus/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/src/models/User.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Argus/src/lib/auth.ts [app-route] (ecmascript)");
;
;
;
;
async function POST(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dbConnect"])();
        const { email, password } = await req.json();
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Email and password required'
            }, {
                status: 400
            });
        }
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["User"].findOne({
            email
        });
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid credentials'
            }, {
                status: 401
            });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid credentials'
            }, {
                status: 401
            });
        }
        user.lastLogin = new Date();
        await user.save();
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateToken"])(user._id.toString(), user.email, user.role);
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            },
            token
        }, {
            status: 200
        });
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/'
        });
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Argus$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0~e0fxl._.js.map