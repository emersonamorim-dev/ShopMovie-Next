import Backdrop from "@src/common/Backdrop";
import Button from "@src/common/Button";
import { useRouterEvent } from "@src/routing/useRouterEvent";
import React, { useCallback, useId } from "react";
import { useModalContext } from "./ModalContext";

export type ConfirmarModalProps = {
  title: string;
  body: React.ReactNode;
  confirmText?: string;
};

export type ConfirmarModalData = { isConfirmed: boolean };

function ConfirmarModal({
  title,
  confirmText = "OK",
  body,
}: ConfirmarModalProps) {
  const { isOpen, hide } = useModalContext<ConfirmarModalData>();

  const handleClose = useCallback(() => {
    hide({ isConfirmed: false });
  }, [hide]);

  useRouterEvent("routeChangeStart", handleClose);

  const labelId = useId();

  return (
    <Backdrop<HTMLDivElement>
      isOpen={isOpen}
      onClick={handleClose}
      className="grid place-items-center overflow-y-auto p-4"
    >
      {({ focusRef }) => {
        return (
          <div
            role="dialog"
            aria-modal
            aria-labelledby={labelId}
            ref={focusRef}
            className="rounded-md w-full max-w-sm p-4 bg-background-main"
            // To make "onKeyDown" work on this element
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                handleClose();
              }
            }}
          >
            <h2 id={labelId} className="font-semibold text-lg">
              {title}
            </h2>
            <div>{body}</div>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="transparent" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  hide({ isConfirmed: true });
                }}
              >
                {confirmText}
              </Button>
            </div>
          </div>
        );
      }}
    </Backdrop>
  );
}

export default ConfirmarModal;
