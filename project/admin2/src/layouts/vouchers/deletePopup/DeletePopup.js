import { api } from 'config';
import { useAuthContext } from 'hooks/useAuthContext';
import { useVouchersContext } from 'hooks/useVouchersContext';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components';

const PreviewImage = styled.img`
    max-width:30%;
`
const Title = styled.h3`
    text-align: center;
    margin-bottom: 30px;
`
const DeletePopup = (props) => {
    const [title, setTitle] = useState('')
    const [egp, setEgp] = useState('')
    const [loyalty_points, setLoyaltyPoints] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {vouchers, dispatch} = useVouchersContext()
    const { user } = useAuthContext()


    

    const handleDelete = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)

            const response = await fetch(`${api}/vouchers/delete-voucher/${props.voucher._id}`, {
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setSuccess('Voucher Deleted successfully')
                setError('')
                setIsLoading(false)
                dispatch({type: 'DELETE_VOUCHER', payload: json})
                setTimeout(() => {
                    props.onHide();
                    props.mainprops.onHide()
                }, 1000)
            }
            if (!response.ok) {
                setSuccess('')
                setError(json.error)
                if (json.error === "Voucher doesn't exist or already been deleted") {
                    setTimeout(() => {
                        props.onHide();
                        props.mainprops.onHide()
                    }, 1000)
                    return 0
                }
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{
                zIndex:10000,
                backdropFilter:'brightness(0.5)'
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Voucher
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Title>
                        Are your sure you want to delete "{props.voucher.title}" Voucher?
                    </Title>
                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control onChange={(e) => setLoyaltyPoints(e.target.value)} type="tel" placeholder={`${props.voucher.loyalty_points}`} />
                    </Form.Group> */}
                    <div class='d-flex justify-content-center gap-2'>
                        <Button disabled={isLoading} className='btn-danger' onClick={handleDelete}>Delete</Button>
                        <Button disabled={isLoading} onClick={props.onHide}>Cancel</Button>
                    </div>
                    {
                        error && (
                            <p style={{color:'red'}}>
                                {error}
                            </p>
                        )
                    }
                    {
                        success && (
                            <p style={{color:'green'}}>
                                {success}
                            </p>
                        )
                    }
                    <br/>
                    
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default DeletePopup
