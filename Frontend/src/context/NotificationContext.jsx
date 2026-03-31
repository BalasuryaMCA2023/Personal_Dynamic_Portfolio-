import React from 'react';
import { toast } from 'react-toastify';

const NotificationContext = React.createContext({ notify: () => {} });

export const useNotification = () => React.useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const shownMessages = React.useRef(new Set());
    const pendingNotifications = React.useRef([]);
    const processingTimeout = React.useRef(null);

    const playNotificationSound = React.useCallback(() => {
        try {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play().catch(e => console.warn('Audio playback failed:', e));
        } catch (err) {
            console.warn('Audio system error:', err);
        }
    }, []);

    const showBrowserNotification = React.useCallback((message) => {
        if ("Notification" in window && Notification.permission === "granted" && document.visibilityState !== 'visible') {
            new Notification("New Notification", {
                body: typeof message === 'string' ? message : (message.text || "You have a new update"),
                icon: "/favicon.ico"
            });
        }
    }, []);

    const notify = React.useCallback((message, options = {}) => {
        const id = options.toastId || (typeof message === 'object' && message._id ? message._id : Math.random().toString(36).substr(2, 9));
        
        if (shownMessages.current.has(id)) return;
        shownMessages.current.add(id);
        setTimeout(() => shownMessages.current.delete(id), 60000); // 1 minute dedupe

        pendingNotifications.current.push({ id, message, options });

        if (processingTimeout.current) clearTimeout(processingTimeout.current);

        processingTimeout.current = setTimeout(() => {
            const batch = [...pendingNotifications.current];
            pendingNotifications.current = [];

            if (batch.length === 0) return;

            if (batch.length > 2) {
                toast.info(`You have ${batch.length} new updates`, {
                    toastId: 'batch-' + Date.now(),
                    autoClose: 5000,
                    icon: "🔔"
                });
                showBrowserNotification(`You have ${batch.length} new updates`);
            } else {
                batch.forEach(item => {
                    const msg = typeof item.message === 'object' ? (item.message.text || item.message.message || "New activity") : item.message;
                    toast.info(msg, {
                        ...item.options,
                        toastId: item.id,
                    });
                    showBrowserNotification(msg);
                });
            }

            playNotificationSound();
        }, 500); 
    }, [playNotificationSound, showBrowserNotification]);

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
        </NotificationContext.Provider>
    );
};
