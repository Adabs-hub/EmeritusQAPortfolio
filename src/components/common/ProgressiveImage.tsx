import { useState, useEffect, useRef } from 'react';
import { GalleryPhoto, ImageQuality } from '../../types/gallery';
import { googleDriveService } from '../../services/googleDriveService';

interface ProgressiveImageProps {
  photo: GalleryPhoto;
  quality: ImageQuality;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  alt?: string;
  enableZoom?: boolean;
  onClick?: () => void;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  photo,
  quality,
  onLoad,
  onError,
  className = '',
  alt,
  enableZoom = false,
  onClick
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(photo.thumbnailUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadedQualities, setLoadedQualities] = useState<Set<ImageQuality>>(new Set(['thumbnail']));
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const targetUrl = googleDriveService.getImageUrl(photo, quality);
    
    if (loadedQualities.has(quality) || currentSrc === targetUrl) {
      return;
    }

    const img = new Image();
    img.onload = () => {
      setCurrentSrc(targetUrl);
      setLoadedQualities(prev => new Set([...prev, quality]));
      setIsLoading(false);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      onError?.();
    };

    img.src = targetUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [photo, quality, currentSrc, loadedQualities, onLoad, onError]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-2xl mb-2">📷</div>
          <p className="text-sm">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt || photo.name}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoading ? 'opacity-70 blur-sm' : 'opacity-100'
        } ${enableZoom ? 'cursor-pointer hover:scale-105' : ''} ${
          onClick ? 'cursor-pointer' : ''
        }`}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}

      {/* Quality indicator */}
      {!isLoading && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            quality === 'original' ? 'bg-green-500 text-white' :
            quality === 'high' ? 'bg-blue-500 text-white' :
            quality === 'medium' ? 'bg-yellow-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            {quality.toUpperCase()}
          </div>
        </div>
      )}

      {/* Hover overlay */}
      {onClick && (
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="text-white text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded">
            Click to view
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;