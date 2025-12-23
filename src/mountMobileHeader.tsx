import { createRoot } from 'react-dom/client';
import { MobileHeader } from './components/MobileHeader';

const container = document.getElementById('mobile-header-root');
if (container) {
  createRoot(container).render(<MobileHeader />);
}
