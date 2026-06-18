(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDistance",
    ()=>formatDistance,
    "formatRelativeTime",
    ()=>formatRelativeTime,
    "formatTime",
    ()=>formatTime,
    "generateMatchScore",
    ()=>generateMatchScore,
    "getInitials",
    ()=>getInitials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0
    }).format(amount);
}
function formatDistance(meters) {
    if (meters < 1000) return "".concat(Math.round(meters), "m");
    return "".concat((meters / 1000).toFixed(1), "km");
}
function formatTime(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit"
    });
}
function formatRelativeTime(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return "".concat(minutes, " phút trước");
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return "".concat(hours, " giờ trước");
    const days = Math.floor(hours / 24);
    if (days < 7) return "".concat(days, " ngày trước");
    return d.toLocaleDateString("vi-VN");
}
function getInitials(name) {
    return name.split(" ").map((n)=>n[0]).join("").toUpperCase().slice(0, 2);
}
function generateMatchScore() {
    return Math.floor(Math.random() * 30) + 70;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "Badge",
    ()=>Badge,
    "BottomSheet",
    ()=>BottomSheet,
    "Button",
    ()=>Button,
    "Card",
    ()=>Card,
    "EmptyState",
    ()=>EmptyState,
    "FAB",
    ()=>FAB,
    "Input",
    ()=>Input,
    "Skeleton",
    ()=>Skeleton,
    "StarRating",
    ()=>StarRating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function Button(param) {
    let { variant = "primary", size = "md", loading = false, icon, fullWidth = false, className, children, disabled, ...props } = param;
    const variants = {
        primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg active:shadow-sm",
        secondary: "bg-surface-100 hover:bg-surface-200 text-text-primary dark:bg-surface-200 dark:hover:bg-surface-300",
        outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10",
        ghost: "text-text-secondary hover:bg-surface-100 hover:text-text-primary dark:hover:bg-surface-200",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-md",
        gold: "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-md shadow-gold-500/20"
    };
    const sizes = {
        sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
        md: "h-10 px-4 text-sm rounded-xl gap-2",
        lg: "h-12 px-6 text-base rounded-xl gap-2.5",
        xl: "h-14 px-8 text-lg rounded-2xl gap-3"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center font-semibold transition-all duration-200 btn-press", "disabled:opacity-50 disabled:pointer-events-none", variants[variant], sizes[size], fullWidth && "w-full", className),
        disabled: disabled || loading,
        ...props,
        children: [
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "animate-spin h-4 w-4",
                viewBox: "0 0 24 24",
                fill: "none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        className: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/index.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        className: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/index.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 58,
                columnNumber: 9
            }, this) : icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "shrink-0",
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this) : null,
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = Button;
function Card(param) {
    let { variant = "default", hover = false, padding = "md", className, children, ...props } = param;
    const variants = {
        default: "bg-[var(--bg-card)] border border-[var(--border-default)]",
        elevated: "bg-[var(--bg-card)] shadow-md",
        outlined: "bg-transparent border-2 border-[var(--border-default)]",
        glass: "glass"
    };
    const paddings = {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-2xl transition-all duration-200", variants[variant], paddings[padding], hover && "card-hover cursor-pointer", className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_c1 = Card;
function Avatar(param) {
    let { src, name, size = "md", verified, premium, className } = param;
    const sizes = {
        xs: "w-6 h-6 text-[8px]",
        sm: "w-8 h-8 text-[10px]",
        md: "w-10 h-10 text-xs",
        lg: "w-12 h-12 text-sm",
        xl: "w-16 h-16 text-lg"
    };
    const initials = name.split(" ").map((n)=>n[0]).join("").slice(0, 2);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative shrink-0", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full flex items-center justify-center font-bold", "bg-primary-50 text-primary-500 dark:bg-primary-500/20", premium && "ring-2 ring-gold-400", sizes[size]),
                children: src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: src,
                    alt: name,
                    className: "w-full h-full rounded-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/index.tsx",
                    lineNumber: 151,
                    columnNumber: 11
                }, this) : initials
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-2.5 h-2.5 text-white",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        fillRule: "evenodd",
                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                        clipRule: "evenodd"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/index.tsx",
                        lineNumber: 159,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/index.tsx",
                    lineNumber: 158,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_c2 = Avatar;
function Badge(param) {
    let { variant = "default", size = "sm", children, className, dot } = param;
    const variants = {
        default: "bg-surface-100 text-text-secondary dark:bg-surface-200",
        primary: "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400",
        success: "bg-success-50 text-success-600 dark:bg-green-500/15 dark:text-green-400",
        warning: "bg-warning-50 text-warning-600 dark:bg-orange-500/15 dark:text-orange-400",
        danger: "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400",
        gold: "bg-gold-50 text-gold-700 dark:bg-gold-500/15 dark:text-gold-400",
        outline: "border border-[var(--border-default)] text-text-secondary"
    };
    const sizes = {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-xs px-2.5 py-1"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap", variants[variant], sizes[size], className),
        children: [
            dot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-1.5 h-1.5 rounded-full bg-current"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 203,
                columnNumber: 15
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 195,
        columnNumber: 5
    }, this);
}
_c3 = Badge;
function Input(param) {
    let { label, error, icon, rightIcon, className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1.5",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-sm font-medium text-[var(--text-heading)]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]",
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/index.tsx",
                        lineNumber: 227,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]", "text-sm text-[var(--text-heading)] placeholder:text-[var(--text-muted)]", "focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500", "transition-all duration-200", icon ? "pl-10" : "pl-4", rightIcon ? "pr-10" : "pr-4", error && "border-red-500 focus:ring-red-500/30", className),
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/index.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    rightIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]",
                        children: rightIcon
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/index.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-red-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 250,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
_c4 = Input;
function Skeleton(param) {
    let { className, variant = "text" } = param;
    const variants = {
        text: "h-4 rounded-md",
        circular: "rounded-full",
        rectangular: "rounded-none",
        rounded: "rounded-2xl"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-shimmer", variants[variant], className)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 272,
        columnNumber: 5
    }, this);
}
_c5 = Skeleton;
function FAB(param) {
    let { icon, size = "lg", variant = "primary", className, ...props } = param;
    const variants = {
        primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30",
        gold: "bg-gold-500 hover:bg-gold-600 text-white shadow-lg shadow-gold-500/30",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30"
    };
    const sizes = {
        md: "w-12 h-12",
        lg: "w-14 h-14"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full flex items-center justify-center transition-all duration-200", "hover:scale-105 active:scale-95", variants[variant], sizes[size], className),
        ...props,
        children: icon
    }, void 0, false, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 298,
        columnNumber: 5
    }, this);
}
_c6 = FAB;
function StarRating(param) {
    let { rating, maxStars = 5, size = "sm", interactive = false, onChange } = param;
    const sizes = {
        sm: "w-3.5 h-3.5",
        md: "w-5 h-5",
        lg: "w-7 h-7"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-0.5",
        children: Array.from({
            length: maxStars
        }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: !interactive,
                onClick: ()=>onChange === null || onChange === void 0 ? void 0 : onChange(i + 1),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(interactive && "cursor-pointer hover:scale-110 transition-transform"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sizes[size], i < Math.floor(rating) ? "text-gold-500" : "text-surface-300 dark:text-surface-400"),
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/index.tsx",
                        lineNumber: 345,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/index.tsx",
                    lineNumber: 337,
                    columnNumber: 11
                }, this)
            }, i, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 330,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 328,
        columnNumber: 5
    }, this);
}
_c7 = StarRating;
function BottomSheet(param) {
    let { open, onClose, children, title } = param;
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-end",
        onClick: onClose,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50 backdrop-blur-sm"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 367,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-h-[85vh] bg-[var(--bg-card)] rounded-t-3xl overflow-y-auto animate-[slide-up_0.3s_ease-out]",
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 bg-[var(--bg-card)] pt-3 pb-2 px-6 z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-1 bg-surface-300 rounded-full mx-auto mb-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/index.tsx",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this),
                            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-[var(--text-heading)]",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/index.tsx",
                                lineNumber: 374,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/index.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 pb-8",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/index.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 366,
        columnNumber: 5
    }, this);
}
_c8 = BottomSheet;
function EmptyState(param) {
    let { icon, title, description, action } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-16 px-6 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-200 flex items-center justify-center mb-4 text-text-tertiary",
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-base font-semibold text-[var(--text-heading)] mb-1",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 398,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-[var(--text-muted)] max-w-xs mb-4",
                children: description
            }, void 0, false, {
                fileName: "[project]/src/components/ui/index.tsx",
                lineNumber: 399,
                columnNumber: 7
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/index.tsx",
        lineNumber: 394,
        columnNumber: 5
    }, this);
}
_c9 = EmptyState;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Button");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "Avatar");
__turbopack_context__.k.register(_c3, "Badge");
__turbopack_context__.k.register(_c4, "Input");
__turbopack_context__.k.register(_c5, "Skeleton");
__turbopack_context__.k.register(_c6, "FAB");
__turbopack_context__.k.register(_c7, "StarRating");
__turbopack_context__.k.register(_c8, "BottomSheet");
__turbopack_context__.k.register(_c9, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ===================================================
// PARAGO - Mock Data for UI Development
// ===================================================
__turbopack_context__.s([
    "currentUser",
    ()=>currentUser,
    "mockAdminStats",
    ()=>mockAdminStats,
    "mockChartData",
    ()=>mockChartData,
    "mockConversations",
    ()=>mockConversations,
    "mockMessages",
    ()=>mockMessages,
    "mockRides",
    ()=>mockRides,
    "mockUsers",
    ()=>mockUsers
]);
const mockUsers = [
    {
        id: "u1",
        name: "Nguyễn Minh Anh",
        university: "ĐH Bách Khoa Hà Nội",
        faculty: "Công nghệ Thực phẩm",
        rating: 4.9,
        totalRides: 127,
        verified: true,
        isPremium: true,
        role: "driver",
        trustScore: 95,
        ecoPoints: 2450
    },
    {
        id: "u2",
        name: "Trần Đức Huy",
        university: "ĐH Bách Khoa Hà Nội",
        faculty: "CNTT",
        rating: 4.8,
        totalRides: 89,
        verified: true,
        isPremium: false,
        role: "driver",
        trustScore: 92,
        ecoPoints: 1800
    },
    {
        id: "u3",
        name: "Lê Thị Hương",
        university: "ĐH Bách Khoa Hà Nội",
        faculty: "Kinh tế",
        rating: 4.7,
        totalRides: 45,
        verified: true,
        isPremium: false,
        role: "passenger",
        trustScore: 88,
        ecoPoints: 960
    },
    {
        id: "u4",
        name: "Phạm Văn Đức",
        university: "ĐH Quốc Gia Hà Nội",
        faculty: "Luật",
        rating: 4.6,
        totalRides: 34,
        verified: true,
        isPremium: true,
        role: "driver",
        trustScore: 85,
        ecoPoints: 720
    },
    {
        id: "u5",
        name: "Hoàng Thị Mai",
        university: "ĐH Bách Khoa Hà Nội",
        faculty: "Sinh học",
        rating: 5.0,
        totalRides: 67,
        verified: true,
        isPremium: false,
        role: "passenger",
        trustScore: 98,
        ecoPoints: 1540
    }
];
const currentUser = mockUsers[0];
const mockRides = [
    {
        id: "r1",
        driver: mockUsers[1],
        pickup: "KTX Bách Khoa, Hai Bà Trưng, Hà Nội",
        pickupShort: "KTX Bách Khoa",
        destination: "Đại học Bách Khoa Hà Nội, Đống Đa",
        destinationShort: "ĐH Bách Khoa",
        departureTime: "07:30",
        date: "Hôm nay",
        seats: 4,
        seatsAvailable: 2,
        price: 0,
        mode: "community",
        status: "published",
        matchScore: 95,
        distance: "3.2km",
        duration: "12 phút",
        vehicleType: "car",
        vehicleName: "Toyota Vios 2022",
        recurring: "daily",
        genderPreference: "any",
        notes: "Đi đúng giờ, có điều hòa 🚗",
        passengers: [
            mockUsers[2]
        ]
    },
    {
        id: "r2",
        driver: mockUsers[3],
        pickup: "Cầu Giấy, Hà Nội",
        pickupShort: "Cầu Giấy",
        destination: "ĐH Quốc Gia Hà Nội, Xuân Thủy",
        destinationShort: "ĐH Quốc Gia",
        departureTime: "08:00",
        date: "Hôm nay",
        seats: 2,
        seatsAvailable: 1,
        price: 15000,
        mode: "gas-tip",
        status: "published",
        matchScore: 87,
        distance: "5.1km",
        duration: "18 phút",
        vehicleType: "motorcycle",
        recurring: "weekly",
        genderPreference: "any",
        passengers: []
    },
    {
        id: "r3",
        driver: mockUsers[0],
        pickup: "Times City, Hai Bà Trưng",
        pickupShort: "Times City",
        destination: "ĐH Bách Khoa Hà Nội",
        destinationShort: "ĐH Bách Khoa",
        departureTime: "06:45",
        date: "Ngày mai",
        seats: 4,
        seatsAvailable: 3,
        price: 10000,
        mode: "gas-tip",
        status: "published",
        matchScore: 92,
        distance: "4.5km",
        duration: "15 phút",
        vehicleType: "car",
        vehicleName: "Honda City 2023",
        genderPreference: "any",
        notes: "Ghế rộng, đi nhẹ nhàng ✨",
        passengers: []
    },
    {
        id: "r4",
        driver: mockUsers[4],
        pickup: "Thanh Xuân, Hà Nội",
        pickupShort: "Thanh Xuân",
        destination: "ĐH Bách Khoa Hà Nội",
        destinationShort: "ĐH Bách Khoa",
        departureTime: "07:15",
        date: "Hôm nay",
        seats: 2,
        seatsAvailable: 1,
        price: 0,
        mode: "community",
        status: "published",
        matchScore: 78,
        distance: "6.8km",
        duration: "22 phút",
        vehicleType: "motorcycle",
        genderPreference: "female",
        notes: "Chỉ nhận nữ, đi an toàn 💕",
        passengers: []
    },
    {
        id: "r5",
        driver: mockUsers[1],
        pickup: "Hà Đông, Hà Nội",
        pickupShort: "Hà Đông",
        destination: "ĐH Bách Khoa Hà Nội",
        destinationShort: "ĐH Bách Khoa",
        departureTime: "07:00",
        date: "Hôm nay",
        seats: 4,
        seatsAvailable: 1,
        price: 20000,
        mode: "gas-tip",
        status: "matched",
        matchScore: 82,
        distance: "12km",
        duration: "35 phút",
        vehicleType: "car",
        vehicleName: "Mazda 3 2023",
        recurring: "daily",
        genderPreference: "any",
        passengers: [
            mockUsers[2],
            mockUsers[4]
        ]
    }
];
const mockConversations = [
    {
        id: "c1",
        participant: mockUsers[1],
        lastMessage: "Ok bạn, 7:30 mình đón nhé!",
        lastMessageTime: "5 phút trước",
        unreadCount: 2,
        rideId: "r1"
    },
    {
        id: "c2",
        participant: mockUsers[2],
        lastMessage: "Cảm ơn bạn, chuyến đi rất thoải mái 😊",
        lastMessageTime: "1 giờ trước",
        unreadCount: 0
    },
    {
        id: "c3",
        participant: mockUsers[3],
        lastMessage: "Bạn có thể đón ở ngã tư được không?",
        lastMessageTime: "3 giờ trước",
        unreadCount: 1,
        rideId: "r2"
    },
    {
        id: "c4",
        participant: mockUsers[4],
        lastMessage: "Mai mình đi sớm hơn 15p nha",
        lastMessageTime: "Hôm qua",
        unreadCount: 0
    }
];
const mockMessages = [
    {
        id: "m1",
        senderId: "u2",
        content: "Chào bạn! Mình đang tìm người đi chung từ KTX Bách Khoa đến trường, bạn có quan tâm không?",
        type: "text",
        timestamp: "07:20",
        read: true
    },
    {
        id: "m2",
        senderId: "u1",
        content: "Chào bạn! Mình cũng đi tuyến đó hàng ngày. Mình hay đi lúc 7:30 sáng.",
        type: "text",
        timestamp: "07:22",
        read: true
    },
    {
        id: "m3",
        senderId: "u2",
        content: "Tuyệt vời! 7:30 là vừa đẹp. Mình đi xe gì vậy bạn?",
        type: "text",
        timestamp: "07:23",
        read: true
    },
    {
        id: "m4",
        senderId: "u1",
        content: "Mình đi Toyota Vios, có điều hòa, 4 chỗ nha 🚗",
        type: "text",
        timestamp: "07:25",
        read: true
    },
    {
        id: "m5",
        senderId: "u2",
        content: "Ok bạn, 7:30 mình đón nhé!",
        type: "text",
        timestamp: "07:28",
        read: false
    },
    {
        id: "m6",
        senderId: "system",
        content: "⚠️ Không chia sẻ số điện thoại cá nhân qua tin nhắn",
        type: "system",
        timestamp: "07:28",
        read: true
    }
];
const mockAdminStats = {
    totalUsers: 12847,
    verifiedUsers: 9623,
    activeRides: 342,
    completedRides: 28456,
    revenue: 156780000,
    premiumSubscribers: 1247,
    safetyIncidents: 3,
    rideCompletionRate: 94.7,
    userRetention: 87.3
};
const mockChartData = {
    userGrowth: [
        {
            month: "T1",
            users: 2400
        },
        {
            month: "T2",
            users: 3600
        },
        {
            month: "T3",
            users: 5200
        },
        {
            month: "T4",
            users: 6800
        },
        {
            month: "T5",
            users: 8900
        },
        {
            month: "T6",
            users: 12847
        }
    ],
    ridesByDay: [
        {
            day: "T2",
            rides: 45
        },
        {
            day: "T3",
            rides: 52
        },
        {
            day: "T4",
            rides: 48
        },
        {
            day: "T5",
            rides: 61
        },
        {
            day: "T6",
            rides: 55
        },
        {
            day: "T7",
            rides: 38
        },
        {
            day: "CN",
            rides: 23
        }
    ],
    revenueByMonth: [
        {
            month: "T1",
            revenue: 12000000
        },
        {
            month: "T2",
            revenue: 18500000
        },
        {
            month: "T3",
            revenue: 24300000
        },
        {
            month: "T4",
            revenue: 28900000
        },
        {
            month: "T5",
            revenue: 35600000
        },
        {
            month: "T6",
            revenue: 37480000
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/messages/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconChevronLeft.mjs [app-client] (ecmascript) <export default as IconChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhone$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhone.mjs [app-client] (ecmascript) <export default as IconPhone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSend$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSend$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSend.mjs [app-client] (ecmascript) <export default as IconSend>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMoodSmile$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMoodSmile$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconMoodSmile.mjs [app-client] (ecmascript) <export default as IconMoodSmile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs [app-client] (ecmascript) <export default as IconPhoto>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconInfoCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconInfoCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconInfoCircle.mjs [app-client] (ecmascript) <export default as IconInfoCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCar$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCar.mjs [app-client] (ecmascript) <export default as IconCar>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function ChatScreen() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const id = params === null || params === void 0 ? void 0 : params.id;
    const conversation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockConversations"].find((c)=>c.id === id) || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockConversations"][0];
    const ride = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockRides"].find((r)=>r.id === conversation.rideId);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockMessages"][id] || []);
    const [inputText, setInputText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatScreen.useEffect": ()=>{
            var _messagesEndRef_current;
            (_messagesEndRef_current = messagesEndRef.current) === null || _messagesEndRef_current === void 0 ? void 0 : _messagesEndRef_current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatScreen.useEffect"], [
        messages,
        isTyping
    ]);
    const handleSend = ()=>{
        if (!inputText.trim()) return;
        const newMsg = {
            id: Date.now().toString(),
            senderId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentUser"].id,
            text: inputText,
            time: new Date().toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit"
            })
        };
        setMessages((prev)=>[
                ...prev,
                newMsg
            ]);
        setInputText("");
        // Simulate reply
        setIsTyping(true);
        setTimeout(()=>{
            setIsTyping(false);
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        senderId: conversation.participant.id,
                        text: "Ok bạn nhé, mình hiểu rồi.",
                        time: new Date().toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    }
                ]);
        }, 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-screen bg-[var(--bg-primary)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-30 glass-strong safe-top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between h-16 px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.back(),
                                    className: "w-10 h-10 -ml-2 rounded-xl flex items-center justify-center hover:bg-surface-100 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChevronLeft$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChevronLeft$3e$__["IconChevronLeft"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                    name: conversation.participant.name,
                                                    size: "md",
                                                    verified: conversation.participant.verified
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 78,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--bg-card)] rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "font-semibold text-sm text-[var(--text-heading)]",
                                                    children: conversation.participant.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-green-500 font-medium",
                                                    children: "Đang hoạt động"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-10 h-10 rounded-full bg-surface-100 text-primary-500 flex items-center justify-center hover:bg-primary-50 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhone$3e$__["IconPhone"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/messages/[id]/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 overflow-y-auto p-4 space-y-6",
                children: [
                    ride && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-surface-0 rounded-2xl p-4 shadow-sm border border-[var(--border-default)] mx-auto max-w-md w-full mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3 border-b border-[var(--border-default)] pb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm font-medium text-[var(--text-heading)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCar$3e$__["IconCar"], {
                                                size: 16,
                                                className: "text-primary-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this),
                                            "Chuyến đi sắp tới"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-primary-500",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(ride.price)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center mt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 rounded-full bg-primary-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                lineNumber: 110,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-0.5 h-6 bg-surface-200 my-0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                lineNumber: 111,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 rounded-full bg-gold-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                lineNumber: 112,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                                        lineNumber: 109,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium",
                                                children: ride.pickupShort
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium mt-3",
                                                children: ride.destinationShort
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right text-xs text-[var(--text-muted)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: ride.date
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-4",
                                                children: ride.departureTime
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl mx-auto space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-warning-50 dark:bg-warning-500/10 text-warning-600 text-xs py-1.5 px-3 rounded-full flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconInfoCircle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconInfoCircle$3e$__["IconInfoCircle"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this),
                                        "Số điện thoại đã được ẩn để bảo vệ quyền riêng tư"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: messages.map((msg, index)=>{
                                    var _messages_, _messages_1;
                                    const isMine = msg.senderId === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentUser"].id;
                                    const isSystem = msg.senderId === "system";
                                    if (isSystem) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center my-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[var(--text-muted)] bg-surface-100 px-3 py-1 rounded-full",
                                                children: msg.text
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                lineNumber: 144,
                                                columnNumber: 21
                                            }, this)
                                        }, msg.id, false, {
                                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this);
                                    }
                                    // Grouping logic for rounded corners
                                    const isFirstInGroup = index === 0 || ((_messages_ = messages[index - 1]) === null || _messages_ === void 0 ? void 0 : _messages_.senderId) !== msg.senderId;
                                    const isLastInGroup = index === messages.length - 1 || ((_messages_1 = messages[index + 1]) === null || _messages_1 === void 0 ? void 0 : _messages_1.senderId) !== msg.senderId;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex", isMine ? "justify-end" : "justify-start"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-end gap-2 max-w-[75%]",
                                            children: [
                                                !isMine && isLastInGroup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                    name: conversation.participant.name,
                                                    size: "xs",
                                                    className: "mb-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 23
                                                }, this),
                                                !isMine && !isLastInGroup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-6 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 51
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-4 py-2.5 text-sm", isMine ? "bg-primary-500 text-white" : "bg-surface-100 dark:bg-surface-200 text-[var(--text-heading)]", isMine ? "rounded-l-2xl rounded-tr-2xl" : "rounded-r-2xl rounded-tl-2xl", isMine && isLastInGroup && "rounded-br-sm", !isMine && isLastInGroup && "rounded-bl-sm"),
                                                    children: [
                                                        msg.text,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] text-right mt-1 opacity-70", isMine ? "text-white" : "text-[var(--text-muted)]"),
                                                            children: msg.time
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                                            lineNumber: 162,
                                            columnNumber: 19
                                        }, this)
                                    }, msg.id, false, {
                                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                className: "flex justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-end gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                            name: conversation.participant.name,
                                            size: "xs",
                                            className: "mb-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-surface-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce",
                                                    style: {
                                                        animationDelay: "0ms"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce",
                                                    style: {
                                                        animationDelay: "150ms"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce",
                                                    style: {
                                                        animationDelay: "300ms"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                                            lineNumber: 198,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesEndRef
                            }, void 0, false, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/messages/[id]/page.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "bg-[var(--bg-card)] border-t border-[var(--border-default)] safe-bottom p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto flex items-end gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-primary-500 hover:bg-surface-100 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPhoto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPhoto$3e$__["IconPhoto"], {
                                size: 22
                            }, void 0, false, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 bg-surface-100 dark:bg-surface-200 rounded-2xl flex items-end pr-2 min-h-[44px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: inputText,
                                    onChange: (e)=>setInputText(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    },
                                    placeholder: "Nhắn tin...",
                                    className: "flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-4 resize-none max-h-32 text-[var(--text-heading)]",
                                    rows: 1
                                }, void 0, false, {
                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                    lineNumber: 217,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-9 h-9 shrink-0 mb-1 rounded-full flex items-center justify-center text-surface-500 hover:text-primary-500 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconMoodSmile$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconMoodSmile$3e$__["IconMoodSmile"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/messages/[id]/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        inputText.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSend,
                            className: "w-11 h-11 shrink-0 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-600 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSend$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSend$3e$__["IconSend"], {
                                size: 20,
                                className: "-ml-0.5"
                            }, void 0, false, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 239,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-surface-400",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSend$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSend$3e$__["IconSend"], {
                                size: 20,
                                className: "-ml-0.5"
                            }, void 0, false, {
                                fileName: "[project]/src/app/messages/[id]/page.tsx",
                                lineNumber: 243,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/messages/[id]/page.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/messages/[id]/page.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/messages/[id]/page.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/messages/[id]/page.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(ChatScreen, "/SW4yo2Ktj8Eu7JQzAdWgRHK1yM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ChatScreen;
var _c;
__turbopack_context__.k.register(_c, "ChatScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_2957448b._.js.map