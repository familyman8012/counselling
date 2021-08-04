import * as React from "react";
import useSwr from "swr";
import useProduct from "../../hook/useProduct";

function Counter() {
  const { product, isLoading, isError } = useProduct();

  return <div>counter : {product?.length}</div>;
}

export default React.memo(Counter);
