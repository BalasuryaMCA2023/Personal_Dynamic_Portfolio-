import { useSiteConfig } from '../context/SiteConfigContext';
import { useLocation, Navigate } from 'react-router-dom';

const VisibilityGuard = ({ section, children }) => {
    const { visibleSections, navItems, loading } = useSiteConfig();
    const location = useLocation();

    if (loading) return null;

    // Condition 1: Check Section Visibility (Global Settings)
    const isSectionVisible = () => {
        if (!section) return true;
        const found = visibleSections.find(s => s.section.toLowerCase() === section.toLowerCase());
        return found ? found.visible : true; // Default to true if not specified
    };

    // Condition 2: Check Menu Item Visibility (Menu Builder)
    const isMenuVisible = () => {
        const currentPath = location.pathname.toLowerCase();
        // Exact match or matches a slug path
        const navItem = navItems.find(item => item.path.toLowerCase() === currentPath);
        
        // If found in menu, it MUST be visible
        if (navItem) {
            return navItem.isVisible !== false;
        }
        return true; // Default to allow if not in menu (e.g. homepage or sub-slugs)
    };

    // Both conditions must be true
    if (!isSectionVisible() || !isMenuVisible()) {
        console.warn(`Access blocked to ${location.pathname}: Section(${isSectionVisible()}) Menu(${isMenuVisible()})`);
        return <Navigate to="/error" replace />;
    }

    return children;
};

export default VisibilityGuard;
