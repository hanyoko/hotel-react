import React, { useState, useEffect } from 'react';
import { DayPickerSingleDateController, CalendarDay } from 'react-dates';

const MultiDatePickerCalendar = () => {
  const [dates, setDates] = useState([]);
  
  const handleChange = (date) => {
    const newDates = dates.includes(date)
      ? dates.filter((d) => !date.isSame(d))
      : [...dates, date];

    setDates(newDates);
  };
  return (
    <DayPickerSingleDateController
      numberOfMonths={1}
      onDateChange={handleChange}
      hideKeyboardShortcutsPanel
      noBorder
      monthFormat="YYYY년 MMMM"
      renderCalendarDay={(props) => {
        const { day, modifiers } = props;
        console.log(modifiers);
        if (dates.includes(day)) {
          modifiers && modifiers.add('selected');
        } else {
          modifiers && modifiers.delete('selected');
        }

        return <CalendarDay {...props} modifiers={modifiers} />;
      }}
    />
  );
};
export default MultiDatePickerCalendar;