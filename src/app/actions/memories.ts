"use server";

import { retrieveMemories, addMemories } from "@mem0/vercel-ai-provider";
import { LanguageModelV1Prompt } from "ai";
import { ActionState } from "@/lib/types/action-types";

export async function getMemoriesAction(
  prompt: string
): Promise<ActionState<string>> {
  try {
    const memories = await retrieveMemories(prompt, { user_id: "dgang" });
    return {
      isSuccess: true,
      message: "Memories retrieved successfully",
      data: memories,
    };
  } catch (error) {
    console.error("Error retrieving memories:", error);
    return { isSuccess: false, message: "Failed to retrieve memories" };
  }
}

export async function addMemoriesAction(
  memories: LanguageModelV1Prompt
): Promise<ActionState<string>> {
  try {
    const result = await addMemories(memories, { user_id: "dgang" });
    return {
      isSuccess: true,
      message: "Memories added successfully",
      data: result.message,
    };
  } catch (error) {
    console.error("Error adding memories:", error);
    return {
      isSuccess: false,
      message:
        error instanceof Error ? error.message : "Failed to add memories",
    };
  }
}
