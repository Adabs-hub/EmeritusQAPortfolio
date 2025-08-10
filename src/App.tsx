import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { usePortfolioStore } from './stores/portfolioStore';
import AppRoutes from './routers';

function App() {
  const { loadPortfolioData } = usePortfolioStore();

  useEffect(() => {
    loadPortfolioData();
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [loadPortfolioData]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;