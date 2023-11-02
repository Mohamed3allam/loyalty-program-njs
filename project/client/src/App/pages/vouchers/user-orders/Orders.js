import React from 'react'
import { useClientAuthContext } from '../../../hooks/useClientAuthContext'

const Orders = ({  client_user, images }) => {

    client_user && console.log(client_user.client.log)

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <h2 className='h2'>
                    <b>Your Past Orders</b>
                </h2>
                <div className="row d-flex justify-content-center align-items-center h-100">
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
                                                    Voucher Sale : <b>{order.total-order.paid_in_egp} EGP</b>
                                                </p>
                                                <p className="small mb-0">
                                                    Voucher ID : <b>{order.voucher_unique_id}</b>
                                                </p>
                                            </>
                                        )
                                    }
                                    <hr className="mt-4" />
                                    <p className="small mb-2">
                                        Total {order.use_voucher && 'after sale'} : <b>{order.total}</b>
                                    </p>
                                    <p className="small mb-2"><i className="far fa-star fa-lg"></i> <span className="mx-2">|</span> Created by
                                        <strong> {order.user_name}</strong> at <strong>{order.created_at}</strong>
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
                        
                        <div className="card" style={{borderRadius: "15px"}}>
                            <div className="card-body p-4">
                            <h3 className="mb-3">Company Culture</h3>
                            <p className="small mb-0"><i className="fas fa-star fa-lg text-warning"></i> <span className="mx-2">|</span>
                                Public <span className="mx-2">|</span> Updated by <strong>MDBootstrap</strong> on 11 April , 2021
                            </p>
                            <hr className="my-4" />
                            <div className="d-flex justify-content-start align-items-center">
                                <p className="mb-0 text-uppercase"><i className="fas fa-cog me-2"></i> <span
                                    className="text-muted small">settings</span></p>
                                <p className="mb-0 text-uppercase"><i className="fas fa-link ms-4 me-2"></i> <span
                                    className="text-muted small">program link</span></p>
                                <p className="mb-0 text-uppercase"><i className="fas fa-ellipsis-h ms-4 me-2"></i> <span
                                    className="text-muted small">program link</span>
                                <span className="ms-3 me-4">|</span></p>
                                <a href="#!">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp" alt="avatar"
                                    className="img-fluid rounded-circle me-1" width="35" />
                                </a>
                                <a href="#!">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp" alt="avatar"
                                    className="img-fluid rounded-circle me-1" width="35" />
                                </a>
                                <a href="#!">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp" alt="avatar"
                                    className="img-fluid rounded-circle me-1" width="35" />
                                </a>
                                <a href="#!">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
                                    className="img-fluid rounded-circle me-3" width="35" />
                                </a>
                                <button type="button" className="btn btn-outline-dark btn-sm btn-floating">
                                <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orders
