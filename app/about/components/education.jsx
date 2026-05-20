"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMedal,
	faGraduationCap,
	faTrophy,
	faAward,
	faChevronDown,
	faChevronUp,
	faCode,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CertPhoto from "@/public/image/ujjawal-cert.jpg";

function Wrapper({ children }) {
	return (
		<div className="mx-auto container gap-10 p-10 grid grid-cols-1 my-10">
			<motion.div
				className="flex justify-center items-start flex-col mb-5"
				initial={{
					opacity: 0,
					y: 50,
				}}
				whileInView={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					delay: 0.3,
					duration: 0.8,
					type: "spring",
					stiffness: 100,
				}}>
				{children}
			</motion.div>
		</div>
	);
}

export default function Education() {
	const [isExpanded, setIsExpanded] = useState(false);

	const achievements = [
		{
			icon: faMedal,
			title: "2nd Prize — HACK-A-THON 2K25",
			subtitle: "IMSUC Campus Hackathon, Ghaziabad (500+ participants)",
			date: "2025",
			color: "from-slate-400 to-slate-500",
		},
		{
			icon: faTrophy,
			title: "Ranked 239th in India",
			subtitle: "Google Hash Code 2024 (11,000+ participants)",
			date: "2025",
			color: "from-yellow-400 to-orange-500",
		},
		{
			icon: faAward,
			title: "Deep Learning Certification",
			subtitle: "NVIDIA Deep Learning Institute",
			date: "2024",
			color: "from-green-500 to-teal-600",
		},
		{
			icon: faCode,
			title: "400+ LeetCode Problems Solved",
			subtitle: "Global Rank 1,847 (Biweekly 151) & 2,134 (Weekly 438)",
			date: "2026",
			color: "from-blue-500 to-purple-600",
		},
	];

	const visibleAchievements = isExpanded ? achievements : achievements.slice(0, 4);

	return (
		<Wrapper>
			<section className="grid gap-8 md:gap-12 w-full">
				{/* Header */}
				<motion.div
					className="text-center space-y-2"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
						Education
					</h1>
					<p className="text-muted-foreground max-w-[800px] mx-auto text-gray-500">
						Academic foundation and competitive excellence.
					</p>
				</motion.div>

				{/* Main Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Education Section - Left */}
					<motion.div
						className="px-5"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						<div className="font-medium text-lg mb-4">
							2022 — 2026
						</div>
						<div>
							<h2 className="font-semibold text-xl">
								IMS Engineering College
							</h2>
							<h3 className="text-md font-normal mb-1">
								Ghaziabad, Uttar Pradesh
							</h3>
							<h4 className="text-md font-light mb-3 text-gray-600">
								B.Tech, Computer Science Engineering
							</h4>

							{/* Certificate Photo */}
							<div className="gap-4 mb-4 flex items-stretch h-[250px] md:h-[300px]">
								<div className="flex-1 transition-all duration-300 ease-in-out hover:flex-[2] group">
									<Image
										src={CertPhoto}
										width={400}
										height={300}
										alt="Ujjawal Sharma receiving certificate with team"
										className="rounded-lg w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
							</div>

							<p className="text-gray-600 text-justify title text-lg leading-relaxed">
								I am pursuing a Bachelor&apos;s degree in{" "}
								<span className="text-black font-medium">Computer Science</span>,
								building a strong foundation in data structures, system design, and scalable software engineering. My academic journey has been shaped by a balance of rigorous problem-solving and practical system building.
							</p>
							<br />
							<p className="text-gray-600 text-justify title text-lg leading-relaxed">
								Beyond academics, I have consistently demonstrated{" "}
								<span className="text-black font-medium">competitive excellence</span>, solving 400+ algorithmic problems and achieving strong global rankings in coding contests including{" "}
								<span className="text-black font-medium">Google Hash Code</span>. These experiences have sharpened my ability to think in terms of efficiency, scalability, and real-world constraints.
							</p>
							<br />
							<p className="text-gray-600 text-justify title text-lg leading-relaxed">
								My education serves as the core foundation for my work in building{" "}
								<span className="text-black font-medium">high-performance systems</span> and{" "}
								<span className="text-black font-medium">AI-driven platforms</span>.
							</p>
							<div className="flex flex-wrap gap-2 mt-4 text-sm">
								<div className="bg-gray-300 text-black px-2 py-1 rounded-2xl">
									GPA: 8.6 / 10.0
								</div>
							</div>
						</div>
					</motion.div>

					{/* Achievements Section - Right */}
					<motion.div
						className="flex flex-col justify-start px-5 md:px-0"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						<h2 className="font-semibold text-xl mt-7">
							Achievements
						</h2>
						<p className="text-md font-normal mb-3 md:mb-6">
							Competitions, certifications, and competitive programming highlights.
						</p>

						<div className="relative">
							<div className="space-y-4">
								<AnimatePresence>
									{visibleAchievements.map((achievement, index) => (
										<motion.div
											key={index}
											className="group"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{
												duration: 0.5,
												delay: index * 0.05,
											}}>
											<div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300 hover:shadow-xl grayscale hover:grayscale-0">
												<div className="flex items-center gap-4">
													<div
														className={`aspect-square w-10 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-primary-foreground transition-all duration-300`}>
														<FontAwesomeIcon
															icon={achievement.icon}
															className="text-white h-5 w-5"
														/>
													</div>
													<div>
														<h3 className="font-medium">
															{achievement.title}
														</h3>
														<p className="text-sm">
															{achievement.subtitle}
														</p>
														<div className="text-xs text-gray-500 mt-1">
															{achievement.date}
														</div>
													</div>
												</div>
											</div>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</Wrapper>
	);
}
