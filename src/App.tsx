import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ItemPriceTable from "./pages/ItemPriceTable";
import HowToGift from "./pages/HowToGift";
import HowToElse from "./pages/HowToElse";
import CheckQueueD from "./pages/CheckQueueD";
import CheckQueueG from "./pages/CheckQueueG";
import CheckPoints from "./pages/CheckPoints";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import CheckQueueZZ from "./pages/CheckQueueZZ";
import ItemShop from "./pages/ItemShop";
import ChangeImages from "./pages/ChangeImages";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <NavbarWrapper />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item-shop" element={<ItemShop />} />
        <Route path="/item-price-table" element={<ItemPriceTable />} />
        <Route path="/item-price-table/how-to-gift" element={<HowToGift />} />
        <Route path="/item-price-table/how-to-else" element={<HowToElse />} />
        <Route path="/check-queue/d1-d10" element={<CheckQueueD />} />
        <Route path="/check-queue/g1-g8" element={<CheckQueueG />} />
        <Route path="/check-queue/zz1-zz6" element={<CheckQueueZZ />} />
        <Route path="/check-points" element={<CheckPoints />} />
        <Route path="/admin123dada" element={<Admin />} />
        <Route path="/change-image" element={<ChangeImages />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function NavbarWrapper(): JSX.Element {
  const location = useLocation();

  const hideNavbarRoutes = ["/admin123dada", "/change-image", "/login"];
  const isNavbarVisible = !hideNavbarRoutes.includes(location.pathname);

  return isNavbarVisible ? <Navbar /> : <></>;
}

export default App;
