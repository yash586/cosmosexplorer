import './ApodCommon.css';
import { formatDate } from '../../utils/date';

const ApodInfo = ({apod}) => {
  return (
    <div className='apod-info'>
      <h1 className='apod-info_title'>{apod.title}</h1>
      <div className='apod-info_badges'>
        <span className='apod-info_badge apod-info_badge-date'>
          {formatDate(apod.date)}
        </span>
        <span className='apod-info_badge apod-info_badge-media-type'>
          {apod.media_type === 'video' ? '🎥 Video' : '📷 Image'}
        </span>
        {apod.copyright && (
          <span className='apod-info_badge apod-info_badge-copy'>
            © {apod.copyright.trim()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ApodInfo;