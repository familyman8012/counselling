import React from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function swrtest() {
  const { data, error } = useSWR("/api/product/product", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data[0].text);
  return <div>hello {data[0].text}!</div>;
}

export default swrtest;
