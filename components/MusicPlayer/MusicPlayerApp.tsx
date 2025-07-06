import { useState, useEffect, useCallback, useRef } from "react";
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface SoundCloudTrack {
  id: number;
  title: string;
  user: {
    username: string;
    avatar_url: string;
  };
  artwork_url: string;
  duration: number;
  permalink_url: string;
  waveform_url: string;
  description: string;
  genre: string;
  created_at: string;
  playback_count: number;
  favoritings_count: number;
  audio_url: string; // Added for local audio files
}

export function MusicPlayerApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [tracks, setTracks] = useState<SoundCloudTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch user's tracks from local music files
  const fetchTracks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Loading local music files...");

      // Your actual music files from /public/music/
      const localTracks: SoundCloudTrack[] = [
        {
          id: 1,
          title: "The Life I Lead",
          user: {
            username: "hairetsu",
            avatar_url: "/image3.jpeg",
          },
          artwork_url: "/image3.jpeg",
          duration: 0, // Will be set when audio loads
          permalink_url: "https://soundcloud.com/hairetsu/the-life-i-lead",
          waveform_url: "",
          description: "A journey through the rhythms of daily existence",
          genre: "Hip Hop",
          created_at: "2024-01-20T12:00:00Z",
          playback_count: 2847,
          favoritings_count: 156,
          audio_url: "/music/The Life I Lead.mp3",
        },
        {
          id: 2,
          title: "Slots",
          user: {
            username: "hairetsu",
            avatar_url: "/image3.jpeg",
          },
          artwork_url: "/image3.jpeg",
          duration: 0, // Will be set when audio loads
          permalink_url: "https://soundcloud.com/hairetsu/slots",
          waveform_url: "",
          description: "Electronic exploration of chance and probability",
          genre: "Hip Hop",
          created_at: "2024-01-18T12:00:00Z",
          playback_count: 1923,
          favoritings_count: 89,
          audio_url: "/music/slots.mp3",
        },
        {
          id: 3,
          title: "Tic Tac Toe",
          user: {
            username: "hairetsu",
            avatar_url: "/image3.jpeg",
          },
          artwork_url: "/image3.jpeg",
          duration: 0, // Will be set when audio loads
          permalink_url: "https://soundcloud.com/hairetsu/tictactoe",
          waveform_url: "",
          description: "Strategic soundscapes in a game of musical moves",
          genre: "Hip Hop",
          created_at: "2024-01-15T12:00:00Z",
          playback_count: 3421,
          favoritings_count: 234,
          audio_url: "/music/tictactoe.wav",
        },
      ];

      console.log("Setting local tracks:", localTracks);
      setTracks(localTracks);
      setLoading(false);
    } catch (err) {
      console.error("Error loading local tracks:", err);
      setError("Failed to load music files. Please try again.");
      setLoading(false);
    }
  }, []);

  // Define handler functions first
  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;

    const nextIndex = shuffle
      ? Math.floor(Math.random() * tracks.length)
      : (currentSong + 1) % tracks.length;

    console.log("Next track:", nextIndex, tracks[nextIndex]?.title);
    setCurrentSong(nextIndex);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [tracks, currentSong, shuffle]);

  const handlePrevious = useCallback(() => {
    if (tracks.length === 0) return;

    const prevIndex = (currentSong - 1 + tracks.length) % tracks.length;
    console.log("Previous track:", prevIndex, tracks[prevIndex]?.title);
    setCurrentSong(prevIndex);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [tracks, currentSong]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    console.log("Play/Pause clicked", {
      isPlaying,
      currentTrack: tracks[currentSong]?.title,
    });

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Playback failed:", err);
        setError("Playback failed. Please try again.");
      });
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const newTime = parseInt(e.target.value);
    audioRef.current.currentTime = newTime / 1000; // Convert to seconds
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleTrackSelect = (index: number) => {
    if (tracks.length === 0) return;

    console.log("Track selected:", index, tracks[index]?.title);
    setCurrentSong(index);
    setCurrentTime(0);
    setShouldAutoPlay(true); // Auto-play when track is selected
    setIsPlaying(false); // Will be set to true when audio starts playing
  };

  // Fetch tracks on component mount
  useEffect(() => {
    console.log("Component mounted, loading local music files...");
    fetchTracks();
  }, [fetchTracks]);

  // Initialize audio element when tracks change (now after handleNext is defined)
  useEffect(() => {
    if (tracks.length > 0 && currentSong < tracks.length) {
      const track = tracks[currentSong];

      // Cleanup previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("loadedmetadata", () => {});
        audioRef.current.removeEventListener("timeupdate", () => {});
        audioRef.current.removeEventListener("ended", () => {});
        audioRef.current.removeEventListener("error", () => {});
      }

      const audio = new Audio(track.audio_url);
      audioRef.current = audio;

      // Set initial volume
      audio.volume = volume / 100;

      // Event listeners
      const onLoadedMetadata = () => {
        setDuration(audio.duration * 1000); // Convert to milliseconds
        console.log(`Loaded ${track.title}, duration: ${audio.duration}s`);

        // Auto-play if requested
        if (shouldAutoPlay) {
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
              setShouldAutoPlay(false);
              console.log("Auto-playing selected track");
            })
            .catch((err) => {
              console.error("Auto-play failed:", err);
              setError("Auto-play failed. Please try playing manually.");
              setShouldAutoPlay(false);
            });
        }
      };

      const onTimeUpdate = () => {
        setCurrentTime(audio.currentTime * 1000); // Convert to milliseconds
      };

      const onEnded = () => {
        setIsPlaying(false);
        if (!repeat) {
          handleNext();
        } else {
          audio.currentTime = 0;
          audio.play();
        }
      };

      const onError = (e: Event) => {
        console.error("Audio error:", e);
        setError("Failed to load audio file");
        setShouldAutoPlay(false);
      };

      audio.addEventListener("loadedmetadata", onLoadedMetadata);
      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("error", onError);

      // Load the audio
      audio.load();

      // Cleanup function
      return () => {
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("ended", onEnded);
        audio.removeEventListener("error", onError);
      };
    }
  }, [tracks, currentSong, repeat, handleNext, shouldAutoPlay]); // Added shouldAutoPlay to dependencies

  // Separate useEffect for volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      console.log(`Volume changed to: ${volume}%`);
    }
  }, [volume]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const currentTrack = tracks[currentSong];
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  console.log("Render state:", {
    loading,
    error,
    tracksLength: tracks.length,
    currentSong,
    currentTrack: currentTrack?.title,
    isPlaying,
    currentTime: formatTime(currentTime),
    duration: formatTime(duration),
  });

  if (loading) {
    return (
      <div className="h-full bg-slate-900/50 text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-400" />
          <p className="text-slate-300">Loading your music files...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-slate-900/50 text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <Music size={48} className="mx-auto mb-2" />
            <p className="text-lg font-semibold">Error Loading Music</p>
          </div>
          <p className="text-slate-400 mb-4">{error}</p>
          <button
            onClick={fetchTracks}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="h-full bg-slate-900/50 text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <Music size={48} className="mx-auto mb-4 text-slate-400" />
          <p className="text-slate-300">No music files found</p>
          <button
            onClick={fetchTracks}
            className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
          >
            Reload Music
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-900/50 text-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-600/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music size={24} className="text-orange-400" />
            <span className="text-lg font-semibold">Local Music Player</span>
          </div>
          <a
            href="https://soundcloud.com/hairetsu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors text-sm"
          >
            <ExternalLink size={16} />
            View on SoundCloud
          </a>
        </div>
      </div>

      {/* Now Playing */}
      {currentTrack && (
        <div className="p-6 text-center bg-slate-800/30 border-b border-slate-600/30">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-2xl overflow-hidden">
            {currentTrack.artwork_url ? (
              <img
                src={currentTrack.artwork_url}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music size={48} className="text-white" />
            )}
          </div>
          <div className="mb-2">
            <h2 className="text-xl font-semibold">{currentTrack.title}</h2>
            <p className="text-slate-400">{currentTrack.user.username}</p>
            <p className="text-sm text-slate-500">{currentTrack.genre}</p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-4 mb-4 text-xs text-slate-400">
            <span>{currentTrack.playback_count?.toLocaleString()} plays</span>
            <span>
              {currentTrack.favoritings_count?.toLocaleString()} likes
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="relative">
              <div className="w-full h-2 bg-slate-700 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max={duration}
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
                  ? "bg-orange-600 text-white"
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
              className="p-4 bg-orange-600 hover:bg-orange-700 rounded-full transition-colors"
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
                  ? "bg-orange-600 text-white"
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
                  className="h-1 bg-orange-500 rounded-full"
                  style={{ width: `${volume}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-xs text-slate-400 w-8">{volume}%</span>
          </div>

          {/* Audio Info */}
          <div className="mt-4 p-2 bg-slate-700/30 rounded text-xs text-slate-400">
            <p>
              🎵 Playing: {currentTrack.title} |{" "}
              {isPlaying ? "Playing" : "Paused"}
            </p>
            <p>
              Track {currentSong + 1} of {tracks.length} |{" "}
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>
      )}

      {/* Playlist */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="font-semibold mb-4 text-slate-300">
          Your Music ({tracks.length} tracks)
        </h3>
        <div className="space-y-2">
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(index)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                index === currentSong
                  ? "bg-orange-600/20 border border-orange-600/30"
                  : "bg-slate-800/30 hover:bg-slate-700/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center overflow-hidden">
                    {track.artwork_url ? (
                      <img
                        src={track.artwork_url}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music size={16} className="text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-slate-400">
                      {track.genre} • {track.playback_count?.toLocaleString()}{" "}
                      plays
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-400 flex flex-col items-end">
                  <span>
                    {formatTime(
                      duration && index === currentSong
                        ? duration
                        : track.duration
                    )}
                  </span>
                  {index === currentSong && isPlaying && (
                    <span className="text-orange-400 animate-pulse">
                      ♪ Playing
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
