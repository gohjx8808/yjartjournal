import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";

interface StyledFormControlProps {
  lightBg?: boolean;
}

const StyledFormControl = styled(FormControl, {
  shouldForwardProp: prop => prop !== "lightBg",
})<StyledFormControlProps>(
  ({ theme, lightBg }) => ({
    width: "100%",
    "& label": {
      color: !lightBg && theme.palette.common.white,
      "&.Mui-focused": {
        color: lightBg
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      },
    },
    "& .MuiOutlinedInput-root": {
      color: !lightBg && theme.palette.common.white,
      "& fieldset": {
        borderColor: !lightBg && theme.palette.common.white,
      },
      "&:hover fieldset": {
        borderColor: "lightgrey",
      },
      "&.Mui-focused fieldset": {
        borderColor: lightBg
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
      },
      "& .MuiInputAdornment-root button": {
        color: !lightBg && theme.palette.common.white,
      },
      "&.Mui-error .MuiInputAdornment-root button": {
        color: theme.palette.error.main,
      },
      "& input": {
        "&:-webkit-autofill": {
          transitionDelay: "9999s",
        },
        "&:-webkit-autofill::first-line": {
          fontFamily: "Sitka Display Semibold",
          fontSize: "1rem",
        },
        "::-ms-reveal": {
          display: "none",
        },
      },
    },
    "& .MuiFormHelperText-root": {
      color: !lightBg && theme.palette.common.white,
    },
  })
);

export default StyledFormControl;
