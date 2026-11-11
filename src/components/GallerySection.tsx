import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/schoolData';
import { GalleryItem } from '../types';
import {
  Image as ImageIcon,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'School Building',
    'Classrooms',
    'Students Activities',
    'Islamic Education',
    'Sports',
    'Annual Functions',
    'Educational Events',
    'Computer Lab',
    'Science Lab',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-200/60 px-3.5 py-1 rounded-full mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Campus Visual Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            Photo Gallery & Campus Life
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Glimpses of daily scholastic life, science laboratories, Quranic circles, sports competitions, and annual convocations at Wadala.
          </p>
        </div>

        {/* Category Filter Pills / Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (18 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-64 rounded-2xl overflow-hidden bg-stone-300 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-300/80"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Pill Tag */}
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/20">
                {item.category}
              </div>

              {/* Zoom Indicator Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Text Info */}
              <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                <h3 className="font-serif font-bold text-sm leading-snug group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-emerald-100 line-clamp-1 font-sans">
                  {item.caption}
                </p>
                {item.date && (
                  <span className="text-[10px] text-amber-200/80 block font-mono">
                    {item.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Image Viewer */}
      {currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition z-50 cursor-pointer"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
            }}
            className="absolute left-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition z-50 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-4 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition z-50 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Viewer Card */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />

            {/* Captions Bar */}
            <div className="mt-4 text-center max-w-xl text-white space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  {currentItem.category}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-300 font-mono">
                  {lightboxIndex! + 1} of {filteredItems.length}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                {currentItem.title}
              </h3>
              <p className="text-xs text-slate-300">
                {currentItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
