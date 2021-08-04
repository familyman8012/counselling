import React, { useEffect, useRef, useState } from "react";
import S3 from "react-aws-s3";
import "quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import Axios from "axios";

import { useSession } from "next-auth/client";

export const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "formula"],
      ["clean"],
    ],
  },
};

const QuillEditor = (props) => {
  const { modify, category, modify_id, modify_title, modify_cont } = props;
  console.log(props);
  const [title, setTitle] = useState("");
  const [password, setPwd] = useState("");
  const [session, loading] = useSession();
  const router = useRouter();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  const Quill = typeof window == "object" ? require("quill") : () => false;

  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  const onClickImageBtn = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = function () {
      const file = input.files[0];
      const fileName = file.name;

      const config = {
        bucketName: "direct-upload-s3-bucket-testthing7",
        region: "ap-northeast-2",
        accessKeyId: "AKIAWBU33XUH2R3WQFX5",
        secretAccessKey: "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",
      };

      console.log("file은", file);
      console.log("config", config.bucketName);

      const ReactS3Client = new S3(config);

      ReactS3Client.uploadFile(file, fileName).then((data) => {
        if (data.status === 204) {
          //커서 위치 받아오기 위함.
          const range = quillInstance.current.getSelection(true);
          // 1.현재 커서 위치에 2. 이미지를 3.src="" 로 나타냄.
          quillInstance.current.insertEmbed(
            range.index,
            "image",
            `${data.location}`
          );

          // 이미지 업로드 후 커서 이미지 한칸 옆으로 이동.
          quillInstance.current.setSelection(range.index + 1);
        } else {
          alert("error");
        }
      });
    };
  };

  useEffect(() => {
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        theme: "snow",
        placeholder: "Please enter the contents.",
        modules: modules,
      });
    }

    const quill = quillInstance.current;

    // quill.on("text-change", () => {
    //   QuillChange(quill.root.innerHTML);
    // });

    const toolbar = quill.getModule("toolbar");
    toolbar.addHandler("image", onClickImageBtn);

    if (modify) {
      setTitle(modify_title);
      quill.root.innerHTML = modify_cont;
    }
  }, []);

  const send = () => {
    const cont = quillInstance.current.root.innerHTML;

    console.log("session.user.email", session.user.email);
    const variables = {
      email: session.user.email,
      category: props.category,
      title,
      password,
      cont,
    };

    Axios.post("/api/posts/write", variables).then((response) => {
      console.log(response);
      //router.push("/board/list");
    });
  };

  const btn_modify = () => {
    const cont = quillInstance.current.root.innerHTML;
    const variables = {
      _id: modify_id,
      email: session.user.email,
      category: props.category,
      title,
      password,
      cont,
    };
    Axios.post("/api/posts/modify", variables).then((response) => {
      console.log(response);
      //router.push("/board/list");
    });
  };

  return (
    <>
      <ul>
        <li>
          타이틀 <input type="text" onChange={handleTitle} value={title} />
        </li>
        <li>
          비밀번호 <input type="text" onChange={handlePwd} value={password} />
        </li>
      </ul>
      <div ref={quillElement}></div>
      {modify ? (
        <button onClick={btn_modify}>수정완료</button>
      ) : (
        <button onClick={send}>저장</button>
      )}
    </>
  );
};

export default React.memo(QuillEditor);
