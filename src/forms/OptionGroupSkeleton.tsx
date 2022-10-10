import { createMockArray } from "@src/common/CommonUtils";
import Lista from "@src/common/Lista";
import ListaItem from "@src/common/ListaItem";
import React from "react";
import OptionButtonSkeleton from "./OptionButtonSkeleton";

function OptionGroupSkeleton() {
  return (
    <Lista>
      {createMockArray(4).map((i) => {
        return (
          <ListaItem key={i}>
            <OptionButtonSkeleton />
          </ListaItem>
        );
      })}
    </Lista>
  );
}

export default OptionGroupSkeleton;
