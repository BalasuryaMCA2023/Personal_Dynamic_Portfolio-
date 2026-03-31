import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosRoute';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';

const CustomPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/pages/${slug}`);
        setPage(res.data);
      } catch (err) {
        console.error('Error fetching dynamic page:', err);
        if (err.response?.status === 404) {
          navigate('/error');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!page) return null;

  return (
    <>
      <SEO 
        page="custom-page" 
        title={page.seoTitle || page.title}
        description={page.seoDescription || page.title}
        keywords={page.seoKeywords}
        url={window.location.href}
      />
      
      <main className="min-h-screen bg-gray-950 text-white font-['Outfit'] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-black mb-12 bg-gradient-to-r from-teal-400 to-purple-600 bg-clip-text text-transparent leading-tight">
              {page.title}
            </h1>

            <article className="prose prose-invert prose-teal max-w-none dynamic-content">
              <div 
                dangerouslySetInnerHTML={{ __html: page.content }} 
                className="text-gray-300 text-lg leading-relaxed space-y-6"
              />
            </article>
          </motion.div>
        </div>
      </main>

      <style>{`
        .dynamic-content h1, .dynamic-content h2, .dynamic-content h3 {
          font-weight: 800;
          color: white;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }
        .dynamic-content h1 { font-size: 2.5rem; }
        .dynamic-content h2 { font-size: 2rem; }
        .dynamic-content h3 { font-size: 1.5rem; }
        .dynamic-content p { margin-bottom: 1.5rem; }
        .dynamic-content img { border-radius: 1rem; max-width: 100%; height: auto; margin: 2rem 0; }
        .dynamic-content a { color: #14b8a6; text-decoration: underline; }
        .dynamic-content ul, .dynamic-content ol {
          margin-left: 2rem;
          margin-bottom: 1.5rem;
          list-style: initial;
        }
        .dynamic-content blockquote {
          border-left: 4px solid #8b5cf6;
          padding-left: 1.5rem;
          font-style: italic;
          color: #94a3b8;
          margin: 2rem 0;
          background: rgba(255,255,255,0.03);
          padding: 1.5rem;
          border-radius: 0 1rem 1rem 0;
        }
      `}</style>
    </>
  );
};

export default CustomPage;
