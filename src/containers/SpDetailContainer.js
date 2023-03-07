import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import { getData } from '../modules/special';

const SpDetailContainer = () => {
    const { no } = useParams()
    const { data, loading, error } = useSelector(state => state.special.special);
    const dispatch = useDispatch();
    const getSpacialData = async () => {
        const data = axios.get(`${API_URL}/special/${no}`);
        return data;
    }
    useEffect(() => {
        dispatch(getData(getSpacialData))
    },
        [])
    if (loading) return <div>로딩중입니다.</div>
    if (error) return <div>에러가 발생했습니다.</div>
    if (!data) return <div>데이터가 없습니다.</div>
    return (

        <div>
            <h2>{data[0].e_title}</h2>
        </div>
    );
};

export default SpDetailContainer;