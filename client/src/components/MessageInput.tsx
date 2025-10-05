import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  onVoiceStateChange?: (isListening: boolean) => void;
}

export default function MessageInput({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Ask a question about your knowledge base...",
  onVoiceStateChange
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setMessage(transcript);
        
        const isFinal = event.results[event.results.length - 1].isFinal;
        if (isFinal && transcript.trim()) {
          setTimeout(() => {
            onSendMessage(transcript.trim());
            setMessage("");
            setIsListening(false);
            onVoiceStateChange?.(false);
          }, 500);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        onVoiceStateChange?.(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        onVoiceStateChange?.(false);
        
        if (event.error === 'not-allowed') {
          toast({
            title: "Microphone Access Denied",
            description: "Please allow microphone access to use voice input.",
            variant: "destructive",
          });
        } else if (event.error !== 'aborted' && event.error !== 'no-speech') {
          toast({
            title: "Voice Recognition Error",
            description: "There was an error with voice recognition. Please try again.",
            variant: "destructive",
          });
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast, onVoiceStateChange, onSendMessage]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice input. Please use Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      onVoiceStateChange?.(false);
    } else {
      setMessage("");
      recognitionRef.current.start();
      setIsListening(true);
      onVoiceStateChange?.(true);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const isSpeechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="p-4">
        <div className="flex gap-2 items-end">
          {isSpeechSupported && (
            <Button
              onClick={toggleVoiceInput}
              disabled={disabled}
              size="icon"
              variant={isListening ? "default" : "outline"}
              className={`h-[60px] w-[60px] rounded-xl flex-shrink-0 ${
                isListening ? "animate-pulse" : ""
              }`}
              data-testid="button-voice-input"
            >
              {isListening ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button>
          )}
          
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening..." : placeholder}
            disabled={disabled || isListening}
            className="min-h-[60px] max-h-[150px] resize-none text-base"
            data-testid="input-message"
          />
          
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || disabled}
            size="icon"
            className="h-[60px] w-[60px] rounded-xl flex-shrink-0"
            data-testid="button-send"
          >
            {disabled ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 px-1">
          {isListening 
            ? "Speak now... Your message will be sent automatically when you finish" 
            : isSpeechSupported
            ? "Press Enter to send, Shift + Enter for new line, or click mic to speak and send"
            : "Press Enter to send, Shift + Enter for new line"
          }
        </p>
      </div>
    </div>
  );
}
