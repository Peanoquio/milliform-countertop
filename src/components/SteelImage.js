import React, { useState } from 'react';
import './SteelImage.css';

// Renders an image, falling back to a brushed-steel CSS gradient when the
// source is missing or fails to load. Keeps the layout intact before real
// photography is added to /public/images.
const SteelImage = ({ src, alt = '', className = '', label, ...rest }) => {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className={`steel-fallback ${className}`} role="img" aria-label={alt} {...rest}>
        {label && <span className="steel-fallback-label">{label}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
};

export default SteelImage;
