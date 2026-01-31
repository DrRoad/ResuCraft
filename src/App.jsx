import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, Download, Upload, Save, FileJson, Trash2, Coffee } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Editor from './components/Editor';
import ResumePreview from './components/ResumePreview';
import DonationModal from './components/DonationModal';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [resumeData, setResumeData] = useLocalStorage('resumeData', {
    theme: {
      color: '#0f172a', // Slate-900
      font: 'font-serif', // Default to serif
      template: 'classic',
    },
    personalInfo: {
      fullName: 'Alexander Hamilton',
      role: 'Senior Software Engineer',
      email: 'alex.hamilton@example.com',
      phone: '+1 (555) 123-4567',
      linkedin: 'linkedin.com/in/alexhamilton',
      location: 'New York, NY',
    },
    summary: 'Experienced Full Stack Developer with over 8 years of experience in building scalable web applications. Proficient in React, Node.js, and Cloud Infrastructure. Passionate about clean code, performance optimization, and developer experience.',
    experience: [
      {
        id: 1,
        company: 'Tech Innovations Inc.',
        role: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        date: '2021 - Present',
        description: '• Led the migration of a legacy Monolith to a Micro-frontend architecture using Webpack Module Federation.\n• Improved site performance by 40% through code splitting and image optimization techniques.\n• Mentored a team of 5 junior developers and established coding standards.',
      },
      {
        id: 2,
        company: 'WebSolutions LLC',
        role: 'Full Stack Developer',
        location: 'Austin, TX',
        date: '2018 - 2021',
        description: '• Developed and maintained multiple client e-commerce platforms using MERN stack.\n• Integrated Stripe architecture for seamless payment processing.\n• Collaborated with UX/UI designers to implement responsive designs.',
      }
    ],
    education: [
      {
        id: 1,
        school: 'University of California, Berkeley',
        degree: 'B.S. Computer Science',
        date: '2014 - 2018',
      }
    ],
    skills: ['JavaScript (ES6+)', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Tailwind CSS'],
  });

  const INITIAL_STATE = {
    theme: {
      color: '#0f172a',
      font: 'font-serif',
      template: 'classic',
    },
    personalInfo: {
      fullName: '',
      role: '',
      email: '',
      phone: '',
      linkedin: '',
      location: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
  };

  const componentRef = useRef();
  const fileInputRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData.personalInfo.fullName || 'Resume'}`,
  });

  const handleExport = async () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const fileName = `resume-${resumeData.personalInfo.fullName.replace(/\s+/g, '_') || 'data'}.json`;

    try {
      // Check if the File System Access API is supported
      if ('showSaveFilePicker' in window) {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          }],
        });

        const writable = await handle.createWritable();
        await writable.write(dataStr);
        await writable.close();
      } else {
        // Fallback for browsers that don't support the API
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      toast.success('Resume saved to JSON');
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Failed to save file:', err);
        toast.error('Failed to save file');
      }
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        // Basic validation could be added here
        setResumeData(importedData);
        toast.success('Resume imported successfully');
      } catch (error) {
        console.error('Error parsing JSON:', error);
        toast.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset file input
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to delete all data? This cannot be undone.')) {
      setResumeData(INITIAL_STATE);
      toast.success('All data cleared');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Navbar/Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">ResuCraft</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              className="hidden"
              accept=".json"
            />
            <button
              onClick={handleImportClick}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md font-medium transition-colors"
              title="Import JSON"
            >
              <Upload size={18} />
              <span className="hidden sm:inline">Import</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md font-medium transition-colors"
              title="Save JSON"
            >
              <Save size={18} />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-md font-medium transition-colors"
              title="Reset All Data"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <div className="h-6 w-px bg-slate-300 mx-2"></div>
            <button
              onClick={() => setIsDonationModalOpen(true)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-md font-medium transition-colors shadow-sm"
              title="Support ResuCraft"
            >
              <Coffee size={18} />
              <span className="hidden sm:inline">Donate</span>
            </button>
            <div className="h-6 w-px bg-slate-300 mx-2"></div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm"
            >
              <Download size={18} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-w-[1920px] mx-auto">

          {/* Editor - Left Side */}
          <div className="h-full overflow-hidden">
            <Editor data={resumeData} onChange={setResumeData} />
          </div>

          {/* Preview - Right Side */}
          <div className="h-full bg-slate-200/50 rounded-xl border border-slate-200 overflow-y-auto p-6 flex justify-center items-start shadow-inner">
            <div className="w-full max-w-[210mm]">
              <ResumePreview ref={componentRef} data={resumeData} />
            </div>
          </div>

        </div>
      </main>
      <Toaster position="bottom-right" />
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </div>
  );
}

export default App;
