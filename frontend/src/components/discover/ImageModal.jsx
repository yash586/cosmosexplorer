import { Modal } from 'react-bootstrap';
import './DiscoverCommon.css';

const ImageModal = ({image, onClose}) => {
  return (
    <Modal show={!!image} onHide={onClose} size='xl' centered contentClassName='image-modal-content'>
      <Modal.Body className='p-0'>
        <button className='image-modal_close' onClick={onClose}>
          ✕
        </button>
        <div className='row g-0'>
          <div className='col-md-7'>
            <div className='image-modal_img-wrap'>
              {image?.thumbUrl ? (
                <img src={image.thumbUrl} alt={image.title} className='image-modal_img'/>
              ):(
                <div className='image-modal_placeholder'>🌌</div>
              )}
            </div>
          </div>
          <div className='col-md-5'>
            <div className='image-modal_details'>
              <h2 className='image-modal_title'>{image?.title}</h2>
              <div className='d-flex flex-wrap gap-2 mb-3'>
                <span className='image-modal_badge image-modal_badge-blue'>
                  {new Date(image?.date).toLocaleDateString('en-IE', {
                    year: 'numeric', month: 'long', day:'numeric'
                  })}
                </span>
                {image?.center && (
                  <span className="image-modal_badge image-modal_badge-green">
                    🏛️ {image.center}
                  </span>
                )}
                {image?.mediaType && (
                  <span className="image-modal_badge image-modal_badge-muted">
                    {image.mediaType === 'video' ? '🎥 Video' : '📷 Image'}
                  </span>
                )}
              </div>
                {image?.description && (
                  <div className='image-modal_desc'>
                    <p className='image-modal_desc-label'>Description</p>
                    <p className='image-modal_desc-text'>
                      {image.description.slice(0,400)}
                      {image.description.length > 400 ? '....' : ''}
                    </p>
                  </div>
                )}

                {image?.keywords?.length > 0 && (
                  <div className='mt-3'>
                    <p className='image-modal_desc-label'>Keywords</p>
                    <div className='d-flex flex-wrap gap-1'>
                      {image.keywords.slice(0,8).map((key) =>(
                        <span key={key} className='image-modal_keyword'>{key}</span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;