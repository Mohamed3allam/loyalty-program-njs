import { api } from 'config'
import { useAuthContext } from 'hooks/useAuthContext'
import { useOrdersContext } from 'hooks/useOrdersContext'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const NewOrder = () => {

  const [client_phone, setClientPhone] = useState('')
  const [total_entered, setTotalEntered] = useState('')
  const [use_voucher, setUseVoucher] = useState(false)
  const [unique_id, setUniqueId] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { orders, dispatch} = useOrdersContext()
  const { user } = useAuthContext()


  

  const handleSubmit = async (e) => {
      try {
          e.preventDefault()
          setIsLoading(true)

          if (!client_phone || !total_entered || typeof(use_voucher) !== 'boolean') {
              setError('All fields must be filled')
              setIsLoading(false)
              setSuccess(false)
              return 0
          }
          if (total_entered.length > 20) {
              setError('too long number')
              setIsLoading(false)
              setSuccess(false)
              return 0
          }
          if (use_voucher === true) {
            if (!unique_id) {
              setError("You must add your generated voucher's ID")
              setSuccess('')
              setIsLoading(false)
              return 0
            }
          } else if (use_voucher === false) {
            if (unique_id) {
              setError("Cannot add your generated voucher's ID when 'Use voucher' is not check")
              setIsLoading(false)
              setSuccess('')
              return 0
            }
          }

          
          const data = new FormData()
          // image && data.append('voucher-image', image)
          data.append('client_phone', client_phone)
          data.append('total_entered', total_entered)
          data.append('paid_with', use_voucher ? 'Voucher_EGP' : 'EGP')
          data.append('use_voucher', use_voucher)
          data.append('unique_id', unique_id)

          const jsonData = {
            client_phone:client_phone,
            total_entered:total_entered,
            paid_with:use_voucher ? 'Voucher_EGP' : 'EGP',
            use_voucher:use_voucher,
            unique_id:unique_id
          }

          console.log(data, jsonData)

          const response = await fetch(`${api}/orders/create-order`, {
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':`Bearer ${user.token}`
              },
              body: JSON.stringify(jsonData)
          })
          const json = await response.json()
          if (response.ok) {
              setSuccess('Order Created successfully')
              setError('')
              setIsLoading(false)
              dispatch({type:'CREATE_ORDER', payload: json})
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
      <h2>Create New Order</h2>
      <Form.Group className="mb-3">
          <Form.Label>Client Phone Number</Form.Label>
          <Form.Control value={client_phone} onChange={(e) => setClientPhone(e.target.value)} type="tel" placeholder="Enter Client Phone Number" required maxLength='14'/>
      </Form.Group>
      <Form.Group className="mb-3">
          <Form.Label>Order Total</Form.Label>
          <Form.Control value={total_entered} onChange={(e) => setTotalEntered(e.target.value)} type="number" placeholder="Enter Total" required maxLength='20'/>
      </Form.Group>
      <Form.Group style={{display:'flex'}} className="mb-3">
          <Form.Check value={use_voucher} onChange={(e) => setUseVoucher(e.target.checked)} type="checkbox" required /> &nbsp;
          <Form.Label>Use Voucher</Form.Label>
      </Form.Group>
      {
        use_voucher === true && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Voucher Generated Code</Form.Label>
              <Form.Control value={unique_id} onChange={(e) => setUniqueId(e.target.value)} type="text" placeholder="Enter Your generated Voucher ID" required />
          </Form.Group>
        )
      }
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
      <Button disabled={isLoading} onClick={handleSubmit} variant="primary">
          Submit
      </Button>
    </Form>
  )
}

export default NewOrder
