/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import { useAuthContext } from "hooks/useAuthContext";
import { Button, Card } from "react-bootstrap";
import DataTable from "examples/Tables/DataTable";
import { useState } from "react";
import Invoice from "./invoice/Invoice";
import EditUserForm from "./edit-info/EditUserForm";

function Overview({ images }) {
  const [orderInvoice, setOrderInvoice] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [ editDataModalShow, setEditDataModalShow ] = useState(false)

  const { user } = useAuthContext()

  const Index = ({ index }) => (
    <MDBox display="flex" textAlign="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {index}
      </MDTypography>
    </MDBox>
  );
  const InvoiceId = ({ invoice_id }) => (
    <MDBox display="flex" textAlign="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {invoice_id}
      </MDTypography>
    </MDBox>
  );
  const User = ({ user_name }) => (
    <MDBox display="flex" textAlign="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {user_name}
      </MDTypography>
    </MDBox>
  );
  const Client = ({ client }) => (
    <MDBox display="flex" textAlign="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {client}
      </MDTypography>
    </MDBox>
  );
  const Total = ({ total }) => (
    <MDBox display="flex" textAlign="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {total}
      </MDTypography>
    </MDBox>
  );
  const PaymentMethod = ({ paid_with }) => (
    <MDBox display="flex" textAlign="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {paid_with}
      </MDTypography>
    </MDBox>
  );
  const AddedLp = ({ loyalty_points_added }) => (
    <MDBox display="flex" textAlign="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {loyalty_points_added}
      </MDTypography>
    </MDBox>
  );
  const VoucherUsed = ({ use_voucher }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {use_voucher}
      </MDTypography>
    </MDBox>
  );
  const VoucherId = ({ voucher_id }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {voucher_id}
      </MDTypography>
    </MDBox>
  );
  const RemainingCash = ({ paid_in_egp }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {paid_in_egp}
      </MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "num", accessor: "index", width: "45%", align: "left" },
    { Header: "invoice id", accessor: "id", width: "45%", align: "left" },
    { Header: "user", accessor: "user", align: "left" },
    { Header: "client", accessor: "client", align: "left" },
    { Header: "total", accessor: "total", align: "left" },
    { Header: "payment method", accessor: "payment", align: "left" },
    { Header: "added lp", accessor: "added_lp", align: "left" },
    { Header: "voucher used?", accessor: "use_voucher", align: "left" },
    { Header: "voucher id", accessor: "voucher_id", align: "left" },
    { Header: "remaining paid in egp", accessor: "remaining_cash", align: "left" },
    { Header: "created at", accessor: "created_at", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]

  const rows = user.user.log && user.user.log.map((order, index) => { return {
      index:<Index index={index+1} />,
      id: <InvoiceId invoice_id={order.invoice_id} />,
      user: <User user_name={order.user_name} />,
      client: <Client client={order.client && order.client.name} />,
      total: <Total total={order.total} />,
      payment: <PaymentMethod paid_with={order.paid_with} />,
      added_lp: <AddedLp loyalty_points_added={order.loyalty_points_added} />,
      use_voucher: <VoucherUsed use_voucher={`${order.use_voucher}`} />,
      voucher_id: <VoucherId voucher_id={order.voucher_unique_id} />,
      remaining_cash: <RemainingCash paid_in_egp={order.paid_in_egp} />,
      created_at: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {order.created_at}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <Button type="button" className='btn-dark' onClick={(e) => handleInvoiceShow(order, e)}>
            Invoice
          </Button>
        </MDTypography>
      )
  }})

  const handleInvoiceShow = (invoice, e) => {
    e.preventDefault()
    setModalShow(true)
    setOrderInvoice(invoice)
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header user={user}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="profile information"
                  // description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                  info={{
                    user_id:user.user.user_id,
                    fullName: `${user.user.name.firstName ?? ''} ${user.user.name.lastName ?? ''}`,
                    mobile: user.user.phone,
                    email: user.user.email,
                    location: "USA",
                  }}
                  social={[
                    {
                      link: "https://www.facebook.com/CreativeTim/",
                      icon: <FacebookIcon />,
                      color: "facebook",
                    },
                    {
                      link: "https://twitter.com/creativetim",
                      icon: <TwitterIcon />,
                      color: "twitter",
                    },
                    {
                      link: "https://www.instagram.com/creativetimofficial/",
                      icon: <InstagramIcon />,
                      color: "instagram",
                    },
                  ]}
                  action={{tooltip: "Edit Profile"}}
                  shadow={false}
                />
                <EditUserForm
                  show={editDataModalShow}
                  onHide={() => setEditDataModalShow(false)}
                  user={user.user}
                  images={images}
                />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            {/* <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} /> 
              </Grid> */}
          </Grid>
        </MDBox>
        {/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Orders
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox> */}
        <MDBox p={2}>
          <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography align="left" variant="h6" color="white">
                      Your Orders
                    </MDTypography>
                  </MDBox>
                  {
                    user.user.log.length !== 0 ? (
                      <MDBox pt={3}>
                        <DataTable
                          table={{ columns, rows }}
                          isSorted={false}
                          entriesPerPage={false}
                          showTotalEntries={false}
                          noEndBorder
                        />
                      </MDBox>
                    ) : (
                      <h3>
                        No Orders Yet
                      </h3>
                    )
                  }
                </Card>
              </Grid>
              <Invoice
                show={modalShow}
                onHide={() => setModalShow(false)}
                order={orderInvoice}
                images={images}
              />
            </Grid>
          </MDBox>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
