import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState("");
  const [initialSeconds, setInitialSeconds] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStart = () => {
    const minutes = parseInt(initialMinutes) || 0;
    const seconds = parseInt(initialSeconds) || 0;
    const totalTime = minutes * 60 + seconds;
    setTimeInSeconds(totalTime);
    setIsRunning(true);
  };

  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimeInSeconds(0);
    setInitialMinutes("");
    setInitialSeconds("");
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-gray-700 bg-gray-900/70 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
          Uptime Counter
        </h1>
        {/* <p className="text-center text-gray-400 mb-6">
          Track your running time in style
        </p> */}

        <div className="text-center font-mono text-7xl font-extrabold my-32 text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]">
          {formatTime(timeInSeconds)}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="number"
            value={initialMinutes}
            onChange={(e) => setInitialMinutes(e.target.value)}
            placeholder="Min"
            min="0"
            className="w-20 p-2 text-center rounded-lg bg-gray-800/70 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
          />
          <input
            type="number"
            value={initialSeconds}
            onChange={(e) => setInitialSeconds(e.target.value)}
            placeholder="Sec"
            min="0"
            max="59"
            className="w-20 p-2 text-center rounded-lg bg-gray-800/70 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="flex-1 py-3 px-6 font-bold rounded-xl transition-all duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105 active:scale-95"
          >
            Start
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="flex-1 py-3 px-6 font-bold rounded-xl transition-all duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-rose-500/30 transform hover:scale-105 active:scale-95"
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className="flex-1 py-3 px-6 font-bold rounded-xl transition-all duration-300 bg-gray-600/80 hover:bg-gray-700 text-white shadow-md hover:shadow-gray-400/20 transform hover:scale-105 active:scale-95"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
