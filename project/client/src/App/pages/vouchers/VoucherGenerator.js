import React, { useEffect, useState } from 'react'
import './voucher-generator.css'
import ClientNav from '../components/clientNav/ClientNav'
import config from '../../../config'
import { useClientAuthContext } from '../../hooks/useClientAuthContext'
import { styled } from 'styled-components'


const VouchersDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    max-width: 100%;
    flex-wrap: wrap;
`
const VoucherGenerator = ({ images }) => {
    const { client_user } = useClientAuthContext()
    const [ vouchers, setVouchers ] = useState()
    const [ error, setError ] = useState('')
    const [ warning, setWarning ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ voucherCode, setVoucherCode ] = useState([])

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await fetch(`${config.api}/vouchers/all-vouchers`, {
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${client_user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    setVouchers(json)
                }
                if (!response.ok) {
                    setError('Something went wrong')
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        client_user && fetchVouchers()

    },[])
    const generateVoucher = async (e, voucher_id, voucher_loyalty_points) => {
    e.preventDefault();
    setIsLoading(true)
    console.log(voucher_id, voucher_loyalty_points)
        if (!client_user) {
            setError('Your must be a user to generate a code')
            setIsLoading(false)
            return 0;
        }
        if (client_user.client.loyalty_points < voucher_loyalty_points) {
            setIsLoading(false)
            setError("You don't have enough loyalty points")
            return 0
        }
        const response = await fetch(`${config.api}/generated-vouchers/generate-voucher`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${client_user.token}`
            },
            body: JSON.stringify({voucher_id:voucher_id})
        })
        const json = await response.json()
        if (response.ok) {
            setIsLoading(false)
            setError('')
            setWarning('Voucher code will expire in ' + json.expiresAt)
            setVoucherCode(json)
        }
        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
            setWarning('')
        }

    }
    return (
        <div style={{marginTop:'250px'}}>
        <div className='container  p-5 text-light'>
            <h1 className='h1 font-weight-bold' style={{fontSize:'60px'}}>Available Vouchers</h1>
            <h1 className='h1 font-weight-bold text-danger' style={{fontSize:'30px'}}>Your Loyalty Points: {Math.round(client_user.client.loyalty_points)} points</h1>
            <VouchersDiv>
            {
                vouchers && vouchers.map((voucher, index) =>(
                    <div key={index} className="voucher-card" style={{
                        backgroundImage: voucher.egp > 999 
                        ? 'linear-gradient(to right, rgb(191, 0, 0),rgb(255, 104, 104))'
                        : voucher.egp > 499
                        ? 'linear-gradient(to right, rgb(191, 115, 0),rgb(255, 180, 104))' 
                        : voucher.egp > 199
                        ? 'linear-gradient(to right, rgb(191, 188, 0),rgb(255, 225, 104))'
                        : 'linear-gradient(to right, rgb(83, 0, 191),rgb(169, 104, 255))',

                        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
                        }}>
                        <div className="text-center">
                            <div className="d-flex align-items-center flex-row text-center">
                            <img src={images['logo.png']} width="70" className='img-fluid' style={{height:'70%', filter:'drop-shadow(0px 0px 3px black)'}}/>
                            <div className="d-flex flex-column ml-1">
                                <h1 className="mb-2 percent">{voucher.egp}<sub><sub>L.E</sub></sub></h1>
                                <span className="discount">Discount</span>
                            </div>
                        </div>
                        </div>
                        <hr className="line" />
                        <span className="text-white">For <b>{voucher.loyalty_points}</b> points </span>
                        <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                            <span className="text-white">Generate Code</span>
                            <div className="form-check form-switch">
                                <button className='btn btn-warning' onClick={(e) => generateVoucher(e, voucher._id, voucher.loyalty_points)}>Generate</button>
                            </div>
                        </div>
                        <div className="">
                            <input className="form-control" type="text" placeholder={null} aria-label="Disabled input example" disabled value={voucherCode.voucher_id === voucher._id ? voucherCode.unique_id : ''} />
                            {error && error}
                        </div>
                    </div>
                ))
            }

            </VouchersDiv>
         </div>
         </div>
    )
}

export default VoucherGenerator
