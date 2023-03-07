import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const ReservCalendar = ({hideDateDiv}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      printConsole(dates);
    };
    const printConsole = (dates) => {
        hideDateDiv(dateFormat(dates[0]),dateFormat(dates[1]))
        
    }
    const dateFormat = (selectdate) => {
        if(selectdate){
          const year = selectdate.getFullYear();
          const month = selectdate.getMonth()+1;
          const monthformat = String(month).length === 1 ? '0'+month : month ;
          const date = selectdate.getDate();
          return `${year}-${monthformat}-${date}`;
        } 
    } 
    return (
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        monthsShown={2}
        locale={ko}
        selectsRange
        inline
      />
    );
};
export default ReservCalendar;