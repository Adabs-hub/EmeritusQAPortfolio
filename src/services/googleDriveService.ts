import { GalleryPhoto, GalleryCategory, GoogleDriveResponse, GoogleDriveFile } from '../types/gallery';

class GoogleDriveService {
  private apiKey: string;
  private baseUrl = 'https://www.googleapis.com/drive/v3';

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY || '';
  }

  // MAIN FOLDER CONFIG COMMENTED OUT - Using only individual folder configuration
  /*
  private parseMainFolderConfig(): string {
    // Single main folder that contains subfolders for each category
    return import.meta.env.VITE_GALLERY_MAIN_FOLDER || '';
  }
  */

  private parseFolderConfig(): Array<{ name: string; folderId: string }> {
    const config = import.meta.env.VITE_GALLERY_FOLDERS || '';
    
    return config.split(',').map((item: string) => {
      const [name, folderId] = item.split(':');
      return { name: name?.trim() || '', folderId: folderId?.trim() || '' };
    }).filter((item: { name: string; folderId: string }) => item.name && item.folderId);
  }

  private extractFolderIdFromUrl(input: string): string {
    if (input.includes('drive.google.com')) {
      const match = input.match(/folders\/([a-zA-Z0-9-_]+)/);
      return match ? match[1] : input;
    }
    return input;
  }

  private generateImageUrls(file: GoogleDriveFile): {
    thumbnailUrl: string;
    mediumUrl: string;
    highQualityUrl: string;
    originalUrl: string;
  } {
    const baseUrl = `https://drive.google.com/uc?id=${file.id}`;
    
    return {
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w300-h300`,
      mediumUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w800-h600`,
      highQualityUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1920-h1080`,
      originalUrl: baseUrl
    };
  }

  // SUBFOLDER FETCHING COMMENTED OUT - Using only individual folder configuration
  /*
  private async fetchSubfoldersFromFolder(parentFolderId: string): Promise<Array<{ id: string; name: string }>> {
    if (!this.apiKey) {
      console.error('Google Drive API key not provided');
      return [];
    }

    try {
      const query = `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder'`;
      const url = `${this.baseUrl}/files?q=${encodeURIComponent(query)}&fields=files(id,name)&key=${this.apiKey}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.status} ${response.statusText}`);
      }

      const data: GoogleDriveResponse = await response.json();
      return data.files.map(file => ({ id: file.id, name: file.name }));
    } catch (error) {
      console.error('Error fetching subfolders from Google Drive:', error);
      return [];
    }
  }
  */

  private async fetchFilesFromFolder(folderId: string): Promise<GoogleDriveFile[]> {
    if (!this.apiKey) {
      console.error('Google Drive API key not provided');
      return [];
    }

    try {
      const query = `'${folderId}' in parents and mimeType contains 'image/'`;
      const url = `${this.baseUrl}/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,createdTime,modifiedTime,size,thumbnailLink,webContentLink,webViewLink)&key=${this.apiKey}&orderBy=createdTime desc`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.status} ${response.statusText}`);
      }

      const data: GoogleDriveResponse = await response.json();
      return data.files;
    } catch (error) {
      console.error('Error fetching from Google Drive:', error);
      return [];
    }
  }

  // MOCK DATA COMMENTED OUT - Using only Google Drive API
  /*
  private getMockPhotos(folderId: string): GoogleDriveFile[] {
    const eventPhotos = {
      'birthday-2024': [
        'Birthday Cake Moment.jpg',
        'Friends Celebration.jpg',
        'Birthday Wishes.jpg',
        'Party Decorations.jpg'
      ],
      'family-vacation': [
        'Beach Sunset.jpg',
        'Family Group Photo.jpg',
        'Adventure Hiking.jpg',
        'Local Cuisine Experience.jpg'
      ],
      'graduation-ceremony': [
        'Graduation Cap Toss.jpg',
        'Diploma Presentation.jpg',
        'Family Pride Moment.jpg',
        'Achievement Celebration.jpg'
      ],
      'team-outing': [
        'Team Building Activity.jpg',
        'Group Lunch.jpg',
        'Fun Games Session.jpg',
        'Team Bonding Moment.jpg'
      ],
      'holiday-moments': [
        'Christmas Tree Decoration.jpg',
        'New Year Celebration.jpg',
        'Easter Family Gathering.jpg',
        'Holiday Traditions.jpg'
      ]
    };

    const categoryPhotos = eventPhotos[folderId as keyof typeof eventPhotos] || [
      'Special Moment 1.jpg',
      'Special Moment 2.jpg',
      'Special Moment 3.jpg'
    ];

    return categoryPhotos.map((photoName, index) => ({
      id: `mock-${folderId}-${index + 1}`,
      name: photoName,
      mimeType: 'image/jpeg',
      createdTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      modifiedTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      size: (Math.floor(Math.random() * 3) + 2) * 1024 * 1024 + ''
    }));
  }
  */

  private convertToGalleryPhoto(file: GoogleDriveFile, categoryName: string): GalleryPhoto {
    const urls = this.generateImageUrls(file);
    
    return {
      id: file.id,
      name: file.name,
      url: urls.mediumUrl,
      ...urls,
      downloadUrl: file.webContentLink || urls.originalUrl,
      category: categoryName,
      createdTime: file.createdTime,
      description: `${file.name} - ${categoryName}`,
      size: parseInt(file.size || '0'),
      mimeType: file.mimeType
    };
  }

  public async getAllCategories(): Promise<GalleryCategory[]> {
    const folderConfig = this.parseFolderConfig();
    
    // Use individual folder configuration
    if (folderConfig.length > 0) {
      const categories = await this.getCategoriesFromFolderConfig(folderConfig);
      // If API calls fail or return empty, show demo data
      if (categories.length === 0 || categories.every(cat => cat.photos.length === 0)) {
        console.warn('Google Drive folders are empty or inaccessible. Showing demo data.');
        return this.getDemoCategories();
      }
      return categories;
    }
    
    // If no configuration provided, show demo data
    console.warn('No gallery folders configured. Showing demo data. Please set VITE_GALLERY_FOLDERS in your .env file');
    return this.getDemoCategories();
  }

  // MAIN FOLDER METHOD COMMENTED OUT - Using only individual folder configuration
  /*
  private async getCategoriesFromMainFolder(mainFolderId: string): Promise<GalleryCategory[]> {
    const actualMainFolderId = this.extractFolderIdFromUrl(mainFolderId);
    
    try {
      const subfolders = await this.fetchSubfoldersFromFolder(actualMainFolderId);
      
      const categories: GalleryCategory[] = await Promise.all(
        subfolders.map(async (subfolder) => {
          try {
            const files = await this.fetchFilesFromFolder(subfolder.id);
            const photos = files.map(file => this.convertToGalleryPhoto(file, subfolder.name));
            
            return {
              name: subfolder.name,
              folderId: subfolder.id,
              photos,
              isExpanded: true,
              isLoading: false
            };
          } catch (error) {
            console.error(`Error loading subfolder ${subfolder.name}:`, error);
            return {
              name: subfolder.name,
              folderId: subfolder.id,
              photos: [],
              isExpanded: false,
              isLoading: false,
              error: `Failed to load photos: ${error instanceof Error ? error.message : 'Unknown error'}`
            };
          }
        })
      );

      return categories;
    } catch (error) {
      console.error('Error loading main folder subfolders:', error);
      return [];
    }
  }
  */

  private async getCategoriesFromFolderConfig(folderConfig: Array<{ name: string; folderId: string }>): Promise<GalleryCategory[]> {
    const categories: GalleryCategory[] = await Promise.all(
      folderConfig.map(async ({ name, folderId }) => {
        const actualFolderId = this.extractFolderIdFromUrl(folderId);
        
        try {
          const files = await this.fetchFilesFromFolder(actualFolderId);
          const photos = files.map(file => this.convertToGalleryPhoto(file, name));
          
          return {
            name,
            folderId: actualFolderId,
            photos,
            isExpanded: true,
            isLoading: false
          };
        } catch (error) {
          console.error(`Error loading category ${name}:`, error);
          return {
            name,
            folderId: actualFolderId,
            photos: [],
            isExpanded: false,
            isLoading: false,
            error: `Failed to load photos: ${error instanceof Error ? error.message : 'Unknown error'}`
          };
        }
      })
    );

    return categories;
  }

  private getDemoCategories(): GalleryCategory[] {
    return [
      {
        name: 'Holiday Moments',
        folderId: 'demo-holiday',
        photos: [
          {
            id: 'demo-holiday-1',
            name: 'Christmas Tree Decoration.jpg',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Holiday Moments',
            createdTime: '2024-12-23T15:00:00Z',
            description: 'Decorating the Christmas tree with family - creating festive memories together',
            size: 2048000,
            mimeType: 'image/jpeg'
          },
          {
            id: 'demo-holiday-2',
            name: 'New Year Celebration.jpg',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Holiday Moments',
            createdTime: '2024-01-01T00:00:00Z',
            description: 'Welcoming the new year with friends and family',
            size: 1856000,
            mimeType: 'image/jpeg'
          }
        ],
        isExpanded: true,
        isLoading: false
      },
      {
        name: 'Family Vacation',
        folderId: 'demo-vacation',
        photos: [
          {
            id: 'demo-vacation-1',
            name: 'Beach Sunset.jpg',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Family Vacation',
            createdTime: '2024-08-20T18:45:00Z',
            description: 'Beautiful sunset at the beach during our family vacation - a moment of peace and beauty',
            size: 3024000,
            mimeType: 'image/jpeg'
          },
          {
            id: 'demo-vacation-2',
            name: 'Family Group Photo.jpg',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Family Vacation',
            createdTime: '2024-08-21T10:15:00Z',
            description: 'Our complete family together during the vacation - precious memories captured forever',
            size: 2756000,
            mimeType: 'image/jpeg'
          }
        ],
        isExpanded: true,
        isLoading: false
      },
      {
        name: 'Birthday Celebration 2024',
        folderId: 'demo-birthday',
        photos: [
          {
            id: 'demo-birthday-1',
            name: 'Birthday Cake Moment.jpg',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Birthday Celebration 2024',
            createdTime: '2024-06-15T18:00:00Z',
            description: 'The special moment of cutting my birthday cake surrounded by friends and family',
            size: 2248000,
            mimeType: 'image/jpeg'
          }
        ],
        isExpanded: true,
        isLoading: false
      }
    ];
  }

  // DEFAULT CATEGORIES COMMENTED OUT - Using only Google Drive API
  /*
  private getDefaultCategories(): GalleryCategory[] {
    return [
      {
        name: 'Birthday Celebration 2024',
        folderId: 'birthday-2024',
        photos: [
          {
            id: 'birthday-1',
            name: 'Birthday Cake Moment',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Birthday Celebration 2024',
            createdTime: '2024-06-15T18:00:00Z',
            description: 'The special moment of cutting my birthday cake surrounded by friends and family'
          },
          {
            id: 'birthday-2',
            name: 'Friends Celebration',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Birthday Celebration 2024',
            createdTime: '2024-06-15T19:30:00Z',
            description: 'Celebrating another year of life with my closest friends and their warm wishes'
          }
        ],
        isExpanded: true,
        isLoading: false
      },
      {
        name: 'Family Vacation',
        folderId: 'family-vacation',
        photos: [
          {
            id: 'vacation-1',
            name: 'Beach Sunset',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Family Vacation',
            createdTime: '2024-08-20T18:45:00Z',
            description: 'Beautiful sunset at the beach during our family vacation - a moment of peace and beauty'
          },
          {
            id: 'vacation-2',
            name: 'Family Group Photo',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Family Vacation',
            createdTime: '2024-08-21T10:15:00Z',
            description: 'Our complete family together during the vacation - precious memories captured forever'
          }
        ],
        isExpanded: true,
        isLoading: false
      },
      {
        name: 'Graduation Ceremony',
        folderId: 'graduation-ceremony',
        photos: [
          {
            id: 'grad-1',
            name: 'Graduation Cap Toss',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Graduation Ceremony',
            createdTime: '2024-05-18T16:00:00Z',
            description: 'The traditional cap toss moment - celebrating the achievement of completing my studies'
          }
        ],
        isExpanded: true,
        isLoading: false
      },
      {
        name: 'Team Outing',
        folderId: 'team-outing',
        photos: [
          {
            id: 'team-1',
            name: 'Team Building Activity',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Team Outing',
            createdTime: '2024-07-12T14:30:00Z',
            description: 'Fun team building activities with colleagues - strengthening workplace bonds'
          }
        ],
        isExpanded: true,
        isLoading: false
      },
      {
        name: 'Holiday Moments',
        folderId: 'holiday-moments',
        photos: [
          {
            id: 'holiday-1',
            name: 'Christmas Tree Decoration',
            url: '/images/emma.jpeg',
            thumbnailUrl: '/images/emma.jpeg',
            mediumUrl: '/images/emma.jpeg',
            highQualityUrl: '/images/emma.jpeg',
            originalUrl: '/images/emma.jpeg',
            downloadUrl: '/images/emma.jpeg',
            category: 'Holiday Moments',
            createdTime: '2023-12-23T15:00:00Z',
            description: 'Decorating the Christmas tree with family - creating festive memories together'
          }
        ],
        isExpanded: true,
        isLoading: false
      }
    ];
  }
  */

  public async refreshCategory(categoryName: string, folderId: string): Promise<GalleryPhoto[]> {
    const files = await this.fetchFilesFromFolder(folderId);
    return files.map(file => this.convertToGalleryPhoto(file, categoryName));
  }

  public getImageUrl(photo: GalleryPhoto, quality: 'thumbnail' | 'medium' | 'high' | 'original'): string {
    switch (quality) {
      case 'thumbnail':
        return photo.thumbnailUrl;
      case 'medium':
        return photo.mediumUrl;
      case 'high':
        return photo.highQualityUrl;
      case 'original':
        return photo.originalUrl;
      default:
        return photo.mediumUrl;
    }
  }
}

export const googleDriveService = new GoogleDriveService();