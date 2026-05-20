import "./globals.css";
import { Poppins, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { Analytics } from "@vercel/analytics/next";
import Chat from "@/components/Chat";
import ClientTopProgressBar from "@/components/ClientTopProgressBar";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	style: ["normal", "italic"],
	display: "swap",
	variable: "--font-poppins",
});

const jost = Jost({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-jost",
});

export const metadata = {
	metadataBase: new URL("https://ujjawalsharma.dev"),
	title: "Ujjawal Sharma | Portfolio",

	description:
		"Ujjawal Sharma — Product-Driven Software & AI Engineer specializing in Node.js, Next.js, LangGraph, and AWS. Building high-performance systems and AI-powered platforms.",

	author: "Ujjawal Sharma",
	siteUrl: "https://ujjawalsharma.dev",
	applicationName: "Ujjawal Sharma Portfolio",

	keywords: [
		"ujjawal sharma",
		"ujjawal",
		"software engineer",
		"ai engineer",
		"nodejs",
		"nextjs",
		"langgraph",
		"backend engineer",
		"fullstack developer",
		"india",
		"noida",
	],

	openGraph: {
		type: "website",
		url: "https://ujjawalsharma.dev",
		title: "Ujjawal Sharma | Portfolio",
		siteName: "Ujjawal Sharma Portfolio",
		description:
			"Product-Driven Software & AI Engineer building high-performance systems and AI-powered platforms.",
		images: [
			{
				url: "/og-image-rev.png",
				alt: "Ujjawal Sharma Portfolio",
				width: 1200,
				height: 630,
			},
		],
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Ujjawal Sharma",
	url: "https://ujjawalsharma.dev",
	jobTitle: "Software & AI Engineer",
	worksFor: [
		{ "@type": "Organization", name: "Scaliqalgo" },
		{ "@type": "Organization", name: "Innovaccer" },
	],
	alumniOf: {
		"@type": "CollegeOrUniversity",
		name: "IMS Engineering College, Ghaziabad",
	},
	sameAs: [
		"https://github.com/UJJAWAL-SHARMA",
		"https://www.linkedin.com/in/ujjawal-sharma-04192b263",
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${poppins.variable} ${jost.variable}`}>
			<body>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<ClientTopProgressBar />
				<Navbar />
				{children}
				<Chat />
				<Analytics />
			</body>
		</html>
	);
}
