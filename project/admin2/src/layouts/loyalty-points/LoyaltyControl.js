// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// import { useState } from "react";

// // @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// // Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// function LoyaltyControl() {
//   const [successSB, setSuccessSB] = useState(false);
//   const [infoSB, setInfoSB] = useState(false);
//   const [warningSB, setWarningSB] = useState(false);
//   const [errorSB, setErrorSB] = useState(false);

//   const openSuccessSB = () => setSuccessSB(true);
//   const closeSuccessSB = () => setSuccessSB(false);
//   const openInfoSB = () => setInfoSB(true);
//   const closeInfoSB = () => setInfoSB(false);
//   const openWarningSB = () => setWarningSB(true);
//   const closeWarningSB = () => setWarningSB(false);
//   const openErrorSB = () => setErrorSB(true);
//   const closeErrorSB = () => setErrorSB(false);

//   const alertContent = (name) => (
//     <MDTypography variant="body2" color="white">
//       A simple {name} alert with{" "}
//       <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
//         an example link
//       </MDTypography>
//       . Give it a click if you like.
//     </MDTypography>
//   );

//   const renderSuccessSB = (
//     <MDSnackbar
//       color="success"
//       icon="check"
//       title="Material Dashboard"
//       content="Hello, world! This is a notification message"
//       dateTime="11 mins ago"
//       open={successSB}
//       onClose={closeSuccessSB}
//       close={closeSuccessSB}
//       bgWhite
//     />
//   );

//   const renderInfoSB = (
//     <MDSnackbar
//       icon="notifications"
//       title="Material Dashboard"
//       content="Hello, world! This is a notification message"
//       dateTime="11 mins ago"
//       open={infoSB}
//       onClose={closeInfoSB}
//       close={closeInfoSB}
//     />
//   );

//   const renderWarningSB = (
//     <MDSnackbar
//       color="warning"
//       icon="star"
//       title="Material Dashboard"
//       content="Hello, world! This is a notification message"
//       dateTime="11 mins ago"
//       open={warningSB}
//       onClose={closeWarningSB}
//       close={closeWarningSB}
//       bgWhite
//     />
//   );

//   const renderErrorSB = (
//     <MDSnackbar
//       color="error"
//       icon="warning"
//       title="Material Dashboard"
//       content="Hello, world! This is a notification message"
//       dateTime="11 mins ago"
//       open={errorSB}
//       onClose={closeErrorSB}
//       close={closeErrorSB}
//       bgWhite
//     />
//   );

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mt={6} mb={3}>
//         <Grid container spacing={3} justifyContent="center">
//           <Grid item xs={12} lg={8}>
//             <Card>
//               <MDBox p={2}>
//                 <MDTypography variant="h5">Alerts</MDTypography>
//               </MDBox>
//               <MDBox pt={2} px={2}>
//                 <MDAlert color="primary" dismissible>
//                   {alertContent("primary")}
//                 </MDAlert>
//                 <MDAlert color="secondary" dismissible>
//                   {alertContent("secondary")}
//                 </MDAlert>
//                 <MDAlert color="success" dismissible>
//                   {alertContent("success")}
//                 </MDAlert>
//                 <MDAlert color="error" dismissible>
//                   {alertContent("error")}
//                 </MDAlert>
//                 <MDAlert color="warning" dismissible>
//                   {alertContent("warning")}
//                 </MDAlert>
//                 <MDAlert color="info" dismissible>
//                   {alertContent("info")}
//                 </MDAlert>
//                 <MDAlert color="light" dismissible>
//                   {alertContent("light")}
//                 </MDAlert>
//                 <MDAlert color="dark" dismissible>
//                   {alertContent("dark")}
//                 </MDAlert>
//               </MDBox>
//             </Card>
//           </Grid>

//           <Grid item xs={12} lg={8}>
//             <Card>
//               <MDBox p={2} lineHeight={0}>
//                 <MDTypography variant="h5">Notifications</MDTypography>
//                 <MDTypography variant="button" color="text" fontWeight="regular">
//                   Notifications on this page use Toasts from Bootstrap. Read more details here.
//                 </MDTypography>
//               </MDBox>
//               <MDBox p={2}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6} lg={3}>
//                     <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
//                       success notification
//                     </MDButton>
//                     {renderSuccessSB}
//                   </Grid>
//                   <Grid item xs={12} sm={6} lg={3}>
//                     <MDButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
//                       info notification
//                     </MDButton>
//                     {renderInfoSB}
//                   </Grid>
//                   <Grid item xs={12} sm={6} lg={3}>
//                     <MDButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
//                       warning notification
//                     </MDButton>
//                     {renderWarningSB}
//                   </Grid>
//                   <Grid item xs={12} sm={6} lg={3}>
//                     <MDButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
//                       error notification
//                     </MDButton>
//                     {renderErrorSB}
//                   </Grid>
//                 </Grid>
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default LoyaltyControl


