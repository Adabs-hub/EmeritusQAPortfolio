import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  TagIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline';
import { GalleryPhoto } from '../../types/gallery';
import ProgressiveImage from '../common/ProgressiveImage';

interface PhotoListViewProps {
  photos: GalleryPhoto[];
  onPhotoClick: (photo: GalleryPhoto) => void;
}

export const PhotoListView: React.FC<PhotoListViewProps> = ({ photos, onPhotoClick }) => {
  const formatFileSize = (bytes: number): string => {
    if (!bytes) return 'Unknown size';
    
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <MagnifyingGlassPlusIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          No photos found
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Try adjusting your search filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center p-4 gap-4">
            {/* Thumbnail */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => onPhotoClick(photo)}
                className="block w-20 h-20 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
              >
                <ProgressiveImage
                  photo={photo}
                  quality="thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>

            {/* Photo Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <button
                    onClick={() => onPhotoClick(photo)}
                    className="text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
                      {photo.name}
                    </h3>
                  </button>
                  
                  {photo.description && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 text-sm">
                      {photo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <TagIcon className="h-4 w-4" />
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {photo.category}
                      </span>
                    </div>

                    {photo.createdTime && (
                      <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span>{formatDate(photo.createdTime)}</span>
                      </div>
                    )}

                    {photo.size && (
                      <span className="hidden sm:inline">
                        {formatFileSize(photo.size)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPhotoClick(photo)}
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="View full size"
                  >
                    <MagnifyingGlassPlusIcon className="h-5 w-5" />
                  </button>

                  {photo.downloadUrl && (
                    <a
                      href={photo.downloadUrl}
                      download={photo.name}
                      className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      title="Download photo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};