import { useEffect, useState } from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, type }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`${styles.notification} ${styles[type]}`}>
            {message}
        </div>
    );
};

export default Notification;
