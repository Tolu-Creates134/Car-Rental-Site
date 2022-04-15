import React from 'react'
import { CardMedia, CardContent, Typography, CardActions, Card, IconButton} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import useStyles from './styles'


export const Car = ({ product, onAddToCart }) => {

  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.image.url} title={product.name} />
      <CardContent>
        <div className='classes.cardContent'>
          <Typography className={classes.name} variant='h5'>
            {product.name}
          </Typography>
          <Typography className={classes.price} variant='h5'>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <IconButton onClick={() => {onAddToCart(product.id, 1)}}>
          <AddShoppingCartIcon />
        </IconButton>

      </CardActions>

    </Card>






      



  )
}
