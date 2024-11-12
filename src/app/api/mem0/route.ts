import { addMemoriesAction, getMemoriesAction } from "@/app/actions/memories";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    maxSteps: 5,
    messages,
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
      Only respond to questions using information from tool calls.
      if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
    tools: {
      addMemory: tool({
        description: `add a memory to your knowledge base.
            If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z
            .string()
            .describe("the content or memory to add to the knowledge base"),
        }),
        execute: async ({ content }) => {
          const messages = [
            {
              role: "user" as const,
              content: [
                {
                  type: "text" as const,
                  text: content,
                },
              ],
            },
          ];
          return addMemoriesAction(messages);
        },
      }),
      getMemories: tool({
        description: `get memories from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
        }),
        execute: async ({ question }) => getMemoriesAction(question),
      }),
    },
  });

  return result.toDataStreamResponse();
}
