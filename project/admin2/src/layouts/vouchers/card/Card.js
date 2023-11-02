import React, { useState } from 'react'
import './card.css'
import { Button } from "react-bootstrap";
import EditPopup from '../editPopup/EditPopup';

const Card = ({voucher, images}) => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
        <div className="gift-card">
            <div className="gift-card__image">
                <img src={images['logo.png']} className='img-fluid' />
            </div>
            <section className="gift-card__content" style={{
                backgroundImage: voucher.egp > 999 
                ? 'linear-gradient(to right, rgb(191, 0, 0),rgb(255, 104, 104))'
                : voucher.egp > 499
                ? 'linear-gradient(to right, rgb(191, 115, 0),rgb(255, 180, 104))' 
                : voucher.egp > 199
                ? 'linear-gradient(to right, rgb(191, 188, 0),rgb(255, 225, 104))'
                : 'linear-gradient(to right, rgb(83, 0, 191),rgb(169, 104, 255))'
            }}>
                <div className="gift-card__title">{voucher.title}</div>
                <div className="gift-card__amount">{voucher.egp}<sub>egp</sub></div>
                <div className="gift-card__amount-remaining">for {voucher.loyalty_points} loyalty points</div>    
                    <Button className='btn-warning' onClick={()=>setModalShow(true)}>Edit Voucher</Button>
                <EditPopup
                    voucher={voucher && voucher}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </section>
        </div>
    </>


  )
}

export default Card
