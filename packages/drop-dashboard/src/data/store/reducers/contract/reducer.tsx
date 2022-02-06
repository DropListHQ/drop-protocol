import { ContractState, ContractActions } from './types';
import { Constants } from './constants';

const initialState: ContractState = {
  loading: false,
  ipfs: null
};

export function contractReducer(
  state: ContractState = initialState,
  action: ContractActions
): ContractState {
    switch (action.type) {
        case Constants.CONTRACT_SET_LOADING:
          return {...state, loading: action.payload.loading }
        default:
            return state;
    }
}