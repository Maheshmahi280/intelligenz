import React, { useState, useMemo } from 'react';
import { GalleryImage } from '../types';
import { Image as ImageIcon, X, Eye } from 'lucide-react';

interface GalleryPageProps {
  gallery: GalleryImage[];
  onNavigate: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ gallery }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryImage | null>(null);

  const albums = ['All', 'Workshops 2026', 'Hackathons', 'Orientations', 'Tech Exhibits', 'Felicitation'];

  const filteredImages = useMemo(() => {
    if (selectedAlbum === 'All') return gallery;
    return gallery.filter((img) => img.album === selectedAlbum);
  }, [gallery, selectedAlbum]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 border border-[#00E5FF]/20 bg-[#00E5FF]/5 rounded-full py-1.5 px-4 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#00E5FF] font-bold">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Visual Archive &amp; Memories</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit'] tracking-tight">
          Event &amp; Workshop Gallery
        </h1>

        <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
          Glimpses into hackathon coding marathons, AI lab bootcamps, student demos, and celebrations hosted by the{' '}
          <span className="text-white font-semibold">Department of CSE (AIML) &amp; AI</span> at{' '}
          <span className="text-white font-semibold">DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY</span>.
        </p>
      </div>

      {/* Album Filters */}
      <div className="p-3 rounded-2xl bg-[#0D1017] border border-[#1A1C23] flex items-center justify-center gap-2 overflow-x-auto">
        {albums.map((alb) => (
          <button
            key={alb}
            onClick={() => setSelectedAlbum(alb)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedAlbum === alb
                ? 'bg-[#00E5FF] text-[#0A0B0E] font-bold shadow-md shadow-[#00E5FF]/20'
                : 'text-[#9CA3AF] hover:text-white hover:bg-[#121622]'
            }`}
          >
            {alb}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setActivePhoto(image)}
            className="group relative rounded-2xl overflow-hidden bg-[#0A0B0E] border border-[#1A1C23] hover:border-[#00E5FF]/50 cursor-pointer aspect-[4/3] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00E5FF]/5"
          >
            <img
              src={image.image_url}
              alt={image.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/90 via-[#0A0B0E]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Hover overlay info */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-left text-white space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 uppercase tracking-wider">
                {image.album}
              </span>
              <h3 className="text-sm sm:text-base font-bold font-['Outfit'] line-clamp-1">
                {image.title}
              </h3>
              <p className="text-[11px] text-[#9CA3AF] line-clamp-1">
                {image.caption || image.event_name}
              </p>
            </div>

            <div className="absolute top-3 right-3 p-2 rounded-lg bg-[#0D1017]/80 text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-[#0D1017] border border-[#1A1C23] shadow-2xl p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 z-10 p-2 rounded-lg bg-[#0A0B0E]/90 text-white hover:bg-[#1A1C23] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activePhoto.image_url}
              alt={activePhoto.title}
              className="w-full max-h-[70vh] object-contain rounded-xl"
            />

            <div className="p-4 text-left space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#00E5FF] font-mono">
                <span>{activePhoto.album}</span>
                <span>•</span>
                <span>{activePhoto.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                {activePhoto.title}
              </h3>
              {activePhoto.caption && (
                <p className="text-xs text-[#9CA3AF]">{activePhoto.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
