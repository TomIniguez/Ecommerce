import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Features from './components/Features/Features';
import Testimonials from './components/Testimonials/Testimonials';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import Notification from './components/Notification/Notification';
import { useCart } from './context/CartContext';
import './App.css';

function App() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const { notification } = useCart();

    // Smooth scroll handler
    useEffect(() => {
        const handleScroll = (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.addEventListener('click', handleScroll);
        return () => document.removeEventListener('click', handleScroll);
    }, []);

    return (
        <div className="app">
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <main>
                <Hero />
                <Products
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    searchTerm={searchTerm}
                />
                <Categories setActiveFilter={setActiveFilter} />
                <Features />
                <Testimonials />
                <Newsletter />
            </main>
            <Footer />
            {notification && <Notification message={notification.message} type={notification.type} />}
        </div>
    );
}

export default App;
