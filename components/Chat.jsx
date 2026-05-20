"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUGGESTIONS = [
	"What are Ujjawal's skills?",
	"Tell me about his experience",
	"What projects has he built?",
	"How can I contact him?",
];

export default function Chat() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			content: "Hi! I'm Ujjawal's AI assistant. Ask me anything about his skills, experience, or projects! 👋",
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages, isOpen]);

	const sendMessage = async (text) => {
		const userMessage = text || input.trim();
		if (!userMessage || isLoading) return;

		setInput("");
		const newMessages = [...messages, { role: "user", content: userMessage }];
		setMessages(newMessages);
		setIsLoading(true);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: newMessages.map((m) => ({
						role: m.role,
						content: m.content,
					})),
				}),
			});

			const data = await response.json();
			setMessages([
				...newMessages,
				{
					role: "assistant",
					content: data.reply || "Sorry, I couldn't get a response right now.",
				},
			]);
		} catch {
			setMessages([
				...newMessages,
				{
					role: "assistant",
					content: "Sorry, something went wrong. Please try again.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e) => {
		// Stop propagation to prevent global listeners (like fullpage-snap) from intercepting keys
		e.stopPropagation();

		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<>
			{/* Chat Button */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				aria-label="Open chat">
				{isOpen ? (
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				) : (
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
					</svg>
				)}
			</motion.button>

			{/* Chat Window */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
						style={{ height: "460px" }}>
						{/* Header */}
						<div className="bg-black text-white px-4 py-3 flex items-center gap-3">
							<div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
								R
							</div>
							<div>
								<div className="font-semibold text-sm">Ujjawal&apos;s Assistant</div>
								<div className="text-xs text-gray-400">Ask me anything</div>
							</div>
						</div>

						{/* Messages */}
						<div className="flex-1 overflow-y-auto p-4 space-y-3">
							{messages.map((msg, idx) => (
								<div
									key={idx}
									className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
									<div
										className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
											msg.role === "user"
												? "bg-black text-white rounded-br-sm"
												: "bg-gray-100 text-gray-800 rounded-bl-sm"
										}`}>
										{msg.content}
									</div>
								</div>
							))}
							{isLoading && (
								<div className="flex justify-start">
									<div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-bl-sm">
										<div className="flex gap-1">
											<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
											<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
											<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
										</div>
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Suggestions (show only on first message) */}
						{messages.length === 1 && (
							<div className="px-3 pb-2 flex flex-wrap gap-1">
								{SUGGESTIONS.map((s, i) => (
									<button
										key={i}
										onClick={() => sendMessage(s)}
										className="text-xs bg-gray-50 border border-gray-200 rounded-full px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors">
										{s}
									</button>
								))}
							</div>
						)}

						{/* Input */}
						<div className="p-3 border-t border-gray-100 flex gap-2">
							<input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Ask about Ujjawal..."
								className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-gray-400 bg-gray-50"
								disabled={isLoading}
							/>
							<button
								onClick={() => sendMessage()}
								disabled={isLoading || !input.trim()}
								className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:opacity-40 transition-colors flex-shrink-0">
								<svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
								</svg>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
