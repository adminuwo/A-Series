import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    Mail,
    Linkedin,
    Briefcase,
    MessageSquare,
    FileText,
    Zap,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    ChevronRight,
    User,
    Layout,
    Settings,
    Shield,
    CreditCard,
    Target,
    Users,
    TrendingUp,
    Award,
    Clock,
    CheckCircle2,
    AlertCircle,
    FilePieChart,
    Search as SearchIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getUserData } from '../userStore/userData';
import { generateChatResponse } from '../services/geminiService';
import { chatStorageService } from '../services/chatStorageService';
import { useNavigate, useParams } from 'react-router';

const AGENTS = [
    { id: 'AISALES', name: 'Sales Engine', icon: Target, category: 'Sales & Growth', color: 'blue', theme: 'from-blue-500/10 to-indigo-500/10' },
    { id: 'AIWRITE', name: 'Content Engine', icon: FileText, category: 'Marketing', color: 'pink', theme: 'from-pink-500/10 to-rose-500/10' },
    { id: 'AIDESK', name: 'Service Engine', icon: MessageSquare, category: 'Support', color: 'emerald', theme: 'from-emerald-500/10 to-teal-500/10' },
    { id: 'AIHIRE', name: 'Talent Engine', icon: Users, category: 'HR & People', color: 'amber', theme: 'from-amber-500/10 to-orange-500/10' },
    { id: 'AIBIZ', name: 'Strategy Engine', icon: BarChart3, category: 'Operations', color: 'purple', theme: 'from-purple-500/10 to-violet-500/10' },
];

export const agentUIConfig = {
    AISALES: {
        displayName: "AI Sales Specialist",
        accentColor: "blue",
        inputs: [
            { type: "select", name: "leadType", label: "Lead Type", options: ["Enterprise", "Small Business", "SaaS Startup", "Digital Agency"] },
            { type: "select", name: "tone", label: "Tone", options: ["Professional", "Friendly", "Persuasive", "Consultative"] }
        ],
        outputSections: [
            "EMAIL SUBJECT",
            "EMAIL BODY",
            "FOLLOW-UP SEQUENCE",
            "OBJECTION HANDLING"
        ]
    },

    AIWRITE: {
        displayName: "AI Content Engine",
        accentColor: "pink",
        inputs: [
            { type: "select", name: "contentType", label: "Content Type", options: ["Blog Post", "Landing Page", "Ad Copy", "Email Campaign", "LinkedIn Post", "Twitter Thread", "Product Description", "SEO Article"] },
            { type: "select", name: "tone", label: "Tone of Voice", options: ["Professional", "Casual", "Bold", "Minimal", "Luxury"] },
            { type: "select", name: "targetAudience", label: "Target Audience", options: ["Startup Founders", "Marketing Teams", "Agencies", "SaaS Companies", "E-commerce Brands", "Personal Brands", "Content Creators", "B2B Decision Makers", "Developers / Tech"] },
            { type: "text", name: "brandPersonality", label: "Brand Personality (Keywords)" },
            { type: "select", name: "objective", label: "Objective", options: ["Traffic (SEO)", "Conversion (Sales)", "Brand Awareness", "Engagement"] },
            { type: "range", name: "writingLength", label: "Word Count Preference (Short/Med/Long)", min: 1, max: 3, step: 1 },
            { type: "checkbox", name: "isSeoMode", label: "Enable SEO Mode" },
            { type: "checkbox", name: "isConversionMode", label: "Enable Conversion Mode" },
            { type: "checkbox", name: "isRepurposeMode", label: "Auto-Repurpose Content" },
            { type: "text", name: "seoKeyword", label: "Primary Keyword / Topic" },
            { type: "textarea", name: "contentContext", label: "Key Points / Context" }
        ],
        outputSections: [
            "MAIN CONTENT",
            "SEO ANALYSIS",
            "CTA OPTIMIZATION",
            "REPURPOSED CONTENT"
        ]
    },

    AIDESK: {
        displayName: "AI Support Agent",
        accentColor: "emerald",
        inputs: [
            { type: "select", name: "ticketCategory", label: "Category", options: ["Technical", "Billing", "Account", "General"] },
            { type: "select", name: "urgency", label: "Urgency", options: ["Low", "Medium", "High", "Critical"] }
        ],
        outputSections: [
            "SUPPORT REPLY",
            "RESOLUTION SUMMARY",
            "SENTIMENT ANALYSIS"
        ]
    },

    AIHIRE: {
        displayName: "AI Talent Intelligence",
        accentColor: "green",
        inputs: [
            { type: "select", name: "industry", label: "Industry", options: ["SaaS", "Ecommerce", "FinTech", "HealthTech", "DevTools"] },
            { type: "select", name: "businessStage", label: "Business Stage", options: ["Seed (1-10)", "Growth (10-50)", "Scale-up (50-200)", "Enterprise"] },
            { type: "select", name: "teamSize", label: "Current Team Size", options: ["1-5", "5-20", "20-50", "50+"] },
            { type: "select", name: "hiringMode", label: "Hiring Mode", options: ["Growth Hiring", "Replacement Hiring", "Founding Team Hiring", "Scaling Team Hiring"] },
            { type: "select", name: "hiringUrgency", label: "Urgency", options: ["Low", "Medium", "High"] },
            { type: "range", name: "budgetRange", label: "Budget Range (k)", min: 50, max: 500, step: 10 }
        ],
        outputSections: [
            "HIRING PLAN",
            "ROLE BREAKDOWN",
            "INTERVIEW FRAMEWORK",
            "TIMELINE ROADMAP",
            "HIRING KPI DASHBOARD"
        ]
    },

    AIBIZ: {
        displayName: "AI Business Strategist",
        badge: "Strategy Consultant",
        accentColor: "red",
        inputs: [
            { type: "select", name: "industry", label: "Industry", options: ["SaaS", "Ecommerce", "Agency", "EdTech", "FinTech", "Healthcare"] },
            { type: "select", name: "businessStage", label: "Business Stage", options: ["Idea Stage", "Early Startup", "Growth Stage", "Scaling Stage"] },
            { type: "select", name: "marketType", label: "Market Type", options: ["B2B", "B2C", "Hybrid"] },
            { type: "textarea", name: "businessDescription", label: "Describe Your Business" }
        ],
        outputSections: [
            "SWOT ANALYSIS",
            "PRICING STRATEGY",
            "POSITIONING STRATEGY",
            "GROWTH ROADMAP"
        ]
    }
};

