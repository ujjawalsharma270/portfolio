"use client";
import Hr from "@/components/Hr";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const experiences = [
	{
		id: 1,
		startDate: "Sep 2025",
		endDate: "Apr 2026",
		showDates: true,
		company: "Scaliqalgo",
		position: "Software Engineer (Platform & AI Systems)",
		type: "Full-time (Remote)",
		location: "Remote",
		description:
			"Core engineer building scalable multi-tenant systems and intelligent automation platforms. Engineered high-availability backend services with distributed processing, caching, and concurrency control, ensuring 99.9% uptime under production workloads. Designed and implemented intelligent agent-based workflows integrating multiple models and services, automating complex business processes and improving operational efficiency by 40%+.",
		skills: [
			"Distributed Systems",
			"Backend Engineering",
			"System Design",
			"Scalable Architectures",
			"Caching & Messaging",
			"AI Systems",
			"Node.js",
			"Redis",
			"BullMQ",
			"LangGraph",
		],
	},
	{
		id: 2,
		startDate: "Mar 2025",
		endDate: "Jun 2025",
		showDates: true,
		company: "Innovaccer",
		position: "Software Development Engineer Intern",
		type: "Full-time | Noida",
		location: "Noida, India",
		description:
			"Built and optimized critical backend services handling 50K+ daily requests, driving performance improvements from high-latency responses to sub-second execution through efficient system design, caching strategies, and database optimization. Strengthened system reliability and engineering maturity by establishing robust testing practices and automated delivery pipelines, significantly improving code quality, deployment consistency, and overall system stability.",
		skills: [
			"Backend Engineering",
			"High-Scale Systems",
			"Performance Optimization",
			"Distributed Systems",
			"CI/CD",
			"Testing & Reliability",
			"API Design",
			"Redis",
			"PostgreSQL",
			"Node.js",
		],
	},
	{
		id: 3,
		startDate: "",
		endDate: "",
		showDates: false,
		company: "Undergraduate Research",
		position: "Full Stack Intern",
		type: "Internship | Noida",
		location: "Noida, India",
		description:
			"Architected and delivered a multi-tenant SaaS platform, designing scalable backend services and responsive frontend systems, while integrating intelligent agent-based workflows to automate 40%+ of client operations. Engineered a high-availability cloud-based platform with distributed processing, secure authentication, and efficient system design, ensuring 99.9% uptime across multiple service tiers under production workloads.",
		skills: [
			"Full Stack Development",
			"SaaS Architecture",
			"AI Integration",
			"Cloud Deployment",
			"Multi-tenant Systems",
			"React",
			"Node.js",
		],
	},
	{
		id: 4,
		startDate: "Apr 2023",
		endDate: "Jul 2025",
		company: "Self-Employed",
		position: "Web Developer & AI Consultant",
		type: "Freelance",
		location: "Malang, Indonesia",
		description:
			"Developed 15+ web applications using Next.js, React, and Laravel. Provided AI consulting services, including creating custom LLMs. Focused on delivering high-quality, user-friendly applications and AI solutions.",
		skills: [
			"Next.js",
			"React",
			"Laravel",
			"MySQL",
			"PostgreSQL",
			"MongoDB",
			"JavaScript",
			"TypeScript",
			"Gemini AI",
		],
	},
];

function Title() {
	return (
		<div className="mt-16 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start">
				<Hr variant="long"></Hr>
				<motion.h1
					className="text-3xl font-bold mt-3"
					initial={{
						opacity: 0,
						x: -200,
					}}
					whileInView={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						delay: 0.7,
						type: "spring",
					}}>
					Professional Experience
				</motion.h1>
			</div>
		</div>
	);
}

function TimelineCard({ experience, index, isEven }) {
	if (!experience.showDates) return null;
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.15, duration: 0.5 }}
			className={`flex ps-10 md:ps-0 ${
				isEven
					? "md:justify-center md:translate-x-68"
					: "md:justify-center md:-translate-x-68"
			} justify-center mb-4`}>
			<div className="bg-gradient-to-r from-black to-gray-800 text-white px-12 py-3 rounded-xl shadow-lg border border-gray-600 min-w-max">
				<div className="flex items-center justify-center gap-6">
					<div className="text-center">
						<div className="text-sm font-bold">{experience.startDate}</div>
						<div className="text-xs text-gray-300">Start</div>
					</div>
					<div className="w-px h-8 bg-gray-500"></div>
					<div className="text-center">
						<div className="text-sm font-bold">{experience.endDate}</div>
						<div className="text-xs text-gray-300">End</div>
					</div>
					<div className="w-px h-8 bg-gray-500"></div>
					<div className="text-center">
						<div className="text-sm font-medium text-gray-400">
							{experience.location}
						</div>
						<div className="text-xs text-gray-300">Location</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function ExperienceCard({ experience, index, isEven }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.2, duration: 0.6 }}
			className={`relative group ${
				isEven ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"
			} md:w-1/2`}>
			<div
				className={`bg-white/20 backdrop-blur-sm border border-gray-300/30 rounded-2xl p-6 shadow-lg 
				hover:shadow-xl hover:bg-white/30 transition-all duration-300 ml-12 md:ml-0`}>
				{/* Company & Position */}
				<div className="mb-4">
					<h3 className="font-bold text-xl text-black mb-1">
						{experience.company}
					</h3>
					<h4 className="font-medium text-lg text-gray-700">
						{experience.position}
						<span className="text-sm font-normal text-gray-500 ml-2">
							• {experience.type}
						</span>
					</h4>
				</div>

				{/* Description */}
				<p className="text-gray-600 text-justify leading-relaxed mb-4">
					{experience.description}
				</p>

				{/* Skills */}
				<div className="flex flex-wrap gap-2">
					{experience.skills.map((skill, idx) => (
						<span
							key={idx}
							className="bg-gray-200/60 hover:bg-gray-300/60 border border-gray-400/40 text-black px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:scale-105">
							{skill}
						</span>
					))}
				</div>
			</div>
		</motion.div>
	);
}

function Wrapper({ children }) {
	return (
		<div className="mx-auto container px-6 py-10">
			<div className="flex justify-center items-center flex-col">
				{children}
			</div>
		</div>
	);
}

export default function Experience() {
	const [showAll, setShowAll] = useState(false);
	const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

	return (
		<>
			<Title />
			<Wrapper>
				<div className="relative w-full max-w-6xl mx-auto">
					{/* Timeline line - hidden on mobile, visible on md+ */}
					<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-black via-gray-400 to-transparent h-full"></div>
					{/* Mobile timeline line */}
					<div className="md:hidden absolute left-0 w-1 bg-gradient-to-b from-black via-gray-400 to-transparent h-full"></div>
					{/* Experience cards */}
					<div className="space-y-12 md:space-y-16 relative">
						<AnimatePresence>
							{displayedExperiences.map((experience, index) => (
								<div key={experience.id} className="relative">
									<TimelineCard
										experience={experience}
										index={index}
										isEven={index % 2 === 1}
									/>
									<div
										className={`absolute w-6 h-6 bg-black rounded-full border-4 border-white shadow-lg z-30
										md:left-1/2 md:-translate-x-1/2 md:top-4
										left-0 -translate-x-1/2 top-5`}
									/>
									<ExperienceCard
										experience={experience}
										index={index}
										isEven={index % 2 === 1}
									/>
								</div>
							))}
						</AnimatePresence>
					</div>
				</div>
			</Wrapper>
		</>
	);
}
