
import React, { useState } from 'react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (language: string) => void;
    isGenerating: boolean;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, onConfirm, isGenerating }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const languages = ['English', 'Malay', 'Tamil'];

    if (!isOpen) return null;
    
    const handleConfirm = () => {
        onConfirm(selectedLanguage);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <div className="text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Generate Your CV</h3>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-4">
                            Select the language for your CV. The document will be translated and generated as a PDF.
                        </p>
                        <div>
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700 text-left">Language</label>
                            <select
                                id="language"
                                name="language"
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                {languages.map(lang => <option key={lang}>{lang}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isGenerating}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isGenerating}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
                    >
                         {isGenerating ? (
                            <>
                               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : 'Generate & Download'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadModal;
