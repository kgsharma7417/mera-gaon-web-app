import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

const NOTICES = [
  {
    id: 1,
    icon: "📢",
    type: "important",
    titleHi: "ग्राम सभा बैठक",
    titleEn: "Gram Sabha Meeting",
    descHi: "15 जुलाई को दोपहर 2 बजे पंचायत भवन में।",
    descEn: "July 15th at 2 PM at Panchayat Bhawan.",
    date: "2025-07-15",
    badge: "important",
  },
  {
    id: 2,
    icon: "💉",
    type: "health",
    titleHi: "टीकाकरण शिविर",
    titleEn: "Vaccination Camp",
    descHi: "18 जुलाई को आंगनवाड़ी केंद्र पर सुबह 9 से 1 बजे तक।",
    descEn: "July 18th, 9 AM–1 PM at Anganwadi Centre.",
    date: "2025-07-18",
    badge: "health",
  },
  {
    id: 3,
    icon: "⚡",
    type: "alert",
    titleHi: "बिजली कटौती",
    titleEn: "Power Outage",
    descHi: "कल सुबह 6 से 10 बजे तक बिजली नहीं रहेगी।",
    descEn: "No power tomorrow 6 AM–10 AM (maintenance).",
    date: "2025-07-13",
    badge: "alert",
  },
];

const MODULES = [
  {
    path: "/admin",
    icon: "🏛️",
    labelHi: "योजनाएं",
    labelEn: "Schemes",
    descHi: "सरकारी योजनाएं",
    descEn: "Govt. Schemes",
    bg: "linear-gradient(135deg,#e8eaf6,#c5cae9)",
  },
  {
    path: "/market",
    icon: "🛒",
    labelHi: "बाज़ार",
    labelEn: "Market",
    descHi: "सभी दुकानें",
    descEn: "All Shops",
    bg: "linear-gradient(135deg,#fff8e1,#ffecb3)",
  },
  {
    path: "/health",
    icon: "❤️",
    labelHi: "स्वास्थ्य",
    labelEn: "Health",
    descHi: "आपातकालीन सूची",
    descEn: "Emergency Directory",
    bg: "linear-gradient(135deg,#fce4ec,#f8bbd0)",
  },
  {
    path: "/gallery",
    icon: "🖼️",
    labelHi: "गैलरी",
    labelEn: "Gallery",
    descHi: "फोटो गैलरी",
    descEn: "Photo Gallery",
    bg: "linear-gradient(135deg,#e0f7fa,#b2ebf2)",
  },
];

const EMERGENCY = [
  { icon: "🚑", hi: "एंबुलेंस", en: "Ambulance", number: "108" },
  { icon: "🚔", hi: "पुलिस", en: "Police", number: "112" },
  { icon: "🔥", hi: "फायर", en: "Fire", number: "101" },
  { icon: "⚕️", hi: "डॉक्टर", en: "Doctor", number: "9876500001" },
];

const badgeStyle = {
  important: {
    bg: "#fce4ec",
    color: "#b71c1c",
    label: { hi: "जरूरी", en: "Urgent" },
  },
  health: {
    bg: "#e8f5e9",
    color: "#1b5e20",
    label: { hi: "स्वास्थ्य", en: "Health" },
  },
  alert: {
    bg: "#fff8e1",
    color: "#7b5800",
    label: { hi: "अलर्ट", en: "Alert" },
  },
};

const MARQUEE_TEXT = {
  hi: "⚡ जरूरी सूचना: 15 जुलाई को ग्राम सभा बैठक — पंचायत भवन, दोपहर 2 बजे। सभी ग्रामवासी अवश्य पधारें।",
  en: "⚡ Urgent: Gram Sabha Meeting on July 15 — Panchayat Bhawan, 2 PM. All villagers are requested to attend.",
};

const AUTH_LABELS = {
  login: { hi: "लॉगिन", en: "Login" },
  logout: { hi: "लॉगआउट", en: "Logout" },
  guest: { hi: "अतिथि", en: "Guest" },
  guestVillage: { hi: "अपने गांव से जुड़ें", en: "Connect with your village" },
};

