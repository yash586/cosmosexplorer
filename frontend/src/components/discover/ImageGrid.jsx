import { useState } from "react";
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';

const ImageGrid = ({images}) => {
  const [selected, setSelected] = useState(null);

  if(!images.length){
    return(
      <div className="text-center py-5">
        <p style={{ fontSize: '2rem' }}>🔭</p>
        <p style={{ color: '#8B949E' }}>
          No images found for "{query}"
        </p>
        <p style={{ color: '#30363D', fontSize: '0.85rem' }}>
          Try a different search term
        </p>
      </div>
    )
  }

  return(
    <>
    <div className="row g-3">
      {images.map((image) => (
        <div key={image.nasaId} className="col-6 col-md-4 col-lg-3">
          <ImageCard image={image} onClick={() => setSelected(image)} />
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

