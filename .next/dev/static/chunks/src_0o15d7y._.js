(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/rduMatcher.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDosageIcon",
    ()=>getDosageIcon,
    "getRduDetails",
    ()=>getRduDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$monographs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/monographs.js [app-client] (ecmascript)");
;
const getDosageIcon = (form)=>{
    if (!form) return '💊';
    const f = form.toLowerCase();
    if (f.includes('tablet') || f.includes('cap') || f.includes('pill')) return '🥤';
    if (f.includes('cream') || f.includes('ointment') || f.includes('gel') || f.includes('lotion')) return '🧴';
    if (f.includes('inject') || f.includes('solution') || f.includes('infusion')) return '💉';
    if (f.includes('drop') || f.includes('eye') || f.includes('ophthalmic')) return '👁️';
    if (f.includes('syrup') || f.includes('suspension') || f.includes('liquid') || f.includes('mixture')) return '🧪';
    if (f.includes('spray') || f.includes('inhal') || f.includes('aerosol')) return '💨';
    return '💊';
};
const getRduDetails = (drug)=>{
    if (!drug) return null;
    const activeIng = drug.a ? drug.a.toLowerCase() : '';
    const dosageForm = drug.d ? drug.d.toLowerCase() : '';
    // ค้นหาคำสำคัญในสารออกฤทธิ์ว่าตรงกับฐานข้อมูล RDU หรือไม่
    let matchedKey = null;
    if (activeIng.includes('clobetasol')) matchedKey = 'clobetasol';
    else if (activeIng.includes('paracetamol') || activeIng.includes('acetaminophen')) matchedKey = 'paracetamol';
    else if (activeIng.includes('amoxicillin')) matchedKey = 'amoxicillin';
    else if (activeIng.includes('ibuprofen')) matchedKey = 'ibuprofen';
    else if (activeIng.includes('atorvastatin')) matchedKey = 'atorvastatin';
    else if (activeIng.includes('metformin')) matchedKey = 'metformin';
    else if (activeIng.includes('omeprazole')) matchedKey = 'omeprazole';
    if (matchedKey && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$monographs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RDU_MONOGRAPHS"][matchedKey]) {
        return {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$monographs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RDU_MONOGRAPHS"][matchedKey],
            isFallback: false
        };
    }
    // Fallback Engine: สร้างข้อมูลคำแนะนำการใช้ยาอัตโนมัติตามรูปแบบยาและสารออกฤทธิ์
    let dynamicCategory = "ยารักษาโรค / ยาแผนปัจจุบัน";
    let dynamicInstructions = "ใช้ยานี้ตามคำสั่งของแพทย์หรือเภสัชกรอย่างเคร่งครัด";
    let dynamicPrecautions = "ห้ามแบ่งยาให้ผู้อื่นรับประทาน และเก็บให้พ้นมือเด็ก";
    let dynamicStorage = "ควรเก็บยาไว้ในที่แห้ง อุณหภูมิต่ำกว่า 30°C ป้องกันแสงแดดและความร้อน";
    // วิเคราะห์ประเภท/รูปแบบยา
    if (dosageForm.includes('tablet') || dosageForm.includes('capsule') || dosageForm.includes('pill')) {
        dynamicCategory = "ยารับประทาน (Oral Medicine)";
        dynamicInstructions = "รับประทานพร้อมน้ำสะอาดตามขนาดและเวลาที่ระบุบนฉลากยาอย่างสม่ำเสมอ";
    } else if (dosageForm.includes('cream') || dosageForm.includes('ointment') || dosageForm.includes('gel') || dosageForm.includes('lotion')) {
        dynamicCategory = "ยาใช้ภายนอก (Topical External Medicine)";
        dynamicInstructions = "ทาบางๆ บริเวณผิวหนังที่มีอาการตามความถี่ที่ระบุบนฉลากยา สำหรับใช้ภายนอกเท่านั้น ห้ามรับประทาน";
        dynamicPrecautions = "ระวังอย่าให้เข้าตา ปาก หรือทาบนแผลเปิดกว้าง หากมีอาการระคายเคืองให้หยุดใช้ทันที";
    } else if (dosageForm.includes('injection') || dosageForm.includes('solution for injection') || dosageForm.includes('infusion')) {
        dynamicCategory = "ยาฉีด (Injectable Medicine)";
        dynamicInstructions = "บริหารยาโดยบุคลากรทางการแพทย์หรือภายใต้การควบคุมตามมาตรฐานทางการแพทย์เท่านั้น";
    } else if (dosageForm.includes('eye drop') || dosageForm.includes('ophthalmic')) {
        dynamicCategory = "ยาหยอดตา (Eye Drops)";
        dynamicInstructions = "หยอดตาตามจำนวนหยดที่กำหนด ระวังอย่าให้ปลายหลอดหยดสัมผัสดวงตาหรือนิ้วมือ";
        dynamicStorage = "เก็บในที่แห้ง ป้องกันแสง และหลังจากเปิดขวดแล้วมักเก็บได้ไม่เกิน 30 วัน";
    }
    const cleanGeneric = drug.a ? drug.a : 'ไม่ระบุชื่อยาสามัญ';
    return {
        thaiGeneric: `${cleanGeneric} (รหัสมาตรฐาน TMT)`,
        category: dynamicCategory,
        indications: `ใช้บรรเทาหรือรักษาโรคตามข้อบ่งชี้ทางเภสัชกรรมของตัวยา ${cleanGeneric} ภายใต้การควบคุมของแพทย์หรือเภสัชกร`,
        instructions: dynamicInstructions,
        adverseEffects: `อาจเกิดอาการไม่พึงประสงค์เฉพาะบุคคล เช่น ผื่นคัน คลื่นไส้ หรือวิงเวียนศีรษะ หากมีอาการรุนแรงควรหยุดยาและพบแพทย์ทันที`,
        contraindications: `ห้ามใช้ในผู้ที่มีประวัติเคยแพ้ยา ${cleanGeneric} หรือส่วนประกอบของยานี้ หรือมีข้อห้ามใช้ทางการแพทย์อื่นๆ`,
        precautions: dynamicPrecautions,
        storage: dynamicStorage,
        isFallback: true
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/drug/[id]/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DrugDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$drugs$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/drugs.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rduMatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/rduMatcher.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function DrugDetailPage({ params }) {
    _s();
    // Extract id from params. Using React.use() is required in Next 15 if params is a Promise, 
    // but if this is a standard client component we can unwrap params if needed. 
    // In Next 15, page params are promises.
    const resolvedParams = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].use(params);
    const id = resolvedParams.id;
    const drug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrugDetailPage.useMemo[drug]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$drugs$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].find({
                "DrugDetailPage.useMemo[drug]": (d)=>d.c === id
            }["DrugDetailPage.useMemo[drug]"]);
        }
    }["DrugDetailPage.useMemo[drug]"], [
        id
    ]);
    const selectedRdu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DrugDetailPage.useMemo[selectedRdu]": ()=>{
            if (!drug) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$rduMatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRduDetails"])(drug);
        }
    }["DrugDetailPage.useMemo[selectedRdu]"], [
        drug
    ]);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!drug || !selectedRdu) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const handleCopy = ()=>{
        const textToCopy = `[ข้อมูลยา RDU]\nชื่อยา: ${drug.t}\nสามัญ: ${drug.a}\nข้อบ่งใช้: ${selectedRdu.indications}\nวิธีใช้: ${selectedRdu.instructions}`;
        navigator.clipboard.writeText(textToCopy).then(()=>{
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "drug-page-wrapper",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "drug-page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "drug-breadcrumb",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "back-link",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "m15 18-6-6 6-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                        lineNumber: 45,
                                        columnNumber: 156
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                "กลับไปหน้าค้นหา"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "breadcrumb-separator",
                            children: "/"
                        }, void 0, false, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "breadcrumb-current",
                            children: drug.t
                        }, void 0, false, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "drug-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "drug-id",
                            children: [
                                "TMT ID: ",
                                drug.c
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "drug-title",
                            children: drug.t
                        }, void 0, false, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "drug-subtitle",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    className: "drug-icon",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M10.5 20.5 19 12a4.95 4.95 0 1 0-7-7L3.5 13.5a4.95 4.95 0 1 0 7 7Z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 57,
                                            columnNumber: 178
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "m8.5 8.5 7 7"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 57,
                                            columnNumber: 256
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                drug.a,
                                " ",
                                drug.s ? `(${drug.s})` : ''
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                selectedRdu.isFallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "drug-alert-banner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "18",
                            height: "18",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 65,
                                    columnNumber: 156
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 9v4"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 65,
                                    columnNumber: 241
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 17h.01"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 65,
                                    columnNumber: 260
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "ข้อควรระวัง:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 66,
                                    columnNumber: 19
                                }, this),
                                " ข้อมูลนี้เป็นข้อมูลแนะนำทั่วไป โปรดปรึกษาแพทย์หรือเภสัชกรก่อนใช้งาน"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "drug-main-grid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "drug-content-column",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "drug-info-list",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "drug-info-item",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "info-label",
                                                    children: "ชื่อภาษาไทย"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                    lineNumber: 77,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "info-value",
                                                    children: selectedRdu.thaiGeneric
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                    lineNumber: 78,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "drug-info-item",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "info-label",
                                                    children: "รูปแบบยา"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "info-value",
                                                    children: selectedRdu.category
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                    lineNumber: 82,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 80,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "drug-info-item",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "info-label",
                                                    children: "หน่วยจ่าย"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                    lineNumber: 85,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "info-value",
                                                    children: drug.u || '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                    lineNumber: 86,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                    className: "drug-divider"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "drug-detail-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "section-heading",
                                            children: "ข้อบ่งใช้ (Indications)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-body",
                                            children: selectedRdu.indications
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "drug-detail-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "section-heading",
                                            children: "คำแนะนำในการใช้ยา"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-body",
                                            style: {
                                                whiteSpace: 'pre-line'
                                            },
                                            children: selectedRdu.instructions
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "drug-detail-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "section-heading",
                                            children: "อาการไม่พึงประสงค์"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-body",
                                            children: selectedRdu.adverseEffects
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "drug-detail-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "section-heading text-danger",
                                            children: "ข้อห้ามใช้ (Contraindications)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-body",
                                            children: selectedRdu.contraindications
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "drug-detail-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "section-heading",
                                            children: "การเก็บรักษา"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-body",
                                            children: selectedRdu.storage
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "drug-actions-column",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "actions-panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "actions-title",
                                        children: "เครื่องมือจัดการ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "action-btn-primary",
                                        onClick: handleCopy,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "18",
                                                height: "18",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        width: "14",
                                                        height: "14",
                                                        x: "8",
                                                        y: "8",
                                                        rx: "2",
                                                        ry: "2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                        lineNumber: 124,
                                                        columnNumber: 160
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                        lineNumber: 124,
                                                        columnNumber: 216
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this),
                                            copied ? 'คัดลอกสำเร็จแล้ว' : 'คัดลอกวิธีใช้ยา'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "action-btn-secondary",
                                        onClick: ()=>window.print(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "18",
                                                height: "18",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                        lineNumber: 129,
                                                        columnNumber: 160
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        width: "12",
                                                        height: "8",
                                                        x: "6",
                                                        y: "14"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                        lineNumber: 129,
                                                        columnNumber: 246
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M6 9V2h12v7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                        lineNumber: 129,
                                                        columnNumber: 288
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/drug/[id]/page.jsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this),
                                            "พิมพ์ฉลาก / PDF"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "actions-help-text",
                                        children: "ข้อมูลอ้างอิง TMT มาตรฐานประเทศไทย สำหรับใช้ตรวจสอบและบันทึกประวัติการรักษาผู้ป่วย"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/drug/[id]/page.jsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/drug/[id]/page.jsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/drug/[id]/page.jsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/drug/[id]/page.jsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/drug/[id]/page.jsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/drug/[id]/page.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(DrugDetailPage, "jfeRxU48EIIeKU1W88nLC0oPCyE=");
_c = DrugDetailPage;
var _c;
__turbopack_context__.k.register(_c, "DrugDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0o15d7y._.js.map