import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage';
import ItemPriceTable from './pages/ItemPriceTable';
import HowToGift from './pages/HowToGift'
import HowToElse from './pages/HowToElse'
import CheckQueueD from './pages/CheckQueueD'
import CheckQueueG from './pages/CheckQueueG'
import CheckPoints from './pages/CheckPoints'
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import CheckQueueZZ from './pages/CheckQueueZZ';
import ItemShop from './pages/ItemShop';

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ItemShop" element={<ItemShop />} />
        <Route path="/ItemPriceTable" element={<ItemPriceTable />} />
        <Route path="/ItemPriceTable/HowToGift" element={<HowToGift />} />
        <Route path="/ItemPriceTable/HowToElse" element={<HowToElse />} />
        <Route path="/CheckQueue/D1-D10" element={<CheckQueueD />} />
        <Route path="/CheckQueue/G1-G8" element={<CheckQueueG />} />
        <Route path="/CheckQueue/ZZ1-ZZ6" element={<CheckQueueZZ />} />
        <Route path="/CheckPoints" element={<CheckPoints />} />
        <Route path={`/admin123dada`} element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
