import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isShowFunc, fetchUser } from "../../redux/thunkSlice";

function thunkRedux() {
  const { users, loading, error, isShow } = useSelector((state) => state.thunk);
  const dispatch = useDispatch();

  if (error) {
    return <p>에러발생</p>;
  }
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <div>
        {isShow && <div>show</div>}
        <button onClick={() => dispatch(isShowFunc())}>보여라</button>
      </div>
      <div>
        <button onClick={() => dispatch(fetchUser())}>회원정보가져오기</button>
        {users.map((user) => (
          <div key={user.title}>{user.text}</div>
        ))}
      </div>
    </>
  );
}

export default thunkRedux;
