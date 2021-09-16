import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

type variantData='standard' | 'filled' | 'outlined'

interface ControlledTextInputOwnProps{
  control:Control,
  label?:string,
  type?:string,
  variant?:variantData,
  name:string,
  defaultValue?:string
  error?:FieldError
  labelWidth?:number
  customclassname?:string
  lightbg?:boolean
  maxLength?:number
  startAdornment?:React.ReactNode
  multiline?:boolean
  rows?:number
  readOnly?:boolean
  infoText?:string
  placeholder?:string
  disabled?:boolean
}

const useStyles = makeStyles({
  unFocusStyle: {
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'lightgrey',
    },
  },
  unFocusLabel: {
    color: 'white',
  },
  formControl: {
    width: '100%',
  },
  removedAutofillStyling: {
    '&:-webkit-autofill': {
      transitionDelay: '9999s',
    },
    '&:-webkit-autofill::first-line': {
      fontFamily: 'Sitka Display Semibold',
      fontSize: '1rem',
    },
  },
});

const ControlledTextInput = (props:ControlledTextInputOwnProps) => {
  const {
    control,
    label,
    type,
    variant,
    name,
    defaultValue,
    error,
    labelWidth,
    customclassname,
    lightbg,
    maxLength,
    startAdornment,
    multiline,
    rows,
    readOnly,
    infoText,
    placeholder,
    disabled,
  } = props;

  const styles = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, value,
        },
      }) => (
        <FormControl
          variant={variant}
          className={`${styles.formControl} ${customclassname}`}
          style={{
            display: type === 'hidden' ? 'none' : 'flex',
          }}
          disabled={disabled}
        >
          <InputLabel
            htmlFor={name}
            color={lightbg ? 'secondary' : 'primary'}
            classes={{ root: !lightbg ? styles.unFocusLabel : '' }}
            error={!!error}
          >
            {label}
          </InputLabel>
          <OutlinedInput
            id={name}
            type={type}
            value={value}
            onChange={onChange}
            labelWidth={labelWidth}
            color={lightbg ? 'secondary' : 'primary'}
            classes={{ root: !lightbg ? styles.unFocusStyle : '', input: styles.removedAutofillStyling }}
            error={!!error}
            placeholder={placeholder}
            endAdornment={error && (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                  <CancelIcon color="error" />
                </IconButton>
              </InputAdornment>
            )}
            startAdornment={startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>}
            inputProps={{
              maxLength,
              readOnly,
            }}
            multiline={multiline}
            rows={rows}
          />
          <FormHelperText error>{error?.message}</FormHelperText>
          <FormHelperText>{infoText}</FormHelperText>
        </FormControl>
      )}
      defaultValue={defaultValue}
    />
  );
};

ControlledTextInput.defaultProps = {
  defaultValue: '',
  variant: undefined,
  type: 'text',
  label: '',
  error: null,
  labelWidth: 70,
  customclassname: '',
  lightbg: false,
  maxLength: null,
  startAdornment: null,
  multiline: false,
  rows: 1,
  readOnly: false,
  infoText: '',
  placeholder: '',
  disabled: false,
};

export default ControlledTextInput;
