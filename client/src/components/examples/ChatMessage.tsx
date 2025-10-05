import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="p-8 space-y-6 max-w-3xl">
      <ChatMessage
        role="user"
        content="Can you explain the basics of quantum computing?"
        timestamp={new Date()}
      />
      <ChatMessage
        role="assistant"
        content="Quantum computing is a revolutionary approach to computation that leverages the principles of quantum mechanics. Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or 'qubits' which can exist in multiple states simultaneously through a property called superposition."
        timestamp={new Date()}
      />
      <ChatMessage
        role="user"
        content="That's interesting! Can you tell me more about superposition?"
        timestamp={new Date()}
      />
    </div>
  );
}
