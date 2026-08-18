import Sidebar from "./components/sidebar/Sidebar.jsx";
import Topbar from "./components/topbar/Topbar.jsx";
import "./App.css";
import Home from "./pages/home/Home.jsx";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList.jsx";
import User from "./pages/user/User.jsx";
import NewUser from "./pages/newUser/NewUser.jsx";
import ProductList from "./pages/productList/ProductList.jsx";
import Product from "./pages/product/Product.jsx";
import NewProduct from "./pages/newProduct/NewProduct.jsx";
import TransactionsList from "./pages/transactionsList/TransactionsList.js"
//import OrderList from "./pages/orderList/OrderList.tsx";
import Login from "./pages/login/Login.jsx";
import { useSelector } from 'react-redux';


// const theme = createMuiTheme();

// const useStyles = makeStyles((theme) => {
//   root: {
//     // some CSS that accesses the theme
//   }
// });

function App() {
  const user = useSelector((state)=> state.user.currentUser)
  const admin = useSelector((state)=> state.user.currentUser?.isAdmin);
  //console.log(user);

  // useEffect(()=>{
  //   const persist = JSON.parse(sessionStorage.getItem('persist:root'));
  //   console.log(persist)
  // },[persist])

  
  
  //console.log(JSON.parse(persist?.user))


  return (
    
      
      <Router>
      <Switch>
        <Route exact path="/login"> 
          { admin ? <Redirect to="/" /> : <Login /> }  
       </Route>
        
          
          
            { admin ? (
              <> 
                <Topbar />
                <div className="AppContainer">
                  <Sidebar />     
                <Route exact path="/">
                  <Home user={user} />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route> 
                <Route path="/transactions">
                  <TransactionsList />
                </Route>
                </div>               
              </>
              ) : <Redirect to="/login" />}
              
          </Switch>  
    
    </Router>
      
      
      
    
  );
  
}

export default App;
