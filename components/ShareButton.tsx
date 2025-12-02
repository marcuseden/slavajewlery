'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Instagram, MessageSquare, Facebook, Send } from 'lucide-react';

interface ShareButtonProps {
  design: {
    id: string;
    title: string;
    image_url: string;
    prompt: string;
  };
}

export function ShareButton({ design }: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareUrl = `${window.location.origin}/design/shared/${design.id}`;
  const shareText = `Check out my AI-generated jewelry design: ${design.title}`;

  const shareOptions = [
    {
      name: 'Instagram Stories',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      action: () => {
        // Instagram sharing requires app integration
        if (navigator.share) {
          navigator.share({
            title: design.title,
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.04-.1z"/>
        </svg>
      ),
      color: 'bg-black',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: design.title,
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.31-.623-.31-1.544c0-1.447.839-2.528 1.884-2.528.888 0 1.317.667 1.317 1.466 0 .893-.568 2.229-.861 3.467-.245 1.04.522 1.888 1.546 1.888 1.856 0 3.285-1.958 3.285-4.789 0-2.503-1.799-4.253-4.367-4.253-2.977 0-4.727 2.234-4.727 4.546 0 .9.347 1.865.78 2.391.085.104.098.195.072.301-.079.329-.254 1.077-.289 1.228-.047.196-.153.238-.353.144-1.332-.621-2.165-2.571-2.165-4.137 0-3.298 2.394-6.327 6.919-6.327 3.635 0 6.458 2.592 6.458 6.056 0 3.615-2.281 6.522-5.44 6.522-1.062 0-2.065-.552-2.406-1.212l-.653 2.49c-.236.915-.873 2.062-1.297 2.759.977.302 2.008.465 3.07.465 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
      color: 'bg-red-600',
      action: () => {
        const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(design.image_url)}&description=${encodeURIComponent(shareText)}`;
        window.open(pinterestUrl, '_blank', 'width=600,height=400');
      },
    },
    {
      name: 'Messages',
      icon: MessageSquare,
      color: 'bg-green-600',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: design.title,
            text: shareText,
            url: shareUrl,
          });
        } else {
          // SMS fallback
          const smsUrl = `sms:?body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
          window.open(smsUrl);
        }
      },
    },
    {
      name: 'Copy Link',
      icon: Send,
      color: 'bg-slate-600',
      action: copyToClipboard,
    },
  ];

  function copyToClipboard() {
    const textToCopy = `${shareText}\n\n${shareUrl}`;
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy);
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
    }
    
    setShowShareMenu(false);
    // You could add a toast notification here
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowShareMenu(!showShareMenu)}
        variant="outline"
        size="sm"
        className="border-slate-600 text-slate-300 hover:bg-slate-800"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      {showShareMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowShareMenu(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute top-full mt-2 right-0 bg-slate-800 border border-slate-700 rounded-xl p-4 z-50 w-72">
            <h3 className="text-slate-100 font-semibold mb-4">Share your design</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className={`${option.color} hover:opacity-90 text-white p-3 rounded-lg flex flex-col items-center gap-2 text-sm font-medium transition-opacity`}
                >
                  {typeof option.icon === 'function' ? (
                    <option.icon />
                  ) : (
                    React.createElement(option.icon, { className: "w-5 h-5" })
                  )}
                  {option.name}
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-slate-900 rounded-lg">
              <p className="text-slate-400 text-xs mb-2">Share link:</p>
              <p className="text-slate-300 text-sm break-all">{shareUrl}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
