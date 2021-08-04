import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Dev.log" />
          <meta
            name="keywords"
            content="blog,react,antd,webpack,css,javascript"
          />
          <script
            src="https://cdn.bootpay.co.kr/js/bootpay-3.3.1.min.js"
            type="application/javascript"
          ></script>
          <script
            src="js/channeltalk.js"
            type="application/javascript"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
