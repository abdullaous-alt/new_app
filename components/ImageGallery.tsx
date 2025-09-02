
import React from 'react';
import { type GeneratedImage, type OriginalImage } from '../types';

interface ImageGalleryProps {
  originalImage: OriginalImage;
  generatedImages: GeneratedImage[];
}

const ImageCard: React.FC<{ imageUrl: string, label: string, isOriginal?: boolean }> = ({ imageUrl, label, isOriginal = false }) => (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-slate-800 transform transition-transform duration-300 hover:scale-105">
        <img
            src={imageUrl}
            alt={label}
            className="w-full h-full object-cover aspect-square"
            loading="lazy"
        />
        <div className={`absolute bottom-0 left-0 right-0 p-3 text-white text-center font-bold text-sm md:text-base transition-opacity duration-300 ${isOriginal ? 'bg-indigo-600' : 'bg-black/60 group-hover:opacity-100 opacity-100 sm:opacity-0'}`}>
            {label}
        </div>
    </div>
);


export const ImageGallery: React.FC<ImageGalleryProps> = ({ originalImage, generatedImages }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <ImageCard imageUrl={originalImage.url} label="الصورة الأصلية" isOriginal={true} />
      {generatedImages.map((image) => (
        <ImageCard key={image.age} imageUrl={image.url} label={image.age} />
      ))}
    </div>
  );
};
