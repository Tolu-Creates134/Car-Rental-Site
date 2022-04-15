import React from 'react'
import { Typography, Button, Card, CardMedia, CardActions, CardContent  } from '@mui/material'

import useStyles from './styles'

export const CartItem = ({item, onUpdateCartQty }) => {

    const classes = useStyles()

  return (

    <Card >
        <CardMedia className={classes.media} image={item.image.url} alt={item.name}/>
        <CardContent>
            <Typography variant='h6' className={classes.name}>
                {item.name}
            </Typography>
            <Typography className={classes.price} variant='h6'>
                {item.price.formatted_with_symbol}
            </Typography>
        </CardContent>
        <CardActions className={classes.buttons}>
            <Button type='button' size='small' onClick={() => onUpdateCartQty(item.id, item.quantity - 1)} >-</Button>
            <Typography variant='h6'>{item.quantity}</Typography>
            <Button type='button' size='small' onClick={() => onUpdateCartQty(item.id, item.quantity + 1)} >+</Button>
        </CardActions>

    </Card>




        
  )
}
