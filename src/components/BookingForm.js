import React, { useState } from 'react';

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0] || '');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [errors, setErrors] = useState({});

  // 表单验证逻辑 (标准4)
  const validate = () => {
    let tempErrors = {};
    if (!date) tempErrors.date = "Please select a valid date.";
    if (guests < 1 || guests > 10) tempErrors.guests = "Guests must be between 1 and 10.";
    if (!time) tempErrors.time = "Please select a time.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    dispatch({ type: 'UPDATE_TIMES', payload: selectedDate }); // 标准4：更新可用时间
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 防止页面刷新
    if (validate()) {
      // 标准8：处理边缘情况，捕获API失败
      const success = submitForm({ date, time, guests, occasion });
      if (!success) {
        setErrors({ api: "Failed to book reservation. Please try again later." });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', maxWidth: '300px', gap: '15px' }} aria-label="Table Reservation Form">
      <h2>Book Now</h2>
      
      {errors.api && <span role="alert" style={{ color: 'red', fontWeight: 'bold' }}>{errors.api}</span>}

      {/* 日期选择 (标准2：添加 aria-required) */}
      <label htmlFor="res-date">Choose date</label>
      <input 
        type="date" 
        id="res-date" 
        value={date} 
        onChange={handleDateChange} 
        required 
        aria-required="true"
        aria-invalid={!!errors.date}
      />
      {errors.date && <span role="alert" style={{ color: 'red' }}>{errors.date}</span>}

      {/* 时间选择 */}
      <label htmlFor="res-time">Choose time</label>
      <select id="res-time" value={time} onChange={(e) => setTime(e.target.value)} required aria-required="true">
        {availableTimes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {/* 人数输入 (标准4：限制范围) */}
      <label htmlFor="guests">Number of guests</label>
      <input 
        type="number" 
        id="guests" 
        min="1" 
        max="10" 
        value={guests} 
        onChange={(e) => setGuests(parseInt(e.target.value))} 
        required 
        aria-required="true"
      />
      {errors.guests && <span role="alert" style={{ color: 'red' }}>{errors.guests}</span>}

      {/* 场合选择 */}
      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      {/* 提交按钮 (标准2：aria-label) */}
      <input type="submit" value="Make Your Reservation" aria-label="On Click" style={{ padding: '10px', cursor: 'pointer' }} />
    </form>
  );
}

export default BookingForm;