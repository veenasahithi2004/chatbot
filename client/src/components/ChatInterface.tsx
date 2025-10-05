import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
}

export default function ChatInterface({ messages }: ChatInterfaceProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 w-full" ref={scrollAreaRef}>
      <div className="p-6 space-y-6 max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <span className="text-3xl">💡</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Start Your Learning Journey
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Upload your knowledge base files and ask me anything. I'll help you understand complex topics with engaging explanations!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 w-full max-w-lg">
              <div className="p-4 rounded-lg border border-border bg-card hover-elevate cursor-pointer">
                <p className="text-sm text-foreground">
                  "Explain this concept in simple terms"
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card hover-elevate cursor-pointer">
                <p className="text-sm text-foreground">
                  "Give me examples to understand better"
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card hover-elevate cursor-pointer">
                <p className="text-sm text-foreground">
                  "Test my knowledge with questions"
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card hover-elevate cursor-pointer">
                <p className="text-sm text-foreground">
                  "Summarize the key points"
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
              />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
