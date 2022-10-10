import Button from "@src/common/Button";
import { useModal } from "@src/common/ModalRootContext";
import ConfirmarModal, {
  ConfirmarModalData,
  ConfirmarModalProps,
} from "@src/common/ConfirmarModal";
import { useAppDispatch, useAppSelector } from "@src/store/store";
import { clearCarrinho, selectCarrinhoItems } from "./carrinhoSlice";

function ClearCarrinhoButton() {
  const carrinhoItems = useAppSelector(selectCarrinhoItems);
  const dispatch = useAppDispatch();

  const confirmarModal = useModal<ConfirmarModalProps, ConfirmarModalData>(
    ConfirmarModal
  );

  if (!carrinhoItems.length) {
    return null;
  }

  return (
    <Button
      variant="transparent"
      onClick={async () => {
        const { isConfirmed } = await confirmarModal.show({
          title: "Limpar Carrinho?",
          body: "Tem certeza de limpar seu carrinho?",
          confirmText: "Limpar",
        });

        if (isConfirmed) {
          dispatch(clearCarrinho());
        }
      }}
    >
      Limpar Carrinho
    </Button>
  );
}

export default ClearCarrinhoButton;
