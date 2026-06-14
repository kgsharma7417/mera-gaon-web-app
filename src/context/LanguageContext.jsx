import React, { createContext, useContext, useState } from "react";
import hi from "../translations/hn";
import en from "../translations/en";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("hi");
  const translations = language === "hi" ? hi : en;
  const t = (key) => translations[key] || key;
  const toggleLanguage = () => setLanguage((p) => (p === "hi" ? "en" : "hi"));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
