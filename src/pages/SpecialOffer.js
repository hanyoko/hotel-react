import {Link} from 'react-router-dom';
import React from 'react';
import { API_URL } from '../config/apiurl';
import './SpecialOffer.css';
function SpecialList({list}){
    const { e_title, e_titledesc, e_img1 , e_no} = list;
    return (
        <li>
            <div className='imgdiv'>
                <img src={`${API_URL}/upload/event/${e_img1}`} alt=""/>
            </div>
            <div className='textdiv'>
                <h3>{e_title}</h3>
                <p>
                    {e_titledesc}
                </p>
                <div>
                    <Link to={`/special/${e_no}`}>
                    +<br/>
                    READ MORE</Link>
                </div>
            </div>
        </li>
    )
}
const SpecialOffer = ({ data }) => {
    return (
        <div className='special'>
            <div className='inner'>
                <h2><span>스페셜 오퍼</span>생각 밖의 선물, 마이다스 호텔 & 리조트</h2>
                <ul>
                    {data.map((d,index)=><SpecialList list={d} key={index}/>)}
                </ul>
            </div>
        </div>
    );
};

export default SpecialOffer;