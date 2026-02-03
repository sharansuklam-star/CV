
import React, { useRef } from 'react';

interface ImageUploadProps {
    photo: string | undefined;
    onPhotoChange: (base64: string) => void;
    onPhotoRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ photo, onPhotoChange, onPhotoRemove }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                onPhotoChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileSelect = () => fileInputRef.current?.click();

    return (
        <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2 relative group">
                {photo ? (
                    <>
                        <img src={photo} alt="Profile Preview" className="w-full h-full rounded-full object-cover" />
                        <div 
                            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-opacity cursor-pointer"
                            onClick={triggerFileSelect}
                        >
                           <p className="text-white opacity-0 group-hover:opacity-100 text-sm">Change</p>
                        </div>
                         <button 
                            type="button"
                            onClick={onPhotoRemove}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove photo"
                        >
                           &times;
                        </button>
                    </>
                ) : (
                    <button type="button" onClick={triggerFileSelect} className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs">Upload Photo</span>
                    </button>
                )}
            </div>
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                className="hidden"
            />
        </div>
    );
};

export default ImageUpload;
