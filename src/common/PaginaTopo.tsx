import GoBackButton from "@src/routing/GoBackButton";
import React from "react";
import { Maybe } from "./CommonTipos";

interface PaginaTopoProps {
  title: Maybe<string>;
}

function PaginaTopo({ title }: PaginaTopoProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex-shrink-0">
        <GoBackButton />
      </div>
      {title && (
        <h1 className="border-l pl-4 font-bold text-text-light line-clamp-2">
          {title}
        </h1>
      )}
    </div>
  );
}

export default PaginaTopo;
