import React from 'react';
import './App.scss';
import Navigation from '../Navigation/Navigation';
import RespNavigation from '../RespNavigation/RespNavigation';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import GameInfo from '../GameInfo/GameInfo';
import Signin from '../Credentials/Signin/Signin';
import Signup from '../Credentials/Signup/Signup';
import Cart from '../Cart/Cart';
import Order from '../Order/Order';
import Help from '../Help/Help';
import Orders from '../Orders/Orders';
import AddGamePanel from '../AddGamePanel/AddGamePanel';
import Admin from '../My-profile/Admin/Admin';
import Employee from '../My-profile/Employee/Employee';
import Customer from '../My-profile/Customer/Customer';
import AddEmployeePanel from '../AddEmployeePanel/AddEmployeePanel';
import Employees from '../Employees/Employees';
import EditEmployeePanel from '../EditEmployeePanel/EditEmployeePanel';
import Games from '../Games/Games';
import EditGamePanel from '../EditGamePanel/EditGamePanel';
import Verification from '../VerificationRegistration/Verification';
import Store from '../Store/Store';
import EditCustomerPanel from '../EditCustomerPanel/EditCustomerPanel';
import DeleteAccountPanel from '../DeleteAccountPanel/DeleteAccountPanel';
import OrdersHistory from '../OrdersHistory/OrdersHistory';

const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <RespNavigation />
      <Switch>
        <Route path="/games/add" component={AddGamePanel} />
        <Route path="/games/edit/:game" component={EditGamePanel} />
        <Route path="/games/:game" component={GameInfo} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/order" component={Order} />
        <Route path="/help" component={Help} />
        <Route path="/orders/history" component={OrdersHistory} />
        <Route path="/orders" component={Orders} />
        <Route path="/my-profile/administrator" component={Admin} />
        <Route path="/my-profile/employee" component={Employee} />
        <Route path="/my-profile/edit" component={EditCustomerPanel} />
        <Route path="/my-profile/settings" component={DeleteAccountPanel} />
        <Route path="/my-profile/customer" component={Customer} />
        <Route path="/employees/add" component={AddEmployeePanel} />
        <Route path="/employees/edit/:nickname" component={EditEmployeePanel} />
        <Route path="/employees" component={Employees} />
        <Route path="/games" component={Games} />
        <Route path="/verification" component={Verification} />
        <Route path="/store" component={Store} />
        <Route path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;