import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings, Database } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import ChatInterface, { type Message } from "@/components/ChatInterface";
import MessageInput from "@/components/MessageInput";
import KnowledgeBaseManager from "@/components/KnowledgeBaseManager";
import ThemeToggle from "@/components/ThemeToggle";

type AvatarState = "idle" | "listening" | "thinking" | "speaking";

interface KnowledgeFile {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "ready" | "error";
  type: "pdf" | "txt" | "json";
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [isProcessing, setIsProcessing] = useState(false);
  const [knowledgeFiles, setKnowledgeFiles] = useState<KnowledgeFile[]>([
    //todo: remove mock functionality
    {
      id: "1",
      name: "Introduction_to_AI.pdf",
      size: 2048000,
      status: "ready",
      type: "pdf",
    },
  ]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    setAvatarState("thinking");

    //todo: remove mock functionality - replace with actual API call
    setTimeout(() => {
      setAvatarState("speaking");
      
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Great question! Based on your knowledge base, I can help you understand this topic better. ${content.includes("explain") ? "Let me break it down for you step by step..." : "Here's what I found..."}`,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setAvatarState("idle");
        setIsProcessing(false);
      }, 2000);
    }, 1500);
  };

  const handleUploadFiles = (files: File[]) => {
    //todo: remove mock functionality - replace with actual upload
    console.log("Uploading files:", files);
    
    const newFiles: KnowledgeFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      status: "uploading",
      type: file.name.endsWith(".pdf")
        ? "pdf"
        : file.name.endsWith(".json")
        ? "json"
        : "txt",
    }));

    setKnowledgeFiles((prev) => [...prev, ...newFiles]);

    setTimeout(() => {
      setKnowledgeFiles((prev) =>
        prev.map((f) =>
          newFiles.find((nf) => nf.id === f.id) && f.status === "uploading"
            ? { ...f, status: "ready" }
            : f
        )
      );
    }, 2000);
  };

  const handleRemoveFile = (id: string) => {
    //todo: remove mock functionality - replace with actual deletion
    console.log("Removing file:", id);
    setKnowledgeFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 border-r border-border sticky top-0 h-screen">
        <AvatarDisplay state={avatarState} />
      </div>

      <div className="flex flex-col flex-1 w-full lg:w-1/2">
        <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                AI Learning Assistant
              </h1>
              <p className="text-xs text-muted-foreground">
                Powered by your knowledge base
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-knowledge-base"
                >
                  <Database className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Knowledge Base</SheetTitle>
                  <SheetDescription>
                    Upload and manage your learning materials
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <KnowledgeBaseManager
                    files={knowledgeFiles}
                    onUpload={handleUploadFiles}
                    onRemove={handleRemoveFile}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <ThemeToggle />
          </div>
        </header>

        <div className="lg:hidden border-b border-border bg-accent/50 p-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground">Status: {avatarState}</p>
              <p className="text-muted-foreground">Ready to help you learn</p>
            </div>
          </div>
        </div>

        <ChatInterface messages={messages} />

        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={isProcessing}
          placeholder={
            knowledgeFiles.length === 0
              ? "Upload files to your knowledge base first..."
              : "Ask a question about your knowledge base..."
          }
        />
      </div>
    </div>
  );
}
