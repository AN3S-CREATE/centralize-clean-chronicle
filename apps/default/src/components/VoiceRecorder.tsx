import * as React from 'react';
import { Mic, MicOff, Play, Pause, Square, Upload, Languages, Volume2, FileAudio, X, CheckCircle, Clock } from 'lucide-react';

interface VoiceRecorderProps {
  onComplete: (transcription: string, audioBlob: Blob, language: string, title: string) => void;
  onClose: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onComplete, onClose }) => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState(0);
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState<'en' | 'af'>('en');
  const [isTranscribing, setIsTranscribing] = React.useState(false);
  const [transcription, setTranscription] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [recordingMode, setRecordingMode] = React.useState<'record' | 'upload'>('record');

  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦' }
  ];

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
      setAudioBlob(file);
      setAudioUrl(URL.createObjectURL(file));
      setRecordingTime(0);
      setTitle(file.name.replace(/\.[^/.]+$/, "")); // Remove file extension
    } else {
      alert('Please select a valid audio file (MP3, WAV, M4A, etc.)');
    }
  };

  const transcribeAudio = async () => {
    if (!audioBlob) return;

    setIsTranscribing(true);
    
    try {
      // Simulate transcription process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock transcription based on language and source
      const mockTranscriptions = {
        en: uploadedFile 
          ? `This is a transcription of the uploaded audio file "${uploadedFile.name}". The AI has successfully processed your audio content and converted it to text for your knowledge base.`
          : "This is a sample English transcription of your voice note. The AI has successfully converted your speech to text and is ready to process this content for your knowledge base with automatic categorization and analysis.",
        af: uploadedFile
          ? `Dit is 'n transkripsie van die opgelaaide oudiolêer "${uploadedFile.name}". Die KI het jou oudio-inhoud suksesvol verwerk en dit na teks omgeskakel vir jou kennisbasis.`
          : "Dit is 'n voorbeeld Afrikaanse transkripsie van jou stemnotitie. Die KI het jou spraak suksesvol na teks omgeskakel en is gereed om hierdie inhoud vir jou kennisbasis te verwerk met outomatiese kategorisering en analise."
      };

      const mockTranscription = mockTranscriptions[selectedLanguage];
      setTranscription(mockTranscription);

      // Auto-generate title if not provided
      if (!title.trim()) {
        const autoTitle = uploadedFile 
          ? `Voice Note: ${uploadedFile.name}`
          : `Voice Note ${new Date().toLocaleDateString()}`;
        setTitle(autoTitle);
      }

    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert('Failed to transcribe audio. Please try again.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleComplete = () => {
    if (transcription && audioBlob && title.trim()) {
      onComplete(transcription, audioBlob, selectedLanguage, title);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Voice Note Recorder</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Recording Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Choose Input Method:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRecordingMode('record')}
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                  recordingMode === 'record'
                    ? 'border-purple-300 bg-purple-50 text-purple-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <Mic className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Record Audio</div>
                  <div className="text-sm opacity-75">Use your microphone</div>
                </div>
              </button>
              
              <button
                onClick={() => setRecordingMode('upload')}
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                  recordingMode === 'upload'
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <Upload className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Upload File</div>
                  <div className="text-sm opacity-75">Select audio file</div>
                </div>
              </button>
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              <Languages className="w-4 h-4 inline mr-2" />
              Transcription Language
            </label>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code as 'en' | 'af')}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    selectedLanguage === lang.code
                      ? 'border-purple-300 bg-purple-50 text-purple-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recording/Upload Interface */}
          {recordingMode === 'record' ? (
            <div className="bg-slate-50 rounded-lg p-6">
              <div className="text-center space-y-4">
                {/* Recording Status */}
                <div className="flex items-center justify-center space-x-4">
                  {isRecording && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="font-medium">Recording...</span>
                    </div>
                  )}
                  <div className="text-2xl font-mono text-slate-800">
                    {formatTime(recordingTime)}
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-center space-x-4">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Mic className="w-5 h-5" />
                      <span>Start Recording</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="flex items-center space-x-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <Square className="w-5 h-5" />
                      <span>Stop Recording</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-lg p-6">
              <div className="text-center space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600 mb-4">
                    Select an audio file to upload
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Choose Audio File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Supports MP3, WAV, M4A, and other audio formats
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Audio Playback */}
          {audioUrl && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-blue-800">
                  <Volume2 className="w-4 h-4 inline mr-2" />
                  {uploadedFile ? `Uploaded: ${uploadedFile.name}` : 'Recorded Audio'}
                </h4>
                <button
                  onClick={playAudio}
                  className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
              </div>
              
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                className="w-full"
                controls
              />
              
              {uploadedFile && (
                <div className="mt-2 text-sm text-blue-700">
                  <FileAudio className="w-4 h-4 inline mr-1" />
                  Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              )}
            </div>
          )}

          {/* Title Input */}
          {audioBlob && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Voice Note Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your voice note..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>
          )}

          {/* Transcription */}
          {audioBlob && !transcription && (
            <div className="text-center">
              <button
                onClick={transcribeAudio}
                disabled={isTranscribing}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mx-auto"
              >
                {isTranscribing ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    <span>Transcribing in {languages.find(l => l.code === selectedLanguage)?.name}...</span>
                  </>
                ) : (
                  <>
                    <Languages className="w-5 h-5" />
                    <span>Transcribe to {languages.find(l => l.code === selectedLanguage)?.name}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Transcription Result */}
          {transcription && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-3">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Transcription Complete ({languages.find(l => l.code === selectedLanguage)?.name}):
              </h4>
              <div className="bg-white rounded border border-green-200 p-3 mb-4">
                <p className="text-slate-700 leading-relaxed">{transcription}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-green-700">
                  ✅ Ready to add to knowledge base
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={transcribeAudio}
                    disabled={isTranscribing}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Re-transcribe
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={!title.trim()}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 transition-colors"
                  >
                    Add to Knowledge Base
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">📝 How to Use:</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <div>1. <strong>Choose Method:</strong> Record live audio or upload an existing file</div>
              <div>2. <strong>Select Language:</strong> Choose English or Afrikaans for transcription</div>
              <div>3. <strong>Record/Upload:</strong> Create or select your audio content</div>
              <div>4. <strong>Add Title:</strong> Give your voice note a descriptive title</div>
              <div>5. <strong>Transcribe:</strong> Convert speech to text using AI</div>
              <div>6. <strong>Save:</strong> Add to your knowledge base for AI processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};