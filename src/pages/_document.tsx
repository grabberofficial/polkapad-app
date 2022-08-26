import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="facebook-domain-verification"
            content="kpa4q0e24rfflzhpsv3b4n80ured84"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins"
            rel="stylesheet"
          />
        </Head>
        <body style={{ height: '100vh', width: '100%' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
