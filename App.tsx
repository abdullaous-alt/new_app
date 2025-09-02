
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageGallery } from './components/ImageGallery';
import { Spinner } from './components/Spinner';
import { LogoIcon } from './components/icons';
import { type GeneratedImage, type OriginalImage } from './types';
import { generateAgeProgressionImages } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<OriginalImage | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64Image = (reader.result as string).split(',')[1];
        const mimeType = file.type;
        
        setOriginalImage({
          url: URL.createObjectURL(file),
          name: file.name
        });
        
        const images = await generateAgeProgressionImages(base64Image, mimeType);
        setGeneratedImages(images);
      } catch (err) {
        console.error(err);
        setError('حدث خطأ أثناء إنشاء الصور. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError('فشل في قراءة ملف الصورة.');
      setIsLoading(false);
    };
  }, []);

  const resetState = () => {
    setOriginalImage(null);
    setGeneratedImages([]);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <LogoIcon className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 text-transparent bg-clip-text">
              متغير العمر
            </h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            ارفع صورتك وشاهد كيف ستبدو في مراحل عمرية مختلفة، من الطفولة إلى الشيخوخة، بقوة الذكاء الاصطناعي.
          </p>
        </header>

        <main>
          {!originalImage && !isLoading && (
            <ImageUploader onImageUpload={handleImageUpload} disabled={isLoading} />
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800/50 rounded-lg">
              <Spinner />
              <p className="mt-4 text-xl font-semibold text-slate-200">جاري إنشاء الصور...</p>
              <p className="text-slate-400">قد تستغرق هذه العملية بضع لحظات.</p>
            </div>
          )}

          {error && (
            <div className="text-center p-8 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-xl font-bold text-red-300">خطأ!</p>
              <p className="text-red-400">{error}</p>
              <button
                onClick={resetState}
                className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
              >
                البدء من جديد
              </button>
            </div>
          )}

          {!isLoading && originalImage && (
            <>
              <ImageGallery originalImage={originalImage} generatedImages={generatedImages} />
              <div className="text-center mt-8">
                <button
                  onClick={resetState}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg"
                >
                  رفع صورة أخرى
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
