import React from 'react'
import { styled } from 'styled-components'
import ClientNav from './components/clientNav/ClientNav'
import { useClientAuthContext } from '../hooks/useClientAuthContext'

const Container = styled.div`
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background: -webkit-linear-gradient(to right, #363636, #707070);
	background: linear-gradient(to right, #363636, #707070);
`
const Wrapper = styled.div`
    background-color: white;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 1);
    box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 1); 
    padding: 5%;
    position: relative;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 5%;
    overflow-x: hidden;
    overflow-y: scroll;
`
const Title = styled.h1`
    font-size: 35px;
    color: rgba(76, 76, 76, 1);
`
const SubHeading = styled.h2`
    font-size: 23px;
    font-weight: bold;
    color: rgba(48, 48, 48, 1);
    text-align: left;
`
const PersonalInfo = styled.div`
    display: flex;
    flex-direction: column;
`
const PersonalData = styled.div``
const InfoData = styled.p`
    font-size: 16px;
    margin: 5px;
`

const OrderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
`
const Order = styled.div`
    height: fit-content;
    padding: 20px;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 1);
    box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 1); 
    display: flex;
    flex-direction: column;
    min-width: fit-content;
    max-width: 50%;
`
const OrderInfo = styled.p`
    margin:0;
`
const Profile = () => {
    const { client_user } = useClientAuthContext()

    return (
        <Container>
            <Wrapper>
                <ClientNav />
                <Title>
                    Profile
                </Title>
                <PersonalInfo>
                    <SubHeading>
                        Personal Info
                    </SubHeading>
                    <PersonalData>
                        <InfoData>
                            <b style={{fontWeight:'bold'}}>Name: </b> {client_user.client.name}
                        </InfoData>
                        <InfoData>
                            <b style={{fontWeight:'bold'}}>Phone: </b> +{client_user.client.phone}
                        </InfoData>
                        <InfoData>
                            <b style={{fontWeight:'bold'}}>Total Money spent: </b> {client_user.client.amount_spent} EGP
                        </InfoData>
                        <InfoData>
                            <b style={{fontWeight:'bold'}}>Available Loyalty Points: </b> 
                            <b style={{color:'green'}}>{client_user.client.loyalty_points} Points (Equal to {client_user.client.loyalty_points * 0.2} EGP)</b>
                        </InfoData>
                        <InfoData>
                            <b style={{fontWeight:'bold'}}>Redeemed loyalty points: </b> 
                            <b style={{color:'red'}}>{client_user.client.redeemed_loyalty_points} Points</b>
                        </InfoData>
                    </PersonalData>
                </PersonalInfo>
                <PersonalInfo style={{gap:'10px'}}>
                    <SubHeading>
                        Your Orders
                    </SubHeading>
                    <OrderContainer>
                        {
                            client_user.client.log.map((order) => (
                                <Order key={order.id}>
                                    <h3>Order Invoice</h3>
                                    <OrderInfo><span style={{fontWeight:'bold'}}>Total: </span>{order.total} egp</OrderInfo>
                                    <hr/>
                                    <OrderInfo><span style={{fontWeight:'bold'}}>Rewarded loyalty points: </span>{order.loyalty_points_added} points</OrderInfo>
                                    <hr/>
                                    <OrderInfo><span style={{fontWeight:'bold'}}>Ordered at: </span>{order.created_at}</OrderInfo>
                                    <hr/>
                                    <OrderInfo><span style={{fontWeight:'bold'}}>Payment Method: </span>{order.paid_with}</OrderInfo>
                                </Order>
                            ))
                        }
                        {
                            (!client_user.client.log || client_user.client.log.length === 0) && (
                                <p>
                                    No Orders yet
                                </p>
                            )
                        }
                    </OrderContainer>
                </PersonalInfo>
            </Wrapper>
        </Container>
    )
}

export default Profile
