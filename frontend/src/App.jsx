import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Home, ProductList, Login, Register, Product, Cart } from './pages';


const App= () =>{
  const [count, setCount] = useState(0)
const user = true
  return (
<Router>
  <Switch>
    <Route  exact path ="/">
      <Home/>
    </Route>
    <Route path ="/products/:catergory">
      <ProductList/>
    </Route>
    <Route path ="/product/:id">
      <Product/>
    </Route>
    <Route path ="/cart">
      <Cart/>
    </Route>
    <Route path ="/login">
     { user ? <Redirect to= "/"/> : <Login/>}
    </Route>
    <Route path ="/register">
      <Register/>
    </Route>
  </Switch>
</Router>
  )
}

export default App
