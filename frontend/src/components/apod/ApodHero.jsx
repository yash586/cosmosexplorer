import './ApodCommon.css';

const ApodHero = ({apod}) => {
  const isVideo = apod.media_type === 'video';

  return (
    <div className='apod-hero'>
      {isVideo ? (
        <iframe className='apod-hero_video' src={apod.url} title={apod.title} allowFullScreen/>
      ) :(
        <img className='apod-hero_image' src={apod.hdurl || apod.url} alt={apod.title}/>
      )}
      <div className='apod-hero_ai-badge'>
        ✦ AI Enhanced
      </div>
    </div>
  )
}
export default ApodHero;