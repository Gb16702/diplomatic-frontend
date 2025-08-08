"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if cookie consent has already been given
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed w-[400px] bottom-6 right-6 bg-white rounded-xl border-t border-gray-lighter shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[1000] p-5">
      <div className="flex flex-col gap-6 max-md:gap-4">
        {/* Text Section */}
        <div>
          <h3 className="text-lg max-md:text-base font-bold font-grotesk text-black mb-2">
            We use cookies
          </h3>
          <p className="text-sm max-md:text-[13px] font-normal font-grotesk text-gray-dark leading-[1.4]">
            We use cookies to make your experience more tailored. You can change your preferences here.
          </p>
        </div>

        {/* Actions Section */}
        <div className="flex gap-3">
          <Button
            onClick={declineCookies}
            variant="outlined-secondary"
            size="sm"
            className="flex-1"
          >
            Decline
          </Button>
          <Button
            onClick={acceptCookies}
            variant="contained"
            size="sm"
            className="flex-1"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}