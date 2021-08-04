import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

import Axios from "axios";

const MYComponent = (props) => {
  const router = useRouter();

  const send = () => {
    const variables = {
      name: "test",
      email: "test@xx.com",
      password: "123123",
      address: "60b06b31fa4d8368f3978ce7",
    };
    Axios.post("/api/posts/ref", variables).then((response) => {
      console.log(response);
    });
  };

  const get = () => {
    Axios.get("/api/posts/ref").then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <button onClick={send}>저장</button>
      <button onClick={get}>populate 가져오기</button>
    </div>
  );
};
export default MYComponent;
