import React, { useEffect, useState } from 'react';
import axios from '../../axiosRoute';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { Calendar, User, Eye, ArrowRight } from 'lucide-react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEO 
        page="blogs" 
        title="Blog | My Journey & Insights" 
        description="Articles about web development, design, and my personal projects."
      />
      
      <main className="min-h-screen bg-gray-950 text-white font-['Outfit'] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-teal-400 to-purple-600 bg-clip-text text-transparent">
              Latest Insights
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Sharing my thoughts, tutorials, and experiences in the world of technology and design.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No blog posts yet. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-teal-500/50 transition-all duration-300"
                >
                  <Link to={`/blog/${blog.slug}`} className="block">
                    {/* Image Placeholder or Cover */}
                    <div className="relative h-56 overflow-hidden">
                      {blog.coverImage ? (
                        <img 
                          src={blog.coverImage} 
                          alt={blog.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-purple-600/20 flex items-center justify-center">
                          <Article className="text-teal-500/30" size={60} />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        {blog.categories?.slice(0, 1).map((cat, i) => (
                          <span key={i} className="px-3 py-1 bg-black/60 backdrop-blur-md text-teal-400 text-xs font-bold rounded-full uppercase tracking-wider">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} /> {blog.views}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold mb-4 group-hover:text-teal-400 transition-colors">
                        {blog.title}
                      </h2>

                      <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                        {blog.content.replace(/<[^>]*>?/gm, '')}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                        <span className="flex items-center gap-2 text-xs font-bold text-gray-400">
                          <User size={14} className="text-purple-500" /> {blog.author}
                        </span>
                        <span className="text-teal-400 flex items-center gap-1 font-bold text-sm">
                          Read More <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default BlogList;
