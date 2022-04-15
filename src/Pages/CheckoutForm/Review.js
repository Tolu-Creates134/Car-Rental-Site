import React from 'react'
import { Typography, List, ListItem, ListItemText} from '@mui/material'

export const Review = ({checkoutToken}) => {
  return (
    <>
        <Typography variant='h6'>Order Summary</Typography>
        <List disablePadding>
            {checkoutToken.line_items.map((item) => (
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`}/>
                    <Typography variant='body2'>{item.line_total.formatted_with_symbol}</Typography>
                </ListItem>
            ))}
            <ListItem>
                <ListItemText primary='Total'/>
                <Typography variant='subtitle1' style={{fontWeight: 700}}>
                    {checkoutToken.live.subtotal.formatted_with_symbol}
                </Typography>
            </ListItem>
        </List>



                    


    </>
  )
}
