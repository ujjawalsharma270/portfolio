"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Me1 from "@/public/image/ujjawal-pc.png";
import Me2 from "@/public/image/ujjawal-pc.png";
import Hr from "@/components/Hr";

function Title() {
	return (
		<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start ">
				<Hr variant="long"></Hr>
				<h1 className="text-3xl font-bold mt-3">Who Am I?</h1>
			</div>
		</div>
	);
}

export default function About() {
	return (
		<>
			<Title />
			<div className="relative mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
				<div className="flex justify-center items-start flex-col mb-5 ">
					<div className="images relative w-full aspect-square">
						<div className="absolute top-28 left-10 w-[50%] aspect-square grayscale hover:grayscale-0 transition-all ease duration-300">
							<motion.div
								initial={{ opacity: 0, scale: 0.5, x: 100 }}
								whileInView={{
									opacity: 1,
									scale: 1,
									x: 0,
								}}
								className="relative w-full h-full">
								<Image
									src={Me1}
									alt="Ujjawal Sharma"
									fill
									sizes="(max-width: 768px) 80vw, 40vw"
									className="object-cover object-top"
								/>
							</motion.div>
						</div>
						<div className="absolute bottom-16 right-20 w-[40%] aspect-square grayscale hover:grayscale-0 transition-all ease duration-300">
							<motion.div
								initial={{
									opacity: 0,
									scale: 0.5,
									x: -100,
								}}
								whileInView={{
									opacity: 1,
									scale: 1,
									x: 0,
								}}
								transition={{
									delay: 0.5,
								}}
								className="relative w-full h-full">
								<Image
									src={Me2}
									alt="Ujjawal Sharma"
									fill
									sizes="(max-width: 768px) 80vw, 35vw"
									className="object-cover object-top"
								/>
							</motion.div>
						</div>
					</div>
				</div>
				<motion.div
					className="flex justify-center items-start flex-col mb-5 md:px-10"
					initial={{
						opacity: 0,
						x: 100,
					}}
					whileInView={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						delay: 0.3,
						type: "spring",
					}}>
					<h2 className="text-2xl font-bold mb-2">Ujjawal Sharma</h2>
					<p className="text-gray-600 text-justify title text-lg leading-relaxed mb-4">
						I am a <span className="text-black font-semibold">Product-Minded Software &amp; AI Engineer</span> specializing in building scalable systems and bridging the gap between modern web technologies and intelligent architectures. A Computer Science undergraduate, my professional journey is defined by high-impact projects — ranging from large-scale <span className="text-black font-semibold">distributed backend systems</span> to advanced <span className="text-black font-semibold">AI-driven platforms</span> designed to deliver real-world value.
					</p>
					<p className="text-gray-600 text-justify title text-lg leading-relaxed mb-4">
						Currently, I engineer <span className="text-black font-semibold">production-grade systems</span>, ensuring high availability, performance, and reliability for real users at scale. I have built and optimized systems handling <span className="text-black font-semibold">tens of thousands of daily requests</span> with strong uptime and low latency. Alongside this, I design and develop <span className="text-black font-semibold">AI-powered platforms</span>, leveraging intelligent automation and multi-model systems to enhance user workflows and decision-making.
					</p>
					<p className="text-gray-600 text-justify title text-lg leading-relaxed">
						I remain focused on delivering <span className="text-black font-semibold">measurable impact</span> by combining strong engineering fundamentals with practical AI applications — building systems that are <span className="text-black font-semibold">scalable, efficient</span>, and aligned with real business needs.
					</p>
				</motion.div>
			</div>
		</>
	);
}
