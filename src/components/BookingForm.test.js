import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();
  const mockAvailableTimes = ['17:00', '18:00'];

  test('Renders the Choose date label', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    const labelElement = screen.getByText("Choose date");
    expect(labelElement).toBeInTheDocument();
  });

  test('Shows error message when invalid guest count is submitted', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} submitForm={mockSubmitForm} />);
    
    // 模拟填入非法值（超出范围）
    const guestsInput = screen.getByLabelText("Number of guests");
    fireEvent.change(guestsInput, { target: { value: '15' } });
    
    // 模拟点击提交
    const submitButton = screen.getByDisplayValue("Make Your Reservation");
    fireEvent.click(submitButton);

    // 验证错误信息是否出现
    expect(screen.getByText("Guests must be between 1 and 10.")).toBeInTheDocument();
  });
});