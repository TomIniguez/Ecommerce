import { useState, useEffect } from 'react';
import { testimonials } from '../../data/products';
import styles from './Testimonials.module.css';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className={`${styles.testimonialsSection} section`}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
                    <p className={styles.sectionSubtitle}>Real reviews from real customers</p>
                </div>

                <div className={styles.testimonialsContainer}>
                    <div className={styles.testimonialCard}>
                        <p className={styles.testimonialText}>"{currentTestimonial.text}"</p>
                        <div className={styles.testimonialAuthor}>
                            <div className={styles.authorAvatar}>{currentTestimonial.avatar}</div>
                            <div className={styles.authorInfo}>
                                <h4>{currentTestimonial.author}</h4>
                                <p>{currentTestimonial.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.testimonialDots}>
                        {testimonials.map((_, index) => (
                            <span
                                key={index}
                                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
