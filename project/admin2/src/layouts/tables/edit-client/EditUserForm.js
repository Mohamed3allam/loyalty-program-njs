import { api } from 'config';
import { useAuthContext } from 'hooks/useAuthContext';
import { useUsersContext } from 'hooks/useUsersContext';
import { useVouchersContext } from 'hooks/useVouchersContext';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from 'styled-components';

const PreviewImage = styled.img`
    max-width:30%;
`

const EditUserForm = (props) => {
    const { user } = useAuthContext()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {users, dispatch} = useUsersContext()


    const handleUpdate = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
  
            if (!firstName && !lastName && !email && !phone && !role) {
                setError('Edit at least 1 field')
                setIsLoading(false)
                setSuccess('')
                return 0
            }
  
            
            const data = new FormData()
            // image && data.append('voucher-image', image)
            data.append('name', {firstName,lastName})
            data.append('email', email)
            data.append('phone', phone)
            data.append('role', role)
  
            const jsonData = {name:{}};

            if (firstName) jsonData.name.firstName = firstName;
            if (lastName) jsonData.name.lastName = lastName;
            if (email) jsonData.email = email;
            if (phone) jsonData.phone = phone;
            if (role) jsonData.role = role;
  
            console.log(data, jsonData)
            
            const response = await fetch(`${api}/users/update-user/${props.user._id}`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify(jsonData)
            })
            const json = await response.json()
            if (response.ok) {
                setSuccess('User Updated successfully')
                setError('')
                setIsLoading(false)
                dispatch({type: 'UPDATE_USER', payload: json})
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setRole('')
                // setClientPhone('')
                // setPaidWith('')
                // setTotalEntered('')
                // setUniqueId('')
                // setUseVoucher(false)
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
                    Edit User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.user && (
                        <Form style={{padding:'30px'}}>
                            <h2>Edit User "{props.user.name.firstName}"</h2>
                            <Form.Group className="mb-3">
                                <div style={{display:'flex',gap:'20px'}}>
                                    <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder={props.user.name.firstName} maxLength='10'/>
                                    <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder={props.user.name.lastName} maxLength='10'/>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={props.user.email} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder={props.user.phone} maxLength="14"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select value={role} onChange={(e) => setRole(e.target.value)} placeholder="Choose Role" >
                                    <option value='' style={{color:'darkgray !important'}}>Choose Role .. </option>
                                    <option value="Admin">Admin</option>
                                    <option value="Super Admin">Super Admin</option>
                                </Form.Select>
                            </Form.Group>
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
                            <Button disabled={isLoading} onClick={handleUpdate} variant="primary">
                                Submit
                            </Button>
                        </Form>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditUserForm
