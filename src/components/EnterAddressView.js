/* eslint-disable no-use-before-define */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setWalletAddress, getWalletNFTs } from '../redux/actions';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { LinearProgress, Box, Input, Paper, Typography, Grid, Button, InputAdornment} from '@mui/material';
import Iconify from './Iconify'

const APPBAR_MOBILE = 64;

const SearchbarStyle = styled('div')(({ theme }) => ({
  marginTop: "2rem",
  zIndex: 99,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,    
}));

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "0.5rem",
    minWidth: 400,
    textAlign: "center",
    color: "#fff",
  },
  formControl: {
      background: "#fff",
      textAlign: "center",
      margin: "1rem",
      minWidth: 350,
      width: "350px",
  },
  selectEmpty: {
      marginTop: "2rem",
  },
  grid: {
    /*backgroundColor: "#000"*/
  },
  button: {
    margin: "0.5rem !important"
  },
  infoText: {
    color: "red",
    marginTop: "1rem !important"
  },
  imageContainer: {
    height: 600,
    width: 600,
    minWidth: 400,
    textAlign: "center",
    backgroundImage: `url(${process.env.PUBLIC_URL + '/img/contractkillars.jpg'})`,
    boxShadow: `0px 2px 3px -1px rgba(255, 0, 0, 25),0px 5px 8px 1px rgba(255, 0, 0, 25),0px 1px 9px 2px rgba(255, 0, 0, 25)`,
    borderRadius: "8px"
  },
  'input-label': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red'
  },

  'input': {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: 'blue'
    }
  }  
}));


function EnterAddressView() {
  const classes = useStyles();

  const address  = useSelector(state => state.address)
  const infoText = useSelector(state => state.infoText)
  const loading  = useSelector(state => state.loading)
  const loadingText = useSelector(state => state.loadingText)

  const dispatch = useDispatch()

  const onAddressChange = (event) => {
    dispatch(setWalletAddress(event.target.value))
  }

  const onButtonStartClick = () => {
    dispatch(getWalletNFTs())
  }

  return (   
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
      className={classes.grid}
    >
      <Typography sx={{fontWeight: 'fontWeightBold', color: 'red' }} variant="overline" gutterBottom>Alcabones Organisation Chart</Typography>
        <Paper 
          className={classes.imageContainer} elevation={3}>
          <SearchbarStyle>
            <Input
              value={address}
              onChange={onAddressChange}
              fullWidth
              disableUnderline
              placeholder="Enter wallet address..."
              inputProps={{
                classes: {input: classes['input']},
                sx: {
                  "&::placeholder": {
                    color: "black"
                  }
                }
              }}
              sx={{ 
                mr: 1, 
                fontWeight: 'fontWeightBold',
                color: "black"
              }}
              startAdornment={
                <InputAdornment position="start">
                    <Iconify icon="emojione-monotone:skull-and-crossbones" sx={{ color: '#000', width: 25, height: 25 }} />
                </InputAdornment>
            }              
            />
            {(!loading) && 
            <Button disabled={address===undefined} color="error" variant="contained" onClick={() => onButtonStartClick()}>
              SEARCH
            </Button>
            }
          </SearchbarStyle>          
          {(loading) && 
            <Box sx={{ width: '100%' }}>
              <LinearProgress color="error"/>
              <Typography sx={{fontWeight: 'fontWeightBold', color: 'red' }} variant="overline" gutterBottom>{loadingText}</Typography>
            </Box>
          }          
        </Paper>                
        <Typography className={classes.infoText} variant="subTitle" gutterBottom>{infoText}</Typography>
    </Grid>
  );
}

export default EnterAddressView