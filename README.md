# Ujjawal Sharma — Portfolio

Personal portfolio website built with Next.js 15, Tailwind CSS, and Framer Motion.

## Setup

```bash
pnpm install
```

## Environment Variables

Create `.env.local` with:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your free Groq API key at [console.groq.com](https://console.groq.com)

## Development

```bash
pnpm dev
```

## Build & Deploy

```bash
pnpm build
pnpm start
```

Deploy to Vercel — connect your GitHub repo and add `GROQ_API_KEY` in the Vercel environment variables dashboard.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Chatbot**: Groq (Llama 3.1)
- **Icons**: FontAwesome
- **Analytics**: Vercel Analytics
