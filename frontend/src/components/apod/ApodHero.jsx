import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faVideo, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import styles from './Apod.module.css';

/**
 * APOD Hero displays the main image or video
 * Shows AI Enhanced badge overlay
 * @param {Object} apod APOD data from NASA API
 * @param {string} apod.media_type 'image' or 'video'
 * @param {string} apod.url Media URL
 * @param {string} apod.hdurl HD image URL
 * @param {string} apod.title image title
 * @returns {JSX.Element} Hero media component
 */
const ApodHero = ({ apod }) => {
  const isVideo = apod.media_type === 'video';

  const getEmbedUrl = (url) => {
    if (!url) return null;

    if (url.includes('youtube.com/watch')) {
      const id = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes('youtu.be')) {
      const id = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('youtube.com/embed')) return url;
    return null;
  };

  const embedUrl = isVideo ? getEmbedUrl(apod.url) : null;

  return (
    <div className={styles.hero}>

      {/* Video */}
      {isVideo && embedUrl && (
        <iframe
          className={styles.heroVideo}
          src={embedUrl}
          title={apod.title}
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope"
        />
      )}

      {isVideo && !embedUrl && (
        <div className={styles.heroVideoFallback}>
          <FontAwesomeIcon
            icon={faVideo}
            size="3x"
            style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}
          />
          <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
            Video cannot be embedded
          </p>
          <a
            href={apod.url}
            target="_blank"
            rel="noreferrer"
            className={styles.heroVideoLink}
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
            {' '}Watch on NASA
          </a>
        </div>
      )}

      {/* Image */}
      {!isVideo && (
        <img
          className={styles.heroImage}
          src={apod.hdurl || apod.url}
          alt={apod.title}
          loading="eager"
          onError={(e) => { e.target.src = apod.url; }}
        />
      )}

      {/* AI badge */}
      <div className={styles.aiBadge}>
        <FontAwesomeIcon icon={faRobot} size="xs" />
        AI Enhanced
      </div>

    </div>
  );
};

export default ApodHero;