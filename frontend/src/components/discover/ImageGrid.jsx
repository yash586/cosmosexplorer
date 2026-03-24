import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from '../../constants/icons';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';

/**
 * Image Grid displays NASA images in responsive grid
 * Manages selected image state for modal
 * @param {Array} images Array of NASA image objects
 * @param {string} query Current search query for empty state
 * @returns {JSX.Element} Image grid + modal
 */
const ImageGrid = ({ images, query }) => {
  const [selected, setSelected] = useState(null);

  if (!images.length) {
    return (
      <div className="text-center py-5">
        <FontAwesomeIcon
          icon={ICONS.DISCOVER}
          size="3x"
          style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}
        />
        <p style={{ color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
          No images found for "{query}"
        </p>
        <p style={{ color: 'var(--color-border)', fontSize: '0.85rem' }}>
          Try a different search term
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="row g-3">
        {images.map((image) => (
          <div key={image.nasaId} className="col-6 col-md-4 col-lg-3">
            <ImageCard
              image={image}
              onClick={() => setSelected(image)}
            />
          </div>
        ))}
      </div>
      <ImageModal
        image={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
};

export default ImageGrid;