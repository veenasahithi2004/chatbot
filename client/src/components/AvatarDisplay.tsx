import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Mic, MessageCircle } from "lucide-react";

type AvatarState = "idle" | "listening" | "thinking" | "speaking";

interface AvatarDisplayProps {
  state: AvatarState;
  onStateChange?: (state: AvatarState) => void;
}

export default function AvatarDisplay({ state, onStateChange }: AvatarDisplayProps) {
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getStateConfig = () => {
    switch (state) {
      case "listening":
        return {
          label: "Listening",
          icon: Mic,
          color: "bg-chart-2",
          gradient: "from-chart-2/20 to-chart-2/5",
        };
      case "thinking":
        return {
          label: "Thinking",
          icon: Loader2,
          color: "bg-chart-4",
          gradient: "from-chart-4/20 to-chart-4/5",
        };
      case "speaking":
        return {
          label: "Speaking",
          icon: MessageCircle,
          color: "bg-primary",
          gradient: "from-primary/20 to-primary/5",
        };
      default:
        return {
          label: "Ready",
          icon: Sparkles,
          color: "bg-muted-foreground",
          gradient: "from-accent to-background",
        };
    }
  };

  const config = getStateConfig();
  const Icon = config.icon;
  const isAnimated = state === "thinking" || state === "speaking";

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-8">
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} transition-colors duration-700`} />
      
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 w-full max-w-lg">
        <div className="relative">
          <div 
            className={`relative w-64 h-64 rounded-2xl bg-card border-2 border-card-border shadow-xl overflow-hidden transition-all duration-500 ${
              state !== "idle" ? "scale-105" : "scale-100"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-accent/50">
              <div className="text-center space-y-4">
                <div className={`w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center ${
                  isAnimated ? "animate-pulse" : ""
                }`}>
                  <Icon className={`w-12 h-12 text-primary ${
                    state === "thinking" ? "animate-spin" : ""
                  }`} />
                </div>
                
                {state === "speaking" && (
                  <div className="flex justify-center items-end space-x-1 h-12">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-2 bg-primary rounded-full transition-all duration-150"
                        style={{
                          height: `${20 + Math.sin((pulsePhase + i * 12) / 10) * 20}px`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {state === "listening" && (
                  <div className="flex justify-center space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-chart-2"
                        style={{
                          opacity: (Math.sin((pulsePhase + i * 20) / 10) + 1) / 2,
                        }}
                      />
                    ))}
                  </div>
                )}

                {state === "idle" && (
                  <p className="text-sm text-muted-foreground">
                    Your AI Learning Assistant
                  </p>
                )}

                {state === "thinking" && (
                  <p className="text-sm text-muted-foreground animate-pulse">
                    Analyzing your question...
                  </p>
                )}
              </div>
            </div>
          </div>

          {state !== "idle" && (
            <div className="absolute -top-2 -right-2">
              <div className={`w-6 h-6 ${config.color} rounded-full animate-ping absolute`} />
              <div className={`w-6 h-6 ${config.color} rounded-full relative`} />
            </div>
          )}
        </div>

        <Badge 
          variant="secondary" 
          className="text-sm px-4 py-2 gap-2"
          data-testid="badge-avatar-status"
        >
          <Icon className="w-4 h-4" />
          {config.label}
        </Badge>

        <div className="text-center space-y-2 max-w-md">
          <h2 className="text-2xl font-semibold text-foreground">
            AI Learning Assistant
          </h2>
          <p className="text-sm text-muted-foreground">
            Ask me anything from your knowledge base. I'm here to help you learn!
          </p>
        </div>
      </div>
    </div>
  );
}
