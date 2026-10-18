import * as React from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  Volume2, 
  FileAudio, 
  Languages, 
  Calendar, 
  Clock,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Edit,
  Download,
  Brain,
  Zap,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { VoiceRecorder } from './VoiceRecorder';

interface VoiceNote {
  id: string;
  title: string;
  transcription: string;
  language: 'en' | 'af';
  duration: number;
  audioUrl: string;
  dateCreated: string;
  status: 'transcribed' | 'processing' | 'processed' | 'failed';
  confidence: number;
  keywords: string[];
  category?: string;
  aiAnalysis?: string;
  recordedBy?: string;
  source: 'recorded' | 'uploaded';
}

export const VoiceNotesManager: React.FC = () => {
  const [voiceNotes, setVoiceNotes] = React.useState<VoiceNote[]>([]);
  const [showRecorder, setShowRecorder] = React.useState(false);
  const [playingId, setPlayingId] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedLanguage, setSelectedLanguage] = React.useState<'all' | 'en' | 'af'>('all');
  const [loading, setLoading] = React.useState(true);
  const [processingIds, setProcessingIds] = React.useState<string[]>([]);

  const audioRefs = React.useRef<{ [key: string]: HTMLAudioElement }>({});

  const languages = [
    { code: 'all', name: 'All Languages', flag: '🌐' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦' }
  ];

  // Load voice notes from storage
  React.useEffect(() => {
    const loadVoiceNotes = async () => {
      try {
        const savedNotes = localStorage.getItem('voiceNotes');
        if (savedNotes) {
          setVoiceNotes(JSON.parse(savedNotes));
        } else {
          // Sample data for demonstration
          setVoiceNotes([
            {
              id: '1',
              title: 'Project Meeting Notes',
              transcription: 'Today we discussed the quarterly goals and the new product launch strategy. The team agreed on the timeline and resource allocation for the upcoming initiatives.',
              language: 'en',
              duration: 180,
              audioUrl: '',
              dateCreated: new Date(Date.now() - 86400000).toISOString(),
              status: 'processed',
              confidence: 0.94,
              keywords: ['project', 'meeting', 'goals', 'strategy', 'timeline'],
              category: 'professional',
              aiAnalysis: 'Professional meeting discussion about quarterly planning and product strategy.',
              recordedBy: 'User',
              source: 'recorded'
            },
            {
              id: '2',
              title: 'Persoonlike Gedagtes',
              transcription: 'Vandag het ek gedink oor die belangrikheid van tegnologie in ons daaglikse lewe. Dit is interessant hoe AI ons werk kan verbeter en ons meer produktief kan maak.',
              language: 'af',
              duration: 120,
              audioUrl: '',
              dateCreated: new Date(Date.now() - 172800000).toISOString(),
              status: 'processed',
              confidence: 0.89,
              keywords: ['tegnologie', 'AI', 'werk', 'lewe', 'produktief'],
              category: 'personal',
              aiAnalysis: 'Personal reflection on technology and AI impact on daily life and productivity.',
              recordedBy: 'User',
              source: 'uploaded'
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading voice notes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVoiceNotes();
  }, []);

  // Save voice notes to storage
  const saveVoiceNotes = (notes: VoiceNote[]) => {
    localStorage.setItem('voiceNotes', JSON.stringify(notes));
    setVoiceNotes(notes);
  };

  const handleTranscriptionComplete = async (transcription: string, audioBlob: Blob, language: string, title: string) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    
    const newVoiceNote: VoiceNote = {
      id: Date.now().toString(),
      title: title || `Voice Note ${new Date().toLocaleDateString()}`,
      transcription,
      language: language as 'en' | 'af',
      duration: 0, // Would be calculated from audio
      audioUrl,
      dateCreated: new Date().toISOString(),
      status: 'transcribed',
      confidence: 0.92,
      keywords: extractKeywords(transcription),
      recordedBy: 'User',
      source: audioBlob.type.includes('webm') ? 'recorded' : 'uploaded'
    };

    const updatedNotes = [newVoiceNote, ...voiceNotes];
    saveVoiceNotes(updatedNotes);
    
    // Process with AI
    await processVoiceNoteWithAI(newVoiceNote);
    
    setShowRecorder(false);
  };

  const extractKeywords = (text: string): string[] => {
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'die', 'en', 'van', 'in', 'op', 'vir'];
    return text.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .slice(0, 5);
  };

  const processVoiceNoteWithAI = async (voiceNote: VoiceNote) => {
    setProcessingIds(prev => [...prev, voiceNote.id]);
    
    try {
      // Update status to processing
      const updatedNotes = voiceNotes.map(note => 
        note.id === voiceNote.id ? { ...note, status: 'processing' as const } : note
      );
      saveVoiceNotes(updatedNotes);

      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock AI analysis results
      const mockAnalysis = voiceNote.language === 'en' 
        ? `Professional analysis of voice note content covering ${voiceNote.keywords.join(', ')}. Contains actionable insights and strategic information relevant to business operations.`
        : `Professionele analise van stemnotitie-inhoud wat ${voiceNote.keywords.join(', ')} dek. Bevat uitvoerbare insigte en strategiese inligting relevant vir besigheidsbedrywighede.`;

      const mockCategory = voiceNote.transcription.toLowerCase().includes('meeting') || 
                          voiceNote.transcription.toLowerCase().includes('project') ||
                          voiceNote.transcription.toLowerCase().includes('vergadering') ||
                          voiceNote.transcription.toLowerCase().includes('projek')
                          ? 'professional' : 'personal';

      // Update voice note with AI processing results
      const processedNotes = voiceNotes.map(note => 
        note.id === voiceNote.id ? {
          ...note,
          status: 'processed' as const,
          category: mockCategory,
          aiAnalysis: mockAnalysis,
          confidence: 0.88 + Math.random() * 0.1 // Random confidence between 0.88-0.98
        } : note
      );
      saveVoiceNotes(processedNotes);

      console.log('Voice note processed successfully with AI');
    } catch (error) {
      console.error('Error processing voice note with AI:', error);
      
      // Update status to failed
      const failedNotes = voiceNotes.map(note => 
        note.id === voiceNote.id ? { ...note, status: 'failed' as const } : note
      );
      saveVoiceNotes(failedNotes);
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== voiceNote.id));
    }
  };

  const playAudio = (id: string, audioUrl: string) => {
    // Stop any currently playing audio
    if (playingId && audioRefs.current[playingId]) {
      audioRefs.current[playingId].pause();
    }

    if (playingId === id) {
      setPlayingId(null);
      return;
    }

    // Create audio element if it doesn't exist
    if (!audioRefs.current[id] && audioUrl) {
      audioRefs.current[id] = new Audio(audioUrl);
      audioRefs.current[id].onended = () => setPlayingId(null);
    }

    if (audioRefs.current[id]) {
      audioRefs.current[id].play();
      setPlayingId(id);
    }
  };

  const deleteVoiceNote = (id: string) => {
    if (confirm('Are you sure you want to delete this voice note?')) {
      const updatedNotes = voiceNotes.filter(note => note.id !== id);
      saveVoiceNotes(updatedNotes);
      
      // Clean up audio reference
      if (audioRefs.current[id]) {
        audioRefs.current[id].pause();
        delete audioRefs.current[id];
      }
      
      if (playingId === id) {
        setPlayingId(null);
      }
    }
  };

  const filteredNotes = voiceNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.transcription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (note.aiAnalysis && note.aiAnalysis.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage = selectedLanguage === 'all' || note.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: string, isProcessing: boolean) => {
    if (isProcessing) {
      return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
    }
    
    switch (status) {
      case 'processed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'professional':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-200 rounded-lg h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Mic className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-slate-800">Voice Notes with AI Processing</h2>
          </div>
          <button
            onClick={() => setShowRecorder(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Voice Note</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search voice notes, transcriptions, or AI analysis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as 'all' | 'en' | 'af')}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Voice Notes List */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            {voiceNotes.length === 0 ? (
              <>
                <Mic className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-lg font-medium mb-2">No Voice Notes Yet</h3>
                <p className="mb-6">Start recording or uploading voice notes with automatic AI processing.</p>
                <button
                  onClick={() => setShowRecorder(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto"
                >
                  <Mic className="w-4 h-4" />
                  <span>Record First Voice Note</span>
                </button>
              </>
            ) : (
              <>
                <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-lg font-medium mb-2">No Results Found</h3>
                <p>Try adjusting your search terms or language filter.</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotes.map((note) => {
              const isProcessing = processingIds.includes(note.id);
              return (
                <div key={note.id} className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileAudio className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-slate-800">{note.title}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                            {languages.find(l => l.code === note.language)?.flag} {languages.find(l => l.code === note.language)?.name}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(note.status)}`}>
                            {getStatusIcon(note.status, isProcessing)}
                            <span>{isProcessing ? 'Processing...' : note.status}</span>
                          </span>
                          {note.category && (
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(note.category)}`}>
                              {note.category}
                            </span>
                          )}
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                            {note.source === 'recorded' ? '🎤 Recorded' : '📁 Uploaded'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-slate-600 line-clamp-2 mb-2">{note.transcription}</p>
                        
                        {/* AI Analysis */}
                        {note.aiAnalysis && (
                          <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                            <div className="flex items-center space-x-1 mb-1">
                              <Brain className="w-3 h-3 text-blue-600" />
                              <span className="text-xs font-medium text-blue-800">AI Analysis:</span>
                            </div>
                            <p className="text-xs text-blue-700">{note.aiAnalysis}</p>
                          </div>
                        )}
                        
                        {/* Keywords */}
                        {note.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {note.keywords.map((keyword, index) => (
                              <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(note.dateCreated).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDuration(note.duration)}</span>
                          </div>
                          <span className="text-green-600">{Math.round(note.confidence * 100)}% confidence</span>
                          {note.recordedBy && (
                            <span>by {note.recordedBy}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {note.audioUrl && (
                        <button
                          onClick={() => playAudio(note.id, note.audioUrl)}
                          className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          {playingId === note.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      )}
                      <button className="p-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteVoiceNote(note.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Stats */}
        {voiceNotes.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">{voiceNotes.length}</p>
                <p className="text-sm text-slate-600">Total Voice Notes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {voiceNotes.filter(note => note.language === 'en').length}
                </p>
                <p className="text-sm text-slate-600">English</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {voiceNotes.filter(note => note.language === 'af').length}
                </p>
                <p className="text-sm text-slate-600">Afrikaans</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {voiceNotes.filter(note => note.status === 'processed').length}
                </p>
                <p className="text-sm text-slate-600">AI Processed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">
                  {Math.round(voiceNotes.reduce((acc, note) => acc + note.confidence, 0) / voiceNotes.length * 100) || 0}%
                </p>
                <p className="text-sm text-slate-600">Avg Confidence</p>
              </div>
            </div>
          </div>
        )}

        {/* AI Processing Info Panel */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-medium text-purple-800 mb-2">🤖 AI-Powered Voice Note Processing:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
            <div>
              <h5 className="font-medium mb-1">Automatic Processing:</h5>
              <ul className="space-y-1">
                <li>• 🎯 Content analysis and categorization</li>
                <li>• 🏷️ Keyword and entity extraction</li>
                <li>• 📊 Sentiment and priority analysis</li>
                <li>• ✅ Action item identification</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-1">Smart Features:</h5>
              <ul className="space-y-1">
                <li>• 💼 Professional vs Personal classification</li>
                <li>• 📝 Meeting notes and project updates</li>
                <li>• 💡 Ideas and brainstorming sessions</li>
                <li>• ⏰ Tasks and reminders extraction</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Recorder Modal */}
      {showRecorder && (
        <VoiceRecorder
          onComplete={handleTranscriptionComplete}
          onClose={() => setShowRecorder(false)}
        />
      )}
    </>
  );
};