

import Script from "next/script";


const Googleadsec = () => {
    return  (
        <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6763007387304477"
      />
    )
}

export default Googleadsec;