export default function HomePage() {
  const { t, language } = useLanguage();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      NOTICES.forEach((_, i) => {
        setTimeout(() => setVisible((v) => [...v, i]), i * 120);
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (language === "hi") {
      if (h < 12) return "सुप्रभात 🌅";
      if (h < 17) return "नमस्ते ☀️";
      return "शुभ संध्या 🌙";
    } else {
      if (h < 12) return "Good Morning 🌅";
      if (h < 17) return "Good Afternoon ☀️";
      return "Good Evening 🌙";
    }
  };

  const handleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR)
      return alert(
        language === "hi"
          ? "Voice search supported नहीं।"
          : "Voice search not supported.",
      );
    const r = new SR();
    r.lang = language === "hi" ? "hi-IN" : "en-IN";
    setListening(true);
    r.onresult = (e) => {
      setSearchText(e.results[0][0].transcript);
      setListening(false);
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    r.start();
  };

  const handleAuthAction = async () => {
    if (currentUser) {
      await logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="page page-enter">
      {/* Hero Banner */}
      <div style={s.hero}>
        <div style={s.heroTopRow}>
          <div style={s.heroContent}>
            <div style={s.heroGreeting}>{greeting()}</div>
            <div style={s.heroName}>
              {currentUser
                ? language === "hi"
                  ? currentUser.name
                  : currentUser.nameEn || currentUser.name
                : AUTH_LABELS.guest[language]}
            </div>
            <div style={s.heroVillage}>
              📍{" "}
              {currentUser
                ? language === "hi"
                  ? currentUser.village
                  : currentUser.villageEn
                : AUTH_LABELS.guestVillage[language]}
            </div>
          </div>

          <button onClick={handleAuthAction} style={s.authBtn}>
            {currentUser ? "🚪" : "👤"}{" "}
            {currentUser
              ? AUTH_LABELS.logout[language]
              : AUTH_LABELS.login[language]}
          </button>
        </div>

        <div style={s.heroIcon}>🌾</div>

        {/* Floating stats */}
        <div style={s.heroStats}>
          <div style={s.statChip}>
            📋 3 {language === "hi" ? "सूचनाएं" : "Notices"}
          </div>
          <div style={s.statChip}>
            🏪 8 {language === "hi" ? "दुकानें" : "Shops"}
          </div>
          <div style={s.statChip}>🌡️ 34°C</div>
        </div>
      </div>

      {/* Marquee Alert */}
      <div style={s.marqueeBar}>
        <div className="marquee-wrap" style={{ flex: 1, overflow: "hidden" }}>
          <span
            className="marquee-text"
            style={{ fontSize: "0.8rem", color: "#7b5800", fontWeight: 600 }}
          >
            {MARQUEE_TEXT[language]}
          </span>
        </div>
      </div>

      <div className="page-content">
        {/* Search */}
        <div style={s.searchRow}>
          <div style={s.searchBox}>
            <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
              🔍
            </span>
            <input
              style={s.searchInput}
              placeholder={t("search")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button onClick={() => setSearchText("")} style={s.clearBtn}>
                ✕
              </button>
            )}
          </div>
          <button
            onClick={handleVoice}
            style={{
              ...s.voiceBtn,
              background: listening ? "#fce4ec" : "#fff",
              borderColor: listening ? "#e91e63" : "var(--border)",
              transform: listening ? "scale(1.1)" : "scale(1)",
            }}
          >
            {listening ? "🔴" : "🎤"}
          </button>
        </div>

        {/* Notice Board */}
        <div className="section-header mt-16">
          <span className="section-title">
            <span>📋</span> {t("noticeboard")}
          </span>
          <button onClick={() => navigate("/admin")} style={s.seeAll}>
            {t("seeAll")} →
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {loading
            ? [1, 2, 3].map((i) => (
                <div key={i} style={{ ...s.skeletonCard }}>
                  <div
                    className="skeleton"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      className="skeleton"
                      style={{ height: 14, width: "60%", borderRadius: 6 }}
                    />
                    <div
                      className="skeleton"
                      style={{ height: 12, width: "90%", borderRadius: 6 }}
                    />
                    <div
                      className="skeleton"
                      style={{ height: 10, width: "40%", borderRadius: 6 }}
                    />
                  </div>
                </div>
              ))
            : NOTICES.map((n, i) => {
                const bs = badgeStyle[n.badge];
                return (
                  <div
                    key={n.id}
                    style={{
                      ...s.noticeCard,
                      opacity: visible.includes(i) ? 1 : 0,
                      transform: visible.includes(i)
                        ? "translateY(0)"
                        : "translateY(12px)",
                      transition: "opacity 0.35s ease, transform 0.35s ease",
                    }}
                  >
                    <div style={s.noticeIconBox}>{n.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={s.noticeTitle}>
                        {language === "hi" ? n.titleHi : n.titleEn}
                      </div>
                      <div style={s.noticeDesc}>
                        {language === "hi" ? n.descHi : n.descEn}
                      </div>
                      <div style={s.noticeDate}>📅 {n.date}</div>
                    </div>
                    <span
                      style={{ ...s.badge, background: bs.bg, color: bs.color }}
                    >
                      {bs.label[language]}
                    </span>
                  </div>
                );
              })}
        </div>

        {/* Quick Links */}
        <div className="section-header mt-16">
          <span className="section-title">
            <span>⚡</span> {t("quickLinks")}
          </span>
        </div>
        <div className="module-grid">
          {MODULES.map((m) => (
            <button
              key={m.path}
              className="module-card"
              onClick={() => navigate(m.path)}
              style={{ background: m.bg, border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <span className="module-icon">{m.icon}</span>
              <span className="module-label">
                {language === "hi" ? m.labelHi : m.labelEn}
              </span>
              <span className="module-desc">
                {language === "hi" ? m.descHi : m.descEn}
              </span>
            </button>
          ))}
        </div>

        {/* Emergency */}
        <div className="section-header mt-16">
          <span className="section-title" style={{ color: "var(--danger)" }}>
            <span>🚨</span> {t("emergency")}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {EMERGENCY.map((ec) => (
            <a
              key={ec.number}
              href={`tel:${ec.number}`}
              className="call-btn-emergency"
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1.4rem" }}>{ec.icon}</span>
                <span>
                  <div style={{ fontWeight: 700 }}>
                    {language === "hi" ? ec.hi : ec.en}
                  </div>
                  <div style={{ fontSize: "0.78rem", opacity: 0.75 }}>
                    {ec.number}
                  </div>
                </span>
              </span>
              <span style={{ fontSize: "1.2rem" }}>📞</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  hero: {
    background: "linear-gradient(135deg, #1e5128 0%, #4e9f3d 100%)",
    padding: "22px 16px 16px",
    position: "relative",
    overflow: "hidden",
  },
  heroTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    position: "relative",
    zIndex: 1,
  },
  heroContent: { position: "relative", zIndex: 1 },
  heroGreeting: {
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.8)",
    fontWeight: 500,
  },
  heroName: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#fff",
    marginTop: 2,
  },
  heroVillage: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
  },
  heroIcon: {
    position: "absolute",
    right: 16,
    top: 16,
    fontSize: "4rem",
    opacity: 0.2,
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  },
  heroStats: {
    display: "flex",
    gap: 8,
    marginTop: 16,
    position: "relative",
    zIndex: 1,
    flexWrap: "wrap",
  },
  statChip: {
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    fontSize: "0.75rem",
    fontWeight: 600,
    padding: "5px 12px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.25)",
  },
  authBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.16)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    fontSize: "0.78rem",
    fontWeight: 700,
    padding: "8px 14px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.3)",
    cursor: "pointer",
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition: "transform 0.2s, background 0.2s",
  },
  marqueeBar: {
    background: "#fff8e1",
    borderBottom: "1px solid #ffecb3",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    overflow: "hidden",
  },
  searchRow: { display: "flex", gap: 8, marginBottom: 4 },
  searchBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fff",
    border: "1.5px solid var(--border-strong)",
    borderRadius: "var(--radius-sm)",
    padding: "0 14px",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "0.9rem",
    color: "var(--text-primary)",
    background: "transparent",
    fontFamily: "inherit",
    padding: "12px 0",
  },
  clearBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--text-muted)",
    fontSize: "0.85rem",
    padding: "2px",
  },
  voiceBtn: {
    width: 46,
    height: 46,
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  seeAll: {
    background: "none",
    border: "none",
    color: "var(--primary)",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  skeletonCard: {
    background: "#fff",
    borderRadius: "var(--radius-sm)",
    padding: "14px",
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    border: "1px solid var(--border)",
  },
  noticeCard: {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: "14px",
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    cursor: "pointer",
    transition: "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.2s",
  },
  noticeIconBox: {
    fontSize: "1.6rem",
    flexShrink: 0,
    width: 44,
    height: 44,
    background: "var(--green-50)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noticeTitle: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: 3,
  },
  noticeDesc: {
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
    lineHeight: 1.5,
  },
  noticeDate: { fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 },
  badge: {
    fontSize: "0.68rem",
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: 20,
    flexShrink: 0,
    height: "fit-content",
  },
};
