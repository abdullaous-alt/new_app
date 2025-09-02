
import React from 'react';

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V17.25c0 .414.336.75.75.75h16.5c.414 0 .75-.336.75-.75V17.25"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75l3-3m0 0l3 3m-3-3v6"
    />
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9.75h16.5"
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M3 12.75V6a3 3 0 013-3h12a3 3 0 013 3v6.75" 
    />
  </svg>
);

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
        <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
    </svg>
);
