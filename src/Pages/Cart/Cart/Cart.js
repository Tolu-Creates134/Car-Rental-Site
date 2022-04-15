import React from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import { CartItem } from '../CartItem/CartItem'
import { Link } from 'react-router-dom'

import useStyles from './styles'

export const Cart = ({cart, handleEmptyCart, handleUpdateCartQty}) => {

    const classes = useStyles();

    const isEmpty = !cart.total_items

    const EmptyCart = () => {
        return <Typography className={classes.noItems} variant='h4' style={{overflowY: 'hidden'}} > You have no items in your shopping cart</Typography>
    }

    const onEmptyCart = () => {
        handleEmptyCart()
    }

    const FilledCart = () => {
    


        return   <>
       
        
            <Grid container spacing={3} >
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty}  />
                    </Grid>

                ))}
            </Grid>

            <div className={classes.cardDetails} align='end'>

                <Typography className={classes.subtotal} variant='h4' gutterBottom style={{overflowY: 'hidden'}}>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>

                <div >
                    <Button className={classes.emptyButton} onClick={onEmptyCart} size='large' type='button' variant='contained' color='error'>
                        Empty Cart
                    </Button>
                    
                    <Button className={classes.checkoutButton} component={Link} to='/checkout' size='large' type='button' variant='contained' color='success'>
                        Check Out
                    </Button>

                    

                </div>

            </div>

        </>

    }


  return (
    <Container maxWidth='lg' >
        <div className='classes.toolbar' />
        <Typography className={classes.cartTitle} variant='h3' mt={4} gutterBottom style={{overflowY: 'hidden'}}>
            Your Shopping Cart... 
        </Typography>

        { isEmpty ? <EmptyCart /> : <FilledCart />}

    </Container>
  )
}
