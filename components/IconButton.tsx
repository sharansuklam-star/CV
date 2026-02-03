
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
    return (
        <button
            type="button"
            {...props}
            className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            {children}
        </button>
    );
};

export default IconButton;
