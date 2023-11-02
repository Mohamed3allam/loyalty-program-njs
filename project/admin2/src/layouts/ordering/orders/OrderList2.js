import { Card, Grid } from '@mui/material'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import { api } from 'config'
import DataTable from 'examples/Tables/DataTable'
import { useAuthContext } from 'hooks/useAuthContext'
import { useOrdersContext } from 'hooks/useOrdersContext'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Invoice from '../invoice/Invoice'

const OrderList2 = ({ images }) => {
    const {user} = useAuthContext()
    const {orders, dispatch} = useOrdersContext()

    const [orderInvoice, setOrderInvoice] = useState(null)
    const [modalShow, setModalShow] = useState(false)


    const [ error, setError ] = useState('')

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`${api}/orders/all-orders`, {
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({type:'SET_ORDERS', payload: json})
            }
            if (!response.ok) {
                setError('Something wrong happened')
            }
        }
        fetchOrders()

    }, [dispatch])

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
    
      const rows = orders && orders.map(order => { return {
          id: <InvoiceId invoice_id={order.invoice_id} />,
          user: <User user_name={user.user.id === order.user_id ? 'You' : order.user_name} />,
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
              <Button className='btn-dark' onClick={() => handleInvoiceShow(order)}>
                Invoice
              </Button>
            </MDTypography>
          )
        }})

        const handleInvoiceShow = (invoice) => {
          setModalShow(true)
          setOrderInvoice(invoice)
        }

  return (
    <>
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
                  Past Orders
              </MDTypography>
              </MDBox>
                <MDBox pt={3}>
                {
                  orders && (
                  <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                      />
                      )
                  }
                {
                  !orders && (
                    <h2 align="center">No Orders Yet</h2>
                  )
                }
                </MDBox>
          </Card>
          <Invoice
            show={modalShow}
            onHide={() => setModalShow(false)}
            order={orderInvoice}
            images={images}
          />
      </Grid>
    </>
  )
}

export default OrderList2
