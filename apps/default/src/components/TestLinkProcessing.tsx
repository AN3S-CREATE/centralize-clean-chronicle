import * as React from 'react';
import { Link, CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';

export const TestLinkProcessing: React.FC = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStep, setProcessingStep] = React.useState(0);
  const [result, setResult] = React.useState<any>(null);

  const testUrl = "https://www.linkedin.com/pulse/how-ai-transforming-business-operations-2024-comprehensive-guide";
  
  const processingSteps = [
    "Adding link to inbox...",
    "Extracting website content...",
    "Creating source file record...",
    "Triggering AI analysis...",
    "Processing complete!"
  ];

  const handleTestLinkProcessing = async () => {
    setIsProcessing(true);
    setProcessingStep(0);
    setResult(null);

    try {
      // Step 1: Add link to inbox
      setProcessingStep(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const linkResponse = await fetch('/api/taskade/projects/XrJj33Gs8pvsXQWD/nodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          '/text': 'How AI is Transforming Business Operations in 2024',
          '/attributes/@link01': testUrl,
          '/attributes/@link02': 'How AI is Transforming Business Operations in 2024: A Comprehensive Guide',
          '/attributes/@link03': 'In-depth analysis of AI applications across various business sectors, including case studies and implementation strategies.',
          '/attributes/@link04': 'pending',
          '/attributes/@link05': new Date().toISOString(),
          '/attributes/@link06': 'Andries Liebenberg'
        }),
      });

      if (!linkResponse.ok) {
        throw new Error('Failed to add link');
      }

      const linkData = await linkResponse.json();
      
      // Step 2: Simulate content extraction
      setProcessingStep(2);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 3: Simulate source file creation
      setProcessingStep(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 4: Simulate AI analysis
      setProcessingStep(4);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 5: Complete
      setProcessingStep(5);
      
      setResult({
        success: true,
        linkId: linkData.id || 'test-link-id',
        extractedContent: {
          title: 'How AI is Transforming Business Operations in 2024: A Comprehensive Guide',
          wordCount: 2847,
          entities: ['Artificial Intelligence', 'Business Operations', 'Digital Transformation', 'Machine Learning', 'Automation'],
          topics: ['AI Implementation', 'Business Strategy', 'Technology Trends', 'Operational Efficiency'],
          category: 'Professional',
          confidence: 0.94
        }
      });

    } catch (error) {
      console.error('Error processing link:', error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <Link className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-slate-800">Test Link Processing</h2>
      </div>

      {/* Test URL Display */}
      <div className="bg-slate-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-slate-800 mb-2">Test URL:</h3>
        <div className="flex items-center space-x-2">
          <ExternalLink className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-600 break-all">{testUrl}</span>
        </div>
      </div>

      {/* Processing Steps */}
      {isProcessing && (
        <div className="mb-6">
          <h3 className="font-semibold text-slate-800 mb-4">Processing Steps:</h3>
          <div className="space-y-3">
            {processingSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                {index < processingStep ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : index === processingStep ? (
                  <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                )}
                <span className={`text-sm ${
                  index < processingStep ? 'text-green-600' : 
                  index === processingStep ? 'text-blue-600' : 'text-slate-500'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mb-6">
          <h3 className="font-semibold text-slate-800 mb-4">Processing Results:</h3>
          {result.success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Link processed successfully!</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div><strong>Link ID:</strong> {result.linkId}</div>
                <div><strong>Title:</strong> {result.extractedContent.title}</div>
                <div><strong>Word Count:</strong> {result.extractedContent.wordCount}</div>
                <div><strong>Category:</strong> {result.extractedContent.category}</div>
                <div><strong>Confidence:</strong> {Math.round(result.extractedContent.confidence * 100)}%</div>
                
                <div className="mt-3">
                  <strong>Extracted Entities:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.extractedContent.entities.map((entity: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3">
                  <strong>Topics:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.extractedContent.topics.map((topic: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-800">Processing failed: {result.error}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleTestLinkProcessing}
        disabled={isProcessing}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? (
          <>
            <Clock className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Link className="w-5 h-5" />
            <span>Test Link Processing</span>
          </>
        )}
      </button>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">What This Test Does:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Adds the LinkedIn article URL to the Link Inbox project</li>
          <li>• Simulates content extraction and analysis</li>
          <li>• Demonstrates the automated processing pipeline</li>
          <li>• Shows entity extraction and topic categorization</li>
          <li>• Classifies content as Professional vs Personal</li>
        </ul>
      </div>
    </div>
  );
};