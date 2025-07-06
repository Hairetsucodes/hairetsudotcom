import { useState } from "react";
import { Wifi, Shield, Settings } from "lucide-react";

export function NetworkManagerApp() {
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const networks = [
    {
      id: 1,
      name: "Home-WiFi-5G",
      signal: 95,
      secured: true,
      connected: true,
      speed: "867 Mbps",
    },
    {
      id: 2,
      name: "Neighbor-Network",
      signal: 75,
      secured: true,
      connected: false,
      speed: "300 Mbps",
    },
    {
      id: 3,
      name: "Public-Hotspot",
      signal: 45,
      secured: false,
      connected: false,
      speed: "54 Mbps",
    },
    {
      id: 4,
      name: "Office-Guest",
      signal: 30,
      secured: true,
      connected: false,
      speed: "150 Mbps",
    },
  ];

  const getSignalColor = (signal: number) => {
    if (signal > 70) return "text-green-400";
    if (signal > 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getSignalBars = (signal: number) => {
    const bars = Math.ceil(signal / 25);
    return bars;
  };

  return (
    <div className="h-full bg-slate-900/50 text-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-600/30">
        <div className="flex items-center gap-2">
          <Wifi size={24} className="text-blue-400" />
          <span className="text-lg font-semibold">Network Manager</span>
        </div>
      </div>

      <div className="flex h-full">
        {/* Network List */}
        <div className="flex-1 p-4">
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Available Networks</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300">
              Refresh Networks
            </button>
          </div>

          <div className="space-y-2">
            {networks.map((network, index) => (
              <button
                key={network.id}
                onClick={() => setSelectedNetwork(index)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  index === selectedNetwork
                    ? "bg-blue-600/20 border-blue-600/30"
                    : "bg-slate-800/30 border-slate-600/30 hover:bg-slate-700/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Wifi
                        size={20}
                        className={getSignalColor(network.signal)}
                      />
                      {network.secured && (
                        <Shield
                          size={12}
                          className="absolute -top-1 -right-1 text-slate-400"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {network.name}
                        {network.connected && (
                          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                            Connected
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-400">
                        {network.secured ? "Secured" : "Open"} • {network.speed}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`w-1 rounded-full ${
                          bar <= getSignalBars(network.signal)
                            ? getSignalColor(network.signal).replace(
                                "text-",
                                "bg-"
                              )
                            : "bg-slate-600"
                        }`}
                        style={{ height: `${bar * 3 + 6}px` }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Connection Details */}
        <div className="w-80 border-l border-slate-600/30 bg-slate-800/30 p-4">
          <h3 className="font-semibold mb-4">Connection Details</h3>

          {networks[selectedNetwork] && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">Network Name</label>
                <div className="font-medium">
                  {networks[selectedNetwork].name}
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400">
                  Signal Strength
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getSignalColor(
                        networks[selectedNetwork].signal
                      ).replace("text-", "bg-")}`}
                      style={{ width: `${networks[selectedNetwork].signal}%` }}
                    />
                  </div>
                  <span className="text-sm">
                    {networks[selectedNetwork].signal}%
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400">Security</label>
                <div className="flex items-center gap-2">
                  <Shield
                    size={16}
                    className={
                      networks[selectedNetwork].secured
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  />
                  <span>
                    {networks[selectedNetwork].secured
                      ? "WPA2/WPA3"
                      : "Open Network"}
                  </span>
                </div>
              </div>

              {networks[selectedNetwork].connected && (
                <>
                  <div>
                    <label className="text-sm text-slate-400">IP Address</label>
                    <div className="font-medium">192.168.1.100</div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400">Gateway</label>
                    <div className="font-medium">192.168.1.1</div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400">DNS</label>
                    <div className="font-medium">8.8.8.8, 8.8.4.4</div>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-slate-600/30">
                {networks[selectedNetwork].connected ? (
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                    Disconnect
                  </button>
                ) : (
                  <div className="space-y-3">
                    {networks[selectedNetwork].secured && (
                      <div>
                        <label className="text-sm text-slate-400">
                          Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter network password"
                          className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="flex items-center gap-2 mt-2 text-sm">
                          <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                            className="rounded"
                          />
                          Show password
                        </label>
                      </div>
                    )}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                      Connect
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-600/30">
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <Settings size={16} />
                  Advanced Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
