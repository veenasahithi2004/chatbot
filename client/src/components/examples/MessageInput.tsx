import MessageInput from '../MessageInput';
import { useState } from 'react';

export default function MessageInputExample() {
  const [messages, setMessages] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  const handleSend = (message: string) => {
    console.log('Message sent:', message);
    setMessages([...messages, message]);
    setDisabled(true);
    setTimeout(() => setDisabled(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className="p-3 bg-card rounded-lg border border-card-border">
              {msg}
            </div>
          ))}
        </div>
      </div>
      <MessageInput onSendMessage={handleSend} disabled={disabled} />
    </div>
  );
}
