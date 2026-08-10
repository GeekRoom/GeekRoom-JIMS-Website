import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Events from '../pages/Events/Events';
import Team from '../pages/Team/Team';
import Gallery from '../pages/Gallery/Gallery';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* The converted code.html component */}
      <Route path="/about" element={<About />} />
      
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="team" element={<Team />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<div style={{ padding: '80px 24px', textAlign: 'center' }}><h2>404 - Page Not Found</h2><p>The page you are looking for does not exist.</p></div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
