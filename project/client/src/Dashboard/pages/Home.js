import React, { useState } from 'react'
import { styled } from 'styled-components'
import Navbar from './components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'
import config from '../../config'
import { mobile } from '../../responsive'

const Container = styled.div`
    padding-top: 100px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;

    ${mobile({
        paddingTop:'150px',
        flexDirection:'column-reverse'
    })}
`
const Left = styled.div`
    flex: 3;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Right = styled.div`
    flex: 3;
    position: relative;
    
`
const OrderContainer = styled.div`
    background-color: rgba(242, 242, 242, 1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: max-content;
    align-items: center;
    border-radius: 10px;
    padding: 50px;
    height: 400px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.5);
    box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.5); 
    ${mobile({
        width:'90%',
        padding: '30px 10px',
    })}
`
const OrderTitle = styled.h1`
    color: rgba(49, 49, 49, 1);
`
const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    background-color: transparent;
    align-items: unset !important;
`
const Input = styled.input`
    background-color: lightgray;
`
const Label = styled.label`
    color: rgba(175, 175, 175, 1);
    text-align: left;
    font-size: 15px;
`
const SelectPayMethod = styled.div`
    display: flex;
    flex-direction: row;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
`
const OptionPayMethod = styled.input`
    background-color: lightgray;
`
const Button = styled.button`
    background-color: gray;
    border: none;
    cursor: pointer;

    &:disabled {
        cursor: unset;
        opacity: 0.5;
    }
`
const LatestOrderContainer = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 10px;
`
const LatestOrderTitle = styled.h2`
    color: rgba(49, 49, 49, 1);
`
const Order = styled.div`
    height: fit-content;
    padding: 20px;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 1);
    box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 1); 
    display: flex;
    flex-direction: column;
    width: 100%;
`
const OrderInfo = styled.p`
    margin:0;
`
const Home = ({ images }) => {
    const { user } = useAuthContext()
    const luxerApi = config.luxerApi

    const [ client_phone, setClientPhone ] = useState(0)
    const [ total_entered, setTotalEntered ] = useState(0)
    const [ paid_with, setPaidWith ] = useState('')
    const [ error, setError ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ success, setSuccess ] = useState('')
    const [ latestOrder, setLatestOrder ] = useState('')

    const placeOrder = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!client_phone || !total_entered || !paid_with) {
            setError("All fields must be filled")
            setIsLoading(false)
            return 0
        }
        const response = await fetch(`${luxerApi}/orders/create-order`, {
            method:'POST',
            body: JSON.stringify({ client_phone, total_entered, paid_with }),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            setSuccess('Order Placed Successfully')
            setClientPhone('')
            setTotalEntered('')
            setIsLoading(false)
            setLatestOrder(json)
            setError('')
        }
        if (!response.ok) {
            setSuccess('')
            setIsLoading(false)
            setError(json.error)
        }
    }

    

    return (
        <>
            <Navbar images={images} />
            <Container>
                {/* <Left>
                    lefts
                    {
                        latestOrder && (
                            <>
                                <LatestOrderTitle>Latest Order</LatestOrderTitle>
                                <LatestOrderContainer>
                                    <Order>
                                        <h3>Order Invoice</h3>
                                        <OrderInfo><span style={{fontWeight:'bold'}}>Total: </span>{latestOrder.orderAfterUpdate.total} egp</OrderInfo>
                                        <hr/>
                                        <OrderInfo><span style={{fontWeight:'bold'}}>Rewarded loyalty points: </span>{latestOrder.orderAfterUpdate.loyalty_points_added} points</OrderInfo>
                                        <hr/>
                                        <OrderInfo><span style={{fontWeight:'bold'}}>Ordered at: </span>{latestOrder.orderAfterUpdate.created_at}</OrderInfo>
                                    </Order>
                                </LatestOrderContainer>
                            </>
                        )
                    }
                </Left> */}
                <Right>
                    <OrderContainer>
                        <OrderTitle>
                            New Order
                        </OrderTitle>
                        <FormContainer onSubmit={placeOrder}>
                            <Input value={client_phone} onChange={e=>setClientPhone(e.target.value)} type='tel' placeholder='Client Phone Number' maxLength='12' />
                            <Input value={total_entered} onChange={e=>setTotalEntered(e.target.value)} type='Number' placeholder='Total' />
                            <Label htmlFor='paid-with'>Payment method</Label>
                            <SelectPayMethod value={paid_with} onChange={e=>setPaidWith(e.target.value)} id='paid-with' type='radio' placeholder='Total' >
                                <OptionPayMethod id='paid-with-egp' type='radio' name='paidWith' value="EGP"/>
                                <Label htmlFor='paid-with-egp'>Egyptian Pounds</Label>
                                <OptionPayMethod id='paid-with-points' type='radio' name='paidWith' value="Loyalty Points"/>
                                <Label htmlFor='paid-with-points'>Loyalty Points</Label>
                            </SelectPayMethod>
                            <Button disabled={isLoading}>Place Order</Button>
                            {
                                error && (
                                    <div style={{color:'red'}}>
                                        {error}
                                    </div>
                                )
                            }
                            {
                                success && (
                                    <div style={{color:'green'}}>
                                        {success}
                                    </div>
                                )
                            }
                        </FormContainer>
                    </OrderContainer>
                </Right>
            </Container>
        </>
    )
}

export default Home
