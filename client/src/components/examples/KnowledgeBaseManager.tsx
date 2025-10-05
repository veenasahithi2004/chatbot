import KnowledgeBaseManager from '../KnowledgeBaseManager';
import { useState } from 'react';

export default function KnowledgeBaseManagerExample() {
  const [files, setFiles] = useState<Array<{
    id: string;
    name: string;
    size: number;
    status: "uploading" | "ready" | "error";
    type: "pdf" | "txt" | "json";
  }>>([
    { id: '1', name: 'Introduction_to_AI.pdf', size: 2048000, status: 'ready', type: 'pdf' },
    { id: '2', name: 'machine_learning_basics.txt', size: 512000, status: 'ready', type: 'txt' },
    { id: '3', name: 'neural_networks.json', size: 1024000, status: 'uploading', type: 'json' },
  ]);

  const handleUpload = (newFiles: File[]) => {
    console.log('Uploading files:', newFiles);
    const uploadedFiles = newFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      status: 'ready' as "ready",
      type: (file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.json') ? 'json' : 'txt') as "pdf" | "txt" | "json",
    }));
    setFiles([...files, ...uploadedFiles]);
  };

  const handleRemove = (id: string) => {
    console.log('Removing file:', id);
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="p-8 max-w-2xl">
      <KnowledgeBaseManager
        files={files}
        onUpload={handleUpload}
        onRemove={handleRemove}
      />
    </div>
  );
}
