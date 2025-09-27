"use client";

import { CountryCode, E164Number } from "libphonenumber-js/core";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

interface ClientOnlyPhoneInputProps {
  defaultCountry?: CountryCode;
  placeholder?: string;
  international?: boolean;
  withCountryCallingCode?: boolean;
  value?: E164Number | undefined;
  onChange?: (value?: E164Number | undefined) => void;
  className?: string;
}

export function ClientOnlyPhoneInput({
  defaultCountry = "US" as CountryCode,
  placeholder,
  international = true,
  withCountryCallingCode = true,
  value,
  onChange,
  className = "input-phone",
}: ClientOnlyPhoneInputProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={className}>
        <input
          type="tel"
          placeholder={placeholder}
          value=""
          readOnly
          className="PhoneInputInput"
        />
      </div>
    );
  }

  return (
    <PhoneInput
      defaultCountry={defaultCountry}
      placeholder={placeholder}
      international={international}
      withCountryCallingCode={withCountryCallingCode}
      value={value}
      onChange={onChange || (() => {})}
      className={className}
    />
  );
}
