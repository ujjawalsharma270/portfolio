import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Ujjawal Sharma's personal AI assistant on his portfolio website. Answer questions about Ujjawal in first person as if you are his representative. Be concise, professional, and friendly.

Here is everything about Ujjawal Sharma:

PERSONAL:
- Full Name: Ujjawal Sharma
- Location: Noida, India (open to pan-India opportunities)
- Email: ujjawalsharma120804@gmail.com
- LinkedIn: https://www.linkedin.com/in/ujjawal-sharma-04192b263
- GitHub: https://github.com/UJJAWAL-SHARMA
- Phone: +91-7505805745
- Status: Immediate Joiner

SUMMARY:
Software & AI Engineer with 2 years of production experience building Node.js backends, Next.js frontends, and LangGraph AI pipelines — shipping systems that handle 50K+ daily requests at 99.9% uptime. Ranked 239th in India at Google Hash Code 2024 (11,000+ participants).

EXPERIENCE:
1. Software Engineer | Scaliqalgo (Remote) — Sep 2025 to Present
   - Built multi-tenant Node.js platform on AWS EC2 with BullMQ queues, Redis pub-sub/locking, and PM2 clustering
   - Engineered RESTful APIs across 3 Razorpay billing tiers sustaining 99.9% uptime at 10K+ monthly requests
   - Developed LangGraph multi-model AI agent workflows with MCP Server orchestration and LangSmith observability
   - Connected Gemini and OpenAI to automate 40%+ of client workflows

2. SDE Intern | Innovaccer (Noida) — Mar 2025 to Jun 2025
   - Built Node.js microservices with RESTful APIs, Redis caching, Nginx, and PostgreSQL query tuning
   - Cut P95 latency from 10s to 300ms across 50K+ daily requests
   - Automated CI/CD via GitHub Actions, raised test coverage from 20% to 85% via Jest/Supertest

3. Undergraduate Researcher | Amity University (Noida) — Jun 2024 to Jul 2024
   - Reached 95.12% accuracy on 76K+ images using a custom CNN with transfer learning
   - Deployed on-device via TensorFlow Lite and Flutter

PROJECTS:
- Intervyou AI: AI-driven SaaS platform for interview simulations, 3000+ users, supported by Google for Startups
- VendorIQ: AI-powered vendor intelligence platform — https://github.com/UJJAWAL-SHARMA/VendorIQ-Public
- QuantumDoc: Agentic RAG platform, 3-phase pipeline, 85%+ context precision — https://github.com/UJJAWAL-SHARMA/QuantumPDF---AI-Document-Analysis-Platform
- CastIQ: AI learning platform, 650+ users, 12 paying customers, sub-300ms response
- CineVision: Distributed streaming platform, 50K+ concurrent users (Spring Boot, Kafka, Redis, Docker)
- Banking Microservices: Fintech platform (.NET 8, CQRS, MediatR, SQL Server, MongoDB)
- SyntaxMeets: Real-time collaborative IDE, 300+ concurrent sessions, sub-50ms sync latency
- AgriContractor: Platform connecting farmers with contractors — https://github.com/UJJAWAL-SHARMA/AgriContractor
- Compliance Copilot: AI compliance assistant — https://github.com/UJJAWAL-SHARMA/Compliance-copilot
- LegalRAG Engine: Specialized RAG system for legal documents — https://github.com/UJJAWAL-SHARMA/LegalRAG-Engine
- oss-ratelimit: npm library for distributed rate limiting, 400+ weekly downloads
- Signature Injection Engine: Document signature automation — https://github.com/UJJAWAL-SHARMA/Signature-Injection-Enginejs

TECHNICAL SKILLS:
- Languages: JavaScript, TypeScript, Java, Python, SQL
- Backend: Node.js, Express.js, RESTful APIs, GraphQL, WebSockets, Microservices, JWT, OAuth 2.0, Spring Boot
- Frontend: React.js, Next.js, Redux, Tailwind CSS
- Databases: PostgreSQL, MongoDB, MySQL, Redis, Kafka, RabbitMQ, BullMQ
- Cloud & Infra: AWS (EC2, S3, SQS, Lambda), Docker, Kubernetes, Nginx, GitHub Actions, CI/CD
- AI/GenAI: LangChain, LangGraph, MCP Server, RAG Pipelines, LangSmith, Pinecone, RAGAS, Gemini API, OpenAI API
- CS Fundamentals: Data Structures & Algorithms, System Design, LLD, HLD

EDUCATION:
- IMS Engineering College, Ghaziabad, UP (2022–2026)
- B.Tech, Computer Science Engineering
- GPA: 8.6 / 10.0

ACHIEVEMENTS:
- 2nd Prize — HACK-A-THON 2K25, IMSUC Campus Hackathon (500+ participants, 2025)
- Ranked 239th in India among 11,000+ participants — Google Hash Code 2024
- Deep Learning Certification — NVIDIA Deep Learning Institute (2024)
- Solved 400+ LeetCode problems; Global Rank 1,847 (Biweekly 151) and 2,134 (Weekly 438)

Answer only about Ujjawal. If asked something unrelated, politely redirect to Ujjawal's background. Keep answers concise (2-4 sentences max unless detailed info is requested).`;

export async function POST(request) {
	try {
		// 1. Validate Request Body
		let body;
		try {
			body = await request.json();
		} catch (e) {
			return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
		}

		const { messages } = body;
		if (!messages || !Array.isArray(messages)) {
			return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
		}

		// 2. Check API Key
		const apiKey = process.env.GROQ_API_KEY;
		if (!apiKey) {
			console.error("GROQ_API_KEY is missing from environment variables");
			return NextResponse.json(
				{ error: "Chatbot is currently unavailable (API key not configured)" },
				{ status: 500 }
			);
		}

		// 3. Initialize Groq
		const groq = new Groq({ apiKey });

		// 4. Sanitize and prepare messages
		const sanitizedMessages = messages
			.filter(m => m.role && m.content)
			.map(m => ({
				role: m.role === 'user' || m.role === 'assistant' || m.role === 'system' ? m.role : 'user',
				content: String(m.content)
			}))
			.slice(-10);

		// 5. Call Groq API
		const completion = await groq.chat.completions.create({
			model: "llama-3.3-70b-versatile",
			messages: [
				{ role: "system", content: SYSTEM_PROMPT },
				...sanitizedMessages,
			],
			max_tokens: 500,
			temperature: 0.7,
		});

		// 6. Return Response
		const reply = completion.choices[0]?.message?.content || "I'm not sure how to answer that.";
		return NextResponse.json({ reply });

	} catch (error) {
		console.error("Chat API error:", error);
		
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		const status = error.status || 500;
		const isRateLimit = errorMessage.toLowerCase().includes("rate limit") || status === 429;
		
		return NextResponse.json(
			{ 
				error: isRateLimit ? "Rate limit exceeded. Please try again in a moment." : "Failed to get response",
				details: process.env.NODE_ENV === "development" ? errorMessage : undefined
			},
			{ status }
		);
	}
}
