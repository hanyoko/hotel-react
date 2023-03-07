import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import { dataUpdate } from '../modules/reserve';
import './RoomList.css';
const RoomList = ({ data }) => {
    const price = Number(data.r_price).toLocaleString('ko-KR');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onReserve = () => {
        console.log("클릭클릭");
        dispatch(dataUpdate({
            name: "rv_room",
            value: {
                roomname: data.r_name,
                roomno: data.r_no,
                price: data.r_price
            }
        }))
        navigate('/reservation/register');
    }
    return (
        <li className='roomlist'>
            <div>
                <img src={`${API_URL}/upload/event/${data.r_img1}`} alt="" />
            </div>
            <div>
                <h3>{data.r_name}</h3>
                <p>기준인원 : 2 <br /> 최대인원 : 3</p>
            </div>
            <div>
                <div className='price'>{price}<br /><span>원/1박</span></div>
                <div>
                    <Link to={`/guestroom/${data.r_no}`}><button>객실 상세보기</button></Link>
                    <button onClick={onReserve}>예약하기</button>
                </div>
            </div>
        </li>
    );
};

export default RoomList;