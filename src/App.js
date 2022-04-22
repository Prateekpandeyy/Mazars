// import './App.css';
// import Login from './component/login/Login';
// import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Ledger from './component/ledger/Ledger';
// import NewPassword from './component/login/NewPassword';
// import Trading from './component/Trading/Trading';
// import Transaction from './component/Transaction/Transaction';
// import 'devextreme/dist/css/dx.light.css';
// import Holding from './component/holding/Holding';
// import Profile from './pages/profile/userprofile/Profile';
// import Nominee from './pages/profile/nominee/Nominee';
// import Bank from './pages/profile/bank/Bank';
// import Demat from './pages/profile/demat/Demat';
// import Documents from './pages/profile/documents/Documents';
// import Commodity from './pages/profile/commodity/Commodity';
// import ProfileActive from './pages/profile/userprofile/ProfileActive';
// import AddNoimee from './pages/profile/nominee/AddNoimee'
// import AddBank from './pages/profile/bank/AddBank';
// import AddDemat from './pages/profile/demat/AddDemat';
// import Confirmation from './pages/confirmation/confirmation/Confirmation';
// import Margin from './component/Margin/Margin';
// import Payout from './component/Request/Payout/Payout';
// import Request from './component/Request/Request';
// function App() {

 
//   return (
//     <>
//     <BrowserRouter>
//     <Routes>
//       <Route exact path = "/" element={<Login />} />
//       <Route exact path='/new-password' element={<NewPassword />} />
//       <Route exact path = "/tradeweb/ledger" element={<Ledger />} />
//       <Route exact path = "/tradeweb/trading" element={<Trading />} />
//       <Route exact path = "/tradeweb/transaction" element={<Transaction />} />
//       <Route exact path = "/tradeweb/holding" element = {<Holding />} />
//       <Route exact path = "/tradeweb/profile" element = {<Profile />} />
//       <Route exact path = "/tradeweb/bank" element = {<Bank />} />
//       <Route exact path = "/tradeweb/addnominee" element = {<Nominee />} />
//       <Route exact path = "/tradeweb/nominee" element = {<AddNoimee />} />
//       <Route exact path = "/tradeweb/demat" element = {<Demat /> } />
//       <Route exact path = "/tradeweb/documnets" element = {<Documents />} />
//       <Route exact path = "/tradeweb/commodity" element = {<Commodity />} />
//       <Route exact path = "/tradeweb/active-profile" element = {<ProfileActive />} /> 
//       <Route exact path = "/tradeweb/addbank" element = {<AddBank />} />
//       <Route exact path = "/tradeweb/dematcontent" element = {<AddDemat />} /> 
//       <Route exact path = "/tradeweb/confirmation" element = {<Confirmation />} />
//       <Route exact path = "/tradeweb/margin" element = {<Margin />} />
//       <Route exact path = "/tradeweb/request" element = {<Request />} />
//       <Route exact path = "/tradeweb/pledge" element = {<Pledge />} />
//       </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
 import './App.css';
 import Login from './component/login/Login';
 import {BrowserRouter, Routes, Route} from 'react-router-dom';
 import Ledger from './component/ledger/Ledger';
 import NewPassword from './component/login/NewPassword';
 import Trading from './component/Trading/Trading';
 import Transaction from './component/Transaction/Transaction';
 import 'devextreme/dist/css/dx.light.css';
 import Holding from './component/holding/Holding';
 import Profile from './pages/profile/userprofile/Profile';
 import Nominee from './pages/profile/nominee/Nominee';
 import Pledge from './pages/pledge/Pledge'
 import Bank from './pages/profile/bank/Bank';
 import Demat from './pages/profile/demat/Demat';
 import Documents from './pages/profile/documents/Documents';
 import Commodity from './pages/profile/commodity/Commodity';
 import ProfileActive from './pages/profile/userprofile/ProfileActive';
 import AddNoimee from './pages/profile/nominee/AddNoimee'
 import AddBank from './pages/profile/bank/AddBank';
 import AddDemat from './pages/profile/demat/AddDemat';
 import Confirmation from './pages/confirmation/confirmation/Confirmation';
 import Margin from './component/Margin/Margin';
 import Payout from './component/Request/Payout/Payout';
 import Request from './component/Request/Request';
 
function App() {

 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path = "/" element={<Login />} />
      <Route exact path='/new-password' element={<NewPassword />} />
      <Route exact path = "/tradeweb/ledger" element={<Ledger />} />
      <Route exact path = "/tradeweb/trading" element={<Trading />} />
      <Route exact path = "/tradeweb/transaction" element={<Transaction />} />
      <Route exact path = "/tradeweb/holding" element = {<Holding />} />
      <Route exact path = "/tradeweb/profile" element = {<Profile />} />
      <Route exact path = "/tradeweb/bank" element = {<Bank />} />
      <Route exact path = "/tradeweb/addnominee" element = {<Nominee />} />
      <Route exact path = "/tradeweb/nominee" element = {<AddNoimee />} />
      <Route exact path = "/tradeweb/demat" element = {<Demat /> } />
      <Route exact path = "/tradeweb/documnets" element = {<Documents />} />
      <Route exact path = "/tradeweb/commodity" element = {<Commodity />} />
      <Route exact path = "/tradeweb/active-profile" element = {<ProfileActive />} /> 
      <Route exact path = "/tradeweb/addbank" element = {<AddBank />} />
      <Route exact path = "/tradeweb/dematcontent" element = {<AddDemat />} /> 
      <Route exact path = "/tradeweb/confirmation" element = {<Confirmation />} />
      <Route exact path = "/tradeweb/margin" element = {<Margin />} />
      <Route exact path = "/tradeweb/request" element = {<Request />} />
      <Route exact path = "/tradeweb/pledge" element= {<Pledge />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;