
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import { styled } from "styled-components";
import { Container, Grid } from "@mui/material";
import { Accordion, Button, Collapse } from "react-bootstrap";
import OrderList from "./orders/OrderList";
import NewOrder from "./new-order/NewOrder";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import OrderList2 from "./orders/OrderList2";
import { useAuthContext } from "hooks/useAuthContext";


const MainContainer = styled.div`
    padding: 100px 100px 100px 400px;
`
const Title = styled.h1`
    margin-bottom: 50px;
`
const NewOrderSection = styled.div`
  margin: 10px 0 50px 0;
`


const Ordering = ({ images }) => {
    const [modalShow, setModalShow] = useState(false)
    const [open, setOpen] = useState(false);

    const { user } = useAuthContext()
    

    return (
        <>
        <DashboardLayout>
            <DashboardNavbar />
            {/* <MainContainer> */}
            <MDBox mt={6} mb={3}>
                <Grid justifyContent="center">
                    <Grid item xs={12} lg={8}>
                    <Container> 
                        <Title>
                            Ordering Control
                        </Title>
                            <NewOrderSection>
                                <Button
                                    onClick={() => setOpen(!open)}
                                    aria-controls="new-order"
                                    aria-expanded={open}
                                >
                                    Add New Order
                                </Button>
                                <Collapse in={open}>
                                    <div id="new-order">
                                        <NewOrder />
                                    </div>
                                </Collapse>
                            </NewOrderSection>
                            <OrderList2 images={images}/>
                    </Container>
                    </Grid>
                </Grid>
            </MDBox>
            {/* </MainContainer> */}
        </DashboardLayout>
        </>
    )
}

export default Ordering;
