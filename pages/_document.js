import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <script
            async
            src="https://cdn.bootpay.co.kr/js/bootpay-3.3.1.min.js"
          ></script>
          <script async src="js/channeltalk.js"></script>
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
