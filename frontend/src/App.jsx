import { useState } from 'react'
import Home from './pages/Home';
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Product from './pages/Product';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
<Home/>     

    </div>
  )
}

export default App
