import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Car } from './Car';

import useStyles from './styles'


export const Cars = ({products, onAddToCart}) => {

  const classes = useStyles();

    

  return (
    <div className='cars-page'>
      

      <Typography className={classes.title} variant='h5' align='center' pt={3} style={{overflowY: 'hidden'}}>
        BEST CARS
      </Typography>
      <Typography className={classes.title} variant='h3' align='center' style={{overflowY: 'hidden'}}>
        <strong>Explore Out Top Deals<br></br>From Top Rated Dealers</strong>
      </Typography>

      


      
      <Grid container justifyContent='center' spacing={4} alignItems='center' px={3} pt={3} gutterBottom>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={4} >
            <Car product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
                    


      </Grid>





    </div>


  )
}
