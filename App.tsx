
import React, { useState, useEffect, useCallback } from 'react';
import { CVData } from './types';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import DownloadButton from './components/DownloadButton';
import DownloadModal from './components/DownloadModal';
import { GoogleGenAI } from '@google/genai';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';


const initialCVData: CVData = {
  personalDetails: {
    fullName: 'Jane Doe',
    jobTitle: 'Senior Frontend Developer',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
    address: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janedoe',
    photo: '',
  },
  summary: 'Experienced Frontend Developer with a demonstrated history of working in the computer software industry. Skilled in React, TypeScript, and UI/UX design. Strong engineering professional with a Bachelor\'s degree focused in Computer Science from Example University.',
  workExperience: [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      startDate: '2020-01-01',
      endDate: 'Present',
      description: 'Led the development of a new user-facing analytics dashboard using React and D3.js. Mentored junior developers and improved code quality through rigorous code reviews and pair programming sessions. Optimized application performance, resulting in a 30% reduction in load times.',
    },
    {
      id: 2,
      jobTitle: 'Frontend Developer',
      company: 'Web Innovators',
      startDate: '2017-06-01',
      endDate: '2019-12-31',
      description: 'Developed and maintained responsive web applications using React and Redux. Collaborated with designers to create intuitive and visually appealing user interfaces. Wrote unit and integration tests to ensure application stability.',
    },
  ],
  education: [
    {
      id: 1,
      institution: 'Example University',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2013-09-01',
      endDate: '2017-05-31',
      description: 'Graduated with honors. Active member of the coding club and participated in multiple hackathons.',
    },
  ],
  skills: [
    { id: 1, name: 'React' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'JavaScript (ES6+)' },
    { id: 4, name: 'Tailwind CSS' },
    { id: 5, name: 'UI/UX Design' },
    { id: 6, name: 'State Management (Redux, Zustand)' },
    { id: 7, name: 'REST APIs' },
    { id: 8, name: 'Git & GitHub' },
  ],
  academicWritings: [
    {
      id: 1,
      title: 'The Principles of Modern Frontend Development',
      journal: 'Journal of Web Technology',
      year: '2021',
      doi: '10.1234/jwt.2021.5678',
    },
  ],
  conferencePresentations: [
    {
      id: 1,
      title: 'State Management in Large-Scale React Applications',
      conferenceName: 'ReactConf Global',
      location: 'Virtual',
      date: '2022-10-15',
      role: 'presenter',
    },
  ],
  bookPublishings: [
    {
      id: 1,
      title: 'Advanced TypeScript Patterns',
      publisher: 'O\'Reilly Media',
      year: '2023',
      isbn: '978-1-492-05448-7',
    },
  ],
  programmesOrganised: [
    {
      id: 1,
      programmeName: 'Annual Tech Summit 2023',
      organisation: 'Tech Innovators Hub',
      location: 'Virtual',
      date: '2023-11-20',
      role: 'Lead Coordinator',
    },
  ],
};

function App() {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dataForPdf, setDataForPdf] = useState<CVData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generatePdf = useCallback(async (pdfData: CVData) => {
    const pdfPreviewElement = document.getElementById('pdf-preview');
    if (!pdfPreviewElement) {
        setIsGenerating(false);
        setIsModalOpen(false);
        return;
    }

    try {
        const canvas = await html2canvas(pdfPreviewElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${pdfData.personalDetails.fullName}_CV.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert('Failed to generate PDF.');
    } finally {
        setIsGenerating(false);
        setDataForPdf(null);
        setIsModalOpen(false);
    }
  }, []);
  
  useEffect(() => {
    if (dataForPdf) {
        generatePdf(dataForPdf);
    }
  }, [dataForPdf, generatePdf]);

  const handleTranslateAndDownload = async (language: string) => {
    setIsGenerating(true);
    if (language.toLowerCase() === 'english') {
        setDataForPdf(cvData);
        return;
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const prompt = `Translate the following CV data JSON object from English to ${language}. Maintain the exact JSON structure and keys. Only translate the string values for fields like fullName, jobTitle, address, summary, descriptions, institutions, degrees, skills, titles, journals, conference names, locations, roles, publishers, programme names, and organisations. Do not translate keys, IDs, dates, email, phone, linkedin, or URLs. Respond with only the translated JSON object, without any additional text, explanation, or markdown formatting.\n\n${JSON.stringify(cvData)}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        
        const translatedText = response.text;
        const parsedData = JSON.parse(translatedText);
        // Ensure non-translatable fields are preserved from original data
        parsedData.personalDetails.photo = cvData.personalDetails.photo;
        setDataForPdf(parsedData);
    } catch (error) {
        console.error("Error during translation:", error);
        alert(`Failed to translate CV. Please check your API key and try again. Error: ${error.message}`);
        setIsGenerating(false);
    }
  };


  return (
    <>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">CV/Resume Generator</h1>
              <p className="text-gray-600 mt-1">Create your professional resume with a live preview.</p>
            </div>
            <DownloadButton isGenerating={isGenerating} onClick={() => setIsModalOpen(true)} />
          </div>
        </header>
        <main className="container mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky top-8">
            <CVForm cvData={cvData} setCvData={setCvData} />
          </div>
          <div>
            <CVPreview cvData={cvData} />
          </div>
        </main>
      </div>
      <DownloadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleTranslateAndDownload}
        isGenerating={isGenerating}
      />
      {isGenerating && dataForPdf && (
          <div style={{ position: 'absolute', left: '-9999px', top: 0, width: '827px' }}>
              <CVPreview cvData={dataForPdf} id="pdf-preview" />
          </div>
      )}
    </>
  );
}

export default App;
