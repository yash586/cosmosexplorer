import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faExpand } from '@fortawesome/free-solid-svg-icons';
import { ICONS } from '../../constants/icons';
import styles from './Discover.module.css';

/**
 * Image Card — single NASA image tile
 * Shows thumbnail with hover overlay
 * Displays video badge for video assets
 * @param {Object} image NASA image data
 * @param {Function} onClick Click handler → opens modal
 * @returns {JSX.Element} Image card
 */
const ImageCard = ({ image, onClick }) => {
  const isVideo = image.mediaType === 'video';

  return (
    <div className={styles.imageCard} onClick={onClick}>

      {/* Thumbnail */}
      <div className={styles.thumb}>
        {image.thumbUrl ? (
          <img
            src={image.thumbUrl}
            alt={image.title}
            className={styles.thumbImg}
            loading="lazy"
          />
        ) : (
          <div className={styles.thumbPlaceholder}>
            <FontAwesomeIcon
              icon={isVideo ? faVideo : ICONS.DISCOVER}
              size="2x"
            />
          </div>
        )}

        {/* Hover overlay */}
        <div className={styles.overlay}>
          <span className={styles.overlayText}>
            <FontAwesomeIcon icon={faExpand} size="sm" />
            {' '}View Details
          </span>
        </div>

        {/* Video badge */}
        {isVideo && (
          <span className={styles.videoBadge}>
            <FontAwesomeIcon icon={faVideo} size="xs" />
            Video
          </span>
        )}
      </div>

      {/* Info */}
      <div className={styles.cardInfo}>
        <p className={styles.cardTitle}>{image.title}</p>
        <p className={styles.cardDate}>
          {new Date(image.date).getFullYear()}
          {image.center && ` · ${image.center}`}
        </p>
      </div>

    </div>
  );
};

export default ImageCard;