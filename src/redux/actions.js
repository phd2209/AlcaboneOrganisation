import axios from 'axios';
export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS'
export const GET_WALLET_NFTS = 'GET_WALLET_NFTS'
export const GOT_WALLET_NFTS = 'GOT_WALLET_NFTS'
export const FAILED_API_CALL = 'FAILED_API_CALL'

const getOwnerItems  = (contractAddress, cursor) => 
  (!cursor) ? `https://api.opensea.io/api/v1/assets?asset_contract_address=0x8Ca5209d8CCe34b0de91C2C4b4B14F20AFf8BA23&owner=${contractAddress}&order_direction=desc&limit=50` :
              `https://api.opensea.io/api/v1/assets?asset_contract_address=0x8Ca5209d8CCe34b0de91C2C4b4B14F20AFf8BA23&owner=${contractAddress}&order_direction=desc&limit=50&cursor=${cursor}`

const GetOpenSeaData = async (address) => {   
  
    try 
    { 
      let resp = [], res = [], cursor = null, url = "", data={};
      
      do {        
        console.log(cursor)
        url = getOwnerItems(address, cursor)
        resp = await axios.get(url);
        data = resp.data
        cursor = data.next
        res = res.concat(data.assets)
      }
      while (cursor !== null)
      return { res }
    } 
    catch (error) 
    {
      console.log("error in resp ", error);
      return null
    }
}  

export const setWalletAddressAndFetchNFTs = (address) => {
  return async function(dispatch) {

    dispatch({
      type: SET_WALLET_ADDRESS,
      payload: { address }
    })

    try {
      //Get NFTS
      dispatch({
        type: GET_WALLET_NFTS,
      });

      const { res, families } = await GetOpenSeaData(address)
      console.log(res)

      dispatch({
        type: GOT_WALLET_NFTS,
        payload: { res, families }
      }); 

    } catch (err) {
      console.log(err)

      dispatch({
        type: FAILED_API_CALL,
        payload: { err }
      });       
    }    

  }
}

//Actions//////////////////////////
export const setWalletAddress = (address) => {
  return async function(dispatch) {
        dispatch({
          type: SET_WALLET_ADDRESS,
          payload: { address }
        });  
    }
}

export const getWalletNFTs = () => {

  return async function(dispatch, getState) {
    
    const { address } = getState();

    dispatch({
        type: GET_WALLET_NFTS,
    });

    try {
      const { res } = await GetOpenSeaData(address)
      dispatch({
        type: GOT_WALLET_NFTS,
        payload: { res }
      }); 

    } catch (err) {
      dispatch({
        type: FAILED_API_CALL,
        payload: { err }
      });       
    }
  }          
}

