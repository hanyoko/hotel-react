import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import { getData } from '../modules/special';
import RoomDetailPage from '../pages/RoomDetailPage';

const RoomDetailContainer = () => {
    const { no } = useParams()
    const { data, loading, error } = useSelector(state=>state.special.special);
    const getRoomData = async () => {
       const data = axios.get(`${API_URL}/room/${no}`);
       return data;
    }
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getData(getRoomData))
    },
    [])
    if(loading) return <div>로딩중입니다.</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!data) return <div>데이터가 없습니다.</div>
    return (
        <RoomDetailPage data={data} />
        
    );
};

export default RoomDetailContainer;