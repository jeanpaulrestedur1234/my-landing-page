import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Contact } from './pages/Contact/Contact';
import { MainLayout } from './layouts/MainLayout';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}