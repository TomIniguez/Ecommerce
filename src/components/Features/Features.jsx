import { features } from '../../data/products';
import styles from './Features.module.css';

const Features = () => {
    return (
        <section className="section" id="about">
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Why Choose Shopily?</h2>
                    <p className={styles.sectionSubtitle}>We're committed to providing the best shopping experience</p>
                </div>

                <div className={styles.featuresGrid}>
                    {features.map(feature => (
                        <div key={feature.id} className={styles.featureCard}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
