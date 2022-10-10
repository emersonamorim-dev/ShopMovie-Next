import { combineReducers, configureStore } from '@reduxjs/toolkit';
import carrinhoReducer from '@src/carrinho/carrinhoSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const rootReducer = combineReducers({ carrinho: carrinhoReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () =>
  configureStore<RootState>({
    reducer: (state, action) => {
      if (action.type === HYDRATE) {
        return { ...state, ...action.payload };
      }

      return rootReducer(state, action);
    },
  });

type AppStore = ReturnType<typeof makeStore>;
type AppDispatch = AppStore['dispatch'];


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch; 

export const wrapper = createWrapper<AppStore>(makeStore);
