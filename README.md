# AI Agent Memory Testing

A Next.js project exploring AI agents with persistent memory capabilities using Mem0 and the Vercel AI SDK.

## Overview

This project demonstrates the implementation of AI agents with memory context, allowing for more coherent and contextually aware conversations. It leverages:

- [Mem0](https://docs.mem0.ai/integrations/vercel-ai-sdk) for persistent memory storage
- Vercel AI SDK for AI interactions
- Multiple LLM providers (OpenAI, Anthropic, Cohere, and Groq)

## Tech Stack

- Frontend: Next.js, Tailwind CSS, Shadcn, Framer Motion
- Backend: Postgres, Supabase, Drizzle ORM, Server Actions
- Auth: Clerk
- Payments: Stripe
- AI: Vercel AI SDK, Mem0
- Deployment: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up your environment variables:
```env
MEM0_API_KEY=your_mem0_api_key
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

- 🧠 Persistent memory storage for AI conversations
- 🔄 Seamless integration with Vercel AI SDK
- 🚀 Support for multiple LLM providers
- 📝 Structured message format handling
- ⚡ Streaming response capabilities

## Project Structure

- `/actions` - Server actions
- `/app` - Next.js app router
- `/components` - Shared components
- `/db` - Database configuration and schemas
- `/lib` - Utility functions and hooks
- `/prompts` - AI prompt templates
- `/types` - TypeScript type definitions

## Learn More

- [Mem0 Documentation](https://docs.mem0.ai/integrations/vercel-ai-sdk)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Deployment

Deploy on [Vercel Platform](https://vercel.com) for the best experience and seamless integration.
