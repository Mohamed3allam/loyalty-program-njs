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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import { useEffect, useState } from "react";
import { api } from "config";
import { Button, Collapse } from "react-bootstrap";
import { styled } from "styled-components";
import NewUser from "./new-user/NewUser";
import { useUsersContext } from "hooks/useUsersContext";
import EditUserForm from "./edit-user/EditUserForm";
import { useAuthContext } from "hooks/useAuthContext";

const NewOrderSection = styled.div`
  margin: 10px 0 50px 0;
`
function Tables() {
  const { user } = useAuthContext()
  const [clients, setClients] = useState([])
  const [open, setOpen] = useState(false);

  const [modalShow, setModalShow] = useState(false)
  const [userEdited, setUserEdited] = useState(null)


  const { users, dispatch } = useUsersContext()

  // const { columns, rows } = authorsTableData();
  // console.log(columns, rows)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${api}/users/all-users`, {
        method:'GET',
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type:'SET_USERS', payload:json})
      }
    }
    fetchUsers()

    const fetchClients = async () => {
      const response = await fetch(`${api}/clients/all-clients`, {
        method:'GET',
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setClients(json)
      }
    }
    fetchClients()

  }, [])

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Phone = ({ phone }) => (
    <MDBox display="flex" textAlign="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {phone}
      </MDTypography>
    </MDBox>
  );
  const UserId = ({ user_id }) => (
    <MDBox display="flex" textAlign="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {user_id}
      </MDTypography>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "user id", accessor: "user_id", align: "left" },
    { Header: "user", accessor: "user", width: "45%", align: "left" },
    { Header: "phone", accessor: "phone", align: "left" },
    { Header: "function", accessor: "function", align: "left" },
    { Header: "employed", accessor: "employed", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]

  const rows = users && users.map((shown_user) => { return {
      user_id: <UserId user_id={shown_user.user_id} />,
      user: <Author image={shown_user.profile_pic_url} name={`${shown_user.name.firstName ?? ''} ${shown_user.name.lastName ?? ''}`} email={shown_user.email} />,
      phone: <Phone phone={shown_user.phone} />,
      function: <Job title={shown_user.role} />,
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {shown_user.user_created_at}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {
            user.user._id === shown_user._id ? (
              <p style={{textAlign:'center'}}>You</p>
            ) : (
              <Button onClick={() => handleEditShow(shown_user)}>
                Edit
              </Button>
            )
          }
          
        </MDTypography>
      )
    }})
    const handleEditShow = (user) => {
      setModalShow(true)
      setUserEdited(user)
    }


    // FOR CLIENTS
    const ClientName = ({ name }) => (
      <MDBox display="flex" textAlign="center" lineHeight={1}>
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    );
    const ClientPhone = ({ phone }) => (
      <MDBox display="flex" textAlign="center" lineHeight={1}>
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {phone}
        </MDTypography>
      </MDBox>
    );
    const ClientLp = ({ loyalty_points }) => (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {loyalty_points}<sub>LP</sub>
        </MDTypography>
      </MDBox>
    );
    const ClientAS = ({ amount_spent }) => (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {amount_spent}<sub>Egp</sub>
        </MDTypography>
      </MDBox>
    );
    const ClientCA = ({ created_at }) => (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {created_at}
        </MDTypography>
      </MDBox>
    );


    const cColumns = [
      { Header: "client", accessor: "client", width: "45%", align: "left" },
      { Header: "phone", accessor: "phone", align: "left" },
      { Header: "loyalty points", accessor: "loyalty_points", align: "left" },
      { Header: "amount spent", accessor: "amount_spent", align: "center" },
      { Header: "created at", accessor: "created_at", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]
    const round = (value, precision) => {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    const cRows = clients && clients.map(client => { return {
        client: <ClientName name={client.name} />,
        phone: <ClientPhone phone={client.phone} />,
        loyalty_points: <ClientLp loyalty_points={round(client.loyalty_points, 2)} />,
        amount_spent: <ClientAS amount_spent={client.amount_spent} />,
        created_at: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {client.created_at}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <Button>
              Edit
            </Button>
          </MDTypography>
        )
      }})
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
          <NewOrderSection>
              <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="new-user"
                  aria-expanded={open}
              >
                  New User
              </Button>
              <Collapse in={open}>
                  <div id="new-user">
                      <NewUser />
                  </div>
              </Collapse>
          </NewOrderSection>
          <EditUserForm
              show={modalShow}
              onHide={() => setModalShow(false)}
              user={userEdited}
            />
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
                <MDTypography variant="h6" color="white">
                  Users
                </MDTypography>
              </MDBox>
              {
                users && (
                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  </MDBox>
                )
              }
            </Card>
          </Grid>

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
                <MDTypography variant="h6" color="white">
                  Clients
                </MDTypography>
              </MDBox>
              {
                clients && (
                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns: cColumns, rows: cRows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  </MDBox>
                )
              }
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
