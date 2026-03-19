import { useState } from "react";
import './ApodCommon.css';

const MIN_DATE = '1995-06-16';
const MAX_DATE = new Date().toISOString().split('T')[0];

const TimeTravelPicker = ({onDateChange, onSurprise, currentDate}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate || MAX_DATE);

  const handleLoad = () => {
    if(selectedDate) onDateChange(selectedDate);
  }

  return(
    <div className="time-travel">
      <h3 className="time-travel_title">
        🕰️ Travel Back in Time
      </h3>
      <p className="time-travel_subtitle">
        Pick any date since June 16, 1995
      </p>
      <div className="time-travel_controls">
        <input type="date" className="time-travel_input" value={selectedDate} min={MIN_DATE} max={MAX_DATE}
        onChange={(e) => setSelectedDate(e.target.value)} 
        />
        <button className="time-travel_btn time-travel_btn_primary" onClick={handleLoad}>Load Image</button>
        <button className="time-travel_btn time-travel_btn-secondary" onClick={onSurprise}>✦ Surprise Me</button>
      </div>
    </div>
  )
}

export default TimeTravelPicker;