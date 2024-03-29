import { yupResolver } from "@hookform/resolvers/yup";
import SEO from "@modules/SEO";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { generateHeader } from "@utils/helper";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { SubmitHandler, useForm } from "react-hook-form";
import { CUSTOMER_ROLE } from "@utils/constants";
import AuthLayout from "../layouts/AuthLayout";
import { useLogIn } from "../modules/auth/src/authMutations";
import { loginSchema } from "../modules/auth/src/authSchema";
import CustomBreadcrumbs from "../sharedComponents/CustomBreadcrumbs";
import ControlledPasswordInput from "../sharedComponents/inputs/ControlledPasswordInput";
import ControlledTextInput from "../sharedComponents/inputs/ControlledTextInput";
import { AuthCard, AuthCardHeader, AuthIcon } from "../styledComponents/auth";
import routeNames from "../utils/routeNames";

const Login = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.jpeg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);

  const image = getImage(data.file);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { mutate: logIn, isLoading: logInLoading } = useLogIn();

  const submitLogin: SubmitHandler<auth.logInFormData> = (hookData) => {
    logIn({ ...hookData, role: CUSTOMER_ROLE });
  };

  return (
    <AuthLayout>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10} sm={9} lg={6}>
            <Grid container justifyContent="space-between" alignItems="center">
              <CustomBreadcrumbs />
              <Typography color="customPrimary.contrastText">
                New member?{" "}
                <Link
                  component={GatsbyLink}
                  to={routeNames.signUp}
                  color="secondary"
                  underline="hover"
                >
                  Register here!
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10} sm={9} lg={6}>
            <AuthCard>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
              >
                <AuthCardHeader title="Login" />
                <Box width={{ xs: "35%", sm: "20%" }}>
                  <AuthIcon image={image!} alt="icon" />
                </Box>
              </Grid>
              <CardContent>
                <form onSubmit={handleSubmit(submitLogin)}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} sm={10}>
                      <ControlledTextInput
                        control={control}
                        name="email"
                        label="Email"
                        formerror={errors.email}
                        type="email"
                        isCapitalize={false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <ControlledPasswordInput
                        control={control}
                        name="password"
                        label="Password"
                        formerror={errors.password}
                      />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <Grid container justifyContent="flex-end">
                        <Link
                          component={GatsbyLink}
                          to={routeNames.forgotPassword}
                          underline="hover"
                        >
                          <Typography>Forgot Password?</Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    marginTop={3}
                    marginBottom={2}
                  >
                    <Grid item xs={6} sm={3}>
                      <LoadingButton
                        variant="contained"
                        color="primaryButton"
                        type="submit"
                        fullWidth
                        loading={logInLoading}
                      >
                        Log In
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default Login;

export const Head = () => <SEO title={generateHeader("Login")} />;
