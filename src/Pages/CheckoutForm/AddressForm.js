import React, { useEffect, useState } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { CustomTextField } from './CustomTextField'
import {Link} from 'react-router-dom'

import { commerce } from '../../lib/commerce'


export const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));
  const options = shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}))
  //console.log(subdivisions)
  
  const fetchShippingCountries = async (checkoutTokenId) => {
    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries)
    //setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

    setShippingSubdivisions(subdivisions)
    //setShippingSubdivisions(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (checkoutToken, country, region) => {
    const options = await commerce.checkout.getShippingOptions(checkoutToken, { country, region})

    setShippingOptions(options)
    console.log(options)
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  useEffect(() => {
    shippingCountry && fetchSubdivisions(shippingCountry)

  }, [shippingCountry])

  useEffect(() => {
    shippingSubdivision && fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])




  return (
    <div className='address-form'>
        <Typography variant='h6'>Shipping Address</Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption }) )}>
            <Grid container spacing={3}>
              <CustomTextField required name='firstName' label='First name' />
              <CustomTextField required name='lastName' label='Last name' />
              <CustomTextField required name='address1' label='Address' />
              <CustomTextField required name='email' label='Email' />
              <CustomTextField required name='city' label='City' />
              <CustomTextField required name='postcode' label='ZIP / Post Code' />
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Country</InputLabel>
                <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                  {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id} >
                    {country.label}
                  </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Subdivision</InputLabel>
                <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Options</InputLabel>
                <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
                </Select>
              </Grid>

            </Grid>
            <br/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
              <Button type='submit' variant='contained' color='primary'>Next</Button>
            </div>

          </form>
        </FormProvider>


    </div>
  )
}
