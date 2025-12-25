'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Eye, Edit3, Sparkles } from 'lucide-react';

interface ExampleImage {
  type: string;
  local_url?: string;
  url?: string;
  prompt: string;
}

interface ExampleDesign {
  id: string;
  title: string;
  prompt: string;
  images: ExampleImage[];
}

interface ExampleViewerProps {
  design: ExampleDesign;
  onClose: () => void;
  onUsePrompt: (prompt: string) => void;
}

export function ExampleViewer({ design, onClose, onUsePrompt }: ExampleViewerProps) {
  const [selectedImageType, setSelectedImageType] = useState('packshot');
  const [editedPrompt, setEditedPrompt] = useState(design.prompt);
  const [isEditing, setIsEditing] = useState(false);

  const selectedImage = design.images?.find(img => img.type === selectedImageType) || design.images?.[0];

  const handleUsePrompt = () => {
    onUsePrompt(isEditing ? editedPrompt : design.prompt);
    onClose();
  };

  const handleGenerateWithEdit = async () => {
    if (!editedPrompt.trim()) return;
    
    // Use the edited prompt to generate new images
    onUsePrompt(editedPrompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl sm:rounded-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-700 sticky top-0 bg-slate-900/95 backdrop-blur">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-100">{design.title}</h2>
            <p className="text-sm sm:text-base text-slate-400">Custom Design with Multiple Views</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 sm:w-6 h-5 sm:h-6 text-slate-400" />
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6">
          {/* Images Section */}
          <div className="space-y-4 order-2 lg:order-1">
            {/* Main Image Display */}
            <div className="aspect-square bg-slate-800 rounded-xl overflow-hidden">
              {selectedImage?.local_url || selectedImage?.url ? (
                <img
                  src={selectedImage.local_url || selectedImage.url}
                  alt={`${design.title} - ${selectedImage.type}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Sparkles className="w-8 sm:w-12 h-8 sm:h-12 text-slate-500" />
                </div>
              )}
            </div>

            {/* Image Type Selector */}
            <div className="grid grid-cols-4 gap-2">
              {design.images?.map((image, index) => (
                <button
                  key={image.type}
                  onClick={() => setSelectedImageType(image.type)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageType === image.type
                      ? 'border-cyan-400 ring-2 ring-cyan-400/20'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {image.local_url || image.url ? (
                    <img
                      src={image.local_url || image.url}
                      alt={`${design.title} - ${image.type}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <Eye className="w-3 sm:w-4 h-3 sm:h-4 text-slate-500" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center">
                    {image.type.replace('_', ' ')}
                  </div>
                </button>
              ))}
            </div>

            {/* Image Type Labels */}
            <div className="text-center text-xs sm:text-sm text-slate-400">
              <p><strong>Same design, 4 different views:</strong></p>
              <p className="hidden sm:block">Packshot • Hero Angle • On Model • Macro Detail</p>
              <p className="sm:hidden">4 professional angles</p>
            </div>
          </div>

          {/* Prompt & Actions Section */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-100">Design Prompt</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  {isEditing ? 'View' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <textarea
                  value={editedPrompt}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                  className="w-full h-24 sm:h-32 p-3 sm:p-4 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 resize-none focus:border-cyan-400 focus:outline-none text-sm sm:text-base"
                  placeholder="Edit the prompt to customize the design..."
                />
              ) : (
                <div className="p-3 sm:p-4 bg-slate-800 border border-slate-600 rounded-lg">
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    "{design.prompt}"
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleUsePrompt}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 sm:py-4"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">
                  {isEditing ? 'Generate with Edited Prompt' : 'Use This Prompt'}
                </span>
                <span className="sm:hidden">
                  {isEditing ? 'Generate Edited' : 'Use Prompt'}
                </span>
              </Button>

              {isEditing && (
                <Button
                  onClick={() => {
                    setEditedPrompt(design.prompt);
                    setIsEditing(false);
                  }}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Reset to Original
                </Button>
              )}

              <Button
                onClick={onClose}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Close
              </Button>
            </div>

            {/* Design Info */}
            <div className="p-3 sm:p-4 bg-slate-800/50 rounded-lg">
              <h4 className="font-medium text-slate-200 mb-2 text-sm sm:text-base">About This Design</h4>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-400">
                <p>• Same jewelry piece from 4 angles</p>
                <p>• Consistent design across all views</p>
                <p>• Includes on-model photography</p>
                <p>• Professional lighting & composition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
