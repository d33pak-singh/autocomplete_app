// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import React from 'react';

// styles
import { makeStyles } from "@material-ui/core/styles";

// components
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardActionArea from '@material-ui/core/CardActionArea';

// css definition
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
  }
}));


export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h3">
                    Welcome to Schoology!
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    You can use our this interface to search for people who are added to the Schoology network.
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    Enjoy the blazing fast search result.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>                    
            </Grid>
          </Grid>
      </Container>
    </React.Fragment>      
  );
}