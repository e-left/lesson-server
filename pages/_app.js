import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import '../styles/globals.css'
import "katex/dist/katex.min.css";
import "mathquill/build/mathquill.css";
import "mathquill4quill/mathquill4quill.css";
import "react-quill/dist/quill.snow.css";
import { SessionProvider } from "next-auth/react";
import { useEffect } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>

  )
}

export default MyApp
