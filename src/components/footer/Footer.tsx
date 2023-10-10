import {Box, Container, Grid, Typography} from "@mui/material";

export const Footer = () => (
  <Box
    sx={{
      width: '100%',
      height: 'auto',
      backgroundColor: 'primary',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    }}
  >
    <Container maxWidth="lg">
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography color="black" variant="h5">
            Footer
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="balck" variant="subtitle1">
            {`${new Date().getFullYear()} | Dash board |`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
