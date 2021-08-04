import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuillEditor from "./QuillEditor";
// import { useSession, signIn, signOut } from "next-auth/client";

const Post = () => {
  const router = useRouter();
  // const [session, loading] = useSession();
  const { postid } = router.query;

  const [item, setItem] = useState({});
  const [modify, setModify] = useState(false);

  function getData() {
    const variables = {
      idchk: postid,
    };
    console.log("variables", variables);
    Axios.post("/api/posts/detail", variables).then((res) => {
      console.log(res.data.data[0]);
      setItem(res.data.data[0]);
    });
  }

  const btn_modify = () => {
    setModify(true);
    console.log("modify");
  };

  const btn_delete = () => {
    console.log("delete");
  };

  const btn_modify_complete = () => {
    console.log("modify");
  };

  const btn_modify_cancle = () => {
    console.log("delete");
  };

  useEffect(() => {
    console.log(postid);
    if (postid) {
      getData();
    }
  }, [postid]);

  return (
    <div>
      <div>{item.title}</div>
      {modify ? (
        <>
          <QuillEditor
            category="notice"
            modify={true}
            modify_id={item._id}
            modify_title={item.title}
            modify_cont={item.cont}
          />
        </>
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: item.cont }}></div>
          <span onClick={btn_modify}>수정</span>
          <span onClick={btn_delete}>삭제</span>
        </>
      )}
    </div>
  );
};

export default Post;
