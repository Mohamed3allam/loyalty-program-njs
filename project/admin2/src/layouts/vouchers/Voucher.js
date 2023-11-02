import React from 'react'
import { styled } from 'styled-components'

const VoucherTitle = styled.h3`
    color: rgba(53, 47, 47, 1) ;
`
const Egp = styled.h3`
    color: green;
`
const Lp = styled.h4`
    color:lightskyblue;
`
const Voucher = ({ images, voucher }) => {
  return (
    <>
        <div key={voucher._id} className="card" style={{width: "18rem", backgroundImage:`url('${images['logo.png']}')`}}>
            <img className="card-img-top" src={voucher.voucher_image_url} alt="Voucher Image" />
            <VoucherTitle>
                {voucher.title}
            </VoucherTitle>
            <Egp>
                <sup>Egp</sup>{voucher.egp}
            </Egp>
            
            <Lp>
                <sup>Lp</sup>{voucher.loyalty_points}
            </Lp>
            
            <div className="card-body">
                {/* <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </>
  )
}

export default Voucher
