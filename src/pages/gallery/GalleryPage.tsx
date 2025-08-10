import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { 
  PhotoIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryCategory, GalleryPhoto } from '../../types/gallery';
import { googleDriveService } from '../../services/googleDriveService';
import ProgressiveImage from '../../components/common/ProgressiveImage';
import ImageModal from '../../components/common/ImageModal';
import { AdvancedSearch } from '../../components/gallery/AdvancedSearch';
import { PhotoListView } from '../../components/gallery/PhotoListView';
import { useGallerySearch } from '../../hooks/useGallerySearch';

const GalleryPage: React.FC = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGalleryData();
  }, []);

  const loadGalleryData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const galleryCategories = await googleDriveService.getAllCategories();
      setCategories(galleryCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const allPhotos = useMemo(() => {
    return categories.flatMap(category => category.photos);
  }, [categories]);

  const { 
    filters, 
    setFilters, 
    filteredPhotos, 
    allFilteredPhotos,
    categories: availableCategories, 
    searchStats,
    toggleShowAll,
    showAllPhotos
  } = useGallerySearch(allPhotos);

  const openModal = (photo: GalleryPhoto) => {
    const photoIndex = allFilteredPhotos.findIndex(p => p.id === photo.id);
    setCurrentPhotoIndex(photoIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateToPhoto = (direction: 'next' | 'previous') => {
    const newIndex = direction === 'next' 
      ? (currentPhotoIndex + 1) % allFilteredPhotos.length
      : (currentPhotoIndex - 1 + allFilteredPhotos.length) % allFilteredPhotos.length;
    
    setCurrentPhotoIndex(newIndex);
  };

  const toggleCategoryExpansion = (categoryName: string) => {
    setCategories(prev => 
      prev.map(category => 
        category.name === categoryName
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    );
  };

  const refreshCategory = async (category: GalleryCategory) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.name === category.name
          ? { ...cat, isLoading: true, error: undefined }
          : cat
      )
    );

    try {
      const refreshedPhotos = await googleDriveService.refreshCategory(category.name, category.folderId);
      setCategories(prev => 
        prev.map(cat => 
          cat.name === category.name
            ? { ...cat, photos: refreshedPhotos, isLoading: false }
            : cat
        )
      );
    } catch (err) {
      setCategories(prev => 
        prev.map(cat => 
          cat.name === category.name
            ? { 
                ...cat, 
                isLoading: false, 
                error: err instanceof Error ? err.message : 'Refresh failed' 
              }
            : cat
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Helmet>
          <title>Gallery - Adabogo Emmanuel</title>
          <meta name="description" content="Photo gallery showcasing QA projects and team events" />
        </Helmet>
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Loading Gallery</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait while we fetch your photos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Gallery Error</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={loadGalleryData}
              className="button-primary inline-flex items-center"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>Gallery - Personal Moments | Adabogo Emmanuel</title>
        <meta name="description" content="Personal gallery showcasing life events, celebrations, family moments, and memorable experiences" />
        <meta name="keywords" content="Personal Gallery, Life Events, Celebrations, Family Moments, Memories" />
      </Helmet>

      <div className="container-max section-padding">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My <span className="text-gradient">Gallery</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A visual journey through life's special moments, celebrations, family events, and cherished memories
          </motion.p>
        </div>

        {/* Advanced Search and Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AdvancedSearch
            categories={availableCategories}
            filters={filters}
            onFiltersChange={setFilters}
            totalPhotos={searchStats.totalPhotos}
            filteredPhotos={searchStats.filteredPhotos}
          />
          
          {/* Refresh Button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={loadGalleryData}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span>Refresh Gallery</span>
            </button>
          </div>
        </motion.div>

        {/* Gallery Content */}
        {filteredPhotos.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {filters.viewMode === 'list' ? (
                <PhotoListView 
                  photos={filteredPhotos} 
                  onPhotoClick={openModal} 
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {filteredPhotos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.05,
                          layout: { duration: 0.3 }
                        }}
                        className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="aspect-w-4 aspect-h-3">
                          <ProgressiveImage
                            photo={photo}
                            quality="medium"
                            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                            onClick={() => openModal(photo)}
                            enableZoom
                          />
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-semibold truncate">{photo.name}</h3>
                          <p className="text-sm text-gray-200 truncate">{photo.category}</p>
                          <p className="text-xs text-gray-300 mt-1">
                            {photo.createdTime && new Date(photo.createdTime).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="absolute top-2 left-2">
                          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                            {photo.category}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* View More Button */}
            {searchStats.hasMore && (
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex flex-col items-center space-y-3">
                    <p className="text-gray-600 dark:text-gray-400">
                      Showing {searchStats.displayedPhotos} of {searchStats.filteredPhotos} photos
                    </p>
                    
                    <button
                      onClick={toggleShowAll}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      {showAllPhotos ? (
                        <>
                          <ChevronUpIcon className="h-5 w-5 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDownIcon className="h-5 w-5 mr-2" />
                          View More ({searchStats.filteredPhotos - searchStats.displayedPhotos} more)
                        </>
                      )}
                    </button>

                    {!showAllPhotos && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Click to see all {searchStats.filteredPhotos} photos
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Memories Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {filters.searchText || filters.selectedCategories.length > 0 || filters.dateRange.start || filters.dateRange.end
                ? 'Try adjusting your search or filter criteria.'
                : 'No memories have been shared yet.'
              }
            </p>
            {(filters.searchText || filters.selectedCategories.length > 0 || filters.dateRange.start || filters.dateRange.end) && (
              <button
                onClick={() => setFilters({
                  searchText: '',
                  selectedCategories: [],
                  dateRange: { start: '', end: '' },
                  sortBy: 'date',
                  sortOrder: 'desc',
                  viewMode: 'grid'
                })}
                className="button-secondary"
              >
                Clear All Filters
              </button>
            )}
          </motion.div>
        )}

        {/* Category Sections (Alternative View) */}
        {filters.selectedCategories.length === 0 && !filters.searchText && !filters.dateRange.start && !filters.dateRange.end && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Browse by Event</h2>
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                className="mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <button
                  onClick={() => toggleCategoryExpansion(category.name)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                      {category.photos.length} memories
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {category.isLoading && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        refreshCategory(category);
                      }}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      title="Refresh category"
                    >
                      <ArrowPathIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    {category.isExpanded ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {category.isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.error ? (
                        <div className="p-6 text-center text-red-600 dark:text-red-400">
                          <p>Error: {category.error}</p>
                          <button
                            onClick={() => refreshCategory(category)}
                            className="mt-2 text-sm underline hover:no-underline"
                          >
                            Try again
                          </button>
                        </div>
                      ) : (
                        <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {category.photos.map((photo) => (
                            <div
                              key={photo.id}
                              className="aspect-w-1 aspect-h-1 group cursor-pointer"
                              onClick={() => openModal(photo)}
                            >
                              <ProgressiveImage
                                photo={photo}
                                quality="thumbnail"
                                className="w-full h-24 rounded-lg group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        photos={allFilteredPhotos}
        currentIndex={currentPhotoIndex}
        onPrevious={() => navigateToPhoto('previous')}
        onNext={() => navigateToPhoto('next')}
      />
    </div>
  );
};

export default GalleryPage;