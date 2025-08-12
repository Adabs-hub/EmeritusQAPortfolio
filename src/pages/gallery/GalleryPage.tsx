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
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

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
        
        <Header />
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Loading Gallery</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait while we fetch your photos...</p>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        
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
        
        <Footer />
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

      <Header />

      {/* Creative Interactive Gallery Hero */}
      <div className="relative pt-20 pb-12 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
        
        {/* Dynamic Photo Mosaic Background */}
        {allPhotos.length > 0 && (
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div className="grid grid-cols-8 md:grid-cols-12 gap-1 h-full w-full">
              {Array.from({ length: 96 }, (_, i) => {
                const photo = allPhotos[i % allPhotos.length];
                return photo ? (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.01 }}
                  />
                ) : (
                  <div key={i} className="bg-gray-200/50 dark:bg-gray-700/30 rounded-sm" />
                );
              })}
            </div>
          </div>
        )}

        {/* Floating Photo Previews */}
        {allPhotos.slice(0, 6).map((photo, index) => (
          <motion.div
            key={photo.id}
            className="absolute hidden lg:block cursor-pointer"
            style={{
              left: `${10 + (index % 3) * 30}%`,
              top: `${20 + Math.floor(index / 3) * 40}%`,
            }}
            initial={{ opacity: 0, y: 50, rotate: Math.random() * 20 - 10 }}
            animate={{ 
              opacity: 0.15, 
              y: 0, 
              rotate: Math.random() * 20 - 10,
              x: Math.sin(Date.now() / 1000 + index) * 10
            }}
            transition={{ 
              duration: 1.5, 
              delay: index * 0.2,
              x: {
                repeat: Infinity,
                duration: 3 + index,
                ease: "easeInOut"
              }
            }}
            whileHover={{ opacity: 0.3, scale: 1.1, rotate: 0 }}
            onClick={() => openModal(photo)}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl shadow-lg overflow-hidden border-2 border-white/50 dark:border-gray-600/50 backdrop-blur-sm">
              <ProgressiveImage
                photo={photo}
                quality="thumbnail"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          </motion.div>
        ))}

        {/* Main Hero Content */}
        <div className="container-max section-padding relative z-20">
          <div className="text-center max-w-5xl mx-auto">
            
            {/* Animated Badge with Story */}
            <motion.div
              className="inline-flex items-center px-6 py-3 mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-full shadow-lg border border-white/50 dark:border-gray-700/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                className="text-2xl mr-3"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                📷
              </motion.span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {allPhotos.length > 0 ? `${allPhotos.length} Memories Captured` : 'My Visual Story'}
              </span>
              {categories.length > 0 && (
                <>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {categories.length} Collections
                  </span>
                </>
              )}
            </motion.div>

            {/* Dynamic Title Based on Content */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-gray-900 dark:text-white">
                Life Through
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-black">
                My Lens
              </span>
            </motion.h1>

            {/* Dynamic Description */}
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {allPhotos.length > 0 ? (
                <>
                  From professional milestones to personal celebrations, explore{' '}
                  <strong>{allPhotos.length} memories</strong> across{' '}
                  <strong>{categories.length} unique collections</strong> that tell the story of my journey
                </>
              ) : (
                "A visual journey through moments that matter - professional achievements, personal milestones, and everything in between"
              )}
            </motion.p>

            {/* Interactive Stats with Hover Effects */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {categories.slice(0, 3).map((category) => (
                <motion.div
                  key={category.name}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 cursor-pointer hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => {
                    setFilters({
                      ...filters,
                      selectedCategories: [category.name]
                    });
                  }}
                >
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {category.photos.length}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 truncate">
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Click to explore →
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.button
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector('[data-gallery-start]');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Start Exploring</span>
                <motion.span
                  className="text-xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🚀
                </motion.span>
              </motion.button>

              {allPhotos.length > 0 && (
                <motion.button
                  className="group text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    if (allPhotos.length > 0) {
                      const randomPhoto = allPhotos[Math.floor(Math.random() * allPhotos.length)];
                      openModal(randomPhoto);
                    }
                  }}
                >
                  <span>Surprise Me</span>
                  <span className="text-lg group-hover:animate-spin">🎲</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">

        {/* Advanced Search and Filter Controls */}
        <motion.div 
          data-gallery-start
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

      <Footer />
    </div>
  );
};

export default GalleryPage;