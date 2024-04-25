import History from '@history';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { selectCartTotal } from 'app/store/shopSlice';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Product } from '../products/Product';
import { ShopLocationCard } from '../ShopLocationCard';

const schema = yup.object().shape({
  coupon: yup.string(),
});

const defaultValues = {
  zip: '',
  city: '',
  country: 'pk',
  province: 'punjab',
  shipping: 'cod',
};

export const CartTotals = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    console.log('coupon', data);
    History.push('/checkout');
  }

  return (
    <div className='md:flex p-16'>
      <div className='md:flex-col md:w-2/3'>
        <Typography variant='h5' className=''>
          Cart Totals
        </Typography>
        <div className='border-1 p-16'>
          <div className='flex w-full justify-between'>
            <Typography className=' uppercase font-bold'>SUbtotal</Typography>
            <Typography className='' color='text.secondary'>
              ₨{cartTotal}
            </Typography>
          </div>
          <form
            name='loginForm'
            noValidate
            className='flex flex-col justify-center w-full mt-16'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mt-8 mb-16'>
              <Controller
                render={({ field }) => (
                  <FormControl>
                    <FormLabel
                      className='font-medium text-14'
                      component='legend'
                    >
                      Shipping
                    </FormLabel>
                    <RadioGroup
                      {...field}
                      aria-label='shipping'
                      name='shipping'
                    >
                      <FormControlLabel
                        value='cod'
                        control={<Radio />}
                        label='Cash On delivery: ₨1,750.00 All Pakistan'
                      />
                      {/* <FormControlLabel
                        value='booking'
                        control={<Radio />}
                        label='Booking / Bilty (Advance Payment)'
                      />
                      <FormControlLabel
                        value='warehouse'
                        control={<Radio />}
                        label='Warehouse Store Pickup Madina Arts Faisalabad'
                      /> */}
                    </RadioGroup>
                  </FormControl>
                )}
                name='shipping'
                control={control}
              />
            </div>
            {/* <div className='mt-16 mb-16'>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.Select} fullWidth>
                    <FormLabel
                      className='font-medium text-14'
                      component='legend'
                    >
                      Address
                    </FormLabel>
                    <Select {...field} variant='outlined' fullWidth>
                      <MenuItem value='pk'>Pakistan</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name='country'
                control={control}
              />
            </div>
            <div className='mb-16'>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.Select} fullWidth>
                    <Select {...field} variant='outlined' fullWidth>
                      <MenuItem value='ajk'>Azad Kashmir</MenuItem>
                      <MenuItem value='bal'>Balochistan</MenuItem>
                      <MenuItem value='fata'>FATA</MenuItem>
                      <MenuItem value='gb'>Gilgit Baltistan</MenuItem>
                      <MenuItem value='isb'>
                        Islamabad Capital Territory
                      </MenuItem>
                      <MenuItem value='kpk'>Khyber Pakhthunkhwa</MenuItem>
                      <MenuItem value='punjab'>Punjab</MenuItem>
                      <MenuItem value='sindh'>Sindh</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name='province'
                control={control}
              />
            </div>
            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-8'
                  label='City'
                  autoFocus
                  type='text'
                  error={!!errors.city}
                  helperText={errors?.city?.message}
                  variant='outlined'
                  required
                  fullWidth
                  placeholder='Enter your City'
                />
              )}
            />
            <Controller
              name='zip'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className='mb-8'
                  label='Zip Code'
                  autoFocus
                  type='text'
                  error={!!errors.zip}
                  helperText={errors?.zip?.message}
                  variant='outlined'
                  required
                  fullWidth
                  placeholder='Enter your Zip Code'
                />
              )}
            /> */}

            <Button
              variant='contained'
              color='secondary'
              className=' w-full my-56'
              aria-label='Sign in'
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              type='submit'
              size='large'
              style={{ borderRadius: '8px' }}
            >
              Proceed to Checkout
            </Button>
          </form>
        </div>
      </div>
      <div className='md:flex-col md:w-1/3 my-24'>
        <Product />
        {/* <ShopLocationCard /> */}
      </div>
    </div>
  );
};
