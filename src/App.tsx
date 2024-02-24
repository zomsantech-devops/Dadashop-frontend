import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import React, { Suspense } from 'react';

import ScrollToTop from "./components/shared/ScrollToTop";
import Navbar from "./components/shared/Navbar";
import ProtectedRoute from "./components/shared/ProtectedRoute";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PacmanLoader } from "react-spinners";
const ShopSettings = React.lazy(() => import('./pages/admin/ShopSettings'));
const UpdatePreset = React.lazy(() => import('./pages/admin/UpdatePreset'));

const CreatePreset = React.lazy(() => import('./pages/admin/CreatePreset'));


const ItemPriceTable = React.lazy(() => import('./pages/ItemPriceTable'));
const OtherGameItemPriceTable = React.lazy(() => import('./pages/OrtherGame'));
const HowToGift = React.lazy(() => import('./pages/HowToGift'));
const HowToElse = React.lazy(() => import('./pages/HowToElse'));
const CheckQueueD = React.lazy(() => import('./pages/check-queue/CheckQueueD'));
const CheckQueueG = React.lazy(() => import('./pages/check-queue/CheckQueueG'));
const CheckPoints = React.lazy(() => import('./pages/CheckPoints'));
const Admin = React.lazy(() => import('./pages/admin/Admin'));
const CheckQueueZZ = React.lazy(() => import('./pages/check-queue/CheckQueueZZ'));
const ItemShop = React.lazy(() => import('./pages/ItemShop'));
const ChangeImages = React.lazy(() => import('./pages/admin/ChangeImages'));
const Login = React.lazy(() => import('./pages/admin/Login'));

const HomePage = React.lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <Router>
      <NavbarWrapper />
      <ScrollToTop />
      <ToastContainer closeOnClick />
      <Suspense fallback={ <div className="flex justify-center items-center h-screen"><PacmanLoader color="#3d82d1" size={100} /></div> }>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item-shop" element={<ItemShop />} />
        <Route path="/price-fortnite" element={<ItemPriceTable />} />
        <Route path="/price-fortnite/how-to-gift" element={<HowToGift />} />
        <Route path="/price-fortnite/how-to-else" element={<HowToElse />} />
        <Route path="/price-other" element={<OtherGameItemPriceTable />} />
        <Route path="/check-queue/d1-d10" element={<CheckQueueD />} />
        <Route path="/check-queue/g1-g8" element={<CheckQueueG />} />
        <Route path="/check-queue/zz1-zz6" element={<CheckQueueZZ />} />
        <Route path="/check-points" element={<CheckPoints />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin123dada" element={<ProtectedRoute component={Admin} />} />
        <Route path="/change-image" element={<ProtectedRoute component={ChangeImages} />} />
        <Route path="/shop-setting" element={<ProtectedRoute component={ShopSettings} />} />
        <Route path="/update-preset" element={<ProtectedRoute component={UpdatePreset} />} />
        <Route path="/create-preset" element={<ProtectedRoute component={CreatePreset} />} />
      </Routes>
      </Suspense>

    </Router>
  );
}

function NavbarWrapper(): JSX.Element {
  const location = useLocation();

  const hideNavbarRoutes = ["/admin123dada", "/change-image", "/login", "/shop-setting", "/update-preset", "/create-preset"];
  const isNavbarVisible = !hideNavbarRoutes.includes(location.pathname);

  return isNavbarVisible ? <Navbar /> : <></>;
}

export default App;
