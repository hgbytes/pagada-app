import React, { useState, useEffect } from 'react';
import { fetchBlogBySlug } from '../services/strapiService';
import { useLoading } from '../context/LoadingContext';

function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const { startLoading, stopLoading } = useLoading();
  const slug = window.location.hash.split('/')[1];

  useEffect(() => {
    const getBlog = async () => {
      startLoading();
      try {
        const data = await fetchBlogBySlug(slug);
        if (data && data.length > 0) {
          setBlog(data[0]);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        setError('Failed to load blog');
        console.error(err);
      } finally {
        stopLoading();
      }
    };

    if (slug) {
      getBlog();
    }
  }, [slug, startLoading, stopLoading]);

  if (error || !blog) {
    return (
      <div className="blog-detail-container">
        <div className="error-message">{error || 'Blog not found'}</div>
        <a href="#blogs" className="back-link">← Back to Blogs</a>
      </div>
    );
  }

  const renderContent = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="blog-paragraph">
            {block.children && block.children.map((child, i) => {
              let text = child.text || '';
              if (child.bold) text = <strong key={i}>{text}</strong>;
              if (child.italic) text = <em key={i}>{text}</em>;
              if (child.underline) text = <u key={i}>{text}</u>;
              return text;
            })}
          </p>
        );
      }
      if (block.type === 'heading') {
        const HeadingTag = `h${block.level || 2}`;
        return (
          <HeadingTag key={index} className={`blog-heading blog-h${block.level || 2}`}>
            {block.children && block.children.map((child, i) => child.text).join('')}
          </HeadingTag>
        );
      }
      if (block.type === 'list') {
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={index} className="blog-list">
            {block.children && block.children.map((child, i) => (
              <li key={i}>
                {child.children && child.children.map((textChild, j) => textChild.text).join('')}
              </li>
            ))}
          </ListTag>
        );
      }
      return null;
    });
  };

  return (
    <div className="blog-detail-container">
      <article className="blog-detail">
        {/* Back Link */}
        <a href="#blogs" className="back-link">← Back to Blogs</a>

        {/* Hero Section */}
        {blog.media && blog.media.length > 0 && (
          <div className="blog-detail-hero">
            <img 
              src={blog.media[0].url} 
              alt={blog.Title}
              className="blog-detail-image"
            />
          </div>
        )}

        {/* Blog Header */}
        <div className="blog-detail-header">
          <h1 className="blog-detail-title">{blog.Title}</h1>
          
          <div className="blog-detail-meta">
            <span className="blog-detail-author">By {blog.author || 'PAGADA'}</span>
            <span className="blog-detail-separator">•</span>
            <span className="blog-detail-date">
              {new Date(blog.published).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {blog.excerpt && (
            <p className="blog-detail-excerpt">{blog.excerpt}</p>
          )}
        </div>

        {/* Blog Content */}
        <div className="blog-detail-content">
          {renderContent(blog.content)}
        </div>

        {/* Footer */}
        <div className="blog-detail-footer">
          <a href="#blogs" className="back-link">← Back to Blogs</a>
        </div>
      </article>
    </div>
  );
}

export default BlogDetail;
