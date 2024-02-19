import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop";
import HomePage from "./pages/HomePage";
import ItemPriceTable from "./pages/ItemPriceTable";
import OtherGameItemPriceTable from "./pages/OrtherGame";
import HowToGift from "./pages/HowToGift";
import HowToElse from "./pages/HowToElse";
import CheckQueueD from "./pages/check-queue/CheckQueueD";
import CheckQueueG from "./pages/check-queue/CheckQueueG";
import CheckPoints from "./pages/CheckPoints";
import Admin from "./pages/admin/Admin";
import Navbar from "./components/shared/Navbar";
import CheckQueueZZ from "./pages/check-queue/CheckQueueZZ";
import ItemShop from "./pages/ItemShop";
import ChangeImages from "./pages/admin/ChangeImages";
import Login from "./pages/admin/Login";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShopSettings from "./pages/admin/ShopSettings";

function App() {
  return (
    <Router>
      <NavbarWrapper />
      <ScrollToTop />
      <ToastContainer closeOnClick />
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
        <Route path="/admin123dada" element={<Admin />} />
        <Route path="/change-image" element={<ChangeImages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop-setting" element={<ShopSettings />} />
      </Routes>
    </Router>
  );
}

function NavbarWrapper(): JSX.Element {
  const location = useLocation();

  const hideNavbarRoutes = ["/admin123dada", "/change-image", "/login", "/shop-setting"];
  const isNavbarVisible = !hideNavbarRoutes.includes(location.pathname);

  return isNavbarVisible ? <Navbar /> : <></>;
}

export default App;
