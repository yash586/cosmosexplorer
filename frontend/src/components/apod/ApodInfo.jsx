import './ApodCommon.css';

const ApodInfo = ({apod}) => {
  const formatDate = (dateStr) =>{
    return new Date(dateStr).toLocaleDateString('en-IE', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

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