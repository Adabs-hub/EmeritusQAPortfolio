import { Routes, Route, Navigate } from 'react-router-dom';
import GalleryPage from '../pages/gallery/GalleryPage';
import HomePage from '../pages/HomePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;