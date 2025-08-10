import { useState, useMemo } from 'react';
import { GalleryPhoto, SearchFilters } from '../types/gallery';

export const useGallerySearch = (photos: GalleryPhoto[]) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchText: '',
    selectedCategories: [],
    dateRange: { start: '', end: '' },
    sortBy: 'date',
    sortOrder: 'desc',
    viewMode: 'grid'
  });
  
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [photosPerPage] = useState(8);

  const filteredAndSortedPhotos = useMemo(() => {
    let filtered = [...photos];

    // Text search
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(photo => 
        photo.name.toLowerCase().includes(searchLower) ||
        (photo.description && photo.description.toLowerCase().includes(searchLower)) ||
        photo.category.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter(photo => 
        filters.selectedCategories.includes(photo.category)
      );
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter(photo => {
        if (!photo.createdTime) return true;
        
        const photoDate = new Date(photo.createdTime);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end + 'T23:59:59') : null;

        if (startDate && photoDate < startDate) return false;
        if (endDate && photoDate > endDate) return false;
        
        return true;
      });
    }

    // Sort photos
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'date':
          const dateA = a.createdTime ? new Date(a.createdTime).getTime() : 0;
          const dateB = b.createdTime ? new Date(b.createdTime).getTime() : 0;
          comparison = dateA - dateB;
          break;
        
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        
        case 'size':
          const sizeA = a.size || 0;
          const sizeB = b.size || 0;
          comparison = sizeA - sizeB;
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [photos, filters]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(photos.map(photo => photo.category))];
    return uniqueCategories.sort();
  }, [photos]);

  const paginatedPhotos = useMemo(() => {
    if (showAllPhotos || filteredAndSortedPhotos.length <= photosPerPage) {
      return filteredAndSortedPhotos;
    }
    return filteredAndSortedPhotos.slice(0, photosPerPage);
  }, [filteredAndSortedPhotos, showAllPhotos, photosPerPage]);

  const searchStats = useMemo(() => ({
    totalPhotos: photos.length,
    filteredPhotos: filteredAndSortedPhotos.length,
    displayedPhotos: paginatedPhotos.length,
    categories: categories.length,
    hasMore: filteredAndSortedPhotos.length > photosPerPage,
    showingAll: showAllPhotos
  }), [photos.length, filteredAndSortedPhotos.length, paginatedPhotos.length, categories.length, showAllPhotos, photosPerPage]);

  const toggleShowAll = () => {
    setShowAllPhotos(!showAllPhotos);
  };

  // Reset pagination when filters change
  const setFiltersWithReset = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setShowAllPhotos(false);
  };

  return {
    filters,
    setFilters: setFiltersWithReset,
    filteredPhotos: paginatedPhotos,
    allFilteredPhotos: filteredAndSortedPhotos,
    categories,
    searchStats,
    toggleShowAll,
    showAllPhotos,
    photosPerPage
  };
};