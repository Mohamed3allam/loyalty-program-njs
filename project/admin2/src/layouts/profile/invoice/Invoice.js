import { api } from 'config';
import { useAuthContext } from 'hooks/useAuthContext';
import { useUsersContext } from 'hooks/useUsersContext';
import { useVouchersContext } from 'hooks/useVouchersContext';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components';
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";

  import './invoice.css'

const PreviewImage = styled.img`
    max-width:30%;
`

const InvoiceLogo = styled.img`
    width: 200px;
    max-width: 200px;
`
const Invoice = (props) => {
    const { user } = useAuthContext()


    const [isLoading, setIsLoading] = useState(false)

function printInvoice(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    let w=window.open();
    w.document.write(printContents);
    w.print();
    w.close();
}

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{
                zIndex:9999
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.order && (

                        <MDBContainer download id='invoice_print' className="py-5">
                            <MDBCard>
                                <MDBCardBody className="mx-4">
                                <MDBContainer>
                                    <InvoiceLogo style={{width:'200px'}} src={props.images['logo.png']} className='img-fluid'/>
                                    <p className=" text-center" style={{ fontSize: "30px" }}>
                                        Thank for your purchase
                                    </p>
                                    <MDBRow>
                                        <MDBTypography listUnStyled>
                                            <li className="text-black">{props.order.client.name && props.order.client.name}</li>
                                            <li className="text-muted mt-1">
                                            <span className="text-black">Invoice</span> #{props.order.invoice_id}
                                            </li>
                                            <li className="text-black mt-1">{props.order.created_at}</li>
                                        </MDBTypography>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol xl="10">
                                                <p>Total</p>
                                            </MDBCol>
                                            <MDBCol xl="2">
                                                <p className="float-end">{props.order.total}<sub>egp</sub></p>
                                            </MDBCol>
                                            <hr />
                                        </MDBRow>
                                        <MDBCol xl="10">
                                            <p>Voucher used</p>
                                        </MDBCol>
                                        <MDBCol xl="2">
                                            <p className="float-end">{!props.order.use_voucher ? 'No' : 'Yes'}</p>
                                        </MDBCol>
                                        <hr />
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol xl="10">
                                            <p>Voucher Sale</p>
                                        </MDBCol>
                                        <MDBCol xl="2">
                                            <p style={{textDecoration:'line-through'}} className="float-end">{(props.order.total - props.order.paid_in_egp)}<sub>egp</sub></p>
                                        </MDBCol>
                                        <hr />
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol xl="10">
                                            <p>Voucher Code</p>
                                        </MDBCol>
                                        <MDBCol xl="2">
                                            <p className="float-end">{props.order.voucher_unique_id ?? 'None'}</p>
                                        </MDBCol>
                                        <hr style={{border:' 2px solid black'}}/>
                                    </MDBRow>
                                    <MDBRow className="text-black">
                                        <MDBCol xl="12">
                                            <p className="float-end fw-bold">Total: {props.order.paid_in_egp}<sub>egp</sub></p>
                                        </MDBCol>
                                        <hr style={{ border: "2px solid black" }} />
                                    </MDBRow>
                                    <div className="text-center" style={{ marginTop: "20px" }}>
                                        <p>We hope to see you Again </p>
                                    </div>
                                </MDBContainer>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                
                <Button onClick={()=>printInvoice('invoice_print')}>Print</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Invoice
