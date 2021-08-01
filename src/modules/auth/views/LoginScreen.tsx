import Card from '@material-ui/core/Card';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import authenticationStyles from '../src/authStyles';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import ControlledPasswordInput from '../../../sharedComponents/ControlledPasswordInput';
import { loginSchema } from '../src/authSchema';
import { useAppDispatch } from '../../../hooks';
import { submitSignIn } from '../src/authReducer';
import CustomBreadcrumbs from '../../../sharedComponents/CustomBreadcrumbs';

const LoginScreen = () => {
  const styles = authenticationStyles();
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `);

  const image = getImage(data.file);
  const dispatch = useAppDispatch();

  const { control, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitLogin = useCallback((hookData:auth.submitSignInPayload) => {
    dispatch(submitSignIn(hookData));
  }, [dispatch]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={styles.loginBg}
    >
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <CustomBreadcrumbs />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Card className={styles.loginCard}>
            <Grid container justifyContent="center" alignItems="center" direction="column">
              <CardHeader
                title="Login"
                className={styles.loginTitle}
              />
              <Box className={styles.loginIconContainer}>
                <GatsbyImage image={image!} alt="icon" imgClassName={styles.icon} />
              </Box>
            </Grid>
            <CardContent>
              <form onSubmit={handleSubmit(submitLogin)} className={styles.formContainer}>
                <Grid container justifyContent="center" alignItems="center">
                  <ControlledTextInput
                    control={control}
                    name="email"
                    label="Email"
                    variant="outlined"
                    error={errors.email}
                    labelWidth={40}
                    type="email"
                  />
                  <ControlledPasswordInput
                    control={control}
                    name="password"
                    label="Password"
                    variant="outlined"
                    error={errors.password}
                  />
                </Grid>
                <Grid container justifyContent="center" alignItems="center" className={styles.spacingVertical}>
                  <Button variant="contained" color="primary" type="submit" className={styles.loginBtn} size="medium">
                    Log In
                  </Button>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginScreen;
