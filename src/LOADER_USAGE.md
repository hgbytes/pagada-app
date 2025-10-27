/**
 * Global Loader Usage Examples
 * 
 * The loader is now available globally throughout your app.
 * Use the useLoading hook to control loading state from any component.
 */

// ============================================================================
// EXAMPLE 1: Basic Usage in a Component
// ============================================================================

import { useLoading } from '../context/LoadingContext';

export const MyComponent = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleFetchData = async () => {
    startLoading(); // Show loader
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      // Process data...
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading(); // Hide loader
    }
  };

  return (
    <button onClick={handleFetchData}>
      {isLoading ? 'Loading...' : 'Fetch Data'}
    </button>
  );
};

// ============================================================================
// EXAMPLE 2: Using in Blogs Component
// ============================================================================

import { useLoading } from '../context/LoadingContext';
import { fetchBlogs } from '../services/strapiService';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const loadBlogs = async () => {
      startLoading(); // Show global loader
      try {
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading(); // Hide global loader
      }
    };

    loadBlogs();
  }, []);

  return (
    // Component JSX...
  );
};

// ============================================================================
// EXAMPLE 3: Using in Navigation/Route Changes
// ============================================================================

import { useLoading } from '../context/LoadingContext';

export const Navbar = () => {
  const { startLoading, stopLoading } = useLoading();

  const handleNavClick = (route) => {
    startLoading();
    // Navigate to route
    window.location.hash = route;
    // Stop loading after page loads
    setTimeout(() => stopLoading(), 500);
  };

  return (
    <a href="#blogs" onClick={() => handleNavClick('blogs')}>
      Blogs
    </a>
  );
};

// ============================================================================
// FEATURES
// ============================================================================

/**
 * ✅ Global State: Loading state is accessible from any component
 * ✅ Auto-Overlay: Loader automatically displays as a fixed overlay
 * ✅ Z-Index: Loader sits on top (z-index: 9999)
 * ✅ Backdrop: Dark semi-transparent background with blur effect
 * ✅ Smooth Animations: Fade-in/out animations
 * ✅ Easy to Use: Simple startLoading() / stopLoading() API
 */

// ============================================================================
// API
// ============================================================================

/**
 * useLoading Hook - Get access to loading state and controls
 * 
 * Returns: {
 *   isLoading: boolean,      // Current loading state
 *   startLoading: function,  // Start showing loader
 *   stopLoading: function    // Stop showing loader
 * }
 * 
 * Usage:
 * const { isLoading, startLoading, stopLoading } = useLoading();
 */

// ============================================================================
// STYLING
// ============================================================================

/**
 * Loader Overlay CSS (added to styles.css):
 * 
 * .loader-overlay {
 *   - Fixed position covering full screen
 *   - Semi-transparent black background (rgba(0, 0, 0, 0.8))
 *   - Backdrop blur effect for visual appeal
 *   - High z-index (9999) to stay on top
 *   - Smooth fade-in animation
 * }
 */
