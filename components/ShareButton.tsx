'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Instagram, MessageSquare, Facebook, Send, X, Check, Copy } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  description: string;
  imageUrl?: string;
  designUrl?: string; // Optional - will be generated if design data provided
  className?: string;
  children?: React.ReactNode;
  // Optional: provide design data to auto-create shareable link
  design?: {
    prompt: string;
    images: any[];
    pricing_breakdown?: any;
    jewelry_type?: string;
    style_tags?: string[];
    materials?: any;
  };
  sharedDesignId?: string; // If already saved as shared design
}

export function ShareButton({ 
  title, 
  description, 
  imageUrl, 
  designUrl, 
  className, 
  children,
  design,
  sharedDesignId 
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [actualShareUrl, setActualShareUrl] = useState(designUrl || '');

  const shareText = `Check out this custom jewelry design: ${title}`;

  // Create shareable link when modal opens
  useEffect(() => {
    if (isOpen && !actualShareUrl && design && typeof window !== 'undefined') {
      createShareableLink();
    }
  }, [isOpen]);

  const createShareableLink = async () => {
    if (!design) return;

    setIsCreatingLink(true);
    try {
      // Save design as public to get shareable ID
      const response = await fetch('/api/designs/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          prompt: design.prompt,
          images: design.images,
          pricing_breakdown: design.pricing_breakdown,
          jewelry_type: design.jewelry_type,
          style_tags: design.style_tags,
          materials: design.materials,
          makePublic: true // Create shareable version
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.sharedDesign?.id) {
          const url = `${window.location.origin}/shared/${result.sharedDesign.id}`;
          setActualShareUrl(url);
        }
      } else {
        // Fallback to current page URL
        setActualShareUrl(window.location.href);
      }
    } catch (error) {
      console.error('Failed to create shareable link:', error);
      // Fallback to current page URL
      setActualShareUrl(window.location.href);
    } finally {
      setIsCreatingLink(false);
    }
  };

  // If sharedDesignId is provided, use it immediately
  useEffect(() => {
    if (sharedDesignId && typeof window !== 'undefined') {
      setActualShareUrl(`${window.location.origin}/shared/${sharedDesignId}`);
    } else if (designUrl) {
      setActualShareUrl(designUrl);
    }
  }, [sharedDesignId, designUrl]);

  const shareUrl = actualShareUrl || (typeof window !== 'undefined' ? window.location.href : '');

  const shareOptions = [
    {
      name: 'Instagram Stories',
      icon: Instagram,
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
      action: async () => {
        // Try to share with image if available
        if (navigator.share && imageUrl) {
          try {
            // Fetch the image and create a file
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'jewelry-design.jpg', { type: blob.type });
            
            await navigator.share({
              title: title,
              text: shareText,
              files: [file],
            });
          } catch (error) {
            // Fallback to sharing without image
            if (navigator.share) {
              navigator.share({
                title: title,
                text: shareText,
                url: shareUrl,
              });
            } else {
              copyToClipboard();
            }
          }
        } else if (navigator.share) {
          navigator.share({
            title: title,
            text: shareText,
            url: shareUrl,
          });
        } else {
          copyToClipboard();
        }
      },
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.04-.1z"/>
        </svg>
      ),
      color: 'bg-black border border-white/20',
      action: async () => {
        if (navigator.share && imageUrl) {
          try {
            // Try to share with image
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'jewelry-design.jpg', { type: blob.type });
            
            await navigator.share({
              title: title,
              text: shareText,
              files: [file],
            });
          } catch (error) {
            // Fallback
            if (navigator.share) {
              navigator.share({
                title: title,
                text: shareText,
                url: shareUrl,
              });
            } else {
              copyToClipboard();
            }
          }
        } else if (navigator.share) {
          navigator.share({
            title: title,
            text: shareText,
            url: shareUrl,
          });
        } else {
          copyToClipboard();
        }
      },
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      action: () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(fbUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'Pinterest',
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.31-.623-.31-1.544c0-1.447.839-2.528 1.884-2.528.888 0 1.317.667 1.317 1.466 0 .893-.568 2.229-.861 3.467-.245 1.04.522 1.888 1.546 1.888 1.856 0 3.285-1.958 3.285-4.789 0-2.503-1.799-4.253-4.367-4.253-2.977 0-4.727 2.234-4.727 4.546 0 .9.347 1.865.78 2.391.085.104.098.195.072.301-.079.329-.254 1.077-.289 1.228-.047.196-.153.238-.353.144-1.332-.621-2.165-2.571-2.165-4.137 0-3.298 2.394-6.327 6.919-6.327 3.635 0 6.458 2.592 6.458 6.056 0 3.615-2.281 6.522-5.44 6.522-1.062 0-2.065-.552-2.406-1.212l-.653 2.49c-.236.915-.873 2.062-1.297 2.759.977.302 2.008.465 3.07.465 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
      color: 'bg-red-600',
      action: () => {
        const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(imageUrl || '')}&description=${encodeURIComponent(shareText)}`;
        window.open(pinterestUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-600',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(whatsappUrl, '_blank');
      },
    },
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'bg-gray-700',
      action: copyToClipboard,
    },
  ];

  function copyToClipboard() {
    const textToCopy = shareUrl;
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';
      document.body.prepend(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <>
      {/* Trigger Button */}
      {children ? (
        React.cloneElement(children as React.ReactElement, {
          onClick: () => setIsOpen(true),
          className: className
        })
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      )}

      {/* Inline Share Panel - Replaces Product Info */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Loading State */}
            {isCreatingLink && (
              <div className="bg-gray-950 rounded-2xl p-8 border border-gray-800 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-300">Creating shareable link...</p>
              </div>
            )}

            {/* Share Content */}
            {!isCreatingLink && (
              <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800">
              {/* Image Preview */}
              {imageUrl && (
                <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900 border border-gray-700">
                  <img 
                    src={imageUrl} 
                    alt={title}
                    className="w-full h-48 object-contain p-4"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2">{description}</p>

              {/* Icon Grid */}
              <div className="mb-6">
                <div className="flex justify-center items-center gap-8 py-4">
                  {shareOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => {
                        option.action();
                        if (option.name !== 'Copy Link') {
                          setIsOpen(false);
                        }
                      }}
                      className="group"
                      aria-label={option.name}
                    >
                      {option.name === 'Copy Link' && copied ? (
                        <Check className="w-7 h-7 text-green-400 transition-all active:scale-90" />
                      ) : typeof option.icon === 'function' ? (
                        <div className="transition-all active:scale-90 text-gray-300 group-hover:text-white">
                          <option.icon />
                        </div>
                      ) : (
                        React.createElement(option.icon, { 
                          className: "w-7 h-7 text-gray-300 group-hover:text-white transition-all active:scale-90" 
                        })
                      )}
                    </button>
                  ))}
                </div>
                {imageUrl && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    ✨ Your jewelry design image will be included
                  </p>
                )}
              </div>

              {/* Link */}
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="flex-1 text-gray-400 text-xs truncate">
                    {shareUrl}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-green-400 text-xs mt-2 text-center">✓ Copied!</p>
                )}
              </div>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