import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Container, Grid } from "@mui/material";
import { Button, Form, FormGroup } from "react-bootstrap";
import './loyalty-points.css'
import { api } from "config";
import { useLoyaltyContext } from "hooks/useLoyaltyContext";
import { useAuthContext } from "hooks/useAuthContext";

const MainContainer = styled.div`
    margin-bottom: 50px;
`
const Title = styled.h1`
    margin-bottom: 50px;
`
const EditForm = styled.form``
const EditParagraph = styled.p`

`

const LoyaltyControl = ({ images }) => {

    const {loyalty_points_data, dispatch} = useLoyaltyContext()
    const { user } = useAuthContext()

    const [loyalty_points, setLoyaltyPoints] = useState('')
    const [egp, setEgp] = useState('')
    const [isloading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!loyalty_points || !egp) {
            setError('You must define loyalty points and egp')
            setIsLoading(false)
            setSuccess('')
            return 0
        }
        const data = {loyalty_points, egp}
        const response = await fetch(`${api}/loyalty-control/update-loyalty-points/${loyalty_points_data._id}`, {
            method:'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            setSuccess("Loyalty Points Updated Successfully")
            setError('')
            setIsLoading(false)

            setEgp('')
            setLoyaltyPoints('')
        }
        if (!response.ok) {
            setError(json.error)
            setSuccess('')
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchLoyaltyPoints = async () => {
            const response = await fetch(`${api}/loyalty-control/`, {
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({type:'SET_LOYALTY_POINTS', payload: json})
            }
            if (!response.ok) {
                throw new Error(json.error);
            }
        }
        fetchLoyaltyPoints()
    }, [dispatch])
    
    // TRYING TO CONTROL PERCENTAGE SHOWN ON SCREEN
    // const round = (value, precision) => {
    //     var multiplier = Math.pow(10, precision || 0);
    //     return Math.round(value * multiplier) / multiplier;
    // }

    // const controlLoyaltyPoints = (e) => {
    //     setLoyaltyPoints(e)
    //     let calculation = round((loyalty_points/egp) * 100, 2)
    //     setPercentage(calculation)
    // }
    // const controlEgp = (e) => {
    //     setEgp(e)
    //     let calculation = round((loyalty_points/egp) * 100, 2)
    //     setPercentage(calculation)
    // }
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox mt={6} mb={3}>
                    <Grid justifyContent="center">
                        <Grid item xs={12} lg={8}>
                        <Container style={{position:'relative'}}>
                            <MainContainer>
                                <Title>
                                    Edit Loyalty Points earned for each Egp
                                </Title>
                                <Form>
                                    <Form.Group>
                                        <EditParagraph>
                                            Clients earn 
                                            <span>
                                                <Form.Control className="lp-inputs" value={loyalty_points} onInput={(e)=>setLoyaltyPoints(e.target.value)} type="number" /> Loyalty Points
                                            </span> for each 
                                            <span>
                                                <Form.Control className="lp-inputs" value={egp} onInput={(e)=>setEgp(e.target.value)} type="number" />
                                            </span> Egp.
                                        </EditParagraph>
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
                                    <Button disabled={isloading} onClick={handleSubmit} className="btn-secondary">
                                        Submit
                                    </Button>
                                </Form>
                            </MainContainer>
                            {
                                loyalty_points_data && (
                                    <MainContainer>
                                        <Title>
                                            Active Loyalty Points to EGP
                                        </Title>
                                        <EditParagraph>
                                            Clients earn&nbsp;
                                            <span>
                                                {loyalty_points_data.loyalty_points} points
                                            </span> for each &nbsp;
                                            <span>
                                                {loyalty_points_data.egp}
                                            </span> Egp with a percentage of&nbsp;
                                            <span>
                                                {loyalty_points_data.percentage*100}%
                                            </span>
                                        </EditParagraph>
                                    </MainContainer>
                                )
                            }
                        </Container>
                        </Grid>
                    </Grid>
                </MDBox>
            </DashboardLayout>
        </>
    )
}

export default LoyaltyControl;
