import React, { useState } from 'react'
import { Download, Trash2, Plus } from 'lucide-react'

export default function Uploader({ onFileUpload }) {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      onFileUpload(selectedFile); // Pass the file to the parent
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log('Submitting file:', file.name);
    } else {
      console.log('No file selected');
    }
  }

  return (
    <div className="w-full max-w-md bg-zinc-900 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
        <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center mb-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <Plus className="mx-auto mb-2" />
            <span className="text-sm text-zinc-400">Drag & drop or click to choose files</span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <p className="text-xs text-zinc-500 mt-2">Max file size: 10 MB</p>
        </div>
        {file && (
          <div className="bg-zinc-800 rounded-lg p-3 flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="bg-red-500 text-white p-2 rounded mr-3">
                <span className="text-xs font-bold">ZIP</span>
              </div>
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-zinc-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                className="p-1 hover:bg-zinc-700 rounded"
                onClick={() => {
                  const url = URL.createObjectURL(file);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = file.name;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                <Download className="h-4 w-4" />
              </button>
              <button className="p-1 hover:bg-zinc-700 rounded" onClick={() => setFile(null)}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        <button 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          onClick={handleSubmit}
        >
          Submit File
        </button>
      </div>
    </div>
  )
}
