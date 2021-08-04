import React, { useState } from "react";
import axios from "axios";

function product() {
  const [inputs, setInputs] = useState({
    title: "",
    text: "",
    link: "",
    imgUrl: "",
    alt: "",
    shortdesc: "",
    desc: "",
    price: "",
  });
  const { title, text, link, imgUrl, alt, shortdesc, desc, price } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onReset = () => {
    setInputs({
      title: "",
      text: "",
      link: "",
      imgUrl: "",
      alt: "",
      shortdesc: "",
      desc: "",
      price: "",
    });
  };
  const save = () => {
    console.log(inputs);
    axios.post("/api/product/product", inputs).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <input
        name="title"
        placeholder="title"
        onChange={onChange}
        value={title}
      />
      <input name="text" placeholder="text" onChange={onChange} value={text} />
      <input name="link" placeholder="link" onChange={onChange} value={link} />
      <input
        name="imgUrl"
        placeholder="imgUrl"
        onChange={onChange}
        value={imgUrl}
      />
      <input name="alt" placeholder="alt" onChange={onChange} value={alt} />
      <input
        name="shortdesc"
        placeholder="shortdesc"
        onChange={onChange}
        value={shortdesc}
      />
      <input name="desc" placeholder="desc" onChange={onChange} value={desc} />
      <input
        name="price"
        placeholder="price"
        onChange={onChange}
        value={price}
      />
      <div>
        <button onClick={save}>저장</button>
      </div>
    </div>
  );
}

export default product;
