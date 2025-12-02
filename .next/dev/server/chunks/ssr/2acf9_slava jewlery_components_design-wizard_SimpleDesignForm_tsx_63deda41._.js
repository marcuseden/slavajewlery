module.exports = [
"[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// Simplified tag clouds - only Type, Style, and Material
const JEWELRY_TYPES = [
    'engagement ring',
    'wedding band',
    'necklace',
    'earrings',
    'bracelet',
    'pendant',
    'cocktail ring',
    'tennis bracelet',
    'choker',
    'cuff bracelet'
];
const STYLES = [
    'vintage',
    'modern',
    'minimalist',
    'art deco',
    'classic',
    'bohemian',
    'punk',
    'disco',
    'victorian',
    'romantic',
    'bold',
    'delicate'
];
const MATERIALS = [
    'platinum',
    'yellow gold',
    'white gold',
    'rose gold',
    'sterling silver',
    '14k gold',
    '18k gold',
    'brushed steel',
    'polished finish',
    'matte finish'
];
// Example prompts with celebrity and subculture inspiration
const EXAMPLE_PROMPTS = [
    {
        title: "Madonna Punk Ring",
        prompt: "A bold punk rock cocktail ring inspired by Madonna, chunky silver with spikes and dark gemstone, edgy 1980s rebellion style",
        image: "/example-designs.json" // Will load from our generated examples
    },
    {
        title: "Grace Kelly Classic",
        prompt: "A classic engagement ring inspired by Grace Kelly, platinum setting with brilliant round diamond, timeless 1950s Hollywood glamour",
        image: "/example-designs.json"
    },
    {
        title: "Bowie Art Deco Earrings",
        prompt: "Statement art deco earrings inspired by David Bowie, geometric gold design with angular patterns, 1920s glamour meets rock star attitude",
        image: "/example-designs.json"
    },
    {
        title: "Frida Bohemian Bracelet",
        prompt: "A bohemian charm bracelet inspired by Frida Kahlo, rose gold with colorful gemstones and artistic charms, Mexican folk art influence",
        image: "/example-designs.json"
    },
    {
        title: "Cher Disco Statement",
        prompt: "Bold disco-era statement earrings inspired by Cher, large geometric hoops in white gold with sparkling crystals, 1970s glamour",
        image: "/example-designs.json"
    }
];
export function SimpleDesignForm() {
    const [vision, setVision] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [error, setError] = useState('');
    const [showTips, setShowTips] = useState(true);
    const handleGenerate = async ()=>{
        if (!vision.trim() || vision.length < 20) {
            setError('Please provide a more detailed description (at least 20 characters)');
            return;
        }
        setIsGenerating(true);
        setError('');
        setGeneratedImages([]);
        try {
            const response = await fetch('/api/design/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_vision: vision,
                    intent: 'custom',
                    category: 'jewelry',
                    metal: 'platinum',
                    karat: '950',
                    style_tags: [
                        'custom'
                    ],
                    price_band: '2000-3000',
                    stone_config: {
                        center_stone: {
                            type: 'diamond',
                            shape: 'round',
                            carat: 1
                        }
                    },
                    size_fit: {
                        ring_size: 7
                    }
                })
            });
            if (!response.ok) {
                throw new Error('Failed to generate design');
            }
            const result = await response.json();
            if (result.images && Array.isArray(result.images)) {
                setGeneratedImages(result.images);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Generation error:', err);
            setError(err instanceof Error ? err.message : 'Failed to generate design');
        } finally{
            setIsGenerating(false);
        }
    };
    const addToVision = (text)=>{
        const currentText = vision.trim();
        const separator = currentText.length > 0 ? currentText.endsWith('.') || currentText.endsWith(',') ? ' ' : ', ' : '';
        const newVision = currentText + separator + text;
        setVision(newVision);
    };
    return /*#__PURE__*/ _jsxDEV("div", {
        className: "min-h-screen bg-stone-950",
        children: [
            /*#__PURE__*/ _jsxDEV("header", {
                className: "border-b border-stone-800 bg-stone-950",
                children: /*#__PURE__*/ _jsxDEV("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex justify-between items-center h-16",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "flex items-center",
                                children: /*#__PURE__*/ _jsxDEV(Link, {
                                    href: "/",
                                    className: "text-xl font-semibold text-stone-100 hover:text-stone-300 transition-colors",
                                    children: "Slava Jewelry Studio"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        className: "text-stone-400 text-sm",
                                        children: "AI Design Generator"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV(Link, {
                                        href: "/",
                                        className: "text-stone-400 hover:text-stone-300 text-sm transition-colors",
                                        children: "Home"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 137,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "max-w-4xl mx-auto px-4 py-12",
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "text-center mb-12",
                        children: [
                            /*#__PURE__*/ _jsxDEV("h1", {
                                className: "text-4xl font-bold text-stone-100 mb-4",
                                children: "Design Your Dream Jewelry"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-xl text-stone-400 mb-8",
                                children: "Describe your vision and watch AI bring it to life with photorealistic images"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    showTips && /*#__PURE__*/ _jsxDEV("div", {
                        className: "bg-stone-900 border border-stone-700 rounded-lg p-6 mb-6",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "flex justify-between items-center mb-6",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("h2", {
                                        className: "text-xl font-semibold text-stone-100",
                                        children: "Quick Tags"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV("button", {
                                        onClick: ()=>setShowTips(false),
                                        className: "text-stone-400 hover:text-stone-300 text-sm",
                                        children: "Hide ×"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("h3", {
                                                className: "text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider",
                                                children: "Type"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: JEWELRY_TYPES.map((type)=>/*#__PURE__*/ _jsxDEV("button", {
                                                        onClick: ()=>addToVision(type),
                                                        className: "px-3 py-1.5 text-sm bg-stone-800 border border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200 transition-all",
                                                        children: type
                                                    }, type, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("h3", {
                                                className: "text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider",
                                                children: "Style"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: STYLES.map((style)=>/*#__PURE__*/ _jsxDEV("button", {
                                                        onClick: ()=>addToVision(style),
                                                        className: "px-3 py-1.5 text-sm bg-stone-800 border border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200 transition-all",
                                                        children: style
                                                    }, style, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 198,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("h3", {
                                                className: "text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider",
                                                children: "Material"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: MATERIALS.map((material)=>/*#__PURE__*/ _jsxDEV("button", {
                                                        onClick: ()=>addToVision(material),
                                                        className: "px-3 py-1.5 text-sm bg-stone-800 border border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200 transition-all",
                                                        children: material
                                                    }, material, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this),
                    !showTips && /*#__PURE__*/ _jsxDEV("div", {
                        className: "text-center mb-6",
                        children: /*#__PURE__*/ _jsxDEV("button", {
                            onClick: ()=>setShowTips(true),
                            className: "text-stone-400 hover:text-stone-300 text-sm underline",
                            children: "Show design helpers and inspiration"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                            lineNumber: 234,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "bg-stone-900 border border-stone-700 rounded-lg p-8 mb-8",
                        children: /*#__PURE__*/ _jsxDEV("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ _jsxDEV("div", {
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("label", {
                                            htmlFor: "vision",
                                            className: "block text-lg font-medium text-stone-200 mb-4",
                                            children: "Describe your jewelry vision"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                            lineNumber: 247,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("textarea", {
                                            id: "vision",
                                            value: vision,
                                            onChange: (e)=>setVision(e.target.value),
                                            placeholder: "Start typing or click the tags above to build your description... For example: 'A vintage-inspired engagement ring with art deco elements, platinum setting with a 1.5 carat oval diamond and small sapphire accents in geometric patterns, inspired by Audrey Hepburn elegance'",
                                            className: "w-full h-32 p-4 bg-stone-800 border border-stone-600 rounded-lg text-stone-100 placeholder-stone-500 focus:border-stone-400 focus:outline-none resize-none",
                                            rows: 6
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "flex justify-between items-center mt-2",
                                            children: [
                                                /*#__PURE__*/ _jsxDEV("span", {
                                                    className: `text-sm ${vision.length >= 20 ? 'text-stone-400' : 'text-stone-500'}`,
                                                    children: [
                                                        vision.length,
                                                        "/20 characters minimum"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 17
                                                }, this),
                                                vision.length >= 100 && /*#__PURE__*/ _jsxDEV("span", {
                                                    className: "text-sm text-stone-400",
                                                    children: "Great detail! 👍"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ _jsxDEV("div", {
                                    className: "bg-red-900/20 border border-red-700 rounded-lg p-4",
                                    children: /*#__PURE__*/ _jsxDEV("p", {
                                        className: "text-red-400",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 272,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ _jsxDEV(Button, {
                                    onClick: handleGenerate,
                                    disabled: isGenerating || !vision.trim() || vision.length < 20,
                                    className: "w-full bg-stone-100 text-stone-900 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-lg",
                                    children: isGenerating ? /*#__PURE__*/ _jsxDEV("div", {
                                        className: "flex items-center justify-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "animate-spin rounded-full h-5 w-5 border-b-2 border-stone-900"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 283,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("span", {
                                                children: "Generating design..."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 284,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 282,
                                        columnNumber: 17
                                    }, this) : 'Generate Jewelry Design'
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                    lineNumber: 276,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    generatedImages.length > 0 && /*#__PURE__*/ _jsxDEV("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ _jsxDEV("h2", {
                                className: "text-2xl font-bold text-stone-100 text-center",
                                children: "Your Generated Design"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                                children: generatedImages.map((image, index)=>/*#__PURE__*/ _jsxDEV("div", {
                                        className: "bg-stone-900 border border-stone-700 rounded-lg overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "aspect-square relative",
                                                children: /*#__PURE__*/ _jsxDEV("img", {
                                                    src: image.url,
                                                    alt: `Generated jewelry design ${index + 1}`,
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 303,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ _jsxDEV("h3", {
                                                        className: "font-medium text-stone-200 mb-2 capitalize",
                                                        children: image.type.replace('_', ' ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ _jsxDEV("p", {
                                                        className: "text-sm text-stone-400",
                                                        children: [
                                                            image.prompt.slice(0, 100),
                                                            "..."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 310,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 302,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "text-center pt-8",
                                children: /*#__PURE__*/ _jsxDEV("div", {
                                    className: "bg-stone-900 border border-stone-700 rounded-lg p-6 max-w-2xl mx-auto",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("h3", {
                                            className: "text-lg font-medium text-stone-200 mb-4",
                                            children: "Love this design?"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                            lineNumber: 324,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("p", {
                                            className: "text-stone-400 mb-6",
                                            children: "Our master jewelers in NYC can bring this vision to life. Each piece is handcrafted to perfection with premium materials and attention to detail."
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ _jsxDEV(Button, {
                                                    className: "w-full bg-stone-100 text-stone-900 hover:bg-stone-200",
                                                    children: "Request Custom Quote"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ _jsxDEV(Button, {
                                                    variant: "outline",
                                                    className: "w-full bg-stone-900 border-stone-600 hover:bg-stone-800",
                                                    onClick: ()=>{
                                                        setGeneratedImages([]);
                                                        setVision('');
                                                    },
                                                    children: "Generate Another Design"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                            lineNumber: 331,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                    lineNumber: 323,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 322,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                        lineNumber: 295,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "mt-16",
                        children: [
                            /*#__PURE__*/ _jsxDEV("h3", {
                                className: "text-xl font-semibold text-stone-200 mb-6 text-center",
                                children: "Celebrity & Subculture Inspired Examples"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                                children: EXAMPLE_PROMPTS.map((example, index)=>/*#__PURE__*/ _jsxDEV("button", {
                                        onClick: ()=>setVision(example.prompt),
                                        className: "text-left bg-stone-800 border border-stone-600 rounded-lg hover:bg-stone-700 hover:border-stone-500 transition-all group overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "aspect-square bg-stone-700 flex items-center justify-center",
                                                children: /*#__PURE__*/ _jsxDEV("span", {
                                                    className: "text-stone-400 text-sm",
                                                    children: "AI Generated Preview"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 363,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ _jsxDEV("h4", {
                                                        className: "font-medium text-stone-200 mb-2",
                                                        children: example.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ _jsxDEV("p", {
                                                        className: "text-stone-400 text-sm line-clamp-3",
                                                        children: [
                                                            '"',
                                                            example.prompt,
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                        lineNumber: 368,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ _jsxDEV("div", {
                                                        className: "mt-3 text-xs text-stone-500 group-hover:text-stone-400",
                                                        children: "Click to use this prompt →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                                lineNumber: 366,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "text-center mt-8",
                                children: /*#__PURE__*/ _jsxDEV("p", {
                                    className: "text-stone-400 text-sm",
                                    children: '💡 Try combinations like "Madonna punk style" or "Grace Kelly elegance" for unique results'
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                    lineNumber: 377,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                                lineNumber: 376,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Cursor-projects/slava jewlery/components/design-wizard/SimpleDesignForm.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=2acf9_slava%20jewlery_components_design-wizard_SimpleDesignForm_tsx_63deda41._.js.map