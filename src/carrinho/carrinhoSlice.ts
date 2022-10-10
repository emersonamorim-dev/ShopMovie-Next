import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Produtos } from '@src/produtos/ProdutosTipos';
import { RootState } from '@src/store/store';
import { CarrinhoItem } from './CarrinhoTipos';

type CarrinhoState = {
  carrinhoItems: CarrinhoItem[];
};

const initialState: CarrinhoState = {
  carrinhoItems: [],
};

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    addProdutos: (state, action: PayloadAction<Produtos>) => {
      const produtos = action.payload;
      const found = state.carrinhoItems.find(
        (carrinhoItem) => carrinhoItem.info.id === produtos.id,
      );
      if (found) {
        found.count++;
      } else {
        state.carrinhoItems.push({ info: produtos, count: 1 });
      }
    },
    removeProdutos: (state, action: PayloadAction<Produtos>) => {
      const foundIndex = state.carrinhoItems.findIndex(
        (carrinhoItem) => carrinhoItem.info.id === action.payload.id,
      );
      const found = state.carrinhoItems[foundIndex];
      if (found) {
        found.count--;
        if (found.count < 1) {
          state.carrinhoItems.splice(foundIndex, 1);
        }
      }
    },
    removeCarrinhoItem: (state, action: PayloadAction<Produtos>) => {
      state.carrinhoItems = state.carrinhoItems.filter(
        (carrinhoItem) => carrinhoItem.info.id !== action.payload.id,
      );
    },
    clearCarrinho: (state) => {
      state.carrinhoItems = [];
    },
  },
});

export const { addProdutos, removeProdutos, removeCarrinhoItem, clearCarrinho } =
  carrinhoSlice.actions;

export const selectCarrinhoItems = (state: RootState) => state.carrinho.carrinhoItems;

export const selectTotalPreco = (state: RootState) =>
  state.carrinho.carrinhoItems.reduce((acc, carrinhoItem) => {
    const totalProdutosPreco = carrinhoItem.info.preco * carrinhoItem.count;
    return acc + totalProdutosPreco;
  }, 0);

export const selectProdutosCount = (state: RootState) =>
  state.carrinho.carrinhoItems.reduce((acc, carrinhoItem) => {
    return acc + carrinhoItem.count;
  }, 0);

export default carrinhoSlice.reducer;
