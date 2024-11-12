"use client";

import { useChat } from "ai/react";
import { ToolInvocation, JSONValue } from "ai";
import { useScrollToBottom } from "@/lib/hooks/use-scroll-to-bottom";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/mem0",
  });
  const [containerRef, endRef] = useScrollToBottom<HTMLDivElement>();

  // Helper function to render tool states
  const renderToolStates = (tool: ToolInvocation) => {
    // Helper function to safely get result
    const getResult = (tool: ToolInvocation) => {
      if (tool.state === "result") {
        // Make sure to stringify any object results
        return typeof tool.result === "object"
          ? JSON.stringify(tool.result, null, 2)
          : tool.result;
      }
      return "Pending...";
    };

    // Helper function to safely stringify arguments
    const getArgs = (args: JSONValue) => {
      if (!args) return null;
      return typeof args === "object"
        ? JSON.stringify(args, null, 2)
        : String(args);
    };

    return (
      <div className="space-y-2">
        <div className="text-sm font-medium text-purple-600 mb-2">
          Current Tool State: {tool.state}
        </div>

        {/* partial-call state */}
        <div className="bg-yellow-100 p-2 rounded">
          <div className="font-semibold">
            🔄 State: partial-call
            {tool.state === "partial-call" && " (Current)"}
          </div>
          <div className="text-sm">
            Tool: {tool.toolName}
            {tool.args && (
              <div className="mt-1">Arguments: {getArgs(tool.args)}</div>
            )}
          </div>
        </div>

        {/* call state */}
        <div className="bg-blue-100 p-2 rounded">
          <div className="font-semibold">
            📤 State: call
            {tool.state === "call" && " (Current)"}
          </div>
          <div className="text-sm">
            Tool: {tool.toolName}
            <div className="mt-1">Arguments: {getArgs(tool.args)}</div>
          </div>
        </div>

        {/* result state */}
        <div className="bg-green-100 p-2 rounded">
          <div className="font-semibold">
            ✅ State: result
            {tool.state === "result" && " (Current)"}
          </div>
          <div className="text-sm">
            Tool: {tool.toolName}
            <div className="mt-1">Arguments: {getArgs(tool.args)}</div>
            <div className="mt-2 font-medium">Result: {getResult(tool)}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto min-h-screen">
      <div ref={containerRef} className="flex-1 mb-32">
        {messages.map((m) => (
          <div key={m.id} className="mb-4">
            <div className="font-medium mb-2">
              {m.role === "user" ? "👤 User: " : "🤖 AI: "}
            </div>
            <div className="whitespace-pre-wrap mb-2">{m.content}</div>

            {m.toolInvocations?.map((tool) => (
              <div key={tool.toolCallId} className="ml-4 mt-2">
                {renderToolStates(tool)}
              </div>
            ))}
          </div>
        ))}
        <div ref={endRef} className="mb-32" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto p-4 bg-white"
      >
        <input
          className="w-full p-2 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
