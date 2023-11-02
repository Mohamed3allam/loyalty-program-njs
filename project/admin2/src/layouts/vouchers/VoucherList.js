import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { api } from 'config';
import './voucher.css'
import { useVouchersContext } from 'hooks/useVouchersContext';
import Voucher from './Voucher';
import Card from './card/Card';
import { useAuthContext } from 'hooks/useAuthContext';

const VoucherList = ({ images }) => {
    const [error, setError] = useState('')
    const [allVouchers, setAllVouchers] = useState('')

    const {vouchers, dispatch} = useVouchersContext()
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchVouchers = async () => {
            const response = await fetch(`${api}/vouchers/all-vouchers`, {
                method:'GET',
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setAllVouchers(json)
                dispatch({type: 'SET_VOUCHERS', payload: json})
            }
            if (!response.ok) {
                setError(json.error)
            }
        }
        fetchVouchers()
    }, [dispatch])
    return (
        <>
            <div className='cards'>
                {
                    vouchers && vouchers.map((voucher, index) => (
                        <Card key={index} voucher={voucher} images={images} />
                    ))
                }
                {
                    !vouchers && <div>{error}</div>
                }
            </div>
        </>
    )
}

export default VoucherList
