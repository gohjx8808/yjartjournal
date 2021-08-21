import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface DividerWithTextProps{
  text:string
}

const useStyles = makeStyles({
  verticalSpacing: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const DividerWithText = (props:DividerWithTextProps) => {
  const { text } = props;
  const styles = useStyles();

  return (
    <Grid container alignItems="center" spacing={2} className={styles.verticalSpacing}>
      <Grid item xs>
        <Divider />
      </Grid>
      <Grid item>
        <Typography>{text}</Typography>
      </Grid>
      <Grid item xs>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default DividerWithText;