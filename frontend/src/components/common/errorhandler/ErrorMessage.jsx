import './ErrorMessage.css';

const ErrorMessage = ({message, onRetry}) => {
  <div className='error-message'>
    <div className='error-message_icon'></div>
    <p className='error-message_text'>{message || 'Something went wrong. Please try again'}</p>
    {onRetry && (
      <button className='error-message_btn' onClick={onRetry}>
        Try Again
      </button>
    )}    
  </div>
}

export default ErrorMessage;