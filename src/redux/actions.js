import axios from 'axios';
export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS'
export const GET_WALLET_NFTS = 'GET_WALLET_NFTS'
export const GOT_WALLET_NFTS = 'GOT_WALLET_NFTS'
export const FAILED_API_CALL = 'FAILED_API_CALL'
export const SET_TOKEN_ID = 'SET_TOKEN_ID'
export const GET_BIGGEST_OWNERS = 'GET_BIGGEST_OWNERS'
export const GOT_BIGGEST_OWNERS = 'GOT_BIGGEST_OWNERS'

const apikey = "49b8307bb28c4f4bb5d968ed01612dec"
const etherscanApiKey = '7WXJ2PBF9PPISSP194U9IHCS89X79ZA5NE'

const getOwnerItems  = (contractAddress, cursor) => 
  (!cursor) ? `https://api.opensea.io/api/v1/assets?asset_contract_address=0x8Ca5209d8CCe34b0de91C2C4b4B14F20AFf8BA23&owner=${contractAddress}&order_direction=desc&limit=50` :
              `https://api.opensea.io/api/v1/assets?asset_contract_address=0x8Ca5209d8CCe34b0de91C2C4b4B14F20AFf8BA23&owner=${contractAddress}&order_direction=desc&limit=50&cursor=${cursor}`


const get25BiggestHolders = () =>
  `https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=0x8Ca5209d8CCe34b0de91C2C4b4B14F20AFf8BA23&page=1&offset=25&apikey=${etherscanApiKey}`

  const GetEtherscanData = async () => {   

    try 
    { 
      let resp = [], res = [], url = "", data={};
      url = get25BiggestHolders()
      resp = await axios.get(url /*, { headers: { "X-API-KEY": etherscanApiKey } }*/);
      data = resp.data
      res = res.concat(data.assets)
      return res
    } 
    catch (error) 
    {
      console.log("error in resp ", error);
      return null
    }
}                


const GetOpenSeaData = async (address) => {   
  
    try 
    { 
      let resp = [], res = [], cursor = null, url = "", data={};
      
      do {        
        console.log(cursor)
        url = getOwnerItems(address, cursor)
        resp = await axios.get(url, { headers: { "X-API-KEY": apikey } });
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

export const fetchBiggestWallets = () => {
  return async function(dispatch) {    
    try {
      //Get NFTS
      dispatch({
        type: GET_BIGGEST_OWNERS,
      });

      const { res } = await GetEtherscanData()
      console.log(res)

      dispatch({
        type: GOT_BIGGEST_OWNERS,
        payload: { res }
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
export const setWalletAddressAndFetchNFTs = (address, tokenid) => {
  return async function(dispatch) {
    console.log(address, tokenid)
    dispatch({
      type: SET_WALLET_ADDRESS,
      payload: { address }
    })

    if (tokenid !== undefined) {
      console.log(tokenid)
      dispatch({
        type: SET_TOKEN_ID,
        payload: { tokenid }
      })      
    }

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

