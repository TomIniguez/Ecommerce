export const products = [
    {
        id: 1,
        name: 'ASUS VivoBook S14',
        description: 'Ultra-slim 14" laptop with vibrant display, Intel Core i5, 8GB RAM, 512GB SSD. Perfect for productivity and entertainment.',
        price: 749.99,
        image: '/assets/images/laptop-1.jpg',
        category: 'laptops',
        badge: 'New'
    },
    {
        id: 2,
        name: 'Legion Tower 5i Gaming PC',
        description: 'Powerful gaming desktop with Intel i7, RTX 3070, 16GB RAM, 1TB SSD. Stunning RGB lighting and exceptional performance.',
        price: 1499.99,
        image: '/assets/images/gaming-pc.jpg',
        category: 'gaming',
        badge: 'Hot'
    },
    {
        id: 3,
        name: 'HP Pavilion 15',
        description: 'Versatile 15.6" laptop with AMD Ryzen 5, 8GB RAM, 256GB SSD. Elegant design meets reliable performance.',
        price: 599.99,
        image: '/assets/images/laptop-2.jpg',
        category: 'laptops',
        badge: 'Sale'
    },
    {
        id: 4,
        name: 'Dell XPS 13 Pro',
        description: 'Premium ultrabook with 13.4" InfinityEdge display, Intel i7, 16GB RAM, 512GB SSD. Ultimate portability and power.',
        price: 1299.99,
        image: '/assets/images/lifestyle-1.jpg',
        category: 'laptops',
        badge: null
    },
    {
        id: 5,
        name: 'MacBook Air M2',
        description: "Apple's latest MacBook Air with M2 chip, 13.6\" Liquid Retina display, 8GB RAM, 256GB SSD. Incredibly thin and powerful.",
        price: 1199.99,
        image: '/assets/images/lifestyle-2.jpg',
        category: 'laptops',
        badge: null
    },
    {
        id: 6,
        name: 'Wireless Keyboard & Mouse Combo',
        description: 'Premium wireless keyboard and mouse set with ergonomic design, long battery life, and smooth connectivity.',
        price: 79.99,
        image: '/assets/images/laptop-1.jpg',
        category: 'accessories',
        badge: null
    }
];

export const categories = [
    { id: 1, name: 'Laptops', icon: '💻', filter: 'laptops' },
    { id: 2, name: 'Gaming PCs', icon: '🎮', filter: 'gaming' },
    { id: 3, name: 'Accessories', icon: '⌨️', filter: 'accessories' },
    { id: 4, name: 'Monitors', icon: '🖥️', filter: 'monitors' }
];

export const features = [
    {
        id: 1,
        icon: '🚚',
        title: 'Free Shipping',
        description: 'Enjoy free shipping on all orders over $50. Fast and reliable delivery to your doorstep.'
    },
    {
        id: 2,
        icon: '🔒',
        title: 'Secure Payment',
        description: 'Your transactions are protected with industry-leading encryption and security measures.'
    },
    {
        id: 3,
        icon: '💯',
        title: 'Quality Guarantee',
        description: 'All products come with manufacturer warranty and our 30-day money-back guarantee.'
    },
    {
        id: 4,
        icon: '🎧',
        title: '24/7 Support',
        description: 'Our dedicated support team is always ready to help you with any questions or concerns.'
    }
];

export const testimonials = [
    {
        id: 1,
        text: "I purchased the Legion Gaming PC and I'm absolutely blown away by its performance. The customer service was exceptional, and the delivery was super fast. Highly recommend Shopily!",
        author: 'John Davis',
        avatar: 'JD',
        role: 'Verified Buyer'
    },
    {
        id: 2,
        text: 'The ASUS VivoBook exceeded my expectations! Beautiful display, lightning-fast performance, and incredible value for money. Shopily made the entire buying process seamless.',
        author: 'Sarah Mitchell',
        avatar: 'SM',
        role: 'Verified Buyer'
    },
    {
        id: 3,
        text: 'Best tech shopping experience I\'ve ever had. The product quality is top-notch, prices are competitive, and the 24/7 support team is incredibly helpful. Will definitely shop here again!',
        author: 'Michael Chen',
        avatar: 'MC',
        role: 'Verified Buyer'
    }
];
