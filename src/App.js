import React, { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import ConfirmedBooking from './components/ConfirmedBooking';
import { submitAPI } from './api';
import './App.css';

// 初始化可用时间
const initializeTimes = () => ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

// Reducer 用于更新可用时间 (标准4)
const timesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      // 此处可以加入逻辑根据日期过滤时间，这里简单返回全部时间
      return initializeTimes();
    default:
      return state;
  }
};

function App() {
  const [availableTimes, dispatch] = useReducer(timesReducer, [], initializeTimes);
  const navigate = useNavigate();

  // 提交表单逻辑 (标准8)
  const submitForm = (formData) => {
    const isSuccess = submitAPI(formData);
    if (isSuccess) {
      navigate('/confirmed'); // 成功后跳转
    }
    return isSuccess;
  };

  return (
    // 标准5：语义化标签
    <div className="App">
      <header className="App-header">
        <h1>Little Lemon</h1>
      </header>
      
      <main style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />} />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
        </Routes>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
        <p>© 2026 Little Lemon Restaurant</p>
      </footer>
    </div>
  );
}

export default App;