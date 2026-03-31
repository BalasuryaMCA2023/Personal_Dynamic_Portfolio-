const Navigation = require('../models/navigation.model');

exports.getNavigation = async (req, res) => {
  try {
    let nav = await Navigation.findOne({ menuType: 'main' });

    // Create default only once
    if (!nav) {
      nav = await Navigation.create({
        menuType: 'main',
        items: [
          { label: 'Home', path: '/', order: 0, isVisible: true },
          { label: 'About', path: '/about', order: 1, isVisible: true },
          { label: 'Education', path: '/education', order: 2, isVisible: true },
          { label: 'Skills', path: '/skills', order: 3, isVisible: true },
          { label: 'Projects', path: '/projects', order: 4, isVisible: true },
          { label: 'Experience', path: '/experience', order: 5, isVisible: true },
          { label: 'Contact', path: '/contact', order: 6, isVisible: true }
        ]
      });
    }

    // ✅ RETURN FULL DATA (NO FILTER)
    res.status(200).json(nav.items);

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching navigation',
      error: error.message
    });
  }
};