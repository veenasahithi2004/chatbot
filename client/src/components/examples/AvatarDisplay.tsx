import AvatarDisplay from '../AvatarDisplay';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AvatarDisplayExample() {
  const [state, setState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");

  return (
    <div className="h-screen w-full">
      <AvatarDisplay state={state} />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <Button onClick={() => setState("idle")} variant={state === "idle" ? "default" : "outline"}>Idle</Button>
        <Button onClick={() => setState("listening")} variant={state === "listening" ? "default" : "outline"}>Listening</Button>
        <Button onClick={() => setState("thinking")} variant={state === "thinking" ? "default" : "outline"}>Thinking</Button>
        <Button onClick={() => setState("speaking")} variant={state === "speaking" ? "default" : "outline"}>Speaking</Button>
      </div>
    </div>
  );
}
