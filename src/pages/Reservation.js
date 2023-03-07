import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Title from '../components/Title';
import { API_URL } from '../config/apiurl';
import RoomContainer from '../containers/RoomContainer';
import { dataUpdate } from '../modules/reserve';
import './Reservation.css';
import ReservationSign from './ReservationSign';
import ReservCalendar from './ReservCalendar';
import Test1 from './Test1';
import Test2 from './Test2';

const Reservation = () => {
    //체크인 체크아웃 날짜 스토어에서 받아오기
    const rv_date = useSelector(state => state.reserve.rv_date);
    //달력 보이기/안보이기 isShow가 true면 나타나기
    const [isShow, setIsShow] = useState(false);
    const dispatch = useDispatch();
    //예약불가능한 방목록
    const [reservRoom, setreservRoom] = useState([]);
    //성인, 아동수 업데이트 하기
    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(dataUpdate(
            {
                name,
                value
            }
        ))
    }
    //달력 이용해 checkin checkout등록 하고 사라지기
    const hideDateDiv = (start, end) => {
        if (start && end) {
            dispatch(dataUpdate({
                name: "rv_date",
                value: {
                    rv_start: start,
                    rv_end: end
                }
            }
            ))
            console.log(start, end);
            searchRoom(start, end)
            setIsShow(false);
        } else { return; }
    }
    //예약가능하지 않은 방목록 불러오기 
    const searchRoom = (start, end) => {
        axios.get(`${API_URL}/searchRoom?start=${start}&end=${end}`)
            .then(res => {
                console.log(res.data);
                setreservRoom(res.data);
                console.log(reservRoom);
            })
            .catch(e => console.log(e))
    }
    //예약하기 버튼 클릭시 
    return (
        <div className='inner'>
            <Title title="Reservation" />
            <Routes>
                <Route path="/*" element={<div>
                    <div className='reservation'>
                        <ul className='reservsearch'>
                            <li>
                                <div>
                                    <span>Check in</span>
                                    <input onClick={() => setIsShow(!isShow)} value={rv_date.rv_start} />
                                </div>
                                <div>
                                    <span>Check out</span>
                                    <input onClick={() => setIsShow(!isShow)} value={rv_date.rv_end} />
                                </div>
                                <div className='calendar'>
                                    {isShow && <ReservCalendar hideDateDiv={hideDateDiv} />}
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>Adults</span>
                                    <select name="rv_adult" onChange={onChange}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>Children</span>
                                    <select name="rv_child" onChange={onChange}>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                    </select>
                                </div>
                            </li>
                            <li onClick={() => searchRoom(rv_date.rv_start, rv_date.rv_end)}>
                                <div>검색</div></li>
                        </ul>
                    </div>
                    <RoomContainer isreserv={true} reservRoom={reservRoom} />

                </div>} />
                <Route path="/register" element={<ReservationSign />} />
            </Routes>
        </div>
    );
};

export default Reservation;