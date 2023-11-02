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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "layouts/authentication/sign-in";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import {superAdminRoutes, adminRoutes, unAuthRoutes} from "routes";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { useAuthContext } from "hooks/useAuthContext";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Ordering from "layouts/ordering/Ordering";
import Vouchers from "layouts/vouchers/Vouchers";
import LoyaltyControl from "layouts/loyalty-points/LoyaltyControl";
import Profile from "layouts/profile";


export default function App() {
  const {user} = useAuthContext()
  //IMPORTING IMAGES
  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
  }
  const images = importAll(require.context('./assets/images', false, /\.(png|jpe?g|svg|gif|mp4)$/));

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
    
      if (route.route) {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  console.log(direction)
  return (
    <>
          <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
            {layout === "dashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName="Admin Dashboard"
                  routes={user && user.user.role === 'Super Admin' ? superAdminRoutes : adminRoutes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
              {
                user && (
                  <>
                    {
                      user.user.role === 'Super Admin' && (
                        <>
                          <Route exact path="/dashboard" element={<Dashboard images={images} />} key="dashboard"/>
                          <Route exact path="/users" element={<Tables images={images} />} key="users" />
                          <Route exact path="/order-control" element={<Ordering images={images} />} key="ordering" />
                          <Route exact path="/voucher-control" element={<Vouchers images={images} />} key="vouchers" />
                          <Route exact path="/loyalty-control" element={<LoyaltyControl images={images} />} key="loyalty_points" />
                          <Route exact path="/profile" element={<Profile images={images} />} key="profile" />
                          <Route path="*" element={<Navigate to="/dashboard" />}/>

                        </>
                      )
                    }
                    {
                      user.user.role === 'Admin' && (
                        <>
                          <Route exact path="/order-control" element={<Ordering images={images} />} key="ordering" />
                          <Route exact path="/profile" element={<Profile images={images} />} key="profile" />
                          <Route path="*" element={<Navigate to="/profile" />}/>
                        </>
                      )
                    }
                  </>
                )
              }
              {
                !user && (
                  <>
                    <Route exact path="/authentication/sign-in" element={<SignIn images={images} />} />
                    <Route path="*" element={<Navigate to="/authentication/sign-in" />}/>
                  </>
                )
              }
            </Routes>
          </ThemeProvider>
    </>
  )
}
