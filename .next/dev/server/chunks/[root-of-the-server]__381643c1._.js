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
"[project]/Documents/Cursor-projects/slava jewlery/app/api/design/generate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/Documents/Cursor-projects/slava jewlery/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
;
const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
});
// Image types for jewelry photography - SAME design, different views
const IMAGE_TYPES = [
    {
        type: 'packshot_front',
        description: 'clean white background, front view, product photography'
    },
    {
        type: 'hero_angle',
        description: '3/4 angle view with dramatic studio lighting and shadows'
    },
    {
        type: 'on_model_worn',
        description: 'worn on elegant hand/neck/ear, natural skin tone, lifestyle photography'
    },
    {
        type: 'macro_detail',
        description: 'extreme close-up showing intricate details and craftsmanship, macro lens'
    }
];
async function POST(request) {
    try {
        const body = await request.json();
        const { user_vision, ...designData } = body;
        if (!user_vision || typeof user_vision !== 'string' || user_vision.trim().length < 10) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please provide a detailed description of your jewelry vision'
            }, {
                status: 400
            });
        }
        if (!process.env.OPENAI_API_KEY) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'OpenAI API key not configured'
            }, {
                status: 500
            });
        }
        console.log('Generating jewelry design for:', user_vision.slice(0, 100) + '...');
        // Generate multiple views of the SAME design
        const baseDesignPrompt = `Professional jewelry photography of this exact piece: ${user_vision}`;
        const imagePromises = IMAGE_TYPES.map(async (imageType)=>{
            const fullPrompt = `${baseDesignPrompt}, ${imageType.description}, high detail luxury jewelry photography, 4k resolution, professional lighting`;
            console.log(`Generating ${imageType.type} of the same design...`);
            try {
                const imageResponse = await openai.images.generate({
                    model: "dall-e-3",
                    prompt: fullPrompt,
                    n: 1,
                    size: "1024x1024",
                    quality: "hd",
                    style: "natural"
                });
                return {
                    type: imageType.type,
                    url: imageResponse.data?.[0]?.url || null,
                    prompt: fullPrompt,
                    revised_prompt: imageResponse.data?.[0]?.revised_prompt || null
                };
            } catch (imageError) {
                console.error(`Error generating ${imageType.type}:`, imageError);
                return {
                    type: imageType.type,
                    url: null,
                    error: imageError instanceof Error ? imageError.message : 'Image generation failed'
                };
            }
        });
        // Wait for all images to generate
        const images = await Promise.all(imagePromises);
        // Filter out failed generations
        const successfulImages = images.filter((img)=>img.url);
        const failedImages = images.filter((img)=>!img.url);
        console.log(`Generated ${successfulImages.length}/${images.length} images successfully`);
        if (successfulImages.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Failed to generate any images. Please try again.'
            }, {
                status: 500
            });
        }
        // Generate design specifications using GPT-4
        let specifications = null;
        try {
            const specPrompt = `As a master jeweler, create detailed manufacturing specifications for this custom jewelry piece:

Design Vision: ${user_vision}

Provide concise specifications including:
1. Materials and dimensions
2. Stone specifications  
3. Manufacturing techniques
4. Estimated timeline
5. Price range

Keep response under 300 words and focus on technical details.`;
            const specResponse = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: specPrompt
                    }
                ],
                max_tokens: 400,
                temperature: 0.3
            });
            specifications = specResponse.choices[0].message.content;
        } catch (specError) {
            console.error('Error generating specifications:', specError);
            specifications = 'Specifications generation temporarily unavailable. Our team will provide detailed specs upon request.';
        }
        const response = {
            success: true,
            images: successfulImages,
            specifications,
            user_vision,
            generated_at: new Date().toISOString(),
            ...failedImages.length > 0 && {
                warnings: `${failedImages.length} image(s) failed to generate`
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
    } catch (error) {
        console.error('Design generation error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Cursor$2d$projects$2f$slava__jewlery$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Internal server error',
            success: false
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__381643c1._.js.map