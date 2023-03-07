import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../config/apiurl';
import { getDatas } from '../modules/special';
import RoomPage from '../pages/RoomPage';

const roomData = async () => {
    const data = axios.get(`${API_URL}/room`);
    return data;
}
const RoomContainer = ({ isreserv, reservRoom }) => {
    const { loading, data, error } = useSelector(state => state.special.specials);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDatas(roomData))
    }, [dispatch])
    if (loading) return <div>로딩중입니다...</div>
    if (error) return <div>에러가 발생했습니다.</div>
    if (!data) return <div>데이터가 없습니다.</div>

    return (
        <RoomPage data={data} isreserv={isreserv} reservRoom={reservRoom} />
    );


};
export default RoomContainer;