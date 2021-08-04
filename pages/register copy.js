import { useState, useEffect } from "react";
import Axios from "axios";

export default function register() {
  const [inputs, setInputs] = useState({
    userid: "",
    userpwd: "",
    name: "",
    email: "",
    phone: "",
  });

  const { userid, userpwd, name, email, phone } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const join = () => {
    Axios.post("/api/user/user", inputs).then((response) => {
      console.log("client는", response);
      if (response.status == 200) {
        alert(response.data.message);
      } else {
        alert("가입 실패");
      }
    });
  };

  return (
    <>
      <input
        name="userid"
        type="text"
        placeholder="가입아이디"
        onChange={onChange}
        value={userid}
      />
      <input
        name="userpwd"
        type="text"
        placeholder="가입비밀번호"
        onChange={onChange}
        value={userpwd}
      />
      <input
        name="name"
        typpe="text"
        placeholder="이름"
        onChange={onChange}
        value={name}
      />
      <input
        name="email"
        typpe="text"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <input
        name="phone"
        typpe="text"
        placeholder="연락처"
        onChange={onChange}
        value={phone}
      />
      <div>
        <b> 값 : </b>
        {userid} {userpwd} {name} {email} {phone}
      </div>
      <button onClick={join}>가입</button>
    </>
  );
}
