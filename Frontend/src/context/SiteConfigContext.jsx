import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axiosRoute';

const SiteConfigContext = createContext();

export const useSiteConfig = () => useContext(SiteConfigContext);

export const SiteConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({
        siteTitle: 'My Portfolio',
        siteDescription: 'Welcome to my portfolio.',
        contactEmail: 'balasuryasurya03@gmail.com',
        maintenanceMode: false,
        visibleSections: [],
        navItems: [],
        loading: true
    });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const [settingsRes, visibilityRes, navRes] = await Promise.all([
                    axios.get('/settings'),
                    axios.get('/visibility/sections'),
                    axios.get('/navigation/main')
                ]);

                setConfig(prev => ({
                    ...prev,
                    ...(settingsRes.data || {}),
                    visibleSections: visibilityRes.data || [],
                    navItems: Array.isArray(navRes.data) ? navRes.data : (navRes.data?.items || []),
                    loading: false
                }));
            } catch (error) {
                console.error("Failed to load site config:", error);
                setConfig(prev => ({ ...prev, loading: false }));
            }
        };

        fetchConfig();
    }, []);

    return (
        <SiteConfigContext.Provider value={config}>
            {children}
        </SiteConfigContext.Provider>
    );
};
