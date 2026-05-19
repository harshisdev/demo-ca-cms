"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function RecaptchaProvider({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      container={{
        parameters: {
          badge: "bottomleft",
        },
      }}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "body",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
