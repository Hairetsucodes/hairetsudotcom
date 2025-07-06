import { useState, useEffect } from "react";
import { Monitor, Cpu, HardDrive, Activity, Zap } from "lucide-react";

export function SystemMonitorApp() {
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(67);
  const [diskUsage, setDiskUsage] = useState(34);
  const [networkSpeed, setNetworkSpeed] = useState(1.2);

  const [processes] = useState([
    { name: "Web Browser", cpu: 15.2, memory: 1200, pid: 1234 },
    { name: "File Manager", cpu: 2.1, memory: 350, pid: 1567 },
    { name: "Terminal", cpu: 0.8, memory: 120, pid: 2890 },
    { name: "Text Editor", cpu: 1.5, memory: 280, pid: 3421 },
    { name: "System Monitor", cpu: 3.2, memory: 180, pid: 4567 },
    { name: "Desktop Environment", cpu: 8.1, memory: 850, pid: 1001 },
    { name: "Network Manager", cpu: 0.3, memory: 95, pid: 2341 },
    { name: "Audio System", cpu: 1.2, memory: 150, pid: 5678 },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) =>
        Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 10))
      );
      setMemoryUsage((prev) =>
        Math.max(20, Math.min(85, prev + (Math.random() - 0.5) * 5))
      );
      setDiskUsage((prev) =>
        Math.max(10, Math.min(70, prev + (Math.random() - 0.5) * 2))
      );
      setNetworkSpeed((prev) =>
        Math.max(0.1, Math.min(5.0, prev + (Math.random() - 0.5) * 0.5))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getUsageColor = (usage: number) => {
    if (usage < 30) return "text-green-400";
    if (usage < 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getUsageBg = (usage: number) => {
    if (usage < 30) return "bg-green-500";
    if (usage < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-6 h-full bg-slate-900/50 text-slate-200">
      <div className="mb-6 border-b border-slate-600/30 pb-4">
        <div className="text-xl font-semibold flex items-center gap-2">
          <Monitor size={24} className="text-blue-400" />
          System Monitor
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* CPU Usage */}
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30">
          <div className="flex items-center gap-2 mb-3">
            <Cpu size={20} className="text-blue-400" />
            <span className="font-semibold">CPU Usage</span>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Usage</span>
              <span className={getUsageColor(cpuUsage)}>
                {cpuUsage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getUsageBg(
                  cpuUsage
                )}`}
                style={{ width: `${cpuUsage}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-slate-400">
            Intel Core i7-12700K @ 3.60GHz
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30">
          <div className="flex items-center gap-2 mb-3">
            <HardDrive size={20} className="text-green-400" />
            <span className="font-semibold">Memory Usage</span>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>RAM</span>
              <span className={getUsageColor(memoryUsage)}>
                {memoryUsage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getUsageBg(
                  memoryUsage
                )}`}
                style={{ width: `${memoryUsage}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-slate-400">
            {(memoryUsage * 0.16).toFixed(1)} GB / 16.0 GB used
          </div>
        </div>

        {/* Disk Usage */}
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30">
          <div className="flex items-center gap-2 mb-3">
            <HardDrive size={20} className="text-purple-400" />
            <span className="font-semibold">Disk Usage</span>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>SSD</span>
              <span className={getUsageColor(diskUsage)}>
                {diskUsage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getUsageBg(
                  diskUsage
                )}`}
                style={{ width: `${diskUsage}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-slate-400">
            {(diskUsage * 5.12).toFixed(0)} GB / 512 GB used
          </div>
        </div>

        {/* Network Activity */}
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-600/30">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={20} className="text-orange-400" />
            <span className="font-semibold">Network</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Download</span>
              <span className="text-green-400">
                {networkSpeed.toFixed(1)} MB/s
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Upload</span>
              <span className="text-blue-400">
                {(networkSpeed * 0.3).toFixed(1)} MB/s
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-2">Ethernet connected</div>
        </div>
      </div>

      {/* Process List */}
      <div className="bg-slate-800/30 rounded-xl border border-slate-600/30">
        <div className="p-4 border-b border-slate-600/30">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-yellow-400" />
            <span className="font-semibold">Running Processes</span>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-slate-400 border-b border-slate-600/30 pb-2">
              <span>Process Name</span>
              <span>PID</span>
              <span>CPU %</span>
              <span>Memory (MB)</span>
            </div>

            {/* Process rows */}
            {processes.map((process) => (
              <div
                key={process.pid}
                className="grid grid-cols-4 gap-4 text-sm py-2 hover:bg-slate-700/30 rounded transition-colors"
              >
                <span className="font-medium">{process.name}</span>
                <span className="text-slate-400">{process.pid}</span>
                <span className={getUsageColor(process.cpu)}>
                  {process.cpu}%
                </span>
                <span className="text-slate-300">{process.memory}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
