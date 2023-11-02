import React, { useEffect, useState } from 'react'
import './profile.css'
import ClientNav from '../components/clientNav/ClientNav'
import config from '../../../config'
import { useClientAuthContext } from '../../hooks/useClientAuthContext'
import Orders from './user-orders/Orders'


const Profile1 = ({ images }) => {
    const { client_user } = useClientAuthContext()
    const [ profile, setProfile ] = useState()
    const [ error, setError ] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = client_user && await fetch(`${config.api}/clients/profile`, {
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${client_user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    setProfile(json)
                }
                if (!response.ok) {
                    setError('Something went wrong')
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        if (client_user) fetchProfile()
    },[])
    return (
        <>
            {
                profile && (
                    <div className="container emp-profile text-light" style={{marginTop:'250px'}}>
                        <div className="row">
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-9">
                                <div className="profile-head">
                                            <h1>
                                                <b style={{fontWeight:'900'}}>{profile.name}</b>
                                            </h1>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-4">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Kshiti123</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{profile.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{profile.email ?? "You Didn't add your email yet"}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{profile.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Loyalty Points</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p style={{fontSize:'20px',color:'rgb(94, 217, 0)'}}>{Math.round(profile.loyalty_points)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style={{width:'100%'}}/>
                        <Orders client_user={client_user} images={images} />
                    </div>
                )
            }
        </>
    )
}

export default Profile1
