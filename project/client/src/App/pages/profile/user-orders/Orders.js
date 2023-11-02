import React from 'react'
import { useClientAuthContext } from '../../../hooks/useClientAuthContext'

const Orders = ({  client_user, images }) => {

    client_user && console.log(client_user.client.log)

    return (
        <section style={{height:'fit-content'}}>
            <div className="container py-5 h-100">
                <h2 className='h2'>
                    <b>Your Past Orders</b>
                </h2>
                <div  className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-11">
                        {
                            client_user && client_user.client.log.map((order, index) => (
                                <div key={index} className="card mb-5 p-3" style={{borderRadius: "15px"}}>
                                    <div className="card-body p-4">
                                    <h3 className="mb-3"><b>#{order.invoice_id}</b></h3>
                                    <p className="small mb-0">
                                        Payment Method : <b>{order.paid_with}</b>
                                    </p>
                                    <p className="small mb-0">
                                        Voucher used : <b>{order.use_voucher ? 'Yes' : "No"}</b>
                                    </p>
                                    {
                                        order.use_voucher && (
                                            <>
                                                <p className="small mb-0">
                                                    Voucher Sale : <b>{order.total-order.paid_in_egp} L.E OFF</b>
                                                </p>
                                                <p className="small mb-0">
                                                    Voucher ID : <b>{order.voucher_unique_id}</b>
                                                </p>
                                            </>
                                        )
                                    }
                                    
                                    <hr className="mt-4" />
                                    <p className="small mb-0">
                                        Total {order.use_voucher && 'after sale'} : <b>{order.total}</b>
                                    </p>
                                    <p className="small mb-3">
                                        Loyalty Points Added : <b>{order.loyalty_points_added} points</b>
                                    </p>
                                    <p className="small mb-2"><i className="far fa-star fa-lg"></i> <span className="mx-2">|</span> Created by
                                        <strong> {order.user_name}</strong>
                                    </p>
                                    <p className="small mb-2"><i className="far fa-star fa-lg"></i> <span className="mx-2">|</span> Created at
                                        <strong> {order.created_at}</strong>
                                    </p>
                                    
                                    <div className="d-flex justify-content-start align-items-center">
                                        <button type="button" className="btn btn-outline-dark btn-sm btn-floating">
                                            <i className="fas fa-plus"> invoice</i>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orders
