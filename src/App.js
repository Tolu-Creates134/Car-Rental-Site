import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Header } from "./Header/Header";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Home } from "./Pages/Home/Home";
import { Cars } from "./Pages/Cars/Cars";
import {useState, useEffect} from 'react'
import {commerce} from './lib/commerce'
import { Cart } from "./Pages/Cart/Cart/Cart";
import { Checkout } from "./Pages/CheckoutForm/Checkout/Checkout";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sas-serif',
    ].join(',')
  },
});

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  console.log(products)


  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);

  }

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve()
    setCart(response)

  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)

    setCart(item.cart);

  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })

    setCart(cart)
  }

  const handleEmptyCart = async  () => {
    const { cart } = await commerce.cart.empty()

    setCart(cart)
    
  }

  const refreshCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)

  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart()
    }catch (error) {
      setErrorMessage(error.data.error.message)


    }
  }


  useEffect(() => {
    fetchProducts();
    fetchCart()
  }, [])

  console.log(cart)


  return (
    <Router>
    <ThemeProvider theme={theme}>

    <Header cart={cart} />
    <div className="Car-Rental-App">
    <Routes>
    <Route path='/' element={<Home/>} exact/>
    <Route path='/cars' element={<Cars products={products} onAddToCart={handleAddToCart}/>}/>
    <Route path='/cart' element={<Cart cart={cart} handleEmptyCart={handleEmptyCart} handleUpdateCartQty={handleUpdateCartQty} />} />
    <Route path='/checkout' element={<Checkout order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} cart={cart}/>} />
    </Routes>
    
    </div>
  
    </ThemeProvider>




     

    
    </Router>
  );
}

export default App;
