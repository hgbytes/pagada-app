import React from 'react';

const Logo = ({ 
  variant = 'default', 
  size = 'medium', 
  className = '',
  onClick 
}) => {
  const getLogoSrc = () => {
    switch (variant) {
      case 'white':
        return '/Artboard 5.svg';
      case 'black':
        return '/Artboard 5.svg';
      case 'green':
        return '/Artboard 5.svg';
      default:
        return '/Artboard 5.svg';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'logo-small';
      case 'large':
        return 'logo-large';
      case 'xlarge':
        return 'logo-xlarge';
      default:
        return 'logo-medium';
    }
  };

  return (
    <div 
      className={`logo-container ${getSizeClass()} ${className}`}
      onClick={onClick}
    >
      <img 
        src={getLogoSrc()} 
        alt="PAGADA Logo" 
        className="logo-image"
      />
    </div>
  );
};

export default Logo;