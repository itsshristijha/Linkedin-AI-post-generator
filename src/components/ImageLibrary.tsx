import React from 'react';
import { X } from 'lucide-react';
import { unsplashImages } from '../data';

interface ImageLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
}

export function ImageLibrary({ isOpen, onClose, onSelectImage }: ImageLibraryProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Image Library</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[60vh]">
          {unsplashImages.map((url, index) => (
            <button
              key={index}
              className="aspect-video relative group overflow-hidden rounded-lg"
              onClick={() => {
                onSelectImage(url);
                onClose();
              }}
            >
              <img
                src={url}
                alt={`Library image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}