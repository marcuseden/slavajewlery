(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/Cursor-projects/slava jewlery/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Cursor-projects/slava jewlery/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Cursor-projects/slava jewlery/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient,
    "createServerSupabaseClient",
    ()=>createServerSupabaseClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://achoqdsoocifovdvkbdf.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaG9xZHNvb2NpZm92ZHZrYmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTI5NjcsImV4cCI6MjA4MDI2ODk2N30.5VZFtjWm7oyEZS7SmVSWQxN9d70_JsZB53Q-1qavgzA"));
}
function createServerSupabaseClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://achoqdsoocifovdvkbdf.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaG9xZHNvb2NpZm92ZHZrYmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTI5NjcsImV4cCI6MjA4MDI2ODk2N30.5VZFtjWm7oyEZS7SmVSWQxN9d70_JsZB53Q-1qavgzA"));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Cursor-projects/slava jewlery/components/AuthProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Get initial session
            const getInitialSession = {
                "AuthProvider.useEffect.getInitialSession": async ()=>{
                    const { data: { session } } = await supabase.auth.getSession();
                    setUser(session?.user ?? null);
                    setLoading(false);
                }
            }["AuthProvider.useEffect.getInitialSession"];
            getInitialSession();
            // Listen for auth changes
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "AuthProvider.useEffect": async (event, session)=>{
                    setUser(session?.user ?? null);
                    setLoading(false);
                    // Create user profile if new user
                    if (event === 'SIGNED_IN' && session?.user) {
                        const { data: existingProfile } = await supabase.from('users').select('*').eq('id', session.user.id).single();
                        if (!existingProfile) {
                            await supabase.from('users').insert({
                                id: session.user.id,
                                email: session.user.email,
                                full_name: session.user.user_metadata.full_name || session.user.email?.split('@')[0]
                            });
                        }
                    }
                }
            }["AuthProvider.useEffect"]);
            return ({
                "AuthProvider.useEffect": ()=>subscription?.unsubscribe()
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        supabase.auth
    ]);
    const signInWithGoogle = async ()=>{
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
        if (error) throw error;
    };
    const signInWithApple = async ()=>{
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'apple',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
        if (error) throw error;
    };
    const signInWithEmail = async (email, password)=>{
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
    };
    const signUpWithEmail = async (email, password, name)=>{
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name
                }
            }
        });
        if (error) throw error;
    };
    const signOut = async ()=>{
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };
    const value = {
        user,
        loading,
        signInWithGoogle,
        signInWithApple,
        signInWithEmail,
        signUpWithEmail,
        signOut
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthProvider.tsx",
        lineNumber: 113,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "NiO5z6JIqzX62LS5UWDgIqbZYyY=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        // Return a safe fallback for SSR
        return {
            user: null,
            loading: true,
            signInWithGoogle: async ()=>{},
            signInWithApple: async ()=>{},
            signInWithEmail: async ()=>{},
            signUpWithEmail: async ()=>{},
            signOut: async ()=>{}
        };
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthModal",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/components/AuthProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AuthModal({ isOpen, onClose }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('login');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { signInWithGoogle, signInWithApple, signInWithEmail, signUpWithEmail } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    if (!isOpen) return null;
    const handleEmailAuth = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (mode === 'login') {
                await signInWithEmail(email, password);
            } else {
                await signUpWithEmail(email, password, name);
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    const handleSocialAuth = async (provider)=>{
        setLoading(true);
        setError('');
        try {
            if (provider === 'google') {
                await signInWithGoogle();
            } else {
                await signInWithApple();
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-slate-100",
                                    children: mode === 'login' ? 'Welcome back' : 'Create account'
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-400",
                                    children: mode === 'login' ? 'Sign in to your account' : 'Start designing your jewelry'
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 hover:bg-slate-800 rounded-lg transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5 text-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "outline",
                            className: "w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300",
                            onClick: ()=>handleSocialAuth('google'),
                            disabled: loading,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 mr-3",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#4285f4",
                                            d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#34a853",
                                            d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#fbbc05",
                                            d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#ea4335",
                                            d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this),
                                "Continue with Google"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "outline",
                            className: "w-full bg-black hover:bg-gray-900 text-white border-gray-600",
                            onClick: ()=>handleSocialAuth('apple'),
                            disabled: loading,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 mr-3",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M12.017 0C8.396 0 8.025.044 6.76.227 5.493.41 4.66.636 3.927.958a7.928 7.928 0 0 0-2.87 1.869A7.929 7.929 0 0 0 .227 5.697C.044 6.76 0 7.13 0 10.752s.044 3.992.227 5.256c.183 1.267.409 2.1.731 2.833a7.928 7.928 0 0 0 1.87 2.87 7.928 7.928 0 0 0 2.869 1.869c.733.322 1.566.548 2.833.731C8.025 23.956 8.396 24 12.017 24s3.992-.044 5.256-.227c1.267-.183 2.1-.409 2.833-.731a7.928 7.928 0 0 0 2.87-1.87 7.928 7.928 0 0 0 1.869-2.869c.322-.733.548-1.566.731-2.833C23.956 15.992 24 15.621 24 12s-.044-3.992-.227-5.256c-.183-1.267-.409-2.1-.731-2.833a7.928 7.928 0 0 0-1.87-2.87A7.928 7.928 0 0 0 18.304.227C17.04.044 16.669 0 13.048 0h-1.03zm-.117 2.185c3.605 0 4.034.014 5.46.08 1.317.06 2.033.278 2.51.464.63.245 1.08.538 1.55 1.01.472.471.765.92 1.01 1.55.186.477.404 1.193.464 2.51.066 1.426.08 1.855.08 5.46 0 3.605-.014 4.034-.08 5.46-.06 1.317-.278 2.033-.464 2.51-.245.63-.538 1.08-1.01 1.55-.471.472-.92.765-1.55 1.01-.477.186-1.193.404-2.51.464-1.426.066-1.855.08-5.46.08-3.605 0-4.034-.014-5.46-.08-1.317-.06-2.033-.278-2.51-.464-.63-.245-1.08-.538-1.55-1.01-.472-.471-.765-.92-1.01-1.55-.186-.477-.404-1.193-.464-2.51-.066-1.426-.08-1.855-.08-5.46 0-3.605.014-4.034.08-5.46.06-1.317.278-2.033.464-2.51.245-.63.538-1.08 1.01-1.55.471-.472.92-.765 1.55-1.01.477-.186 1.193-.404 2.51-.464 1.426-.066 1.855-.08 5.46-.08z"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                "Continue with Apple"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full border-t border-slate-600"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex justify-center text-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 bg-slate-900 text-slate-400",
                                children: "or continue with email"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleEmailAuth,
                    className: "space-y-4",
                    children: [
                        mode === 'signup' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-300 mb-2",
                                    children: "Full Name"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "absolute left-3 top-3 w-5 h-5 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: name,
                                            onChange: (e)=>setName(e.target.value),
                                            placeholder: "Enter your full name",
                                            className: "w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 129,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-300 mb-2",
                                    children: "Email Address"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                            className: "absolute left-3 top-3 w-5 h-5 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            value: email,
                                            onChange: (e)=>setEmail(e.target.value),
                                            placeholder: "Enter your email",
                                            className: "w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-slate-300 mb-2",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: showPassword ? 'text' : 'password',
                                            value: password,
                                            onChange: (e)=>setPassword(e.target.value),
                                            placeholder: "Enter your password",
                                            className: "w-full pl-4 pr-10 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500",
                                            required: true,
                                            minLength: 6
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowPassword(!showPassword),
                                            className: "absolute right-3 top-3 text-slate-400 hover:text-slate-300",
                                            children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                                lineNumber: 183,
                                                columnNumber: 33
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                                lineNumber: 183,
                                                columnNumber: 66
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 189,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            className: "w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3",
                            disabled: loading,
                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, this),
                                    mode === 'login' ? 'Signing in...' : 'Creating account...'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                lineNumber: 200,
                                columnNumber: 15
                            }, this) : mode === 'login' ? 'Sign In' : 'Create Account'
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400",
                        children: [
                            mode === 'login' ? "Don't have an account?" : "Already have an account?",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setMode(mode === 'login' ? 'signup' : 'login');
                                    setError('');
                                },
                                className: "text-cyan-400 hover:text-cyan-300 font-medium",
                                children: mode === 'login' ? 'Sign up' : 'Sign in'
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
                    lineNumber: 211,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(AuthModal, "PNDG/p9xbChs8aooJSmPxHKayUQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/components/AuthProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/components/AuthModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function Header() {
    _s();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const navItems = [
        {
            href: '#how-it-works',
            label: 'How it works'
        },
        {
            href: '#examples',
            label: 'Examples'
        },
        {
            href: '#guarantee',
            label: 'Guarantee'
        }
    ];
    const handleSignOut = async ()=>{
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center h-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "text-2xl font-bold text-white tracking-tight hover:text-slate-200 transition-colors",
                                    children: "SLAVA"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "hidden md:flex items-center space-x-8",
                                    children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: item.href,
                                            className: "text-slate-300 hover:text-white transition-colors text-sm font-medium",
                                            children: item.label
                                        }, item.href, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                            lineNumber: 42,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:flex items-center space-x-4",
                                    children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    className: "text-slate-300 hover:text-white hover:bg-slate-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            className: "w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                            lineNumber: 58,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Dashboard"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                    lineNumber: 57,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 56,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: handleSignOut,
                                                variant: "ghost",
                                                size: "sm",
                                                className: "text-slate-300 hover:text-white hover:bg-slate-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                        className: "w-4 h-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                        lineNumber: 68,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Sign Out"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 62,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/design",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    className: "bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6",
                                                    children: "Design Now"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 71,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                        lineNumber: 55,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: ()=>setIsAuthModalOpen(true),
                                                variant: "ghost",
                                                size: "sm",
                                                className: "text-slate-300 hover:text-white hover:bg-slate-800",
                                                children: "Sign In"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 79,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/design",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    className: "bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6",
                                                    children: "Design Now"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsMobileMenuOpen(!isMobileMenuOpen),
                                    className: "md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors",
                                    children: isMobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                        className: "w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                        lineNumber: 104,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        isMobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:hidden py-4 border-t border-slate-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "space-y-2",
                                    children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: item.href,
                                            onClick: ()=>setIsMobileMenuOpen(false),
                                            className: "block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors",
                                            children: item.label
                                        }, item.href, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                            lineNumber: 114,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-4 border-t border-slate-800 space-y-2",
                                    children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard",
                                                onClick: ()=>setIsMobileMenuOpen(false),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    className: "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            className: "w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 25
                                                        }, this),
                                                        "Dashboard"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 128,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: ()=>{
                                                    handleSignOut();
                                                    setIsMobileMenuOpen(false);
                                                },
                                                variant: "ghost",
                                                className: "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                        className: "w-4 h-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Sign Out"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 134,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/design",
                                                onClick: ()=>setIsMobileMenuOpen(false),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    className: "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold",
                                                    children: "Design Now"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 145,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: ()=>{
                                                    setIsAuthModalOpen(true);
                                                    setIsMobileMenuOpen(false);
                                                },
                                                variant: "ghost",
                                                className: "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
                                                children: "Sign In"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 153,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/design",
                                                onClick: ()=>setIsMobileMenuOpen(false),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    className: "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold",
                                                    children: "Design Now"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                                lineNumber: 163,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                            lineNumber: 111,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthModal"], {
                isOpen: isAuthModalOpen,
                onClose: ()=>setIsAuthModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Header, "kcaxpWn1X5qyFkFNF6p1ZsWph3k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/components/AuthProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/components/Header.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function HomePage() {
    _s();
    const [exampleDesigns, setExampleDesigns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            // Load our consistent design examples
            fetch('/consistent-designs-local.json').then({
                "HomePage.useEffect": (res)=>res.json()
            }["HomePage.useEffect"]).then({
                "HomePage.useEffect": (data)=>{
                    // Use the hero_angle or packshot image for homepage previews
                    const updatedData = data.map({
                        "HomePage.useEffect.updatedData": (design)=>({
                                ...design,
                                // Use the hero_angle image for main display
                                image_url: design.images?.find({
                                    "HomePage.useEffect.updatedData": (img)=>img.type === 'hero_angle'
                                }["HomePage.useEffect.updatedData"])?.local_url || design.images?.find({
                                    "HomePage.useEffect.updatedData": (img)=>img.type === 'packshot'
                                }["HomePage.useEffect.updatedData"])?.local_url || design.images?.[0]?.local_url
                            })
                    }["HomePage.useEffect.updatedData"]);
                    setExampleDesigns(updatedData);
                }
            }["HomePage.useEffect"]).catch({
                "HomePage.useEffect": (err)=>{
                    console.log('Consistent designs not loaded, trying fallback...');
                    // Fallback to original examples
                    fetch('/example-designs-local.json').then({
                        "HomePage.useEffect": (res)=>res.json()
                    }["HomePage.useEffect"]).then({
                        "HomePage.useEffect": (data)=>{
                            const updatedData = data.map({
                                "HomePage.useEffect.updatedData": (design)=>({
                                        ...design,
                                        image_url: design.local_image_url || design.image_url
                                    })
                            }["HomePage.useEffect.updatedData"]);
                            setExampleDesigns(updatedData);
                        }
                    }["HomePage.useEffect"]).catch({
                        "HomePage.useEffect": (err)=>console.log('Examples not loaded yet')
                    }["HomePage.useEffect"]);
                }
            }["HomePage.useEffect"]);
        }
    }["HomePage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen relative bg-slate-950",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-0",
                    style: {
                        backgroundImage: `url('/manhattan-skyline.svg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center bottom',
                        backgroundRepeat: 'no-repeat',
                        filter: 'grayscale(100%) contrast(0.8) brightness(0.4) opacity(0.7) blur(0.5px)'
                    }
                }, void 0, false, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                    lineNumber: 58,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-1 pointer-events-none",
                    style: {
                        background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.7) 0%, rgba(15, 23, 42, 0.85) 40%, rgba(30, 41, 59, 0.9) 70%, rgba(2, 6, 23, 0.95) 100%)'
                    }
                }, void 0, false, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                    lineNumber: 70,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-1 pointer-events-none",
                    style: {
                        background: `radial-gradient(ellipse at 25% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 85%, rgba(34, 197, 94, 0.03) 0%, transparent 40%),
                       radial-gradient(ellipse at 75% 80%, rgba(251, 191, 36, 0.04) 0%, transparent 45%)`
                    }
                }, void 0, false, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                    lineNumber: 78,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "relative px-4 sm:px-6 py-12 sm:py-16 md:py-24 pt-24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-7xl mx-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-6 sm:space-y-8 text-center lg:text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "hidden sm:inline",
                                                            children: "Delivered in 5 Business Days"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "sm:hidden",
                                                            children: "5-Day Delivery"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight",
                                                    children: [
                                                        "Design Your Dream Jewelry with",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent",
                                                            children: "AI Magic"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0",
                                                    children: [
                                                        "Simply describe your vision in words. Our AI instantly creates photorealistic designs and detailed specifications. Master jewelers in NYC handcraft your unique piece and deliver it in just",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-cyan-400",
                                                            children: "5 business days"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 113,
                                                            columnNumber: 17
                                                        }, this),
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:max-w-none lg:mx-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            asChild: true,
                                                            className: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group shadow-lg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/design",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                        className: "w-4 sm:w-5 h-4 sm:h-5 mr-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 119,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "hidden sm:inline",
                                                                        children: "Start Designing Now"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 120,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "sm:hidden",
                                                                        children: "Design Now"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 121,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                        className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 122,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 118,
                                                                columnNumber: 15
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            asChild: true,
                                                            className: "border-slate-600 text-slate-300 hover:bg-slate-800 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "#examples",
                                                                children: "See Examples"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 126,
                                                                columnNumber: 19
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center sm:justify-start space-x-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                        className: "w-5 h-5 text-blue-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 134,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 133,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-medium text-slate-200",
                                                                            children: "AI-Powered"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                            lineNumber: 137,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-400",
                                                                            children: "Instant designs"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                            lineNumber: 138,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 136,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 132,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center sm:justify-start space-x-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                        className: "w-5 h-5 text-cyan-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 143,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 142,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-medium text-slate-200",
                                                                            children: "5-Day Delivery"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                            lineNumber: 146,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-400",
                                                                            children: "Guaranteed"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                            lineNumber: 147,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 145,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center sm:justify-start space-x-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                        className: "w-5 h-5 text-teal-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 152,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 151,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-medium text-slate-200",
                                                                            children: "NYC Crafted"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                            lineNumber: 155,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-slate-400",
                                                                            children: "Master jewelers"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                            lineNumber: 156,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 154,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                            lineNumber: 94,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative mt-8 lg:mt-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-3 sm:gap-4",
                                                    children: exampleDesigns.slice(0, 4).map((design, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/design?prompt=${encodeURIComponent(design.prompt || '')}`,
                                                            className: "relative group cursor-pointer",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 group-hover:border-cyan-500 transition-all",
                                                                    children: design.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: design.image_url,
                                                                        alt: design.title,
                                                                        className: "w-full h-full object-cover transition-transform group-hover:scale-105"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 173,
                                                                        columnNumber: 25
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-full h-full flex items-center justify-center text-slate-500",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                            className: "w-6 sm:w-8 h-6 sm:h-8"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                            lineNumber: 180,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 179,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 171,
                                                                    columnNumber: 21
                                                                }, this),
                                                                design.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute bottom-2 sm:bottom-4 left-2 sm:left-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-white text-xs sm:text-sm font-medium",
                                                                                children: design.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                                lineNumber: 187,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex space-x-1 mt-1",
                                                                                children: design.tags?.slice(0, 2).map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white",
                                                                                        children: tag
                                                                                    }, i, false, {
                                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                                        lineNumber: 190,
                                                                                        columnNumber: 31
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                                lineNumber: 188,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-cyan-400 text-xs mt-2 font-medium",
                                                                                children: "Click to edit and design →"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                                lineNumber: 195,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 186,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 185,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 166,
                                                            columnNumber: 19
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-xl opacity-20 animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -bottom-4 -left-4 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                    lineNumber: 93,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                lineNumber: 92,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                            lineNumber: 91,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "px-6 py-12 bg-stone-900/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-7xl mx-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-8 text-stone-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl font-bold text-stone-100",
                                                            children: "1000+"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm",
                                                            children: "Designs Created"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl font-bold text-stone-100",
                                                            children: "5 Days"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm",
                                                            children: "Average Delivery"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl font-bold text-stone-100",
                                                            children: "4.9★"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm",
                                                            children: "Customer Rating"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex",
                                                    children: [
                                                        1,
                                                        2,
                                                        3,
                                                        4,
                                                        5
                                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                            className: "w-5 h-5 fill-amber-400 text-amber-400"
                                                        }, i, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 19
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-stone-300 ml-2",
                                                    children: '"Absolutely stunning results" - Sarah M.'
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                    lineNumber: 214,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                lineNumber: 213,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                            lineNumber: 212,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "how-it-works",
                            className: "px-6 py-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-7xl mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mb-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl md:text-4xl font-bold text-stone-100 mb-4",
                                                children: "From Idea to Reality in 3 Steps"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 245,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl text-stone-400 max-w-2xl mx-auto",
                                                children: "Our revolutionary AI-powered process makes custom jewelry accessible to everyone"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 248,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-3 gap-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-black",
                                                        children: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-semibold text-stone-100",
                                                        children: "Describe Your Dream"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-stone-400 leading-relaxed",
                                                        children: 'Tell us what you envision. "A vintage art deco engagement ring inspired by Grace Kelly\'s elegance..." Our AI understands natural language and style preferences.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white",
                                                        children: "2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-semibold text-stone-100",
                                                        children: "AI Creates Your Design"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 269,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-stone-400 leading-relaxed",
                                                        children: "In under 30 seconds, our AI generates photorealistic images and detailed manufacturing specifications. See exactly how your piece will look from every angle."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 265,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-2xl font-bold text-white",
                                                        children: "3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-semibold text-stone-100",
                                                        children: "Handcrafted & Delivered"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 280,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-stone-400 leading-relaxed",
                                                        children: "Master jewelers in NYC review, approve, and handcraft your piece with meticulous attention to detail. Delivered to your door in just 5 business days."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 253,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                lineNumber: 243,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                            lineNumber: 242,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "examples",
                            className: "px-6 py-20 bg-stone-900/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-7xl mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mb-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl md:text-4xl font-bold text-stone-100 mb-4",
                                                children: "Real AI-Generated Designs"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl text-stone-400 max-w-3xl mx-auto",
                                                children: "These stunning pieces were created from simple text descriptions using our AI. Each design is unique and ready to become reality in just 5 days."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 297,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 293,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12",
                                        children: exampleDesigns.slice(0, 6).map((design, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/design?prompt=${encodeURIComponent(design.prompt || '')}`,
                                                className: "bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 group hover:border-cyan-500 transition-all hover:transform hover:scale-105 cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "aspect-square relative",
                                                        children: [
                                                            design.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: design.image_url,
                                                                alt: design.title,
                                                                className: "w-full h-full object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 21
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full h-full bg-stone-800 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                    className: "w-12 h-12 text-stone-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 319,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full",
                                                                children: "AI Generated"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-cyan-400 font-medium text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full",
                                                                    children: "Click to edit prompt →"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 326,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-semibold text-stone-100 mb-2",
                                                                children: design.title || 'Custom Design'
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 332,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-stone-400 text-sm mb-4 line-clamp-2",
                                                                children: [
                                                                    design.prompt?.slice(0, 120),
                                                                    "..."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 333,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-2",
                                                                children: design.tags?.slice(0, 3).map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 bg-stone-800 border border-stone-600 rounded-full text-xs text-stone-300",
                                                                        children: tag
                                                                    }, i, false, {
                                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                        lineNumber: 338,
                                                                        columnNumber: 23
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 15
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            asChild: true,
                                            className: "bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-6 text-lg group",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/design",
                                                children: [
                                                    "Create Your Own Design",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 350,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                            lineNumber: 349,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 348,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                lineNumber: 292,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                            lineNumber: 291,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "guarantee",
                            className: "px-6 py-20 bg-gradient-to-r from-amber-500/10 to-orange-500/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-6xl mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mb-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl md:text-4xl font-bold text-stone-100 mb-6",
                                                children: "Our Unbeatable Guarantee"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 363,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl text-stone-300 max-w-3xl mx-auto",
                                                children: "We're so confident in our process that we offer industry-leading guarantees. Your satisfaction is our obsession."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 366,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 362,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-3 gap-8 mb-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center bg-stone-900/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "w-16 h-16 mx-auto mb-4 text-amber-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-stone-100 mb-3 text-xl",
                                                        children: "5-Day Delivery"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-stone-400",
                                                        children: "Guaranteed delivery in 5 business days or your money back. No exceptions."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center bg-stone-900/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                        className: "w-16 h-16 mx-auto mb-4 text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-stone-100 mb-3 text-xl",
                                                        children: "Master Craftsmanship"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-stone-400",
                                                        children: "Every piece crafted by NYC's finest jewelers with decades of experience."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 378,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center bg-stone-900/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                        className: "w-16 h-16 mx-auto mb-4 text-green-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-stone-100 mb-3 text-xl",
                                                        children: "Lifetime Warranty"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-stone-400",
                                                        children: "Free repairs, resizing, and polishing for the lifetime of your piece."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 383,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 372,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center bg-stone-900/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-stone-100 mb-2",
                                                children: "100% Satisfaction Guarantee"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 391,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-stone-300",
                                                children: "Not completely in love with your piece? We'll remake it until you are, or provide a full refund."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 392,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 390,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                lineNumber: 361,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                            lineNumber: 360,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "px-6 py-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-4xl mx-auto text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl md:text-5xl font-bold text-stone-100 mb-6",
                                        children: "Ready to Create Your Dream Piece?"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 400,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl text-stone-400 mb-8 max-w-2xl mx-auto",
                                        children: "Join thousands of customers who've brought their jewelry visions to life with AI. Your perfect piece is just one description away."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 403,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                asChild: true,
                                                className: "bg-amber-500 hover:bg-amber-600 text-black font-bold px-12 py-8 text-xl group",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/design",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "w-6 h-6 mr-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 17
                                                        }, this),
                                                        "Start Designing Now",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            className: "w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                            lineNumber: 412,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 13
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 408,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-stone-500 text-sm",
                                                children: "Free AI design generation • No commitment until you love it • 5-day delivery guaranteed"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                lineNumber: 399,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                            lineNumber: 398,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                            className: "px-6 py-12 border-t border-stone-800 bg-stone-950/50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-7xl mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-4 gap-8 mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-xl mb-4 text-stone-100",
                                                        children: "SLAVA"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 427,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-stone-400 mb-4",
                                                        children: "AI-powered custom jewelry, handcrafted in NYC. Where technology meets artistry."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 428,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex space-x-2",
                                                        children: [
                                                            [
                                                                1,
                                                                2,
                                                                3,
                                                                4,
                                                                5
                                                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                    className: "w-4 h-4 fill-amber-400 text-amber-400"
                                                                }, i, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 433,
                                                                    columnNumber: 19
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-stone-400 text-sm ml-2",
                                                                children: "4.9/5 from 500+ reviews"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 435,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 431,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 426,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold mb-4 text-stone-200",
                                                        children: "Product"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-2 text-stone-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/design",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "AI Design Tool"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 441,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "#examples",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "Design Examples"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 442,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 442,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "#guarantee",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "Guarantees"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 443,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 443,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 438,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold mb-4 text-stone-200",
                                                        children: "Company"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-2 text-stone-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "#",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "About Us"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 449,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "#",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "Master Jewelers"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 450,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 450,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "#",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "Contact"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 451,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 451,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "#",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "FAQ"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 452,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 448,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold mb-4 text-stone-200",
                                                        children: "Legal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 456,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-2 text-stone-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "#",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "Privacy Policy"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 458,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 458,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "#",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "Terms of Service"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 459,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 459,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "#",
                                                                    className: "hover:text-stone-300 transition-colors",
                                                                    children: "Warranty"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                    lineNumber: 460,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                                lineNumber: 460,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 455,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-stone-500 text-sm mb-4 md:mb-0",
                                                children: "© 2024 Slava Jewelry Studio. Handcrafted with AI and love in NYC."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 465,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-4 text-stone-400 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "🇺🇸 Made in NYC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "⚡ 5-Day Delivery"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "💎 Lifetime Warranty"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                                lineNumber: 468,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                        lineNumber: 464,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                                lineNumber: 424,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                            lineNumber: 423,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
                    lineNumber: 88,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/Cursor-projects/slava jewlery/app/page.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(HomePage, "irW8x0Vev2ElHqanN8eUEsPk6M8=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_Cursor-projects_slava%20jewlery_816ed48b._.js.map