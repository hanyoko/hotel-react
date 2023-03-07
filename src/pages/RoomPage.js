import React, { useState } from 'react';
import RoomList from '../components/RoomList';
import Title from '../components/Title';

const RoomPage = ({ data, isreserv, reservRoom }) => {
    //roomNos배열에 da.r_no값이 없으면 리턴
    // if (reservRoom) {
    //     const newdata = data.filter(da => reservRoom.indexOf(da.r_no) === -1);
    //     const listitems = data.map(da => <RoomList data={da} key={da.r_no} />);
    // } else {
    //     const listitems = data.map(da => <RoomList data={da} key={da.r_no} />);
    // }
    const listitems = reservRoom ? 
    data.filter(da => reservRoom.indexOf(da.r_no) === -1).map((da,index) => 
    <RoomList data={da} key={index} />)
        : data.map((da,index) => <RoomList data={da} key={index} />);
    return (
        <div className='inner'>
            {/* 예약페이지가 아닐때만 타이틀 지정하기 */}
            {!isreserv && <Title title="Room" />}
            {isreserv && <div 
            style={{ 
                padding: "40px 0", fontSize: "18px" }}>객실</div>}
            <ul>
                {listitems}
            </ul>
        </div>
    );
};

export default RoomPage;