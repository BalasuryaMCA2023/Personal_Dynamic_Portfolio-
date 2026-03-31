import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../../axiosRoute';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { Calendar, User, Eye, ChevronLeft, Tag as TagIcon, Clock } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        if (err.response?.status === 404) {
          navigate('/not-found');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <>
      <SEO 
        page="blog-detail" 
        title={`${blog.seoTitle || blog.title} | Blog`}
        description={blog.seoDescription || blog.title}
        keywords={blog.seoKeywords}
        image={blog.coverImage}
        url={window.location.href}
      />
      
      <main className="min-h-screen bg-gray-950 text-white font-['Outfit'] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back button */}
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-400 transition-colors mb-12 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Articles
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.categories?.map((cat, i) => (
                <span key={i} className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold rounded-full uppercase tracking-wider">
                  {cat}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm border-b border-white/10 pb-8">
              <span className="flex items-center gap-2">
                <User size={16} className="text-purple-500" /> {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-teal-500" /> {new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Eye size={16} className="text-purple-500" /> {blog.views} views
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-teal-500" /> 5 min read
              </span>
            </div>
          </header>

          {/* Cover Image */}
          {blog.coverImage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12 rounded-[2.5rem] overflow-hidden border border-white/10"
            >
              <img src={blog.coverImage} alt={blog.title} className="w-full h-auto" />
            </motion.div>
          )}

          {/* Content */}
          <article className="prose prose-invert prose-teal max-w-none mb-16 blog-content">
            <div 
              dangerouslySetInnerHTML={{ __html: blog.content }} 
              className="text-gray-300 text-lg leading-relaxed space-y-6"
            />
          </article>

          {/* Footer Info / Tags */}
          <footer className="pt-12 border-t border-white/10">
            <div className="flex flex-wrap gap-3 items-center">
              <TagIcon size={18} className="text-gray-500" />
              {blog.tags?.map((tag, i) => (
                <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-16 p-8 bg-gradient-to-br from-teal-500/10 to-purple-600/10 rounded-3xl border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Enjoyed this article?</h3>
                <p className="text-gray-400">Feel free to share or reach out if you have any questions.</p>
              </div>
              <Link to="/contact" className="px-6 py-3 bg-teal-500 text-black font-bold rounded-xl hover:bg-teal-400 transition-colors">
                Let's Chat
              </Link>
            </div>
          </footer>
        </div>
      </main>

      <style>{`
        .blog-content h1, .blog-content h2, .blog-content h3 {
          font-weight: 900;
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content h1 { font-size: 2.5rem; }
        .blog-content h2 { font-size: 2rem; }
        .blog-content h3 { font-size: 1.5rem; }
        .blog-content p { margin-bottom: 1.5rem; }
        .blog-content ul, .blog-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          list-style: disc;
        }
        .blog-content img { border-radius: 1.5rem; margin: 2rem 0; }
        .blog-content a { color: #14b8a6; text-decoration: underline; }
        .blog-content blockquote {
          border-left: 4px solid #14b8a6;
          padding-left: 1.5rem;
          font-style: italic;
          color: #94a3b8;
          margin: 2rem 0;
        }
      `}</style>
    </>
  );
};

export default BlogDetail;
