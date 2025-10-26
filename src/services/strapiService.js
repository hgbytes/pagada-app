/**
 * Strapi Service - Fetch blog content from Strapi CMS
 */

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

/**
 * Fetch all blog posts from Strapi
 * @returns {Promise<Array>} Array of blog posts
 */
export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blogs?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching blogs from Strapi:', error);
    return [];
  }
};

/**
 * Fetch a single blog post by ID
 * @param {string} id - Blog post ID
 * @returns {Promise<Object>} Single blog post
 */
export const fetchBlogById = async (id) => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blogs/${id}?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching blog ${id} from Strapi:`, error);
    return null;
  }
};

/**
 * Fetch blogs with pagination and filtering
 * @param {number} page - Page number (default 1)
 * @param {number} pageSize - Items per page (default 10)
 * @param {string} sort - Sort field (default -createdAt)
 * @returns {Promise<Object>} Paginated blog posts
 */
export const fetchBlogsWithPagination = async (page = 1, pageSize = 10, sort = '-createdAt') => {
  try {
    const start = (page - 1) * pageSize;
    const response = await fetch(
      `${STRAPI_URL}/api/blogs?populate=*&sort=${sort}&pagination[start]=${start}&pagination[limit]=${pageSize}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      blogs: data.data || [],
      pagination: data.meta?.pagination || {},
    };
  } catch (error) {
    console.error('Error fetching paginated blogs from Strapi:', error);
    return { blogs: [], pagination: {} };
  }
};

const strapiService = {
  fetchBlogs,
  fetchBlogById,
  fetchBlogsWithPagination,
};

export default strapiService;
