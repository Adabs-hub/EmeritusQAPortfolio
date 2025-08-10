export interface GalleryPhoto {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  mediumUrl: string;
  highQualityUrl: string;
  originalUrl: string;
  downloadUrl: string;
  category: string;
  createdTime: string;
  description?: string;
  size?: number;
  mimeType?: string;
}

export interface GalleryCategory {
  name: string;
  folderId: string;
  photos: GalleryPhoto[];
  isExpanded?: boolean;
  isLoading?: boolean;
  error?: string;
}

export interface GalleryState {
  categories: GalleryCategory[];
  selectedCategory: string;
  selectedPhoto: GalleryPhoto | null;
  searchTerm: string;
  loading: boolean;
  currentImageQuality: 'thumbnail' | 'medium' | 'high' | 'original';
  isModalOpen: boolean;
  currentPhotoIndex: number;
  isFullscreen: boolean;
  zoomLevel: number;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  modifiedTime: string;
  size: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
}

export interface GoogleDriveResponse {
  files: GoogleDriveFile[];
  nextPageToken?: string;
}

export type ImageQuality = 'thumbnail' | 'medium' | 'high' | 'original';

export interface SearchFilters {
  searchText: string;
  selectedCategories: string[];
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: 'date' | 'name' | 'size';
  sortOrder: 'asc' | 'desc';
  viewMode: 'grid' | 'list';
}

export interface ProgressiveImageProps {
  photo: GalleryPhoto;
  quality: ImageQuality;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  alt?: string;
}