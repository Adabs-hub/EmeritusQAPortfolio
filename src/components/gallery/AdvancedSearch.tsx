import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  CalendarDaysIcon,
  TagIcon,
  ArrowsUpDownIcon,
  Squares2X2Icon,
  ListBulletIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { SearchFilters } from '../../types/gallery';

interface AdvancedSearchProps {
  categories: string[];
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  totalPhotos: number;
  filteredPhotos: number;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  categories,
  filters,
  onFiltersChange,
  totalPhotos,
  filteredPhotos
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = useCallback((updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  }, [filters, onFiltersChange]);

  const clearAllFilters = useCallback(() => {
    onFiltersChange({
      searchText: '',
      selectedCategories: [],
      dateRange: { start: '', end: '' },
      sortBy: 'date',
      sortOrder: 'desc',
      viewMode: 'grid'
    });
  }, [onFiltersChange]);

  const hasActiveFilters = filters.searchText || 
    filters.selectedCategories.length > 0 || 
    filters.dateRange.start || 
    filters.dateRange.end;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
      {/* Main Search Bar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search photos by name or description..."
            value={filters.searchText}
            onChange={(e) => updateFilters({ searchText: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => updateFilters({ viewMode: 'grid' })}
            className={`p-2 rounded-md transition-colors ${
              filters.viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Squares2X2Icon className="h-5 w-5" />
          </button>
          <button
            onClick={() => updateFilters({ viewMode: 'list' })}
            className={`p-2 rounded-md transition-colors ${
              filters.viewMode === 'list'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ListBulletIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
            isExpanded || hasActiveFilters
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
          }`}
        >
          <FunnelIcon className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-medium">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
        <span>
          Showing {filteredPhotos} of {totalPhotos} photos
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="ml-2 text-blue-500 hover:text-blue-600 underline"
            >
              Clear all filters
            </button>
          )}
        </span>
      </div>

      {/* Advanced Filters Panel */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <TagIcon className="h-4 w-4" />
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    const isSelected = filters.selectedCategories.includes(category);
                    const newCategories = isSelected
                      ? filters.selectedCategories.filter(c => c !== category)
                      : [...filters.selectedCategories, category];
                    updateFilters({ selectedCategories: newCategories });
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.selectedCategories.includes(category)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                  {filters.selectedCategories.includes(category) && (
                    <XMarkIcon className="h-3 w-3 ml-1 inline" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <CalendarDaysIcon className="h-4 w-4" />
              Date Range
            </label>
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => updateFilters({ 
                    dateRange: { ...filters.dateRange, start: e.target.value } 
                  })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => updateFilters({ 
                    dateRange: { ...filters.dateRange, end: e.target.value } 
                  })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              {(filters.dateRange.start || filters.dateRange.end) && (
                <button
                  onClick={() => updateFilters({ dateRange: { start: '', end: '' } })}
                  className="text-red-500 hover:text-red-600 text-sm underline"
                >
                  Clear dates
                </button>
              )}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <ArrowsUpDownIcon className="h-4 w-4" />
              Sort By
            </label>
            <div className="flex items-center gap-4">
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as 'date' | 'name' | 'size' })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="date">Date Created</option>
                <option value="name">Photo Name</option>
                <option value="size">File Size</option>
              </select>
              <select
                value={filters.sortOrder}
                onChange={(e) => updateFilters({ sortOrder: e.target.value as 'asc' | 'desc' })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Filters
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const today = new Date();
                  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                  updateFilters({
                    dateRange: {
                      start: lastWeek.toISOString().split('T')[0],
                      end: today.toISOString().split('T')[0]
                    }
                  });
                }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
              >
                Last Week
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                  updateFilters({
                    dateRange: {
                      start: lastMonth.toISOString().split('T')[0],
                      end: today.toISOString().split('T')[0]
                    }
                  });
                }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
              >
                Last Month
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const thisYear = new Date(today.getFullYear(), 0, 1);
                  updateFilters({
                    dateRange: {
                      start: thisYear.toISOString().split('T')[0],
                      end: today.toISOString().split('T')[0]
                    }
                  });
                }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
              >
                This Year
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};