import { useEffect, useRef } from 'react';
// @ts-ignore - Glide types not perfectly compatible
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { GalleryPhoto } from '../../types/gallery';
import ProgressiveImage from '../common/ProgressiveImage';

interface GallerySliderProps {
  photos: GalleryPhoto[];
  onPhotoClick?: (photo: GalleryPhoto, index: number) => void;
  autoplay?: boolean;
  hoverpause?: boolean;
  perView?: number;
  gap?: number;
  breakpoints?: {
    [key: number]: {
      perView?: number;
      gap?: number;
    };
  };
  className?: string;
}

const GallerySlider: React.FC<GallerySliderProps> = ({
  photos,
  onPhotoClick,
  autoplay = true,
  hoverpause = true,
  perView = 3,
  gap = 20,
  breakpoints = {
    1024: { perView: 3 },
    768: { perView: 2 },
    480: { perView: 1 }
  },
  className = ''
}) => {
  const glideRef = useRef<HTMLDivElement>(null);
  const glideInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!glideRef.current || photos.length === 0) return;

    const glideConfig = {
      type: 'carousel',
      perView,
      gap,
      autoplay: autoplay ? 3000 : false,
      hoverpause,
      animationDuration: 800,
      animationTimingFunc: 'ease-out',
      breakpoints
    };

    glideInstanceRef.current = new Glide(glideRef.current, glideConfig);
    glideInstanceRef.current.mount();

    return () => {
      if (glideInstanceRef.current) {
        glideInstanceRef.current.destroy();
      }
    };
  }, [photos, autoplay, hoverpause, perView, gap, breakpoints]);

  const handlePhotoClick = (photo: GalleryPhoto, index: number) => {
    if (onPhotoClick) {
      onPhotoClick(photo, index);
    }
  };

  if (photos.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-4">📷</div>
          <p>No photos to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`gallery-slider ${className}`}>
      <div ref={glideRef} className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {photos.map((photo, index) => (
              <li key={photo.id} className="glide__slide">
                <div 
                  className="relative group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => handlePhotoClick(photo, index)}
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <ProgressiveImage
                      photo={photo}
                      quality="medium"
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm mb-1 truncate">
                      {photo.name}
                    </h3>
                    <p className="text-xs text-gray-200 truncate">
                      {photo.category}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      {new Date(photo.createdTime).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                      {photo.category}
                    </span>
                  </div>

                  {/* Click Indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Arrows */}
        {photos.length > perView && (
          <div className="glide__arrows" data-glide-el="controls">
            <button 
              className="glide__arrow glide__arrow--left" 
              data-glide-dir="<"
              aria-label="Previous photos"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="glide__arrow glide__arrow--right" 
              data-glide-dir=">"
              aria-label="Next photos"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Bullet Indicators */}
        {photos.length > perView && (
          <div className="glide__bullets" data-glide-el="controls[nav]">
            {Array.from({ length: Math.ceil(photos.length / perView) }).map((_, index) => (
              <button
                key={index}
                className="glide__bullet"
                data-glide-dir={`=${index * perView}`}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .gallery-slider .glide__arrow {
          @apply absolute top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300 flex items-center justify-center border-0;
        }
        
        .gallery-slider .glide__arrow--left {
          @apply -left-6;
        }
        
        .gallery-slider .glide__arrow--right {
          @apply -right-6;
        }
        
        .gallery-slider .glide__arrow:hover {
          @apply scale-110;
        }
        
        .gallery-slider .glide__bullets {
          @apply flex justify-center mt-6 space-x-2;
        }
        
        .gallery-slider .glide__bullet {
          @apply w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full border-0 transition-all duration-300 hover:bg-primary-500;
        }
        
        .gallery-slider .glide__bullet--active {
          @apply bg-primary-600 scale-125;
        }
        
        @media (max-width: 768px) {
          .gallery-slider .glide__arrow {
            @apply w-10 h-10;
          }
          
          .gallery-slider .glide__arrow--left {
            @apply -left-5;
          }
          
          .gallery-slider .glide__arrow--right {
            @apply -right-5;
          }
        }
      `}</style>
    </div>
  );
};

export default GallerySlider;