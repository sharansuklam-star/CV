
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, className, hideLabel = false, ...props }) => {
  return (
    <div className={className}>
      <label htmlFor={name} className={`block text-sm font-medium text-gray-700 mb-1 ${hideLabel ? 'sr-only' : ''}`}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default TextInput;
