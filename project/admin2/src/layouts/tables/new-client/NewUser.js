import { api } from 'config'
import { useAuthContext } from 'hooks/useAuthContext'
import { useOrdersContext } from 'hooks/useOrdersContext'
import { useUsersContext } from 'hooks/useUsersContext'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const NewUser = () => {
    const { user } = useAuthContext()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {users, dispatch} = useUsersContext()


  

  const handleSubmit = async (e) => {
      try {
          e.preventDefault()
          setIsLoading(true)

          if (!firstName || !lastName || !email || !password || !phone || !role) {
              setError('All fields must be filled')
              setIsLoading(false)
              setSuccess('')
              return 0
          }

          
          const data = new FormData()
          // image && data.append('voucher-image', image)
          data.append('name', {firstName,lastName})
          data.append('email', email)
          data.append('password', password)
          data.append('phone', phone)
          data.append('role', role)

          const jsonData = {
            name:{
                firstName:firstName,
                lastName:lastName
            },
            email:email,
            password:password,
            phone:phone,
            role:role
          }

          console.log(data, jsonData)

          const response = await fetch(`${api}/user-auth/signup-user`, {
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':`Bearer ${user.token}`
              },
              body: JSON.stringify(jsonData)
          })
          const json = await response.json()
          if (response.ok) {
              setSuccess('User Created successfully')
              setError('')
              setIsLoading(false)
              dispatch({type: 'CREATE_USER', payload: json})
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


  return (
    <Form style={{padding:'30px'}}>
        <h2>Create New User</h2>
        <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <div style={{display:'flex',gap:'20px'}}>
                <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" required maxLength='10'/>
                <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" required maxLength='10'/>
            </div>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail" required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Phone Number" required maxLength="14"/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)} placeholder="Choose Role" required >
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
        <Button disabled={isLoading} onClick={handleSubmit} variant="primary">
            Submit
        </Button>
    </Form>
  )
}

export default NewUser
