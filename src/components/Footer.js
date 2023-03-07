import React from 'react';
import './Footer.css';
const Footer = () => {
    return (
        <footer>
            <div className='footermenu'>
                <div className='inner'>
                    <ul>
                        <li>호텔소개</li>
                        <li>이용약관</li>
                        <li>개인정보처리방침</li>
                        <li>이메일무단수집금지</li>
                    </ul>
                </div>
            </div>
            <div className='inner'>
                인스타그램 바로가기<br/>
                ㈜대교 마이다스 호텔&리조트 12458 경기도 가평군 청평면 북한강로 2245 대표자 강호준 전화번호 031-589-5600 팩스번호 031-585-8240 이메일 guestservice@midasresort.com 사업자등록번호 837-85-00452 통신판매신고번호 제 2017-경기가평-49호<br/>
                Copyright © 2019 DAEKYO Co, LTD. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;