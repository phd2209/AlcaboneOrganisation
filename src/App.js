import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import EnterAddressView from './components/EnterAddressView';
import AlcaboneTreeView from './components/AlcaboneTreeView';
import './App.css';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { useSearchParams } from "react-router-dom";
import { setWalletAddressAndFetchNFTs,  fetchBiggestWallets} from './redux/actions';

//Use this to generate the chart:
//http://localhost:3000/AlcaboneOrganisation/#?wallet=0x719aB00d9c4546614008A35C8e69d4AC1698785E&tokenid=395

function App() {
  const page = useSelector(state => state.page)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const paramsAsObject = Object.fromEntries([...searchParams])
    
    if ('wallet' in paramsAsObject && 'tokenid' in paramsAsObject){
      dispatch(setWalletAddressAndFetchNFTs(paramsAsObject['wallet'],paramsAsObject['tokenid'] ))      
    }
    else if ('wallet' in paramsAsObject){
      dispatch(setWalletAddressAndFetchNFTs(paramsAsObject['wallet']))      
    }    
    else {
      console.log("we did not recieve parms")
      dispatch(fetchBiggestWallets())
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);


  return (
    <ThemeConfig>
      <GlobalStyles />    
          <CssBaseline />          
          <Container maxWidth={false}>



              {(page === "enterAdressView") ?
                <EnterAddressView />
              :              
                <AlcaboneTreeView />
            }           
          </Container>          
        </ThemeConfig>
  );
}

export default App