const AISAWorkSpace = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const [activeAgent, setActiveAgent] = useState(AGENTS[0]);
    const [inputValue, setInputValue] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(sessionId || 'new');

    // AISALES Specialized States
    const [salesTab, setSalesTab] = useState('Cold Email');
    const [leadType, setLeadType] = useState('Enterprise');
    const [tone, setTone] = useState('Professional');
    const [emailType, setEmailType] = useState('Cold Outreach');

    // AIWRITE Specialized States
    const [contentType, setContentType] = useState('SEO Blog Post');
    const [seoKeyword, setSeoKeyword] = useState('');
    const [targetAudience, setTargetAudience] = useState('B2B Decision Makers');
    const [contentContext, setContentContext] = useState('');
    const [brandPersonality, setBrandPersonality] = useState('');
    const [writingLength, setWritingLength] = useState(2); // 1=Short, 2=Medium, 3=Long
    const [objective, setObjective] = useState('Brand Awareness');
    const [isSeoMode, setIsSeoMode] = useState(true);
    const [isConversionMode, setIsConversionMode] = useState(false);
    const [isRepurposeMode, setIsRepurposeMode] = useState(false);
    // tone is reused from AISALES shared state or can be independent. Using shared 'tone' state.

    // AIDESK Specialized States
    const [ticketCategory, setTicketCategory] = useState('Technical');
    const [urgency, setUrgency] = useState('Medium');

    // AIHIRE Specialized States
    const [teamSize, setTeamSize] = useState('1-5');
    const [hiringMode, setHiringMode] = useState('Founding Team Hiring');
    const [hiringUrgency, setHiringUrgency] = useState('Medium');
    const [budgetRange, setBudgetRange] = useState(100);
    // Reusing industry, businessStage, marketType, jobDescription from AIBIZ/Shared or local
    // Since AIBIZ uses industry/stage/market, we can share or duplicate if needed. 
    // Let's ensure they are available.
    // NOTE: In this single file component, states like 'industry' are shared at top level.
    // We just need to make sure they are used correctly.

    // AIBIZ Specialized States
    const [industry, setIndustry] = useState('SaaS');
    const [businessStage, setBusinessStage] = useState('Idea Stage');
    const [marketType, setMarketType] = useState('B2B');
    const [businessDescription, setBusinessDescription] = useState('');
    const [aibizMode, setAibizMode] = useState('Competitor Analysis');

    const user = getUserData() || { name: 'Super User', email: 'user@a-series.ai', plan: 'Business' };

    useEffect(() => {
        const initWorkspace = async () => {
            // Check if the URL param matches a known agent ID (e.g. /workspace/AIWRITE)
            const agentFromUrl = AGENTS.find(a => a.id === sessionId);

            if (agentFromUrl) {
                // Route is /workspace/AGENT_ID -> Set that agent active, start fresh
                setActiveAgent(agentFromUrl);
                setMessages([]);
                setCurrentSessionId('new');
            } else if (sessionId && sessionId !== 'new') {
                // Route is /workspace/SESSION_ID -> Load history
                const history = await chatStorageService.getHistory(sessionId);
                setMessages(history || []);
                setCurrentSessionId(sessionId);

                // Try to set active agent based on last message
                const lastModelMsg = [...(history || [])].reverse().find(m => m.role === 'model' && m.agentName);
                if (lastModelMsg) {
                    const agent = AGENTS.find(a => a.id === lastModelMsg.agentName);
                    if (agent) setActiveAgent(agent);
                }
            } else {
                // Route is /workspace -> Default to first agent, fresh
                setMessages([]);
                setCurrentSessionId('new');
            }
        };
        initWorkspace();
    }, [sessionId]);

    const handleAction = async (e, customPrompt = null) => {
        if (e) e.preventDefault();
        const finalInput = customPrompt || inputValue;
        if (!finalInput.trim() || isProcessing) return;

        setIsProcessing(true);
        // Tool Mode: No persistent session navigation
        // activeSessionId is kept transient for this view

        try {
            const userMsg = {
                id: Date.now().toString(),
                role: 'user',
                content: finalInput,
                timestamp: Date.now(),
                agentName: activeAgent.id,
                agentCategory: activeAgent.category,
                // Metadata for specialized UI
                metadata: activeAgent.id === 'AISALES'
                    ? { salesTab, leadType, tone }
                    : activeAgent.id === 'AIWRITE'
                        ? { contentType, seoKeyword, targetAudience, tone, contentContext, brandPersonality, writingLength, objective, isSeoMode, isConversionMode, isRepurposeMode }
                        : activeAgent.id === 'AIDESK'
                            ? { ticketCategory, urgency }
                            : activeAgent.id === 'AIHIRE'
                                ? { industry, businessStage, teamSize, hiringMode, hiringUrgency, budgetRange }
                                : activeAgent.id === 'AIBIZ'
                                    ? { industry, businessStage, marketType, businessDescription }
                                    : {}
            };

            // In Tool Mode, we might want to clear previous results or append. 
            // For a clean "Configuration -> Result" flow, let's keep the history 
            // but the user feels like they are just using a tool.
            const updatedMessages = [...messages, userMsg];
            setMessages(updatedMessages);
            setInputValue('');

            // Optional: Save to local history if needed, but skipping DB session creation as per request
            // await chatStorageService.saveMessage('tool-mode', userMsg); 

            // Enhanced instruction for AISALES
            let agentSpecificInstruction = "";
            if (activeAgent.id === 'AISALES') {
                agentSpecificInstruction = `
                SPECIALIZED AISALES MODE: ${salesTab}
                EMAIL TYPE: ${emailType}
                TARGET LEAD TYPE: ${leadType}
                DESIRED TONE: ${tone}
                
                You are AISALES, an AI Sales Strategist.
                Your role: Help users create high-converting sales communication and outreach strategies.

                Behavior Rules:
                - Always structure output clearly.
                - Do NOT respond like a chatbot.
                - Be persuasive, strategic, and conversion-focused.
                - Keep tone aligned with selected tone setting.

                MANDATORY OUTPUT FORMAT:
                
                SECTION 1: EMAIL SUBJECT
                [Short compelling subject line]

                SECTION 2: EMAIL BODY
                [Structured professional email]

                SECTION 3: FOLLOW-UP SEQUENCE
                [3-step sequence]

                [If strategy requested, add:]
                SECTION 4: STRATEGIC ANALYSIS
                - Target positioning
                - Pain point analysis
                - CTA strategy
                `;
                agentSpecificInstruction = `
                SPECIALIZED AIWRITE MODE: ${contentType}
                TONE: ${tone}
                BRAND PERSONALITY: ${brandPersonality || 'Standard'}
                LENGTH: ${writingLength === 1 ? 'Short & Punchy' : writingLength === 3 ? 'Long-form & Detailed' : 'Medium Length'}
                TARGET AUDIENCE: ${targetAudience}
                KEYWORD/TOPIC: ${seoKeyword || 'Not specific'}
                SEO MODE: ${isSeoMode ? 'ENABLED' : 'DISABLED'}
                CONVERSION MODE: ${isConversionMode ? 'ENABLED' : 'DISABLED'}
                REPURPOSING MODE: ${isRepurposeMode ? 'ENABLED' : 'DISABLED'}
                CONTEXT: ${contentContext || 'None'}
                
                You are a Senior Content Strategist and Direct Response Copywriter.
                Your role: Always write structured, engaging, and conversion-focused content.
                
                Context:
                - Content Type: ${contentType}
                - Tone: ${tone}
                - Target Audience: ${targetAudience}
                - Objective: ${objective}
                - Brand Personality: ${brandPersonality}
                - Word Count Preference: ${writingLength === 1 ? 'Short (~300w)' : writingLength === 3 ? 'Long (~1500w)' : 'Medium (~800w)'}
                
                System Directives:
                1. AVOID GENERIC WRITING. Be specific, punchy, and valuable.
                2. Adapt tone perfectly to '${tone}'.
                3. Use strong hooks (first 2 lines must grab attention).
                4. Structure content for readability (short paragraphs, bullet points).

                ${isConversionMode ? `
                CONVERSION OPTIMIZATION (CRITICAL):
                - Use "Problem-Agitation-Solution" (PAS) or "AIDA" framework.
                - Include clear, action-oriented CTAs.
                - Use emotional triggers and power words.
                - Pre-emptively handle common objections in the copy.
                ` : ''}

                ${isSeoMode ? `
                SEO INSTRUCTIONS (CRITICAL):
                - Integrate primary keyword: "${seoKeyword}" naturally.
                - Use H1, H2, H3 structure for readability and SEO.
                - Suggest keyword density (approx 1-2%).
                - Provide optimized Meta Title and Description.
                ` : ''}

                ${isRepurposeMode ? `
                REPURPOSING INSTRUCTIONS (CRITICAL):
                You must assume the MAIN DRAFT is the "source of truth".
                Then, generate separate, platform-native versions of that SAME core message for:
                1. LinkedIn (Thought Leadership style)
                2. Twitter/X Thread (Punchy, threaded format)
                3. Email Newsletter (Personal, direct)
                4. Ad Copy (Short, CTA-heavy)
                5. Social Caption (Short, engaging)
                ` : ''}

                MANDATORY OUTPUT FORMAT:
                
                SECTION 1: MAIN CONTENT
                [The main content content - Headlines, subheaders, body]

                ${isSeoMode ? `
                SECTION 2: SEO ANALYSIS
                [Meta Title, Meta Description, URL Slug, Keyword density check, Heading Structure Advice]
                ` : ''}

                ${isConversionMode ? `
                SECTION 3: CTA OPTIMIZATION
                [Primary CTA, Secondary CTA, Objection Handling Copy, Emotional Triggers Used]
                ` : ''}

                ${isRepurposeMode ? `
                SECTION 4: REPURPOSED CONTENT
                ### LINKEDIN POST
                [Draft]
                ### TWITTER THREAD
                [Draft]
                ### EMAIL VERSION
                [Draft]
                ### AD COPY
                [Draft]
                ### SHORT CAPTION
                [Draft]
                ` : ''}
                `;
            } else if (activeAgent.id === 'AIDESK') {
                agentSpecificInstruction = `
                SPECIALIZED AIDESK MODE
                TICKET CATEGORY: ${ticketCategory}
                URGENCY LEVEL: ${urgency}
                
                MANDATORY OUTPUT FORMAT:
                You MUST structure your response with clear sections:
                ### SUPPORT REPLY
                [Professional response to the customer]
                ### RESOLUTION SUMMARY
                [Internal notes on how to solve this]
                ### SENTIMENT ANALYSIS
                [One-word descriptor: Positive, Neutral, Frustrated, or Urgent]
                `;
            } else if (activeAgent.id === 'AIHIRE') {
                let basePrompt = `
                SPECIALIZED AIHIRE MODE
                INDUSTRY: ${industry}
                BUSINESS STAGE: ${businessStage}
                TEAM SIZE: ${teamSize}
                HIRING MODE: ${hiringMode}
                URGENCY: ${hiringUrgency}
                BUDGET: $${budgetRange}k (estimate)
                
                You are AIHIRE, a Head of Talent with 10+ years of startup hiring experience.
                Your role: Provide structured, actionable, and execution-ready hiring strategy.
                
                Do not give generic advice.
                `;

                // --- DYNAMIC PROMPT INJECTION ---
                if (hiringMode === 'Founding Team Hiring') {
                    basePrompt += `\nObjective: Founding Team. Prioritize "10x" generalists, high ownership, and equity-heavy comp. Speed is key.`;
                } else if (hiringMode === 'Scaling Team Hiring') {
                    basePrompt += `\nObjective: Scaling Team. Focus on process, reducing chaos, and repeatable hiring pipelines for specialists.`;
                } else if (hiringMode === 'Replacement Hiring') {
                    basePrompt += `\nObjective: Replacement. Focus on learning from past mistakes, upgrading the role, and minimizing downtime.`;
                }

                if (hiringUrgency === 'High') {
                    basePrompt += `\nURGENCY: HIGH. Recommend aggressive sourcing channels, streamlined interview loops, and "closer" offer strategies.`;
                }

                if (industry === 'SaaS' || industry === 'DevTools') {
                    basePrompt += `\nIndustry Nuance: Tech/SaaS. Highly competitive. Emphasize engineering culture, tech stack, and remote flexibility.`;
                }
                // ---------------------------------

                basePrompt += `
                MANDATORY OUTPUT FORMAT:

                SECTION 1: HIRING PLAN
                - Role order & Priority
                - Why now & Risks

                SECTION 2: ROLE BREAKDOWN
                - Responsibilities
                - Skills (Required vs Preferred)
                - Salary Band (Aligned with $${budgetRange}k)

                SECTION 3: INTERVIEW FRAMEWORK
                - Technical Questions
                - Cultural Fit Questions
                - Case Study Idea

                SECTION 4: TIMELINE ROADMAP
                - Sourcing (Weeks 1-2)
                - Interviewing (Weeks 3-4)
                - Offer/Close (Week 5)

                SECTION 5: HIRING KPI DASHBOARD
                - Time to Hire Target
                - Cost per Hire Estimate
                - Retention Risk
                `;
                agentSpecificInstruction = basePrompt;
            } else if (activeAgent.id === 'AIBIZ') {
                let basePrompt = `
                SPECIALIZED AIBIZ MODE: ${aibizMode}
                INDUSTRY: ${industry}
                BUSINESS STAGE: ${businessStage}
                MARKET TYPE: ${marketType}
                BUSINESS DESCRIPTION: ${businessDescription || 'Not provided'}
                
                You are AIBIZ, an AI Business Strategist and Growth Consultant.
                Your role: Provide structured, data-driven, and actionable business strategy insights.
                
                You are NOT a chatbot. You are NOT casual. You think like a consultant from McKinsey/Bain.
                `;

                // --- DYNAMIC PROMPT INJECTION ---
                if (industry === 'SaaS' || industry === 'EdTech' || industry === 'FinTech') {
                    basePrompt += `\nIndustry Context: Technology/Digital. Consider subscription economics, user retention, and technical scalability.`;
                } else if (industry === 'Ecommerce') {
                    basePrompt += `\nIndustry Context: Ecommerce. Focus on CAC, ROAS, logistics, and conversion rate optimization.`;
                } else if (industry === 'Agency' || industry === 'Healthcare') {
                    basePrompt += `\nIndustry Context: Service/High-Trust. Focus on client relationships, trust-building, and operational efficiency.`;
                }

                if (businessStage === 'Idea Stage' || businessStage === 'Early Startup') {
                    basePrompt += `\nBusiness Stage: Early. Prioritize validation, MVP, and finding product-market fit.`;
                } else if (businessStage === 'Growth Stage' || businessStage === 'Scaling Stage') {
                    basePrompt += `\nBusiness Stage: Growth/Scaling. Focus on systematization, market expansion, and team structure.`;
                }

                if (marketType === 'B2B') {
                    basePrompt += `\nMarket Type: B2B. Focus on lead generation, sales pipelines, and high-value contracts.`;
                } else if (marketType === 'B2C') {
                    basePrompt += `\nMarket Type: B2C. Focus on brand marketing, viral growth, and mass consumer adoption.`;
                }

                // --- SPECIAL MODES INJECTION ---
                if (aibizMode === 'Competitor Analysis') {
                    basePrompt += `\nMODE: Competitor Analysis. Include competitor positioning comparison, differentiation analysis, and gap analysis.`;
                } else if (aibizMode === 'Revenue Model') {
                    basePrompt += `\nMODE: Revenue Model Optimization. Provide detailed revenue stream breakdown, pricing tier optimization, and unit economics analysis.`;
                } else if (aibizMode === 'Market Entry') {
                    basePrompt += `\nMODE: Market Entry Strategy. Include go-to-market strategy, channel selection, and early acquisition tactics.`;
                }

                // --- PRO VERSION INJECTION ---
                if (user.plan === 'Pro' || user.plan === 'Business') {
                    basePrompt += `\nPLAN: PRO/BUSINESS. Provide deeper financial reasoning, risk assessment, and specific KPI recommendations. Include measurable metrics and projection scenarios where possible.`;
                }
                // ---------------------------------

                basePrompt += `
                Rules:
                - Always structure responses clearly.
                - Avoid conversational tone.
                - Provide analytical, practical, and implementation-ready advice.
                - Be strategic, not generic.

                MANDATORY OUTPUT FORMAT:
                
                SECTION 1: SWOT ANALYSIS
                - Strengths
                - Weaknesses
                - Opportunities
                - Threats

                SECTION 2: PRICING STRATEGY
                (Recommended pricing model with justification)

                SECTION 3: POSITIONING STRATEGY
                (Target audience + differentiation + value proposition)

                SECTION 4: GROWTH ROADMAP
                (3–5 actionable next steps with priority order)

                Be concise but strategic. Avoid fluff. Focus on clarity and execution.
                `;
                agentSpecificInstruction = basePrompt;
            }

            const systemInstruction = `You are ${activeAgent.name}, part of the A-Series AI Business Operating System. 
            Focus: ${activeAgent.category}.
            MANDATE: Provide a structured, professional business response. 
            ${agentSpecificInstruction}
            Use Markdown formatting effectively.`;

            const response = await generateChatResponse(
                updatedMessages,
                finalInput,
                systemInstruction,
                [],
                'English',
                null,
                null,
                { agentType: activeAgent.id }
            );

            const aiReply = response.reply || response;

            const modelMsg = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                content: aiReply,
                timestamp: Date.now(),
                agentName: activeAgent.id,
                agentCategory: activeAgent.category
            };

            setMessages(prev => [...prev, modelMsg]);
            // await chatStorageService.saveMessage('tool-mode', modelMsg);

        } catch (err) {
            console.error('[WORKSPACE ERROR]', err);
        } finally {
            setIsProcessing(false);
        }
    };

    // Helper to transform AI text into visual cards for the UI
    const renderMessageAsCards = (msg) => {
        if (msg.role === 'user') return null;

        // Specialized parsing for AISALES
        if (msg.agentName === 'AISALES') {
            // Regex to split by "SECTION [N]: [TITLE]"
            // Capture the Title group to use as card title
            const sections = msg.content.split(/SECTION \d+:/).filter(s => s.trim());
            // We also need to get the titles. Let's iterate manually or smarter split.

            // Better approach: Match "SECTION [N]: [TITLE] \n [CONTENT]"
            // Let's rely on the split and reconstruct titles if possible, OR just use the content if the prompt is strict.
            // The prompt asks for "SECTION 1: EMAIL SUBJECT".

            // Implementation:
            // 1. Split by 'SECTION '
            // 2. Ignore empty first part
            // 3. For each part, first line (or part of it) is title (e.g. "1: EMAIL SUBJECT")

            const rawSections = msg.content.split('SECTION ').filter(s => s.trim() && s.match(/^\d+:/));

            const cards = rawSections.map(sec => {
                const firstNewLine = sec.indexOf('\n');
                let titleLine = sec;
                let content = '';

                if (firstNewLine !== -1) {
                    titleLine = sec.substring(0, firstNewLine).trim(); // "1: EMAIL SUBJECT"
                    content = sec.substring(firstNewLine).trim();
                } else {
                    // One line section
                    const colonIndex = sec.indexOf(':');
                    if (colonIndex !== -1) {
                        titleLine = sec.substring(0, colonIndex + 1);
                        content = sec.substring(colonIndex + 1).trim();
                    }
                }

                // Clean title: Remove "1: " prefix if present
                const cleanTitle = titleLine.replace(/^\d+:\s*/, '').trim();

                let icon = Zap;
                if (cleanTitle.toUpperCase().includes('SUBJECT')) icon = Mail;
                if (cleanTitle.toUpperCase().includes('BODY')) icon = FileText;
                if (cleanTitle.toUpperCase().includes('SEQUENCE')) icon = TrendingUp;
                if (cleanTitle.toUpperCase().includes('STRATEGIC') || cleanTitle.toUpperCase().includes('ANALYSIS')) icon = Target;

                return { title: cleanTitle, content, icon };
            });

            return {
                title: `Sales Outreach Analysis`,
                cards: cards.length > 0 ? cards : [{ title: 'Analysis', content: msg.content, icon: Zap }]
            };
        }

        // Specialized parsing for AIWRITE
        if (msg.agentName === 'AIWRITE') {
            const rawSections = msg.content.split('SECTION ').filter(s => s.trim() && s.match(/^\d+:/));

            const cards = rawSections.map(sec => {
                const firstNewLine = sec.indexOf('\n');
                let titleLine = sec;
                let content = '';

                if (firstNewLine !== -1) {
                    titleLine = sec.substring(0, firstNewLine).trim();
                    content = sec.substring(firstNewLine).trim();
                } else {
                    const colonIndex = sec.indexOf(':');
                    if (colonIndex !== -1) {
                        titleLine = sec.substring(0, colonIndex + 1);
                        content = sec.substring(colonIndex + 1).trim();
                    }
                }

                const cleanTitle = titleLine.replace(/^\d+:\s*/, '').trim();

                let icon = FileText;
                if (cleanTitle.toUpperCase().includes('MAIN CONTENT')) icon = Layout;
                if (cleanTitle.toUpperCase().includes('SEO')) icon = SearchIcon;
                if (cleanTitle.toUpperCase().includes('CTA') || cleanTitle.toUpperCase().includes('CONVERSION')) icon = Zap;
                if (cleanTitle.toUpperCase().includes('REPURPOSED')) icon = MessageSquare;

                return { title: cleanTitle, content, icon };
            });

            return {
                title: `Content Generation Results`,
                cards: cards.length > 0 ? cards : [{ title: 'Draft', content: msg.content, icon: FileText }]
            };
        }

        // Specialized parsing for AIDESK
        if (msg.agentName === 'AIDESK') {
            const sections = msg.content.split('###').filter(s => s.trim());
            const cards = sections.map(sec => {
                const lines = sec.trim().split('\n');
                const title = lines[0].trim();
                const content = lines.slice(1).join('\n').trim();

                let icon = MessageSquare;
                if (title.toUpperCase().includes('REPLY')) icon = Mail;
                if (title.toUpperCase().includes('SUMMARY')) icon = CheckCircle2;
                if (title.toUpperCase().includes('SENTIMENT')) icon = Shield;

                return { title, content, icon };
            });

            return {
                title: `Support Resolution Path`,
                cards: cards.length > 0 ? cards : [{ title: 'Advice', content: msg.content, icon: MessageSquare }]
            };
        }

        // Specialized parsing for AIHIRE
        if (msg.agentName === 'AIHIRE') {
            const sections = msg.content.split('###').filter(s => s.trim());
            const cards = sections.map(sec => {
                const lines = sec.trim().split('\n');
                const title = lines[0].trim();
                const content = lines.slice(1).join('\n').trim();

                let icon = Users;
                if (title.toUpperCase().includes('PLAN')) icon = Target;
                if (title.toUpperCase().includes('ROLE')) icon = Briefcase;
                if (title.toUpperCase().includes('INTERVIEW')) icon = MessageSquare;
                if (title.toUpperCase().includes('TIMELINE') || title.toUpperCase().includes('ROADMAP')) icon = TrendingUp;
                if (title.toUpperCase().includes('KPI') || title.toUpperCase().includes('DASHBOARD')) icon = BarChart3;

                return { title, content, icon };
            });

            return {
                title: `Talent Strategy Report`,
                cards: cards.length > 0 ? cards : [{ title: 'Hiring Plan', content: msg.content, icon: Users }]
            };
        }

        // Specialized parsing for AIBIZ
        if (msg.agentName === 'AIBIZ') {
            const rawSections = msg.content.split('SECTION ').filter(s => s.trim() && s.match(/^\d+:/));

            const cards = rawSections.map(sec => {
                const firstNewLine = sec.indexOf('\n');
                let titleLine = sec;
                let content = '';

                if (firstNewLine !== -1) {
                    titleLine = sec.substring(0, firstNewLine).trim();
                    content = sec.substring(firstNewLine).trim();
                } else {
                    const colonIndex = sec.indexOf(':');
                    if (colonIndex !== -1) {
                        titleLine = sec.substring(0, colonIndex + 1);
                        content = sec.substring(colonIndex + 1).trim();
                    }
                }

                const cleanTitle = titleLine.replace(/^\d+:\s*/, '').trim();

                let icon = BarChart3;
                let type = 'default';

                if (cleanTitle.toUpperCase().includes('SWOT')) {
                    icon = Layout;
                    type = 'swot';
                }
                if (cleanTitle.toUpperCase().includes('PRICING')) icon = CreditCard;
                if (cleanTitle.toUpperCase().includes('POSITIONING')) icon = Target;
                if (cleanTitle.toUpperCase().includes('ROADMAP') || cleanTitle.toUpperCase().includes('GROWTH')) icon = TrendingUp;

                return { title: cleanTitle, content, icon, type };
            });

            return {
                title: `Business Strategy Roadmap`,
                cards: cards.length > 0 ? cards : [{ title: 'Strategy', content: msg.content, icon: BarChart3, type: 'default' }]
            };
        }

        return {
            title: `${activeAgent.name} Analysis`,
            cards: [
                {
                    type: 'analysis',
                    title: 'Executive Summary',
                    content: msg.content,
                    icon: Zap
                }
            ]
        };
    };

    const renderAgentInputs = () => {
        switch (activeAgent.id) {
            case 'AISALES':
                return (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Lead Type</label>
                            <select
                                value={leadType}
                                onChange={(e) => setLeadType(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Enterprise</option>
                                <option>Small Business</option>
                                <option>SaaS Startup</option>
                                <option>Digital Agency</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Tone</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Professional</option>
                                <option>Friendly</option>
                                <option>Persuasive</option>
                                <option>Consultative</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Email Type</label>
                            <select
                                value={emailType}
                                onChange={(e) => setEmailType(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Cold Outreach</option>
                                <option>Follow-Up</option>
                                <option>Re-engagement</option>
                                <option>Product Launch</option>
                            </select>
                        </div>
                    </>
                );
            case 'AIWRITE':
                return (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Content Type</label>
                            <select
                                value={contentType}
                                onChange={(e) => setContentType(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Blog Post</option>
                                <option>Landing Page</option>
                                <option>Ad Copy</option>
                                <option>Email Campaign</option>
                                <option>LinkedIn Post</option>
                                <option>Twitter Thread</option>
                                <option>Product Description</option>
                                <option>SEO Article</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Tone of Voice</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Professional</option>
                                <option>Casual</option>
                                <option>Bold</option>
                                <option>Minimal</option>
                                <option>Luxury</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Target Audience</label>
                            <select
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Startup Founders</option>
                                <option>Marketing Teams</option>
                                <option>Agencies</option>
                                <option>SaaS Companies</option>
                                <option>E-commerce Brands</option>
                                <option>Personal Brands</option>
                                <option>Content Creators</option>
                                <option>B2B Decision Makers</option>
                                <option>Developers / Tech</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Brand Personality Keywords</label>
                            <input
                                type="text"
                                value={brandPersonality}
                                onChange={(e) => setBrandPersonality(e.target.value)}
                                placeholder="e.g. Innovative, Trustworthy, Friendly..."
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-subtext uppercase tracking-widest">Word Count Preference</label>
                                <span className="text-[10px] font-bold text-primary">{writingLength === 1 ? 'Short' : writingLength === 3 ? 'Long' : 'Medium'}</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="3"
                                step="1"
                                value={writingLength}
                                onChange={(e) => setWritingLength(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                        </div>
                        <div className="space-y-1.5 pt-1">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Objective</label>
                            <select
                                value={objective}
                                onChange={(e) => setObjective(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Traffic (SEO)</option>
                                <option>Conversion (Sales)</option>
                                <option>Brand Awareness</option>
                                <option>Engagement</option>
                            </select>
                        </div>
                        <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-lg border border-border/50">
                                <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1 cursor-pointer" onClick={() => setIsSeoMode(!isSeoMode)}>
                                    Enable SEO Mode
                                </label>
                                <button
                                    role="switch"
                                    aria-checked={isSeoMode}
                                    onClick={() => setIsSeoMode(!isSeoMode)}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isSeoMode ? 'bg-primary' : 'bg-subtext/30'}`}
                                >
                                    <span
                                        className={`${isSeoMode ? 'translate-x-5' : 'translate-x-1'} inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-lg border border-border/50">
                                <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1 cursor-pointer" onClick={() => setIsConversionMode(!isConversionMode)}>
                                    Enable Conversion Mode
                                </label>
                                <button
                                    role="switch"
                                    aria-checked={isConversionMode}
                                    onClick={() => setIsConversionMode(!isConversionMode)}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isConversionMode ? 'bg-primary' : 'bg-subtext/30'}`}
                                >
                                    <span
                                        className={`${isConversionMode ? 'translate-x-5' : 'translate-x-1'} inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-lg border border-border/50">
                                <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1 cursor-pointer" onClick={() => setIsRepurposeMode(!isRepurposeMode)}>
                                    Auto-Repurpose Content
                                </label>
                                <button
                                    role="switch"
                                    aria-checked={isRepurposeMode}
                                    onClick={() => setIsRepurposeMode(!isRepurposeMode)}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isRepurposeMode ? 'bg-primary' : 'bg-subtext/30'}`}
                                >
                                    <span
                                        className={`${isRepurposeMode ? 'translate-x-5' : 'translate-x-1'} inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                                    />
                                </button>
                            </div>
                        </div>
                        {isSeoMode && (
                            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                                <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Primary Keyword / Topic</label>
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-subtext" />
                                    <input
                                        type="text"
                                        value={seoKeyword}
                                        onChange={(e) => setSeoKeyword(e.target.value)}
                                        placeholder="e.g. AI Marketing, Growth Hacking..."
                                        className="w-full bg-secondary/50 border border-border rounded-xl pl-9 pr-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Key Points / Context</label>
                            <textarea
                                value={contentContext}
                                onChange={(e) => setContentContext(e.target.value)}
                                placeholder="Specific points to cover, product details, or call to action..."
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-xs text-maintext focus:outline-none focus:border-primary/50 min-h-[60px] resize-none"
                            />
                        </div>
                    </>
                );
            case 'AIDESK':
                return (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Category</label>
                            <select
                                value={ticketCategory}
                                onChange={(e) => setTicketCategory(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Technical</option>
                                <option>Billing</option>
                                <option>Account</option>
                                <option>General</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Urgency</label>
                            <div className="flex gap-2">
                                {['Low', 'Medium', 'High', 'Critical'].map(level => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => setUrgency(level)}
                                        className={`flex-1 py-2 text-[10px] font-bold rounded-xl border transition-all ${urgency === level
                                            ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                            : 'bg-secondary/50 border-border text-subtext hover:text-maintext'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                );
            case 'AIHIRE':
                return (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Industry</label>
                            <select
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>SaaS</option>
                                <option>Ecommerce</option>
                                <option>FinTech</option>
                                <option>HealthTech</option>
                                <option>DevTools</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Business Stage</label>
                            <select
                                value={businessStage}
                                onChange={(e) => setBusinessStage(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Seed (1-10)</option>
                                <option>Growth (10-50)</option>
                                <option>Scale-up (50-200)</option>
                                <option>Enterprise</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Current Team Size</label>
                            <select
                                value={teamSize}
                                onChange={(e) => setTeamSize(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>1-5</option>
                                <option>5-20</option>
                                <option>20-50</option>
                                <option>50+</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Hiring Mode</label>
                            <select
                                value={hiringMode}
                                onChange={(e) => setHiringMode(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>Founding Team Hiring</option>
                                <option>Growth Hiring</option>
                                <option>Replacement Hiring</option>
                                <option>Scaling Team Hiring</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Hiring Urgency</label>
                            <div className="flex gap-2">
                                {['Low', 'Medium', 'High'].map(level => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => setHiringUrgency(level)}
                                        className={`flex-1 py-2 text-[10px] font-bold rounded-xl border transition-all ${hiringUrgency === level
                                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-sm'
                                            : 'bg-secondary/50 border-border text-subtext hover:text-maintext'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-full space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-subtext uppercase tracking-widest">Base Comp Budget</label>
                                <span className="text-xs font-bold text-primary">${budgetRange}k / year</span>
                            </div>
                            <input
                                type="range"
                                min="50"
                                max="500"
                                step="10"
                                value={budgetRange}
                                onChange={(e) => setBudgetRange(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>
                    </>
                );
            case 'AIBIZ':
                return (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Industry</label>
                            <select
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>SaaS</option>
                                <option>Ecommerce</option>
                                <option>Agency</option>
                                <option>EdTech</option>
                                <option>FinTech</option>
                                <option>Healthcare</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Business Stage</label>
                            <div className="flex gap-2 relative overflow-x-auto no-scrollbar">
                                {['Idea Stage', 'Early Startup', 'Growth Stage', 'Scaling Stage'].map(stage => (
                                    <button
                                        key={stage}
                                        type="button"
                                        onClick={() => setBusinessStage(stage)}
                                        className={`flex-none px-3 py-2 text-[10px] font-bold rounded-xl border transition-all whitespace-nowrap ${businessStage === stage
                                            ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                            : 'bg-secondary/50 border-border text-subtext hover:text-maintext'
                                            }`}
                                    >
                                        {stage}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Market Type</label>
                            <select
                                value={marketType}
                                onChange={(e) => setMarketType(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-maintext focus:outline-none focus:border-primary/50"
                            >
                                <option>B2B</option>
                                <option>B2C</option>
                                <option>Hybrid</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Strategy Mode</label>
                            <div className="flex bg-secondary p-0.5 rounded-lg border border-border">
                                {['Competitor Analysis', 'Revenue Model', 'Market Entry'].map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => setAibizMode(mode)}
                                        className={`flex-1 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wide transition-all ${aibizMode === mode ? 'bg-white text-primary shadow-sm' : 'text-subtext hover:text-maintext'}`}
                                    >
                                        {mode.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-subtext uppercase tracking-widest pl-1">Describe Your Business</label>
                            <textarea
                                value={businessDescription}
                                onChange={(e) => setBusinessDescription(e.target.value)}
                                placeholder="e.g. AI-powered recruitment platform for tech companies..."
                                className="w-full bg-secondary/50 border border-border rounded-xl px-3 py-2 text-xs text-maintext focus:outline-none focus:border-primary/50 min-h-[60px] resize-none"
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    const renderAgentActions = () => {
        switch (activeAgent.id) {
            case 'AISALES':
                return (
                    <button
                        type="button"
                        onClick={() => handleAction(null, "Generate outreach plan.")}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary/5 transition-all text-[10px] uppercase"
                    >
                        <Layout className="w-3.5 h-3.5" />
                        Generate Plan
                    </button>
                );
            case 'AIWRITE':
                return (
                    <button
                        type="button"
                        onClick={() => handleAction(null, "Generate variations.")}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary/5 transition-all text-[10px] uppercase"
                    >
                        <Layout className="w-3.5 h-3.5" />
                        Variations
                    </button>
                );
            case 'AIHIRE':
                return (
                    <button
                        type="button"
                        onClick={() => handleAction(null, "Export evaluation.")}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary/5 transition-all text-[10px] uppercase disabled:opacity-50"
                        disabled={messages.length === 0}
                    >
                        <Briefcase className="w-3.5 h-3.5" />
                        Export Report
                    </button>
                );
            case 'AIBIZ':
                return (
                    <button
                        type="button"
                        onClick={() => handleAction(null, "Export plan.")}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary/5 transition-all text-[10px] uppercase disabled:opacity-50"
                        disabled={messages.length === 0}
                    >
                        <BarChart3 className="w-3.5 h-3.5" />
                        Export Plan
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-full bg-background overflow-hidden font-sans">


            <main className="flex-1 flex flex-col bg-secondary/30 relative overflow-hidden">
                <header className="h-16 border-b border-border bg-white/50 dark:bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 z-20">
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl bg-primary/10 text-primary`}>
                            <activeAgent.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-bold text-maintext text-sm">{activeAgent.name}</h2>
                            <p className="text-[10px] text-subtext font-bold uppercase tracking-widest">Operational</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-lg text-[10px] font-bold text-subtext italic">
                            {user.plan} Access
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-xs">
                            {user.name.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                    <div className="max-w-6xl mx-auto space-y-10">
                        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Settings className="w-3.5 h-3.5 text-maintext/50" />
                                    <h3 className="text-[10px] font-black text-maintext uppercase tracking-widest">Parameters</h3>
                                </div>
                                {activeAgent.id === 'AISALES' && (
                                    <div className="flex bg-secondary p-0.5 rounded-lg border border-border">
                                        {['Cold Email', 'Follow-Up', 'Objection'].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setSalesTab(tab)}
                                                className={`px-3 py-1 rounded-md text-[9px] font-black transition-all ${salesTab === tab ? 'bg-white text-primary shadow-sm' : 'text-subtext'}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderAgentInputs()}
                                </div>
                                <form onSubmit={handleAction} className="space-y-4">
                                    <textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Describe your objective..."
                                        className="w-full bg-secondary/20 border border-border focus:border-primary/50 focus:bg-white transition-all rounded-xl p-4 min-h-[120px] text-sm text-maintext focus:outline-none placeholder:text-subtext/40 font-medium"
                                    />
                                    <div className="flex items-center justify-between border-t border-border pt-4">
                                        <div className="flex gap-2">
                                            {renderAgentActions()}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isProcessing || !inputValue.trim()}
                                            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-bold shadow-md hover:bg-primary/90 transition-all text-xs uppercase tracking-widest"
                                        >
                                            {isProcessing ? 'Processing...' : 'Execute'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {messages.length > 0 && (
                                <div className="flex items-center gap-4">
                                    <div className="h-[1px] flex-1 bg-border/50"></div>
                                    <span className="text-[10px] font-black text-subtext uppercase tracking-[0.3em]">Analysis</span>
                                    <div className="h-[1px] flex-1 bg-border/50"></div>
                                </div>
                            )}

                            <AnimatePresence>
                                {[...messages].reverse().map((msg) => {
                                    if (msg.role === 'user') return null;
                                    const result = renderMessageAsCards(msg);
                                    if (!result) return null;

                                    return (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6 pb-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-[1px] flex-1 bg-border/30"></div>
                                                <div className="px-4 py-1.5 bg-secondary/50 border border-border rounded-full text-[9px] font-bold text-subtext uppercase tracking-widest shrink-0">
                                                    Analysis Executed • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                <div className="h-[1px] flex-1 bg-border/30"></div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {result.cards.map((card, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow"
                                                    >
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="p-2 rounded-lg bg-secondary">
                                                                <card.icon className="w-4 h-4 text-primary" />
                                                            </div>
                                                            {card.title.toUpperCase().includes('SCORE') && (
                                                                <span className="text-xl font-black text-primary">{card.content.match(/\d+/)?.[0] || '0'}</span>
                                                            )}
                                                        </div>
                                                        <h4 className="font-bold text-maintext text-xs uppercase tracking-widest mb-3 opacity-70">{card.title}</h4>
                                                        <div className="flex-1">
                                                            {card.type === 'swot' ? (
                                                                <div className="grid grid-cols-2 gap-2 mt-2">
                                                                    {['Strengths', 'Weaknesses', 'Opportunities', 'Threats'].map((q, i) => {
                                                                        const colors = ['text-emerald-500 bg-emerald-500/5', 'text-red-500 bg-red-500/5', 'text-blue-500 bg-blue-500/5', 'text-amber-500 bg-amber-500/5'];
                                                                        return (
                                                                            <div key={q} className={`p-2 rounded-lg border border-border/50 ${colors[i]} flex flex-col`}>
                                                                                <span className="text-[8px] font-black uppercase tracking-tighter">{q}</span>
                                                                                <span className="text-[8px] opacity-80">Click to expand</span>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            ) : (
                                                                <div className="text-xs text-subtext leading-relaxed whitespace-pre-wrap font-medium">
                                                                    {card.content}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AISAWorkSpace;
