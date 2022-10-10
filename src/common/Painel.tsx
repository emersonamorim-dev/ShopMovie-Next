import React from "react";
import Loading from "./Loading";

type PainelProps = React.PropsWithChildren<{
  title?: string;
  className?: string;
  isLoading?: boolean;
  actions?: React.ReactNode;
}>;

function Painel({
  title,
  className,
  isLoading,
  children,
  actions,
}: PainelProps) {
  return (
    <div className={className}>
      {(title || actions) && (
        <div className="flex items-end mb-1">
          <div className="font-semibold text-lg text-text-light">{title}</div>
          <div className="flex-grow" />
          {actions}
        </div>
      )}
      <div className="shadow-md rounded-lg p-6 bg-background-main">
        <Loading isLoading={isLoading}>{children}</Loading>
      </div>
    </div>
  );
}

export default Painel;
