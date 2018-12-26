import produce from 'immer';
import { BalanceActionTypes, BalanceActionUnion } from '../actions/balance.actions';

export interface State {
  userBalance: number;
  pending: boolean;
  error: string;
}

const initialState: State = {
  userBalance: null,
  pending: false,
  error: null,
};

export function reducer (state: State = initialState, action: BalanceActionUnion): State {
  return produce(state, (draftState) => {
    switch (action.type) {
      case BalanceActionTypes.LoadBalance: {
        draftState.pending = true;
        return;
      }

      case BalanceActionTypes.LoadBalanceSuccess: {
        draftState.userBalance = action.payload;
        draftState.pending = false;
        return;
      }

      case BalanceActionTypes.LoadBalanceError: {
        draftState.pending = false;
        draftState.error = action.payload;
        return;
      }

      case BalanceActionTypes.BalanceIncrease: {
        const balance = draftState.userBalance + action.payload;
        draftState.userBalance = Math.round(balance * 100) / 100;
        return;
      }

      case BalanceActionTypes.BalanceDecrease: {
        if (draftState.userBalance >= action.payload) {
          const balance = draftState.userBalance - action.payload;
          draftState.userBalance = Math.round(balance * 100) / 100;
        }
        return;
      }

      case BalanceActionTypes.UpdateBalance: {
        draftState.pending = true;
        return;
      }

      case BalanceActionTypes.UpdateBalanceSuccess: {
        draftState.pending = false;
        draftState.userBalance = action.payload;
        return;
      }

      case BalanceActionTypes.UpdateBalanceError: {
        draftState.pending = false;
        draftState.error = action.payload;
        return;
      }
    }
  });
}

export const getUserBalance = (state: State) => state.userBalance;

