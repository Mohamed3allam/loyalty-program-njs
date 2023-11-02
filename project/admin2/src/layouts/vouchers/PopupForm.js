import { api } from 'config';
import { useAuthContext } from 'hooks/useAuthContext';
import { useVouchersContext } from 'hooks/useVouchersContext';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components';

const PreviewImage = styled.img`
    max-width:30%;
`

const PopupForm = (props) => {
    const [title, setTitle] = useState('')
    const [egp, setEgp] = useState('')
    const [loyalty_points, setLoyaltyPoints] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {vouchers, dispatch} = useVouchersContext()
    const { user } = useAuthContext()


    

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)

            if (!egp || !loyalty_points || !title) {
                setError('All fields must be filled')
                setIsLoading(false)
                setSuccess(false)
                return 0
            }
            if (title.length > 20) {
                setError('too long title')
                setIsLoading(false)
                setSuccess(false)
                return 0
            }
            
            const data = new FormData()
            // image && data.append('voucher-image', image)
            data.append('title', title)
            data.append('egp', egp)
            data.append('loyalty_points', loyalty_points)

            const jsonData = {
                title:title,
                egp:egp,
                loyalty_points:loyalty_points
            }
            console.log(data, jsonData)

            const response = await fetch(`${api}/vouchers/create-voucher`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify(jsonData)
            })
            const json = await response.json()
            if (response.ok) {
                setSuccess('Voucher Added successfully')
                setError('')
                setIsLoading(false)
                dispatch({type: 'CREATE_VOUCHER', payload: json})
                setTitle('')
                setEgp('')
                setLoyaltyPoints('')
                setImage('')
            }
            if (!response.ok) {
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
                    Create New Voucher
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Voucher Name</Form.Label>
                        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="tel" placeholder="Enter title for your voucher" required maxLength='20'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Egyptian Pounds</Form.Label>
                        <Form.Control value={egp} onChange={(e) => setEgp(e.target.value)} type="tel" placeholder="Enter amount of egyptian pounds" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Loyalty points</Form.Label>
                        <Form.Control value={loyalty_points} onChange={(e) => setLoyaltyPoints(e.target.value)} type="tel" placeholder="Enter the equivalent amount of loyalty points" required />
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
                    <Button  onClick={handleSubmit} variant="primary">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopupForm
