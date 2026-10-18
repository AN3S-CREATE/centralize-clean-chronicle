import * as React from 'react';
import { X, Upload, File } from 'lucide-react';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose }) => {
  const [fileUrl, setFileUrl] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [sourceType, setSourceType] = React.useState('manual');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl.trim() || !fileName.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/taskade/forms/01K3ZCMENZC5E5DGTF000E8JZK/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileUrl,
          fileName,
          sourceType
        }),
      });

      if (response.ok) {
        setFileUrl('');
        setFileName('');
        setSourceType('manual');
        onClose();
      } else {
        console.error('Failed to process file');
      }
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Upload File</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="fileName" className="block text-sm font-medium text-slate-700 mb-2">
              File Name *
            </label>
            <input
              type="text"
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="document.pdf"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="fileUrl" className="block text-sm font-medium text-slate-700 mb-2">
              File URL or Path *
            </label>
            <input
              type="text"
              id="fileUrl"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://example.com/document.pdf or /path/to/file"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="sourceType" className="block text-sm font-medium text-slate-700 mb-2">
              Source Type
            </label>
            <select
              id="sourceType"
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            >
              <option value="manual">Manual Upload</option>
              <option value="google_drive">Google Drive</option>
              <option value="url">URL</option>
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <File className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Processing Pipeline</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Your file will be automatically processed, analyzed, and added to the knowledge base.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !fileUrl.trim() || !fileName.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>{isSubmitting ? 'Processing...' : 'Process File'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};