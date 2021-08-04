import React from "react";
import { useRouter } from "next/router";
import {
  providers,
  signIn,
  getSession,
  csrfToken,
  getProviders,
} from "next-auth/client";
import SocialLogin from "../components/common/SocialLogin";
import { getCsrfToken } from "next-auth/client";

export default function SignIn({ providers, csrfToken }) {
  const {
    query: { callbackUrl },
  } = useRouter();
  return (
    <div className="login_wrapper">
      <div className="login_area">
        <form className="login_form">
          <h1>TURNING POINT</h1>
          <h2>로그인</h2>
          <div>
            <form method="post" action="/api/user/login">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label>
                <div class="tit">이메일</div>
                <div>
                  <input name="email" type="text" />
                </div>
              </label>
              <label>
                <div class="tit">비밀번호</div>
                <div>
                  <input name="userpwd" type="password" />
                </div>
              </label>
              <button type="submit">Sign in</button>
            </form>
            <SocialLogin providers={providers} csrfToken={csrfToken} />
          </div>
          <p className="notice_yakwan">
            이용약관, 개인정보 수집 및 이용, 개인정보 제공 내용을 확인하였고
            동의합니다
          </p>
        </form>
      </div>
      <div className="login_mv"></div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
