import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const MANDI_PRICES = [
  {
    icon: "🌾",
    hi: "गेहूं",
    en: "Wheat",
    price: 2150,
    change: +45,
    market: "हाथरस",
  },
  {
    icon: "🌾",
    hi: "चावल",
    en: "Rice",
    price: 3200,
    change: -80,
    market: "अलीगढ़",
  },
  {
    icon: "🥔",
    hi: "आलू",
    en: "Potato",
    price: 1100,
    change: +20,
    market: "आगरा",
  },
  {
    icon: "🧅",
    hi: "प्याज",
    en: "Onion",
    price: 2800,
    change: -120,
    market: "हाथरस",
  },
  {
    icon: "🌿",
    hi: "सरसों",
    en: "Mustard",
    price: 5200,
    change: +100,
    market: "अलीगढ़",
  },
  {
    icon: "🍬",
    hi: "गन्ना",
    en: "Sugarcane",
    price: 340,
    change: 0,
    market: "आगरा",
  },
];

const WEATHER = {
  hi: {
    temp: "34°C",
    desc: "आंशिक बादल",
    humidity: "68%",
    wind: "12 km/h",
    forecast: ["☀️ 35°C", "⛅ 33°C", "🌧️ 29°C", "☀️ 36°C", "⛅ 32°C"],
  },
  en: {
    temp: "34°C",
    desc: "Partly Cloudy",
    humidity: "68%",
    wind: "12 km/h",
    forecast: ["☀️ 35°C", "⛅ 33°C", "🌧️ 29°C", "☀️ 36°C", "⛅ 32°C"],
  },
};

