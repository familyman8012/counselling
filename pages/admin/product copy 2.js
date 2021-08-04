import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import useSwr, { mutate, trigger } from "swr";
import useProduct from "../../hook/useProduct";
import Counter from "./Counter";

function product() {
  const { product, mutate, isLoading, isError } = useProduct();
  const [name, setName] = useState("");

  // 1.  useEffect(() => {
  //   fetchItems();
  // }, []);

  // console.log(data);
  // const fetchItems = async () => {
  //   const resp = await axios.get("/api/product/product");
  //   setData(resp.data);
  // };
  const createItem = async (e) => {
    mutate([...product, { name }], true);
    const resp = await axios.post("/api/product/product", { name });
    // setData([...data, resp.data]);
    // console.log("resp.data", resp.data);
    //mutate([...product, resp.data], false);
    //trigger("/api/product/product");
    console.log("product", product);
  };

  const onChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  return (
    <div>
      <Counter />
      <input name="name" placeholder="name" onChange={onChange} value={name} />
      <ul>
        {product?.map((x, i) => (
          <li>
            {x._id} {x.name}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={createItem}>저장</button>
      </div>
    </div>
  );
}

export default product;
