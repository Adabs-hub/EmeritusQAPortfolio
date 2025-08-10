import { useState, useEffect, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowsPointingOutIcon,
  ArrowDownTrayIcon,
  PlayIcon,
  PauseIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { GalleryPhoto, ImageQuality } from '../../types/gallery';
import ProgressiveImage from './ProgressiveImage';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryPhoto[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onPrevious,
  onNext
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentQuality, setCurrentQuality] = useState<ImageQuality>('medium');
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isFlippedH, setIsFlippedH] = useState(false);
  const [isFlippedV, setIsFlippedV] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null);

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setDragPosition({ x: 0, y: 0 });
      setCurrentQuality('medium');
      setRotation(0);
      setIsFlippedH(false);
      setIsFlippedV(false);
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    if (isSlideshow && photos.length > 1) {
      const interval = setInterval(() => {
        onNext();
      }, 3000);
      setSlideshowInterval(interval);
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
        setSlideshowInterval(null);
      }
    }
  }, [isSlideshow, photos.length, onNext]);

  useEffect(() => {
    return () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    };
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onPrevious();
        break;
      case 'ArrowRight':
        onNext();
        break;
      case '+':
      case '=':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case ' ':
        event.preventDefault();
        toggleSlideshow();
        break;
      case 'i':
      case 'I':
        setShowMetadata(!showMetadata);
        break;
      case 'r':
      case 'R':
        handleRotate();
        break;
      case 'h':
      case 'H':
        handleFlipHorizontal();
        break;
      case 'v':
      case 'V':
        handleFlipVertical();
        break;
    }
  }, [isOpen, onClose, onPrevious, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleZoomIn = () => {
    const newZoomLevel = Math.min(zoomLevel * 1.5, 5);
    setZoomLevel(newZoomLevel);
    if (newZoomLevel > 2 && currentQuality !== 'original') {
      setCurrentQuality('original');
    }
  };

  const handleZoomOut = () => {
    const newZoomLevel = Math.max(zoomLevel / 1.5, 0.5);
    setZoomLevel(newZoomLevel);
    if (newZoomLevel <= 1) {
      setDragPosition({ x: 0, y: 0 });
      setCurrentQuality('medium');
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
    setCurrentQuality('medium');
  };

  const toggleSlideshow = () => {
    setIsSlideshow(!isSlideshow);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFlipHorizontal = () => {
    setIsFlippedH(!isFlippedH);
  };

  const handleFlipVertical = () => {
    setIsFlippedV(!isFlippedV);
  };

  const handleShare = async () => {
    if (navigator.share && currentPhoto) {
      try {
        await navigator.share({
          title: currentPhoto.name,
          text: `Check out this photo: ${currentPhoto.name}`,
          url: currentPhoto.url
        });
      } catch (err) {
        console.log('Share failed:', err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (currentPhoto) {
      navigator.clipboard.writeText(currentPhoto.url).then(() => {
        // You could add a toast notification here
        console.log('Image URL copied to clipboard');
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return 'Unknown size';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getImageTransform = () => {
    let transform = `translate(${dragPosition.x}px, ${dragPosition.y}px) scale(${zoomLevel})`;
    
    if (rotation !== 0) {
      transform += ` rotate(${rotation}deg)`;
    }
    
    if (isFlippedH || isFlippedV) {
      const scaleX = isFlippedH ? -1 : 1;
      const scaleY = isFlippedV ? -1 : 1;
      transform += ` scale(${scaleX}, ${scaleY})`;
    }
    
    return transform;
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const handleDownload = () => {
    if (currentPhoto) {
      const link = document.createElement('a');
      link.href = currentPhoto.downloadUrl;
      link.download = currentPhoto.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: event.clientX - dragPosition.x,
        y: event.clientY - dragPosition.y
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setDragPosition({
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = () => {
    if (zoomLevel === 1) {
      handleZoomIn();
    } else {
      resetZoom();
    }
  };

  if (!currentPhoto) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full h-full max-w-7xl max-h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-black bg-opacity-50 text-white">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold truncate">{currentPhoto.name}</h2>
                    <p className="text-sm text-gray-300">
                      {currentIndex + 1} of {photos.length} • {currentPhoto.category}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {/* Zoom Controls */}
                    <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 0.5}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors disabled:opacity-50"
                        title="Zoom Out (-)"
                      >
                        <MagnifyingGlassMinusIcon className="h-4 w-4" />
                      </button>
                      
                      <span className="text-xs min-w-[3rem] text-center font-mono">
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 5}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors disabled:opacity-50"
                        title="Zoom In (+)"
                      >
                        <MagnifyingGlassPlusIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Transform Controls */}
                    <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
                      <button
                        onClick={handleRotate}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                        title="Rotate 90° (R)"
                      >
                        <ArrowPathIcon className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={handleFlipHorizontal}
                        className={`p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors ${isFlippedH ? 'bg-white bg-opacity-20' : ''}`}
                        title="Flip Horizontal (H)"
                      >
                        <ArrowUturnLeftIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Slideshow Control */}
                    {photos.length > 1 && (
                      <div className="flex items-center border-r border-gray-600 pr-2">
                        <button
                          onClick={toggleSlideshow}
                          className={`p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors ${isSlideshow ? 'bg-white bg-opacity-20' : ''}`}
                          title={isSlideshow ? 'Stop Slideshow (Space)' : 'Start Slideshow (Space)'}
                        >
                          {isSlideshow ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                        </button>
                      </div>
                    )}

                    {/* Info & Actions */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setShowMetadata(!showMetadata)}
                        className={`p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors ${showMetadata ? 'bg-white bg-opacity-20' : ''}`}
                        title="Toggle Info (I)"
                      >
                        <InformationCircleIcon className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={handleShare}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                        title="Share Photo"
                      >
                        <ShareIcon className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                        title="Toggle Fullscreen (F)"
                      >
                        <ArrowsPointingOutIcon className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                        title="Download"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                        title="Close (ESC)"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Container */}
                <div 
                  className="flex-1 relative flex items-center justify-center overflow-hidden cursor-pointer"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div
                    className="relative max-w-full max-h-full"
                    style={{
                      transform: getImageTransform(),
                      transformOrigin: 'center center',
                      transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                    }}
                  >
                    <ProgressiveImage
                      photo={currentPhoto}
                      quality={currentQuality}
                      className="max-w-full max-h-[70vh] object-contain"
                      onClick={handleImageClick}
                    />
                  </div>

                  {/* Navigation Buttons */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={onPrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200"
                        title="Previous Image"
                      >
                        <ArrowLeftIcon className="h-6 w-6" />
                      </button>
                      
                      <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200"
                        title="Next Image"
                      >
                        <ArrowRightIcon className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {photos.length > 1 && (
                  <div className="p-2 bg-black bg-opacity-70 overflow-x-auto">
                    <div className="flex space-x-2 justify-center">
                      {photos.map((photo, index) => (
                        <button
                          key={photo.id}
                          onClick={() => {
                            const steps = index - currentIndex;
                            if (steps > 0) {
                              for (let i = 0; i < steps; i++) onNext();
                            } else if (steps < 0) {
                              for (let i = 0; i < Math.abs(steps); i++) onPrevious();
                            }
                          }}
                          className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                            index === currentIndex 
                              ? 'ring-2 ring-white ring-opacity-80 scale-110' 
                              : 'ring-1 ring-gray-500 ring-opacity-50 hover:ring-opacity-100'
                          }`}
                        >
                          <img
                            src={photo.thumbnailUrl}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="p-4 bg-black bg-opacity-50 text-white">
                  {showMetadata ? (
                    <div className="space-y-3">
                      {currentPhoto.description && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-200 mb-1">Description</h4>
                          <p className="text-sm text-gray-300">{currentPhoto.description}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="font-semibold text-gray-200">Quality:</span>
                          <p className="text-gray-300 capitalize">{currentQuality}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-200">Created:</span>
                          <p className="text-gray-300">{new Date(currentPhoto.createdTime).toLocaleDateString()}</p>
                        </div>
                        {currentPhoto.size && (
                          <div>
                            <span className="font-semibold text-gray-200">Size:</span>
                            <p className="text-gray-300">{formatFileSize(currentPhoto.size)}</p>
                          </div>
                        )}
                        <div>
                          <span className="font-semibold text-gray-200">Category:</span>
                          <p className="text-gray-300">{currentPhoto.category}</p>
                        </div>
                      </div>

                      {(rotation !== 0 || isFlippedH || isFlippedV) && (
                        <div>
                          <span className="font-semibold text-gray-200 text-xs">Transforms:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {rotation !== 0 && (
                              <span className="text-xs bg-blue-600 bg-opacity-30 px-2 py-1 rounded">
                                Rotated {rotation}°
                              </span>
                            )}
                            {isFlippedH && (
                              <span className="text-xs bg-green-600 bg-opacity-30 px-2 py-1 rounded">
                                Flipped H
                              </span>
                            )}
                            {isFlippedV && (
                              <span className="text-xs bg-purple-600 bg-opacity-30 px-2 py-1 rounded">
                                Flipped V
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-300">
                        {currentPhoto.description && (
                          <p className="truncate max-w-md">{currentPhoto.description}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          Quality: {currentQuality} • Created: {new Date(currentPhoto.createdTime).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="text-xs text-gray-400 text-right">
                        <p>Click to zoom • Arrow keys to navigate</p>
                        <p>F: fullscreen • Space: slideshow • I: info • R: rotate</p>
                      </div>
                    </div>
                  )}

                  {isSlideshow && (
                    <div className="mt-3 flex items-center justify-center">
                      <div className="bg-blue-600 bg-opacity-30 px-3 py-1 rounded-full text-xs">
                        <PlayIcon className="h-3 w-3 inline mr-1" />
                        Slideshow active • Press Space to stop
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageModal;