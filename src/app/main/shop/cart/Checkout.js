import History from "@history";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  createCheckout,
  createOrder,
  selectCart,
  selectCartTotal,
} from "app/store/shopSlice";
import { selectUser } from "app/store/userSlice";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Product } from "../products/Product";
import { ShopLocationCard } from "../ShopLocationCard";
import { WhatsAppIcon } from "../../home/WhatsAppIcon";
import { showMessage } from "app/store/fuse/messageSlice";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("You must enter a value"),
  // lname: yup.string().required("You must enter a value"),
  street: yup.string().required("You must enter a value"),
  // city: yup.string().required('You must enter a value'),
  // province: yup.string().required('You must enter a value'),
  // zip: yup.string().required('You must enter a value'),
  // phone: yup.string().required('You must enter a value'),
  // email: yup.string().email("Please provide valid format"),
  phone: yup.string().required("You must enter phone"),
  // notes: yup.string().min(20, "Should be min 20 characters"),
  // province: yup.string().required("You must enter a value"),
});

const defaultValues = {
  // zip: "",
  // city: "",
  street: "",
  name: "",
  email: "",
  phone: "",
};

export const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector(selectUser);

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    if (cart.length < 1) {
      dispatch(
        showMessage({
          message: "You can not checkout with empty cart",
          autoHideDuration: 3000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return;
    }

    const products = cart?.map((it) => ({
      ProductId: it.id,
      quantity: it.quantity,
    }));
    let updatedData;
    if (user?.user) {
      updatedData = {
        User: user?.user?.id,
        type: user?.user?.role,
        products,
        guestInfo: data,
      };
    } else {
      updatedData = {
        guestInfo: data,
        products,
      };
    }

    dispatch(createCheckout(updatedData)).then(
      (response) => response.payload?.id && History.push("/order-summary")
    );
  }

  useEffect(() => {
    if (user?.user) {
      setValue("email", user.user.email);
      setValue("phone", user.user.phone);
      setValue("name", user.user.name);
    }
  }, [user]);

  return (
    <div className="md:flex p-16">
      <div className="md:flex-col md:w-2/3">
        <Typography variant="h5" className="my-24">
          Billing & Shipping
        </Typography>
        <div className="border-1 p-16">
          <div className="flex w-full justify-between">
            <Typography className=" uppercase font-bold">SUbtotal</Typography>
            <Typography className="" color="text.secondary">
              ₨{cartTotal}
            </Typography>
          </div>
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-8"
                  label="Name"
                  type="text"
                  error={!!errors.fname}
                  helperText={errors?.fname?.message}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Enter your Name"
                />
              )}
            />
            {/* <Controller
              name="lname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-8"
                  label="Last name"
                  autoFocus
                  type="text"
                  error={!!errors.lname}
                  helperText={errors?.lname?.message}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Enter your Last Name"
                />
              )}
            /> */}
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-8"
                  label="Street address "
                  type="text"
                  error={!!errors.street}
                  helperText={errors?.street?.message}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="House number and street name"
                />
              )}
            />
            {/* <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-8"
                  label="Town/City"
                  autoFocus
                  type="text"
                  error={!!errors.city}
                  helperText={errors?.city?.message}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Enter your City"
                />
              )}
            /> */}
            {/* <div className="mb-16">
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.province} required fullWidth>
                    <FormLabel
                      className="font-medium text-14"
                      component="legend"
                    >
                      State / Country
                    </FormLabel>
                    <Select {...field} variant="outlined" fullWidth required>
                      <MenuItem value="ajk">Azad Kashmir</MenuItem>
                      <MenuItem value="bal">Balochistan</MenuItem>
                      <MenuItem value="fata">FATA</MenuItem>
                      <MenuItem value="gb">Gilgit Baltistan</MenuItem>
                      <MenuItem value="isb">
                        Islamabad Capital Territory
                      </MenuItem>
                      <MenuItem value="kpk">Khyber Pakhthunkhwa</MenuItem>
                      <MenuItem value="punjab">Punjab</MenuItem>
                      <MenuItem value="sindh">Sindh</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="province"
                control={control}
              />
            </div> */}
            {/* <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-8"
                  label="Zip Code"
                  autoFocus
                  type="text"
                  error={!!errors.zip}
                  helperText={errors?.zip?.message}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Enter your Zip Code"
                />
              )}
            /> */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-8"
                  label="Phone"
                  type="text"
                  error={!!errors.phone}
                  helperText={errors?.phone?.message}
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Enter your phone"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-8"
                  label="Email Address"
                  type="text"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your Email"
                />
              )}
            />
            {/* <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-8"
                  label="Order Notes (Optional)"
                  autoFocus
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Notes about your order"
                />
              )}
            /> */}
            {/* <Controller
              name="register"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormControlLabel
                    label="Create an Account"
                    control={<Checkbox size="small" {...field} />}
                  />
                </FormControl>
              )}
            /> */}
            <div className="mt-8 mb-16"></div>

            <Typography variant="h5" className="my-24">
              Your Order
            </Typography>
            <div className="border-1 w-full">
              <div className="flex justify-between w-full">
                <Typography className="w-full uppercase font-bold border-r-1 p-8">
                  product
                </Typography>
                <Typography className=" uppercase font-bold w-full p-8">
                  subtotal
                </Typography>
              </div>
              {cart.map((item) => (
                <div className="border-1 flex w-full justify-between border-b-1">
                  <Typography className="w-full border-r-1 p-8">
                    {item.title} x {item.quantity}
                  </Typography>{" "}
                  <Typography
                    className="w-full border-r-1 p-8"
                    color="text.secondary"
                  >
                    Rs {item.quantity * item.price}
                  </Typography>{" "}
                </div>
              ))}
              <div className="border-1 flex w-full justify-between border-b-1">
                <Typography className="w-full uppercase font-bold border-r-1 p-8">
                  subtotal
                </Typography>
                <Typography
                  className="w-full border-r-1 p-8"
                  color="text.secondary"
                >
                  Rs {cartTotal}
                </Typography>{" "}
              </div>
              <div className="border-1 flex w-full justify-between border-b-1">
                <Typography className="w-full uppercase font-bold border-r-1 p-8">
                  shipping
                </Typography>
                <Controller
                  render={({ field }) => (
                    <FormControl className="p-8 w-full">
                      <RadioGroup
                        {...field}
                        aria-label="shipping"
                        name="shipping"
                      >
                        <FormControlLabel
                          value="Cash On delivery"
                          control={<Radio />}
                          label="Cash On delivery: ₨1,750.00 All Pakistan"
                          checked
                        />
                        {/* <FormControlLabel
                          value='Booking / Bilty (Advance Payment)'
                          control={<Radio />}
                          label='Booking / Bilty (Advance Payment)'
                        />
                        <FormControlLabel
                          value='Warehouse Store Pickup'
                          control={<Radio />}
                          label='Warehouse Store Pickup Madina Arts Faisalabad'
                        /> */}
                      </RadioGroup>
                    </FormControl>
                  )}
                  name="method"
                  control={control}
                />
              </div>
              <div className="border-1 flex w-full justify-between border-b-1">
                <Typography className="w-full uppercase font-bold border-r-1 p-8">
                  total
                </Typography>
                <Typography
                  className="w-full border-r-1 p-8"
                  color="text.secondary"
                >
                  Rs {cartTotal}
                </Typography>{" "}
              </div>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full my-56"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              style={{ borderRadius: "8px" }}
            >
              Place order
            </Button>
          </form>
        </div>
      </div>
      <div className="md:flex-col md:w-1/3 my-24">
        <Product />
        <WhatsAppIcon />
        {/* <ShopLocationCard /> */}
      </div>
    </div>
  );
};
