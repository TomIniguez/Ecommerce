import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero} id="home">
            <div className={`${styles.heroContent} container`}>
                <h1 className={styles.heroTitle}>Welcome to the Future of Tech Shopping</h1>
                <p className={styles.heroSubtitle}>
                    Discover premium laptops, powerful gaming PCs, and cutting-edge technology at unbeatable prices.
                    Your perfect device is just a click away.
                </p>
                <div className={styles.heroCta}>
                    <a href="#products" className="btn btn-primary btn-lg">Shop Now</a>
                    <a href="#categories" className="btn btn-secondary btn-lg">Browse Categories</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
