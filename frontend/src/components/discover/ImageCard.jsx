import { Modal } from 'react-bootstrap';
import './DiscoverCommon.css';

const ImageCard = ({image, onClick}) =>{
  const isVideo = image.mediaType === 'video';

  return (
    <div className='image-card' onClick={onClick}>
      <div className='image-card_thumb'>
        {image.thumbUrl ? (
          <img src={image.thumbUrl} alt={image.title} className='image-card_img' loading='lazy'/>
        ):(
          <div className='image-card_placeholder'>
            {isVideo ? '🎥' : '🌌'}
          </div>
        )}
        <div className='image-card_overlay'>
          <span className='image-card_expand'>View Details</span>
        </div>
        {isVideo && (
          <span className="image-card__badge">🎥 Video</span>
        )}
      </div>
      <div className='image-card_info'>
        <p className='image-card_title'>{image.title}</p>
        <p className='image-card_date'>
          {new Date(image.date).getFullYear()}
          {image.center && ` .${image.center}`}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;