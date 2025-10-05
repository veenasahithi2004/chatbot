import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface KnowledgeFile {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "ready" | "error";
  type: "pdf" | "txt" | "json";
}

interface KnowledgeBaseManagerProps {
  files: KnowledgeFile[];
  onUpload: (files: File[]) => void;
  onRemove: (id: string) => void;
}

export default function KnowledgeBaseManager({ files, onUpload, onRemove }: KnowledgeBaseManagerProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    onUpload(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(Array.from(e.target.files));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer hover-elevate",
          isDragging
            ? "border-primary bg-accent"
            : "border-border bg-card"
        )}
        data-testid="dropzone-upload"
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf,.txt,.json"
          multiple
          onChange={handleFileInput}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Upload className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports PDF, TXT, JSON files
              </p>
            </div>
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              Knowledge Base Files ({files.length})
            </h3>
          </div>

          <ScrollArea className="h-[300px] w-full">
            <div className="space-y-2 pr-4">
              {files.map((file) => (
                <Card
                  key={file.id}
                  className="p-3 hover-elevate"
                  data-testid={`card-file-${file.id}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {file.status === "uploading" && (
                        <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                      )}
                      {file.status === "ready" && (
                        <CheckCircle2 className="w-4 h-4 text-chart-2" />
                      )}
                      {file.status === "error" && (
                        <span className="text-xs text-destructive">Error</span>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onRemove(file.id)}
                        className="h-8 w-8"
                        data-testid={`button-remove-${file.id}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
