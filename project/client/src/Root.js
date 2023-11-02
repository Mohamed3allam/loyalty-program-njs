import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from "react";
import { useAuthContext } from "./App/hooks/useAuthContext";
// import NotFound from "./App/pages/NotFound";
import Loader from './App/pages/components/Loader';
import { useClientAuthContext } from './App/hooks/useClientAuthContext';
import Login from './App/pages/Login';
import './root.css'
import 'animate.css';

import DashboardApp from './Dashboard/DashboardApp';
import Loading from './App/pages/components/loading/Loading';
// import { createBrowserHistory } from "history";

const App = lazy(() => import("./App/App"));
const OrderPanel = lazy(() => import("./OrderPanel/OrderPanel"));

// const hist = createBrowserHistory();


const Root = () => {
    const { user } = useAuthContext()
    const { client_user } = useClientAuthContext()

    //IMPORTING IMAGES
    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    const images = importAll(require.context('./App/imgs', false, /\.(png|jpe?g|svg|gif|mp4)$/));
    const orderPanelImages = importAll(require.context('./OrderPanel/imgs', false, /\.(png|jpe?g|svg|gif|mp4)$/));
    const dashboardImages = importAll(require.context('./Dashboard/imgs', false, /\.(png|jpe?g|svg|gif|mp4)$/));

    return (
        <>
            <Suspense fallback={<Loading images={images}/>}>
                <Router>
                    <Routes>
                        <Route path="/*" element={<App images={images} />}>
                            <Route path='*' element={<App images={images}/> }/>
                        </Route>
                        {/* <Route path='/order-panel/*' element={<OrderPanel images={orderPanelImages}/>} >
                            <Route path="*" element={<OrderPanel images={orderPanelImages} />} />
                        </Route>
                        <Route path='/dashboard/*' element={<DashboardApp images={dashboardImages}/>} >
                            <Route path="*" element={<DashboardApp images={dashboardImages} />} />
                        </Route> */}
                    </Routes>
                </Router>
            </Suspense>
        </>
    )
}
export default Root;