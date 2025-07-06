import { useState, useEffect } from "react";
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
} from "lucide-react";

export function MusicPlayerApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const playlist = [
    {
      id: 1,
      title: "Digital Sunrise",
      artist: "Electronic Dreams",
      duration: 243,
      album: "Cyber Beats",
    },
    {
      id: 2,
      title: "Neon Lights",
      artist: "Synthwave Valley",
      duration: 198,
      album: "Retro Future",
    },
    {
      id: 3,
      title: "Code Poetry",
      artist: "Binary Poets",
      duration: 267,
      album: "Algorithm Blues",
    },
    {
      id: 4,
      title: "Terminal Blues",
      artist: "Console Cowboys",
      duration: 201,
      album: "Debug Sessions",
    },
    {
      id: 5,
      title: "Quantum Jazz",
      artist: "Probability Band",
      duration: 284,
      album: "Superposition",
    },
    {
      id: 6,
      title: "Data Stream",
      artist: "Information Flow",
      duration: 156,
      album: "Network Protocol",
    },
  ];

  const currentTrack = playlist[currentSong];

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, currentTrack.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value));
  };

  const progressPercentage = (currentTime / currentTrack.duration) * 100;

  return (
    <div className="h-full bg-slate-900/50 text-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-600/30">
        <div className="flex items-center gap-2">
          <Music size={24} className="text-green-400" />
          <span className="text-lg font-semibold">Music Player</span>
        </div>
      </div>

      {/* Now Playing */}
      <div className="p-6 text-center bg-slate-800/30 border-b border-slate-600/30">
        <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-2xl">
          <Music size={48} className="text-white" />
        </div>
        <div className="mb-2">
          <h2 className="text-xl font-semibold">{currentTrack.title}</h2>
          <p className="text-slate-400">{currentTrack.artist}</p>
          <p className="text-sm text-slate-500">{currentTrack.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
          <div className="relative">
            <div className="w-full h-2 bg-slate-700 rounded-full">
              <div
                className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max={currentTrack.duration}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setShuffle(!shuffle)}
            className={`p-2 rounded-lg transition-colors ${
              shuffle
                ? "bg-green-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Shuffle size={18} />
          </button>

          <button
            onClick={handlePrevious}
            className="p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-full transition-colors"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={handlePlayPause}
            className="p-4 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={handleNext}
            className="p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-full transition-colors"
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={() => setRepeat(!repeat)}
            className={`p-2 rounded-lg transition-colors ${
              repeat
                ? "bg-green-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Repeat size={18} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center gap-2">
          <Volume2 size={16} className="text-slate-400" />
          <div className="w-24 relative">
            <div className="w-full h-1 bg-slate-700 rounded-full">
              <div
                className="h-1 bg-green-500 rounded-full"
                style={{ width: `${volume}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-xs text-slate-400 w-8">{volume}%</span>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 p-4">
        <h3 className="font-semibold mb-4 text-slate-300">Playlist</h3>
        <div className="space-y-2">
          {playlist.map((song, index) => (
            <button
              key={song.id}
              onClick={() => {
                setCurrentSong(index);
                setCurrentTime(0);
                setIsPlaying(true);
              }}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                index === currentSong
                  ? "bg-green-600/20 border border-green-600/30"
                  : "bg-slate-800/30 hover:bg-slate-700/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-slate-400">{song.artist}</div>
                </div>
                <div className="text-sm text-slate-400">
                  {formatTime(song.duration)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
