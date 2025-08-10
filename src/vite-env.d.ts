/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_DRIVE_API_KEY?: string;
  readonly VITE_GALLERY_FOLDERS?: string;
  readonly VITE_GALLERY_DEFAULT_QUALITY?: string;
  readonly VITE_GALLERY_AUTOPLAY?: string;
  readonly VITE_GALLERY_HOVER_PAUSE?: string;
  // readonly VITE_GALLERY_MAIN_FOLDER?: string; // Commented out - using individual folders only
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}