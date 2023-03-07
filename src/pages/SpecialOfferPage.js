import {Link} from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import React from 'react';
import Title from '../components/Title';
function SpecialList({list}){
    const { e_title, e_titledesc, e_img1 , e_no, e_time} = list;
    return (
        <li>
            <div className='imgdiv'>
                <img src={`${API_URL}/upload/event/${e_img1}`} alt=""/>
            </div>
            <div className='textdiv'>
                <Link to={`/special/${e_no}`}>
                <h3>{e_title}</h3>
                <p>
                    {e_titledesc}
                </p>
                <div>
                    기간 | {e_time}
                </div>
                </Link>
            </div>
        </li>
    )
}
const SpecialOfferPage = ({data}) => {
    const listItems = data.map((d,index)=><SpecialList list={d} key={index}/>);
    return (
        <div className='specialpage'>
            <div className='inner'>
            <Title title="Special"/>
            <ul>
                {listItems}
            </ul>
        </div>
        </div> 
    );
};

export default SpecialOfferPage;