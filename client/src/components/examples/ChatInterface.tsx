import ChatInterface from '../ChatInterface';

export default function ChatInterfaceExample() {
  const messages = [
    {
      id: '1',
      role: 'user' as const,
      content: 'Can you explain how neural networks work?',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      role: 'assistant' as const,
      content: 'Neural networks are computing systems inspired by biological neural networks in animal brains. They consist of interconnected nodes (neurons) organized in layers. Information flows from the input layer through hidden layers to the output layer, with each connection having a weight that gets adjusted during training.',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      role: 'user' as const,
      content: 'How do they learn?',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '4',
      role: 'assistant' as const,
      content: 'Neural networks learn through a process called backpropagation. The network makes predictions, compares them to actual results, calculates the error, and then adjusts the weights of connections backward through the network to minimize that error. This process repeats over many iterations with training data.',
      timestamp: new Date(Date.now() - 60000)
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        <ChatInterface messages={messages} />
      </div>
    </div>
  );
}
