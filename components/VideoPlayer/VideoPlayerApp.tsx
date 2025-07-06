import { useState } from "react";
import {
  Video,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
} from "lucide-react";

export function VideoPlayerApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [volume, setVolume] = useState(75);

  const videoList = [
    { id: 1, title: "Nature Documentary", duration: "45:23", thumbnail: "🌿" },
    { id: 2, title: "Space Exploration", duration: "32:15", thumbnail: "🚀" },
    { id: 3, title: "Ocean Life", duration: "28:47", thumbnail: "🌊" },
    { id: 4, title: "Mountain Adventures", duration: "51:12", thumbnail: "🏔️" },
  ];

  const currentVid = videoList[currentVideo];

  return (
    <div className="h-full bg-slate-900/50 text-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-600/30">
        <div className="flex items-center gap-2">
          <Video size={24} className="text-red-400" />
          <span className="text-lg font-semibold">Video Player</span>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Video Display */}
          <div className="flex-1 bg-black flex items-center justify-center relative">
            <div className="text-8xl">{currentVid.thumbnail}</div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-6 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
              >
                {isPlaying ? <Pause size={48} /> : <Play size={48} />}
              </button>
            </div>
          </div>

          {/* Video Info */}
          <div className="p-4 bg-slate-800/30 border-t border-slate-600/30">
            <h3 className="font-semibold">{currentVid.title}</h3>
            <p className="text-sm text-slate-400">
              Duration: {currentVid.duration}
            </p>
          </div>

          {/* Controls */}
          <div className="p-4 bg-slate-800/50 border-t border-slate-600/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentVideo(Math.max(0, currentVideo - 1))}
                  className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
                >
                  <SkipBack size={20} />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>

                <button
                  onClick={() =>
                    setCurrentVideo(
                      Math.min(videoList.length - 1, currentVideo + 1)
                    )
                  }
                  className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
                >
                  <SkipForward size={20} />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-slate-400" />
                  <div className="w-20 relative">
                    <div className="w-full h-1 bg-slate-700 rounded-full">
                      <div
                        className="h-1 bg-red-500 rounded-full"
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

                <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors">
                  <Maximize size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="w-72 border-l border-slate-600/30 bg-slate-800/30">
          <div className="p-4 border-b border-slate-600/30">
            <h3 className="font-semibold">Playlist</h3>
          </div>
          <div className="p-2 space-y-2 max-h-96 overflow-y-auto">
            {videoList.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setCurrentVideo(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  index === currentVideo
                    ? "bg-red-600/20 border border-red-600/30"
                    : "bg-slate-700/30 hover:bg-slate-600/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{video.thumbnail}</div>
                  <div>
                    <div className="font-medium text-sm">{video.title}</div>
                    <div className="text-xs text-slate-400">
                      {video.duration}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
