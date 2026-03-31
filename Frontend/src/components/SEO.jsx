import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useSiteConfig } from '../context/SiteConfigContext';

import axios from '../axiosRoute';

const SEO = ({ page, title: propTitle, description: propDescription, keywords: propKeywords, name, type, image, url }) => {
    const { siteTitle, siteDescription } = useSiteConfig();
    const [dynamicSEO, setDynamicSEO] = React.useState({ title: '', description: '', keywords: '' });

    React.useEffect(() => {
        const fetchSEO = async () => {
            if (page) {
                try {
                    const { data } = await axios.get(`/seo/${page}`);
                    if (data) {
                        setDynamicSEO({
                            title: data.title,
                            description: data.description,
                            keywords: data.keywords
                        });
                    }
                } catch (error) {
                    // Fallback to props or site config if not found
                }
            }
        };
        fetchSEO();
    }, [page]);

    const finalTitle = propTitle || dynamicSEO.title || siteTitle;
    const finalDescription = propDescription || dynamicSEO.description || siteDescription;
    const finalKeywords = propKeywords || dynamicSEO.keywords;
    const finalImage = image || "/Frontend/public/Bs-logo.png";
    const finalUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{finalTitle}</title>
            <meta name='description' content={finalDescription} />
            <meta name='keywords' content={finalKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:url" content={finalUrl} />

            {/* Twitter */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />
        </Helmet>
    );
};

SEO.propTypes = {
    page: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
};

SEO.defaultProps = {
    title: null, // Let context handle default
    description: null, // Let context handle default
    keywords: 'portfolio, developer, web, react, balasurya , balasurya portfolio, balasurya portfolio website, digital portfolio, digital portfolio website, ',
    name: 'Balasurya',
    type: 'website',
    image: null,
    url: null,
};

export default SEO;
