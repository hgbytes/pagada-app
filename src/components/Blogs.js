import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '../services/strapiService';
import '../styles/Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
        if (blogsData.length === 0) {
          setError('No blogs found. Make sure Strapi is running and contains blog posts.');
        }
      } catch (err) {
        setError('Failed to load blogs. Please check your Strapi connection.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <section className="blogs-section">
        <div className="blogs-container">
          <p className="loading">Loading blogs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="blogs-section" id="blogs">
      <div className="blogs-container">
        <h1 className="blogs-title">Our Blogs</h1>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {blogs.length === 0 ? (
          <div className="no-blogs">
            <p>No blog posts available yet.</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => {
              const attributes = blog.attributes || blog;
              const slug = attributes.slug || blog.slug || blog.id;
              const imageUrl = attributes.media && attributes.media.length > 0
                ? `${process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}${attributes.media[0].url}`
                : attributes.featuredImage?.data?.attributes?.url
                  ? `${process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}${attributes.featuredImage.data.attributes.url}`
                  : '/placeholder-image.png';

              return (
                <article key={blog.id} className="blog-card">
                  <div className="blog-image">
                    <img src={imageUrl} alt={attributes.Title || attributes.title || 'Blog'} />
                  </div>
                  <div className="blog-content">
                    <h2 className="blog-title">{attributes.Title || attributes.title || 'Untitled'}</h2>
                    <p className="blog-excerpt">
                      {attributes.excerpt || (attributes.content && typeof attributes.content === 'string' ? attributes.content.substring(0, 150) : 'No description available')}
                    </p>
                    <div className="blog-meta">
                      {attributes.author && (
                        <span className="blog-author">By {attributes.author}</span>
                      )}
                      {(attributes.published || attributes.publishedAt) && (
                        <span className="blog-date">
                          {new Date(attributes.published || attributes.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <a href={`#blog/${slug}`} className="blog-link">
                      Read More →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
