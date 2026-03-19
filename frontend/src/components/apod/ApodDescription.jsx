import './ApodCommon.css';

const ApodDescription = ({apod}) => {
  return(
    <div className='apod-desc'>
      <div className='apod-desc_section'>
        <h3 className='apod-desc_heading'>Nasa Description</h3>
        <p className='apod-desc_text'>{apod.explanation}</p>
      </div>
    </div>
  );
};

export default ApodDescription;