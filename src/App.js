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
import { setWalletAddressAndFetchNFTs } from './redux/actions';

function App() {
  const page = useSelector(state => state.page)
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const paramsAsObject = Object.fromEntries([...searchParams])
    console.log(paramsAsObject)
    if ('wallet' in paramsAsObject){
      dispatch(setWalletAddressAndFetchNFTs(paramsAsObject['wallet']))      
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

