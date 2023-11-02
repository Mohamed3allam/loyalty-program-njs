import { api } from 'config';
import { useVouchersContext } from 'hooks/useVouchersContext';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components';
import DeletePopup from '../deletePopup/DeletePopup';
import { useAuthContext } from 'hooks/useAuthContext';

const PreviewImage = styled.img`
    max-width:30%;
`

const EditPopup = (props) => {
    const [title, setTitle] = useState('')
    const [egp, setEgp] = useState('')
    const [loyalty_points, setLoyaltyPoints] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {vouchers, dispatch} = useVouchersContext()
    const { user } = useAuthContext()

    const [modalShow, setModalShow] = useState(false)



    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)

            if (!egp && !loyalty_points && !title) {
                setError("You're not editing anything")
                setIsLoading(false)
                setSuccess(false)
                return 0
            }
            
            const data = new FormData()
            // image && data.append('voucher-image', image)
            data.append('title', title)
            data.append('egp', egp)
            data.append('loyalty_points', loyalty_points)

            const jsonData = {};
            if (title) {
                jsonData['title'] = title;
            }
            if (egp) {
                jsonData['egp'] = parseInt(egp);
            }
            if (loyalty_points) {
                jsonData['loyalty_points'] = parseInt(loyalty_points);
            }
            console.log(data, jsonData)

            const response = await fetch(`${api}/vouchers/update-voucher/${props.voucher._id}`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify(jsonData)
            })
            const json = await response.json()
            if (response.ok) {
                setSuccess('Voucher Updated successfully')
                setError('')
                setIsLoading(false)
                dispatch({type: 'UPDATE_VOUCHER', payload: json})
                setTitle('')
                setEgp('')
                setLoyaltyPoints('')
                setTimeout(() => {
                    props.onHide()
                }, 1000)
            }
            if (!response.ok) {
                if (json.error === 'No voucher with these data') {
                    setTimeout(() => {
                        props.onHide()
                    }, 1000)
                }
                setSuccess('')
                setError(json.error)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    // const imageHandle = () => {
    //     const [file] = document.getElementById('set-image').files
    //     console.log(file)
    //     if (file) {
    //         document.getElementById('preview-image').src = URL.createObjectURL(file)
    //         setImage(file)
    //     }
    // }

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
                    Edit Voucher
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Voucher Name</Form.Label>
                        <Form.Control disabled={isLoading} value={title} onChange={(e) => setTitle(e.target.value)} type="tel" placeholder={`${props.voucher.title}`} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Egyptian Pounds</Form.Label>
                        <Form.Control disabled={isLoading} value={egp} onChange={(e) => setEgp(e.target.value)} type="tel" placeholder={`${props.voucher.egp}`} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Loyalty points</Form.Label>
                        <Form.Control disabled={isLoading} value={loyalty_points} onChange={(e) => setLoyaltyPoints(e.target.value)} type="tel" placeholder={`${props.voucher.loyalty_points}`} />
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                        <PreviewImage className='img-fluid' id='preview-image'/>
                        <Form.Control id='set-image' onChange={imageHandle} type="file" placeholder="Enter an image for your voucher" required accept='image/*' multiple={false} />
                        <Form.Label htmlFor='set-image'>Enter an image for your voucher</Form.Label>
                    </Form.Group> */}
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
                    <Button disabled={isLoading} onClick={handleSubmit} variant="primary">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-danger'  onClick={()=>setModalShow(true)}>Delete</Button>
                <DeletePopup
                    voucher={props.voucher && props.voucher}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    mainprops={props}
                />
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditPopup
