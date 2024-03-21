import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './comp/NavBar';
import HomePage from './comp/Home';
import Signup from './comp/Sign-up';
import Login from './comp/log-in';
import CartPage from './comp/Cart-page';
import Orderconfirm from './comp/Order-confirm';
import Adminpage from './comp/Admin-page';

function App() {
  return (
    <div className='container mx-auto px-4'>
      <NavBar />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route  path="/sign-up" element={<Signup />} />
          <Route  path='/log-in' element={<Login />} />
          <Route path='/cart-page'  element={<CartPage />} />
          <Route path='/order-page/:orderId' element={<Orderconfirm />} />
          <Route path='/adminpage'  element={<Adminpage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
