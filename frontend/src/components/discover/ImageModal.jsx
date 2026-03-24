import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendarDays,faBuilding, faVideo,faCamera } from '@fortawesome/free-solid-svg-icons';
import { ICONS } from '../../constants/icons';
import styles from './Discover.module.css';

/**
 * Image Modal full detail view for NASA image
 * Shows large image metadata keywords
 * @param {Object|null} image Selected NASA image or null
 * @param {Function} onClose Close modal handler
 * @returns {JSX.Element} Bootstrap modal
 */
const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      show={!!image}
      onHide={onClose}
      size="xl"
      centered
      contentClassName={styles.modalContent}
    >
      <Modal.Body className="p-0">

        {/* Close button */}
        <button className={styles.modalClose} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} size="sm" />
        </button>

        <div className="row g-0">

          {/* Image */}
          <div className="col-md-7">
            <div className={styles.modalImgWrap}>
              {image?.thumbUrl ? (
                <img
                  src={image.thumbUrl}
                  alt={image?.title}
                  className={styles.modalImg}
                  loading="lazy"
                />
              ) : (
                <div className={styles.modalPlaceholder}>
                  <FontAwesomeIcon icon={ICONS.DISCOVER} size="3x" />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="col-md-5">
            <div className={styles.modalDetails}>

              {/* Title */}
              <h2 className={styles.modalTitle}>{image?.title}</h2>

              {/* Badges */}
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className={`${styles.modalBadge} ${styles.modalBadgeBlue}`}>
                  <FontAwesomeIcon icon={faCalendarDays} size="xs" />
                  {new Date(image?.date).toLocaleDateString('en-IE', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>

                {image?.center && (
                  <span className={`${styles.modalBadge} ${styles.modalBadgeGreen}`}>
                    <FontAwesomeIcon icon={faBuilding} size="xs" />
                    {image.center}
                  </span>
                )}

                {image?.mediaType && (
                  <span className={`${styles.modalBadge} ${styles.modalBadgeMuted}`}>
                    <FontAwesomeIcon
                      icon={image.mediaType === 'video' ? faVideo : faCamera}
                      size="xs"
                    />
                    {image.mediaType === 'video' ? 'Video' : 'Image'}
                  </span>
                )}
              </div>

              {/* Description */}
              {image?.description && (
                <div className="mb-3">
                  <p className={styles.modalDescLabel}>Description</p>
                  <p className={styles.modalDescText}>
                    {image.description.slice(0, 400)}
                    {image.description.length > 400 ? '...' : ''}
                  </p>
                </div>
              )}

              {/* Keywords */}
              {image?.keywords?.length > 0 && (
                <div className="mt-3">
                  <p className={styles.modalDescLabel}>Keywords</p>
                  <div className="d-flex flex-wrap gap-1">
                    {image.keywords.slice(0, 8).map((kw) => (
                      <span key={kw} className={styles.keyword}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* NASA ID */}
              <p className={`${styles.nasaId} mt-3`}>
                NASA ID: {image?.nasaId}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;