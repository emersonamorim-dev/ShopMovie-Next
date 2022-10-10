import Preco from "@src/common/Preco";
import { useAppSelector } from "@src/store/store";
import { selectTotalPreco } from "./carrinhoSlice";

function CarrinhoTotalPreco() {
  const totalPreco = useAppSelector(selectTotalPreco);

  if (!totalPreco) {
    return null;
  }

  return (
    <div className="flex justify-space py-2 text-lg font-bold">
      <span>Total</span>
      <div className="flex-grow" />
      <Preco value={totalPreco} />
    </div>
  );
}

export default CarrinhoTotalPreco;
