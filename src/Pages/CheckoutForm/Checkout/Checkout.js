import React, {useState, useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, Divider, Button,} from '@mui/material'
import useStyles from './styles'
import { AddressForm } from '../AddressForm' 
import { PaymentForm } from '../PaymentForm'
import { commerce } from '../../../lib/commerce'

const steps = ['Shipping Adress', 'Payment Details']


export const Checkout = ({cart, order, onCaptureCheckout, error}) => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState('')
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles()

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
        console.log(token)
        setCheckoutToken(token)
      } catch (error) {

      }
    }

    generateToken()

  },[cart])

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const next = (data) => {
    setShippingData(data)
    nextStep()

  }
  

  const Form = () => (
    activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> :  <PaymentForm nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} shippingData={shippingData} backStep={backStep}/>
  )

  const Confirmation = () => {
    return <div>
      <Typography variant='h5'>
        Thank you for your purchase.
      </Typography>
    </div>
  }

  


  return (

    <div className={classes.checkout}>
      <main className={classes.layout} >
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center' style={{overflowY: 'hidden'}}>Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
        </Paper>


      </main>

    </div>
  )
}
