import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Home, Work } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ControlledPicker from '../../../sharedComponents/ControlledPicker';
import ControlledRadioButton from '../../../sharedComponents/ControlledRadioButton';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import ControlledToggleButton from '../../../sharedComponents/ControlledToggleButton';
import {
  booleanOptions, defaultAddressData, homeColor, stateOptions, workColor,
} from '../../../utils/constants';
import { submitAddAddressAction, toggleAddressModal, updateSelectedAddress } from '../src/accountReducer';
import { addressSchema } from '../src/accountScheme';
import accountStyles from '../src/accountStyles';

const addressTag:toggleButtonOptionData[] = [
  {
    icon: <Home />,
    label: 'Home',
    value: 'Home',
    activeColor: homeColor,
  },
  {
    icon: <Work />,
    label: 'Work',
    value: 'Work',
    activeColor: workColor,
  },
];

const AddressModal = () => {
  const styles = accountStyles();
  const dispatch = useAppDispatch();
  const isAddressModalOpen = useAppSelector((state) => state.account.isAddressModalOpen);
  const addressActionType = useAppSelector((state) => state.account.addressActionType);
  const selectedAddress = useAppSelector((state) => state.account.selectedAddress);
  const {
    control, handleSubmit, formState: { errors }, watch, setValue, reset,
  } = useForm({
    resolver: yupResolver(addressSchema),
  });

  const closeModal = () => {
    dispatch(updateSelectedAddress(defaultAddressData));
    dispatch(toggleAddressModal(false));
  };

  const onSubmitForm = (hookData:account.submitAddEditAddressPayload) => {
    dispatch(submitAddAddressAction({ ...hookData, state: hookData.state.value }));
  };

  const outsideMalaysiaState = (selectedAddress && selectedAddress.state === 'Outside Malaysia') || (watch('state') && watch('state').value === 'Outside Malaysia');

  useEffect(() => {
    if (!outsideMalaysiaState) {
      setValue('country', 'Malaysia');
    } else {
      setValue('country', '');
    }
  }, [setValue, outsideMalaysiaState]);

  useEffect(() => {
    if (selectedAddress) {
      reset({
        fullName: selectedAddress.fullName,
        email: selectedAddress.email,
        phoneNumber: selectedAddress.phoneNumber,
        addressLine1: selectedAddress.addressLine1,
        addressLine2: selectedAddress.addressLine2,
        postcode: selectedAddress.postcode,
        city: selectedAddress.city,
        state: selectedAddress.state
          ? { label: selectedAddress.state, value: selectedAddress.state } : null,
        outsideMalaysiaState: selectedAddress.outsideMalaysiaState ? selectedAddress.outsideMalaysiaState : '',
        country: selectedAddress.country,
        defaultOption: selectedAddress.defaultOption,
        tag: selectedAddress.tag,
      });
    }
  }, [reset, selectedAddress]);

  return (
    <Dialog
      open={isAddressModalOpen}
      onClose={closeModal}
      aria-labelledby="addressActionModal"
      fullWidth
      maxWidth="md"
    >
      <Grid container justifyContent="center">
        <DialogTitle id="addressActionModal">
          {addressActionType}
          {' '}
          Address
        </DialogTitle>
      </Grid>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="fullName"
                variant="outlined"
                lightBg
                label="Full Name"
                labelWidth={68}
                error={errors.fullName}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="phoneNumber"
                variant="outlined"
                lightBg
                label="Phone Number"
                labelWidth={100}
                error={errors.phoneNumber}
                startAdornment={(
                  <InputAdornment position="start">
                    +
                  </InputAdornment>
                )}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="email"
                variant="outlined"
                label="Email Address"
                labelWidth={95}
                lightBg
                error={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="addressLine1"
                variant="outlined"
                label="Address Line 1"
                labelWidth={100}
                lightBg
                error={errors.addressLine1}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="addressLine2"
                variant="outlined"
                label="Address Line 2"
                labelWidth={100}
                lightBg
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="postcode"
                variant="outlined"
                label="Postcode"
                lightBg
                labelWidth={60}
                maxLength={10}
                error={errors.postcode}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="city"
                variant="outlined"
                label="City"
                lightBg
                labelWidth={25}
                error={errors.city}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledPicker
                control={control}
                name="state"
                variant="outlined"
                lightBg
                label="State"
                options={stateOptions}
                error={errors.state}
              />
            </Grid>
            {outsideMalaysiaState && (
              <Grid item sm={6} xs={12}>
                <ControlledTextInput
                  control={control}
                  name="outsideMalaysiaState"
                  variant="outlined"
                  label="Foreign Country State"
                  labelWidth={145}
                  lightBg
                  error={errors.outsideMalaysiaState}
                />
              </Grid>
            )}
            <Grid item sm={outsideMalaysiaState ? 12 : 6} xs={12}>
              <ControlledTextInput
                control={control}
                name="country"
                variant="outlined"
                label="Country"
                labelWidth={55}
                lightBg
                error={errors.country}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledRadioButton
                options={booleanOptions}
                control={control}
                name="defaultOption"
                label="Default"
                error={errors.defaultOption}
                flexDirection="column"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledToggleButton
                options={addressTag}
                control={control}
                name="tag"
                error={errors.tag}
                label="Tag"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={styles.modalSubmitContainer}>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddressModal;