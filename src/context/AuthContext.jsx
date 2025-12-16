import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('shopily_current_user');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('shopily_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const userData = { name: user.name, email: user.email };
            setCurrentUser(userData);
            localStorage.setItem('shopily_current_user', JSON.stringify(userData));
            setShowLoginModal(false);
            return { success: true, message: `Welcome back, ${user.name}!` };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    };

    const register = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('shopily_users') || '[]');
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            return { success: false, message: 'An account with this email already exists' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('shopily_users', JSON.stringify(users));

        // Auto login after registration
        const userData = { name, email };
        setCurrentUser(userData);
        localStorage.setItem('shopily_current_user', JSON.stringify(userData));
        setShowRegisterModal(false);
        return { success: true, message: `Welcome to Shopily, ${name}!` };
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('shopily_current_user');
        return { success: true, message: 'You have been logged out' };
    };

    const openLoginModal = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const openRegisterModal = () => {
        setShowRegisterModal(true);
        setShowLoginModal(false);
    };

    const closeRegisterModal = () => {
        setShowRegisterModal(false);
    };

    const switchToRegister = () => {
        setShowLoginModal(false);
        setTimeout(() => setShowRegisterModal(true), 200);
    };

    const switchToLogin = () => {
        setShowRegisterModal(false);
        setTimeout(() => setShowLoginModal(true), 200);
    };

    const getUserInitials = () => {
        if (!currentUser) return '';
        return currentUser.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const value = {
        currentUser,
        login,
        register,
        logout,
        showLoginModal,
        showRegisterModal,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal,
        switchToRegister,
        switchToLogin,
        getUserInitials
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
