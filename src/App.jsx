import React, { useState } from "react";
import Uploader from "./components/Uploader/Uploader";
import Logs from "./components/Logs/Logs";
import { motion } from "framer-motion";
import "./App.css";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [file, setFile] = useState(null);

  // Function to handle CSV file upload and generate logs
  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    
    // Simulating logs for the uploaded file
    const sampleResponse = {
      logs: [
        {
          timestamp: "2023-10-18 14:30:00",
          level: "INFO",
          message: "Application started",
          details: { version: "1.0.0", environment: "production" },
        },
        {
          timestamp: "2023-10-18 14:30:05",
          level: "WARN",
          message: "High CPU usage detected , Upscale",
          details: { usage: "85%", threshold: "80%" },
        },
        {
          timestamp: "2023-10-18 14:30:10",
          level: "DEBUG",
          message: "Low CPU usage detected , Downscale",
          details: { error: "Connection timeout", retries: 3 },
        },
        {
          timestamp: "2023-10-18 14:30:10",
          level: "DEBUG",
          message: "Low CPU usage detected , Downscale",
          details: { error: "Connection timeout", retries: 3 },
        },
        {
          timestamp: "2023-10-18 14:30:05",
          level: "WARN",
          message: "High CPU usage detected , Upscale",
          details: { usage: "85%", threshold: "80%" },
        },
      ],
    };

    setTimeout(() => {
      setLogs(sampleResponse.logs);
    }, 1000);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br bg-black flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-10 rounded-xl shadow-2xl p-8 md:p-12 max-w-4xl w-full flex flex-col md:flex-row items-center h-[350px]">
          <div className="md:w-2/3 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Amity Cyber Cup
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-4">
              Team: Ghanisht Bhaichara
            </h2>
            <p className="text-xl text-gray-300 mb-6">Theme: AI and Cloud</p>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full max-w-[200px] mx-auto"
            >
              <img
                src="/cyber-cup-logo.jpeg"
                alt="Cyber Cup Logo"
                className="w-full h-auto rounded-full shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-black text-white">
        {/* File Upload Section */}
        <center>
          <h1 className="text-white text-3xl">
            Upload a CSV file to get predictions from our model
          </h1>
        </center>
        <section className="flex flex-col items-center py-10">
          <Uploader onFileUpload={handleFileUpload} />
        </section>

        {/* Log Display Section */}
        <section className="flex flex-col items-center py-10">
          {file && logs.length > 0 ? (
            <Logs logs={logs} />
          ) : (
            <p>No logs yet. Upload a CSV file to see the results.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default App;
