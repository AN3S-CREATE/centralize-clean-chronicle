import * as React from 'react';
import { 
  Play, 
  CheckCircle, 
  ArrowRight, 
  RefreshCw, 
  Eye, 
  Sparkles, 
  Clock,
  Target,
  Zap,
  Database
} from 'lucide-react';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  action: string;
  tab: string;
  completed: boolean;
}

export const WorkflowGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const workflowSteps: WorkflowStep[] = [
    {
      id: 1,
      title: "Navigate to AI Test Live",
      description: "Go to the 'AI Test Live' tab to see sources ready for AI processing",
      action: "Click the 'AI Test Live' tab (sparkles icon)",
      tab: "ai-test",
      completed: completedSteps.includes(1)
    },
    {
      id: 2,
      title: "Select a Source for Testing",
      description: "Choose one of the sources without descriptions to test AI generation",
      action: "Look for sources marked with '⚠️ Missing description'",
      tab: "ai-test",
      completed: completedSteps.includes(2)
    },
    {
      id: 3,
      title: "Generate AI Description",
      description: "Click 'Test Generate' to start the AI analysis and description generation",
      action: "Click the 'Test Generate' button on any source",
      tab: "ai-test",
      completed: completedSteps.includes(3)
    },
    {
      id: 4,
      title: "Watch AI Processing",
      description: "Observe the real-time AI processing steps and generated results",
      action: "Watch the 6-step processing animation complete",
      tab: "ai-test",
      completed: completedSteps.includes(4)
    },
    {
      id: 5,
      title: "View Before & After",
      description: "Navigate to see the live comparison of source records",
      action: "Click the 'Before & After' tab (eye icon)",
      tab: "source-updates",
      completed: completedSteps.includes(5)
    },
    {
      id: 6,
      title: "Refresh Live Data",
      description: "Update the view to see the AI-generated description in your project records",
      action: "Click the 'Refresh Data' button to see live updates",
      tab: "source-updates",
      completed: completedSteps.includes(6)
    },
    {
      id: 7,
      title: "Verify Updates",
      description: "Confirm the source now has an AI-generated description with green highlighting",
      action: "Look for green rings and '✨ AI Generated' labels",
      tab: "source-updates",
      completed: completedSteps.includes(7)
    }
  ];

  const simulateWorkflow = async () => {
    setIsProcessing(true);
    setCompletedSteps([]);
    setCurrentStep(1);

    // Simulate each step with delays
    for (let i = 1; i <= 7; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCompletedSteps(prev => [...prev, i]);
      setCurrentStep(i + 1);
    }

    setIsProcessing(false);
    setCurrentStep(8); // Completed
  };

  const resetWorkflow = () => {
    setCompletedSteps([]);
    setCurrentStep(1);
    setIsProcessing(false);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-slate-800">Complete Workflow Guide</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={simulateWorkflow}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Simulate Workflow</span>
          </button>
          <button
            onClick={resetWorkflow}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-purple-800">Workflow Progress</h3>
          <span className="text-sm text-purple-600">
            {completedSteps.length}/7 steps completed
          </span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedSteps.length / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="space-y-4 mb-8">
        {workflowSteps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const isNext = currentStep === step.id && !isCompleted;

          return (
            <div key={step.id} className={`rounded-lg p-4 border transition-all duration-300 ${
              isCompleted ? 'bg-green-50 border-green-200' :
              isActive ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-300' :
              'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? 'bg-green-600 text-white' :
                  isActive ? 'bg-blue-600 text-white' :
                  'bg-slate-300 text-slate-600'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : isActive && isProcessing ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="text-sm font-bold">{step.id}</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${
                      isCompleted ? 'text-green-800' :
                      isActive ? 'text-blue-800' :
                      'text-slate-700'
                    }`}>
                      {step.title}
                    </h4>
                    {step.tab && (
                      <span className="px-2 py-1 bg-white text-xs rounded border">
                        Tab: {step.tab === 'ai-test' ? 'AI Test Live' : 'Before & After'}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                  
                  <div className={`text-sm font-medium ${
                    isCompleted ? 'text-green-700' :
                    isActive ? 'text-blue-700' :
                    'text-slate-500'
                  }`}>
                    📋 Action: {step.action}
                  </div>

                  {isNext && (
                    <div className="mt-3 p-2 bg-blue-100 border border-blue-200 rounded text-sm text-blue-800">
                      👆 <strong>Do this now:</strong> {step.action}
                    </div>
                  )}
                </div>

                {index < workflowSteps.length - 1 && (
                  <ArrowRight className={`w-5 h-5 ${
                    isCompleted ? 'text-green-600' : 'text-slate-400'
                  }`} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expected Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-800">Expected AI Results</h4>
          </div>
          <div className="space-y-2 text-sm text-blue-700">
            <div>• <strong>Processing Time:</strong> ~6 seconds</div>
            <div>• <strong>Description Length:</strong> 2-3 professional sentences</div>
            <div>• <strong>Keywords:</strong> 3-5 relevant terms extracted</div>
            <div>• <strong>Category:</strong> Professional classification</div>
            <div>• <strong>Confidence:</strong> 85-95% accuracy score</div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Database className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-800">Live Database Updates</h4>
          </div>
          <div className="space-y-2 text-sm text-green-700">
            <div>• <strong>Immediate Update:</strong> Source record modified</div>
            <div>• <strong>Visual Indicator:</strong> Green ring around updated items</div>
            <div>• <strong>AI Label:</strong> "✨ AI Generated" tag appears</div>
            <div>• <strong>Permanent:</strong> Changes saved to Taskade project</div>
            <div>• <strong>Searchable:</strong> Description now available for search</div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {completedSteps.length === 7 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Workflow Complete! 🎉</h3>
              <p className="text-green-700">You've successfully tested the complete AI description generation workflow.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">What You've Accomplished:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>✅ Generated AI description for a source without one</li>
              <li>✅ Watched real-time AI processing with 6-step pipeline</li>
              <li>✅ Saw live database updates in your Taskade project</li>
              <li>✅ Verified the permanent addition of professional descriptions</li>
              <li>✅ Experienced the complete knowledge base enhancement workflow</li>
            </ul>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="w-5 h-5 text-yellow-600" />
          <h4 className="font-semibold text-yellow-800">Pro Tips</h4>
        </div>
        <div className="text-sm text-yellow-700 space-y-1">
          <div>💡 <strong>Batch Processing:</strong> Use "Generate All Descriptions" for multiple sources</div>
          <div>🔄 <strong>Auto-Refresh:</strong> The Before & After view updates automatically every 30 seconds</div>
          <div>🎯 <strong>Quality Check:</strong> AI confidence scores help you identify the best descriptions</div>
          <div>⚡ <strong>Instant Search:</strong> Generated descriptions are immediately searchable in your knowledge base</div>
        </div>
      </div>
    </div>
  );
};