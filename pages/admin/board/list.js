import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "rc-pagination";

import Axios from "axios";
import "rc-pagination/assets/index.css";

const ListComponent = (props) => {
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(115);
  const [currentPage, setCurrentPage] = useState(1);

  const [bbsView, setBbsView] = useState([]);
  const [confirmPwd, setConfirmPwd] = useState(0);
  const [idchk, setIdchk] = useState(false);
  const [check, setCheck] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const variables = {
  //     category: props.category,
  //   };
  // Axios.post("/api/posts/list", variables).then((response) => {
  //   console.log(response);
  //   //console.log(response.data[0].cont);
  //   setBbsView(response.data[0].totalData);
  // });
  // }, []);
  // console.log(bbsView);
  // const listItems = bbsView.map((number) => <li>{number}</li>);

  useEffect(() => {
    getbbs();
  }, [currentPage]);

  const getbbs = async () => {
    // Axios.post("/api/posts/list_coiun", variables).then((response) => {
    //   console.log(response);
    //   //console.log(response.data[0].cont);
    //   setBbsView(response.data[0].totalData);
    // });
    let tcount = await Axios.get("/api/posts/list_total");
    setTotalCount(tcount.data);
    console.log(totalCount);
    let response = await Axios.get(
      `/api/posts/list?start_index=${
        pageSize * (currentPage - 1)
      }&page_size=${pageSize}`
    );
    console.log(response);
    setBbsView(response.data);
  };

  const loadCont = (e) => {
    setIdchk(e.target.id);
    setCheck((prevCheck) => !prevCheck);
    console.log(check);
  };

  const handleConfirmPwd = (e) => {
    setConfirmPwd(e.target.value);
  };

  const submitPwd = (e) => {
    e.preventDefault();
    const variables = {
      idchk,
      confirmPwd,
    };
    Axios.post("/api/posts/secret", variables).then((response) => {
      console.log(response);
      if (response.data.message == "correct") {
        alert("맞음");
        router.push(`/post/${idchk}`);
      } else if (response.data.message == "wrong") {
        alert("틀림");
      }
    });
  };

  return (
    <div>
      <p>
        https://eastflag.co.kr/react/react-bootstrap-reactrouterdom/%EB%AA%A9%EB%A1%9D-%ED%8E%98%EC%9D%B4%EC%A7%95-%ED%95%98%EA%B8%B0/
      </p>
      <p>https://grandj.tistory.com/239</p>
      <ul>
        {bbsView &&
          bbsView.map((number) => (
            <li key={number._id} id={number._id} onClick={loadCont}>
              {number.title}
            </li>
          ))}
      </ul>
      <Pagination
        total={totalCount}
        current={currentPage}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
      {check ? (
        <div>
          <input type="text" onChange={handleConfirmPwd} value={confirmPwd} />
          <button onClick={submitPwd}>확인</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ListComponent;
