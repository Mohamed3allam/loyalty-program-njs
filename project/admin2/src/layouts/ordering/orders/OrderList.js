import { api } from 'config';
import { useOrdersContext } from 'hooks/useOrdersContext';
import React, { useEffect, useState } from 'react'

// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BootstrapTable from 'react-bootstrap-table-next';
import './order-list.css'
import ReactPaginate from 'react-paginate';
import { Button, Pagination } from 'react-bootstrap';
import { styled } from 'styled-components';
import { useAuthContext } from 'hooks/useAuthContext';

// import BootstrapTable from 'react-bootstrap-table-next';

const SemiHeading = styled.h3`
    margin-bottom: 10px;
`

const TableHead = styled.th`
    font-size: 14px;
    padding: 10px;
    text-align: center;

`
const TableData = styled.td`
    font-size: 14px;
    padding-bottom: 10px;
    width: 10%;
    text-align: center;
`
const TableRow = styled.tr`
`
const OrderList = () => {
    const {orders, dispatch} = useOrdersContext()
    const { user } = useAuthContext()

    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(10);

    const [ error, setError ] = useState('')

    // const paginate = ({ selected }) => {
    //     setCurrentPage(selected + 1)
    // }

    

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

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders && orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const availablePages = orders && Math.round((orders.length/10))
    // let items = [currentOrders];
    // orders && orders.map((order, index) => {
    //     items.push()
    // })

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
      };
    
      orders && console.log(orders)
    return (
        <>
            <div className="table-responsive p-5" style={{boxShadow:'0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1),0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)',borderRadius:'10px !important'}}>
                <SemiHeading>
                    Past Orders
                </SemiHeading>
                    {
                        orders && (
                            <>
                                <table className=" p-5">
                    
                                    <thead>
                                        <TableRow className='bg-transparent'>
                                            <TableHead scope="col">ID</TableHead>
                                            <TableHead scope="col">User</TableHead>
                                            <TableHead scope="col">Client</TableHead>
                                            <TableHead scope="col">Total</TableHead>
                                            <TableHead scope="col">Payment Method</TableHead>
                                            <TableHead scope="col">Added LP</TableHead>
                                            <TableHead scope="col">Voucher Used?</TableHead>
                                            <TableHead scope="col">Voucher ID</TableHead>
                                            <TableHead scope="col">Remaining paid in Egp</TableHead>
                                            <TableHead scope="col">Created At</TableHead>
                                            <TableHead scope="col">Action</TableHead>
                                        </TableRow>
                                    </thead>
                                    <tbody>
                                        {
                                            currentOrders && currentOrders.map((order, index) => (
                                                <> 
                                                    <TableRow key={index}>
                                                        <TableHead className='bg-transparent text-dark' scope="row">{order.invoice_id}</TableHead>
                                                        <TableData className='bg-transparent text-dark'  >{order.user_name}</TableData>
                                                        <TableData className='bg-transparent text-dark'  >{`${order && order.client.name}`}</TableData>
                                                        <TableData className='bg-transparent text-dark' >{order.total}<sub>Egp</sub></TableData>
                                                        <TableData className='bg-transparent text-dark'  >{order.paid_with}</TableData>
                                                        <TableData className='bg-transparent text-dark'  >{order.loyalty_points_added}</TableData>
                                                        <TableData className='bg-transparent text-dark'  >{`${order.use_voucher}`}</TableData>
                                                        <TableData className='bg-transparent text-dark'  >{order.voucher_unique_id}</TableData>
                                                        <TableData className='bg-transparent text-dark'  >{order.paid_in_egp}</TableData>
                                                        <TableData className='bg-transparent text-dark'  >{order.created_at}</TableData>
                                                        <TableData className='bg-transparent text-dark'  ><Button className='btn-md'>Edit</Button></TableData>
                                                    </TableRow>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <Pagination className="px-4">
                                    {
                                        currentOrders.map((order, index) => {
                                            return (
                                                <Pagination.Item
                                                    onClick={() => handlePageChange(index + 1)}
                                                    key={index + 1}
                                                    active={index + 1 === currentPage}
                                                    >
                                                    {index + 1}
                                                </Pagination.Item>
                                            );
                                        })
                                    }
                                </Pagination>
                                {/* <Pagination
                                    itemsCount={orders}
                                    itemsPerPage={ordersPerPage}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    alwaysShown={true}
                                /> */}
                            </>
                        )
                    }
            </div>
        </>
    )
}

export default OrderList