const DAYS = {
  hi: ["सोम", "मंगल", "बुध", "गुरु", "शुक्र"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri"],
};

const ALERTS = [
  {
    icon: "⚡",
    hi: "कल सुबह 6-10 बजे बिजली कटौती — वार्ड 1, 2, 3",
    en: "Power cut tomorrow 6-10 AM — Ward 1, 2, 3",
    type: "power",
  },
  {
    icon: "💧",
    hi: "नहर का पानी 16 जुलाई से उपलब्ध होगा।",
    en: "Canal water available from July 16.",
    type: "water",
  },
  {
    icon: "🌧️",
    hi: "अगले 48 घंटों में हल्की बारिश की संभावना।",
    en: "Light rain expected in next 48 hours.",
    type: "rain",
  },
];

export default function AgriculturePage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("mandi");
  const w = WEATHER[language];

  const tabLabels = {
    mandi: { hi: "📊 मंडी भाव", en: "📊 Mandi Prices" },
    weather: { hi: "🌤️ मौसम", en: "🌤️ Weather" },
    alerts: { hi: "🔔 अलर्ट", en: "🔔 Alerts" },
  };

  return (
    <div className="page page-enter">
      <div style={s.hero}>
        <div>
          <div style={s.heroTitle}>
            {language === "hi" ? "कृषि सेवाएं" : "Agriculture Services"}
          </div>
          <div style={s.heroSub}>
            {language === "hi"
              ? "मंडी भाव · मौसम · अलर्ट"
              : "Mandi Prices · Weather · Alerts"}
          </div>
        </div>
        <div style={s.heroIcon}>🌾</div>
      </div>

      <div style={s.tabBar}>
        {["mandi", "weather", "alerts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...s.tab,
              background: activeTab === tab ? "#1b5e20" : "transparent",
              color: activeTab === tab ? "#fff" : "var(--text-muted)",
              fontWeight: activeTab === tab ? 700 : 400,
            }}
          >
            {tabLabels[tab][language]}
          </button>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        {/* MANDI */}
        {activeTab === "mandi" && (
          <>
            <div style={s.mandiHeader}>
              <span style={s.mandiTitle}>
                {language === "hi"
                  ? "आज के भाव (₹/क्विंटल)"
                  : "Today's Rates (₹/Quintal)"}
              </span>
              <span style={s.mandiDate}>
                {language === "hi"
                  ? "अपडेट: आज सुबह 8 बजे"
                  : "Updated: 8 AM today"}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {MANDI_PRICES.map((crop, i) => (
                <div key={i} style={s.cropCard}>
                  <div style={s.cropIcon}>{crop.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={s.cropName}>
                      {language === "hi" ? crop.hi : crop.en}
                    </div>
                    <div style={s.cropMarket}>
                      {language === "hi"
                        ? `${crop.market} मंडी`
                        : `${crop.market} Market`}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={s.cropPrice}>
                      ₹{crop.price.toLocaleString()}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        marginTop: 2,
                        color:
                          crop.change > 0
                            ? "#1b5e20"
                            : crop.change < 0
                              ? "#c62828"
                              : "#9e9e9e",
                      }}
                    >
                      {crop.change > 0
                        ? `▲ +${crop.change}`
                        : crop.change < 0
                          ? `▼ ${crop.change}`
                          : "— 0"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* WEATHER */}
        {activeTab === "weather" && (
          <>
            <div style={s.weatherCard}>
              <div style={s.weatherTop}>
                <div>
                  <div style={s.weatherTemp}>{w.temp}</div>
                  <div style={s.weatherDesc}>{w.desc}</div>
                  <div style={s.weatherLocation}>
                    📍 {language === "hi" ? "रामपुर, उ.प्र." : "Rampur, UP"}
                  </div>
                </div>
                <div style={s.weatherBigIcon}>⛅</div>
              </div>
              <div style={s.weatherStats}>
                <div style={s.weatherStat}>
                  <span style={s.weatherStatIcon}>💧</span>
                  <span style={s.weatherStatLabel}>
                    {language === "hi" ? "नमी" : "Humidity"}
                  </span>
                  <span style={s.weatherStatVal}>{w.humidity}</span>
                </div>
                <div style={s.weatherStat}>
                  <span style={s.weatherStatIcon}>💨</span>
                  <span style={s.weatherStatLabel}>
                    {language === "hi" ? "हवा" : "Wind"}
                  </span>
                  <span style={s.weatherStatVal}>{w.wind}</span>
                </div>
                <div style={s.weatherStat}>
                  <span style={s.weatherStatIcon}>🌡️</span>
                  <span style={s.weatherStatLabel}>
                    {language === "hi" ? "एहसास" : "Feels"}
                  </span>
                  <span style={s.weatherStatVal}>37°C</span>
                </div>
              </div>
            </div>

            <div style={s.forecastTitle}>
              {language === "hi" ? "अगले 5 दिन" : "Next 5 Days"}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {w.forecast.map((f, i) => (
                <div key={i} style={s.forecastChip}>
                  <div style={s.forecastDay}>{DAYS[language][i]}</div>
                  <div style={s.forecastVal}>{f}</div>
                </div>
              ))}
            </div>

            <div style={{ ...s.cropTip, marginTop: 16 }}>
              🌱{" "}
              {language === "hi"
                ? "बारिश की संभावना को देखते हुए, इस हफ्ते धान की रोपाई के लिए अच्छा समय है।"
                : "Given rain forecast, this week is good for paddy transplanting."}
            </div>
          </>
        )}

        {/* ALERTS */}
        {activeTab === "alerts" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ALERTS.map((alert, i) => {
              const colors = {
                power: { bg: "#fff8e1", border: "#ffecb3", color: "#7b5800" },
                water: { bg: "#e3f2fd", border: "#bbdefb", color: "#0d47a1" },
                rain: { bg: "#e8f5e9", border: "#c8e6c9", color: "#1b5e20" },
              };
              const c = colors[alert.type];
              return (
                <div
                  key={i}
                  style={{
                    ...s.alertCard,
                    background: c.bg,
                    borderColor: c.border,
                    color: c.color,
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{alert.icon}</span>
                  <span
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      lineHeight: 1.5,
                    }}
                  >
                    {language === "hi" ? alert.hi : alert.en}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  hero: {
    background: "linear-gradient(135deg, #1e5128 0%, #4e9f3d 100%)",
    padding: "20px 16px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTitle: { fontSize: "1.3rem", fontWeight: 700, color: "#fff" },
  heroSub: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  heroIcon: { fontSize: "3rem", opacity: 0.25 },
  tabBar: {
    display: "flex",
    gap: 6,
    padding: "8px 12px",
    background: "#fff",
    borderBottom: "1px solid var(--border)",
  },
  tab: {
    flex: 1,
    padding: "8px 6px",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.75rem",
    fontFamily: "inherit",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  mandiHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mandiTitle: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "var(--text-primary)",
  },
  mandiDate: { fontSize: "0.72rem", color: "var(--text-muted)" },
  cropCard: {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  cropIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    background: "var(--green-50)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    flexShrink: 0,
  },
  cropName: { fontSize: "0.92rem", fontWeight: 700 },
  cropMarket: { fontSize: "0.73rem", color: "var(--text-muted)", marginTop: 2 },
  cropPrice: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--text-primary)",
  },
  weatherCard: {
    background: "linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)",
    borderRadius: "var(--radius-md)",
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 4px 20px rgba(21,101,192,0.3)",
  },
  weatherTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  weatherTemp: {
    fontSize: "3rem",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1,
  },
  weatherDesc: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  weatherLocation: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
  },
  weatherBigIcon: { fontSize: "4rem", opacity: 0.8 },
  weatherStats: {
    display: "flex",
    gap: 0,
    marginTop: 16,
    background: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    overflow: "hidden",
  },
  weatherStat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 4px",
    gap: 4,
    borderRight: "1px solid rgba(255,255,255,0.2)",
  },
  weatherStatIcon: { fontSize: "1.1rem" },
  weatherStatLabel: {
    fontSize: "0.65rem",
    color: "rgba(255,255,255,0.75)",
    fontWeight: 600,
  },
  weatherStatVal: { fontSize: "0.85rem", color: "#fff", fontWeight: 700 },
  forecastTitle: {
    fontSize: "0.9rem",
    fontWeight: 700,
    marginBottom: 10,
    color: "var(--text-primary)",
  },
  forecastChip: {
    flex: 1,
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "10px 6px",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  forecastDay: {
    fontSize: "0.68rem",
    color: "var(--text-muted)",
    fontWeight: 600,
  },
  forecastVal: { fontSize: "0.82rem", fontWeight: 700, marginTop: 4 },
  cropTip: {
    background: "#e8f5e9",
    border: "1px solid var(--green-100)",
    borderRadius: "var(--radius-sm)",
    padding: "12px 14px",
    fontSize: "0.85rem",
    color: "var(--green-900)",
    fontWeight: 500,
    lineHeight: 1.6,
  },
  alertCard: {
    border: "1.5px solid",
    borderRadius: "var(--radius-sm)",
    padding: "14px 16px",
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
  },
};
