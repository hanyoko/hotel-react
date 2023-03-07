import React from 'react';
import Title from '../components/Title';
import { API_URL } from '../config/apiurl';
import './RoomDetailPage.css';
const RoomDetailPage = ({ data }) => {
    return (
        <div className='inner'>
            <Title title={data.r_name} />
            <div className='roomdetail'>
                <img src={`${API_URL}/upload/event/${data.r_img1}`} alt="" />
                <div className='roomtitle'>
                    <h3>{data.r_name}</h3>
                    <button>객실예약</button>
                </div>
                <ul className='roominfo'>
                    <li>
                        <h4>기본정보</h4>
                        <ul>
                            <li>객실크기 : 13평</li>
                            <li>체크인: 15:00 </li>
                            <li>이용요금: {data.r_price}</li>
                            <li>베드타입 : {data.r_bed}</li>
                            <li>체크아웃: 11:00</li>
                            <li>이용문의 052-589-1234</li>
                        </ul>
                    </li>
                    <li>
                        <h4>어메니티</h4>
                        <ul>
                            <li>북한강</li>
                            <li>체크인: 15:00 </li>
                            <li>이용요금: 330,000</li>
                            <li>베드타입 : 퀸 베드 1개</li>
                            <li>체크아웃: 11:00</li>
                            <li>이용문의 052-589-1234</li>
                        </ul>
                    </li>
                    <li>
                        <h4>이용안내</h4>
                        <ul>
                            <li>수용 인원 : 기준 2인 (최대 2인)</li>
                            <li>
                                수용 인원 : 기준 2인 (최대 2인)<br />
                                엑스트라 베드 추가 가능 45,000원/1박 (VAT포함) </li>
                            <li>수량이 한정되어 있으므로 사전 요청바랍니다.</li>
                            <li>히터, 가습기, 침대 가드, 아기 침대(12개월 이하), 젖병 소독기, 어린이 발 디딤대 등 무료 대여 가능합니다.</li>
                            <li>객실 내 금연 (실외 흡연 공간 별도 마련)</li>
                            <li>사전 등록된 차량만 출입이 가능하므로 투숙 전 차량 등록바랍니다.</li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default RoomDetailPage;