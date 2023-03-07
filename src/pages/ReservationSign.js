import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../config/apiurl';
import { getCookie } from '../util/cookie';
import { setLogin, setLogout } from '../modules/logincheck';
import './ReservationSign.css';
import { useNavigate } from 'react-router-dom';
export default function ReservationSign() {
    const reserve = useSelector(state => state.reserve);
    const isLogin = useSelector(state => state.logincheck.isLogin);
    const dispatch = useDispatch();
    const useremail = getCookie("useremail");
    const username = getCookie("username");
    const userphone = getCookie("userphone");
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        rv_checkin: reserve.rv_date.rv_start,
        rv_checkout: reserve.rv_date.rv_end,
        rv_adult: reserve.rv_adult,
        rv_child: reserve.rv_child,
        rv_email: useremail ? useremail : "",
        rv_phone: userphone ? userphone : "",
        rv_name: username ? username : "",
        rv_roomname: reserve.rv_room.roomname,
        rv_roomno: reserve.rv_room.roomno,
        rv_price: reserve.rv_room.price,
        rv_desc: "",
        rv_reno: ""
    });
    const randomCh = () => {
        axios.get(`${API_URL}/codeCheck`)
            .then(res => {
                if (res.data !== "no") {
                    setFormData({
                        ...formData,
                        rv_reno: res.data
                    })
                }
            })
            .catch(e => console.log(e))
    }

    const onChange = (e) => {
        const { name, value } = e.target;
    }
    const addReserve = () => {
        if (!formData.rv_reno) {
            randomCh();
        }
        if (!formData.rv_name && !formData.rv_email && !formData.rv_phone) {
            alert("고객정보를 입력해주세요");
            return;
        }
        if (!formData.rv_checkin && !formData.rv_checkout && !formData.rv_checkin &&
            !formData.rv_adult && !formData.rv_child) {
            alert("예약정보를 다시 선택해주세요");
            return;
        }
        if (!formData.rv_roomname && !formData.rv_roomno && !formData.rv_price) {
            alert("객실을 다시 선택해주세요");
            return;
        }
        axios.post(`${API_URL}/addReservation`, formData)
            .then(res => {
                console.log(res);
                alert(`예약되셨습니다. 예약번호는 ${res.data}입니다.`);
                navigate("/");
            })
            .catch(e => console.log(e))
    }
    useEffect(() => {
        randomCh();
        if (useremail) {
            dispatch(setLogin());
        } else {
            dispatch(setLogout());
        }
    }, [useremail])
    return (
        <div className='reserveSign'>
            <div className='reserveCumtomer'>
                <h3>고객정보입력</h3>
                <table className='defaulttable'>
                    <tbody>
                        <tr>
                            <td>성명</td>
                            <td><input type="text" value={formData.rv_name} name="rv_name"
                                onChange={onChange} /></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><input type="text" value={formData.rv_email} name="rv_email"
                                onChange={onChange} /></td>
                        </tr>
                        <tr>
                            <td>연락처</td>
                            <td><input type="text" value={formData.rv_phone} name="rv_phone"
                                onChange={onChange} /></td>
                        </tr>
                        <tr>
                            <td>기타/요청사항</td>
                            <td>
                                <textarea name="rv_desc" onChange={onChange}></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='reserveInfo'>
                <h3>예약정보</h3>
                <ul>
                    <li><span>체크인</span>  <span>	{formData.rv_checkin}</span></li>
                    <li><span>체크아웃</span>	<span>{formData.rv_checkout}</span></li>
                    <li><span>투숙 인원</span>	<span>성인 : {formData.rv_adult} / 어린이 : {formData.rv_child}</span></li>
                    <li><span>객실타입</span> <span>{formData.rv_roomname}</span></li>
                </ul>
                <div className='totalPrice'>
                    <div>총 합계 금액(VAT 포함가)</div>
                    <div className='price'>{formData.rv_price}<span>원</span></div>
                </div>
                <div>
                    <button onClick={addReserve}>예약하기</button>
                </div>
            </div>
        </div >
    )
}
