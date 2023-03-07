import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../config/apiurl';
import { getDatas } from '../modules/special';
import SpecialOffer from '../pages/SpecialOffer';
import SpecialOfferPage from '../pages/SpecialOfferPage';

const SpecialContainer = ({ isMain, limits }) => {
    const specialData = async () => {
        const data = axios.get(`${API_URL}/specials/${limits}`);
        return data;
    }
    const { loading, data, error} = useSelector(state=>state.special.specials);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDatas(specialData))
    },[])
    if(loading) return <div>로딩중입니다...</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!data) return <div>데이터가 없습니다.</div>
    if(isMain){
        return (
            <SpecialOffer data={data}/>
        );
    }else {
        return (
            <SpecialOfferPage data={data}/>
        )
    }
   
};
export default SpecialContainer;