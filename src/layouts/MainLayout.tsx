import type { ReactNode } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import './MainLayout.css';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="app-container">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};
