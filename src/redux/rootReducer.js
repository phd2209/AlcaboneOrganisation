import * as actions from './actions';

const initialState = {
    loading: false,
    infoText: "",
    loadingText: "",
    address: "",
    NFTs: [],
    families: [],
    page: "enterAdressView",    
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case actions.SET_WALLET_ADDRESS: {
            let { address } = action.payload
            address = address.trim()
                return {
                    ...state,
                    address: address
                };
        }

        case actions.GET_WALLET_NFTS: {
            return {
                ...state,
                loading: true,
                loadingText: "Looking through our archives. plese wait.."
            };
        }        
        
        case actions.GOT_WALLET_NFTS: {
            const { res } = action.payload
            
            const nfts = res.map(item => { 
                return {
                    token_id: item.token_id, 
                    image_preview_url: item.image_preview_url,
                    image_thumbnail_url: item.image_thumbnail_url,
                    owner: item.owner["user"],
                    traits: item.traits
            }})
            
            const infoText = (res.length >= 6) ? "" : `With only ${res.length} Alcabones your organization is not big enough to worry about just yet.!`;

            return {
                ...state,
                infoText: infoText,
                loadingText: "",
                NFTs: nfts,
                page: (res.length >= 6) ? "alcaboneTreeView": state.page 
            };            
        }

        default:
            return { ...state }
    }
}

