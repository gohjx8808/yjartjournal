import { yupResolver } from '@hookform/resolvers/yup';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ControlledPicker from '../../../sharedComponents/inputs/views/ControlledPicker';
import ControlledRadioButton from '../../../sharedComponents/inputs/views/ControlledRadioButton';
import ControlledTextInput from '../../../sharedComponents/inputs/views/ControlledTextInput';
import ControlledToggleButton from '../../../sharedComponents/inputs/views/ControlledToggleButton';
import {
  booleanOptions, defaultAddressData, homeColor, stateOptions, workColor,
} from '../../../utils/constants';
import { submitAddEditAddressAction, toggleAddressModal, updateSelectedAddress } from '../src/accountReducer';
import { addressSchema } from '../src/accountScheme';
import accountStyles from '../src/accountStyles';

const addressTag:toggleButtonOptionData[] = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    value: 'Home',
    activeColor: homeColor,
  },
  {
    icon: <WorkIcon />,
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

  const onSubmitForm = (hookData:account.rawSubmitAddEditAddressPayload) => {
    dispatch(submitAddEditAddressAction({ ...hookData, state: hookData.state.value }));
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
                lightbg={1}
                label="Full Name"
                formerror={errors.fullName}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="phoneNumber"
                lightbg={1}
                label="Phone Number"
                formerror={errors.phoneNumber}
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
                label="Email Address"
                lightbg={1}
                formerror={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="addressLine1"
                label="Address Line 1"
                lightbg={1}
                formerror={errors.addressLine1}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                control={control}
                name="addressLine2"
                label="Address Line 2"
                lightbg={1}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="postcode"
                label="Postcode"
                lightbg={1}
                maxLength={10}
                formerror={errors.postcode}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledTextInput
                control={control}
                name="city"
                label="City"
                lightbg={1}
                formerror={errors.city}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledPicker
                control={control}
                name="state"
                lightbg={1}
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
                  label="Foreign Country State"
                  lightbg={1}
                  formerror={errors.outsideMalaysiaState}
                />
              </Grid>
            )}
            <Grid item sm={outsideMalaysiaState ? 12 : 6} xs={12}>
              <ControlledTextInput
                control={control}
                name="country"
                label="Country"
                lightbg={1}
                formerror={errors.country}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ControlledRadioButton
                options={booleanOptions}
                control={control}
                name="defaultOption"
                label="Default"
                error={errors.defaultOption}
                row
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
