import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth, ROLES } from "../context/AuthContext";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  // 1. कोर नेविगेशन आइटम्स जो गांव के हर नागरिक को हमेशा दिखेंगे
  const NAV_ITEMS = [
    { path: "/", icon: "🏠", labelKey: "home" },
    { path: "/market", icon: "🛒", labelKey: "market" },
    { path: "/health", icon: "❤️", labelKey: "health" },
    { path: "/culture", icon: "🎭", labelKey: "culture" }, // संस्कृति, दंगल और लाइव गैलरी मॉड्यूल
  ];

  // 2. रोल के हिसाब से आखिरी बटन को डायनेमिकली एडजस्ट करना (UX Optimization)
  if (currentUser?.role === ROLES.SECRETARY) {
    NAV_ITEMS.push({ path: "/admin", icon: "🏛️", labelKey: "admin" });
  } else if (currentUser?.role === "organizer") {
    NAV_ITEMS.push({
      path: "/organizer-dashboard",
      icon: "🏆",
      labelKey: "localEvents",
    });
  } else {
    NAV_ITEMS.push({
      path: "/agriculture",
      icon: "🌾",
      labelKey: "agriculture",
    });
  }

  return (
    <nav style={s.nav}>
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              ...s.item,
              ...(isActive ? s.itemActive : {}),
            }}
            aria-label={t(item.labelKey)}
          >
            {/* फ्लोटिंग आइकन एनीमेशन */}
            <span
              style={{
                ...s.icon,
                transform: isActive
                  ? "translateY(-5px) scale(1.2)"
                  : "translateY(0) scale(1)",
                textShadow: isActive
                  ? "0 4px 10px rgba(46,125,50,0.3)"
                  : "none",
              }}
            >
              {item.icon}
            </span>

            {/* प्रीमियम लेबल */}
            <span
              style={{
                ...s.label,
                color: isActive ? "#2e7d32" : "var(--text-muted, #7f8c8d)",
                fontWeight: isActive ? 800 : 500,
                opacity: isActive ? 1 : 0.85,
              }}
            >
              {t(item.labelKey)}
            </span>

            {/* टॉप फ्लूइड इंडिकेटर बार */}
            {isActive && <span style={s.activeBar} />}
          </button>
        );
      })}
    </nav>
  );
};

// 💎 अल्ट्रा-प्रीमियम मोबाइल-फर्स्ट सीएसएस आर्किटेक्चर
const s = {
  nav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "var(--max-width, 480px)",
    height: "var(--nav-height, 64px)",
    background: "rgba(255, 255, 255, 0.88)", // ग्लासमोर्फिज्म इफ़ेक्ट
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    boxShadow: "0 -8px 30px rgba(27, 94, 32, 0.06)", // हल्का प्रीमियम ग्रीनिश शैडो
    zIndex: 1000,
    boxSizing: "border-box",
  },
  item: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    padding: "6px 2px",
    border: "none",
    background: "none",
    cursor: "pointer",
    position: "relative",
    fontFamily: "inherit",
    outline: "none",
    WebkitTapHighlightColor: "transparent", // मोबाइल पर अजीब सा ब्लू हाइलाइट रोकने के लिए
  },
  itemActive: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  icon: {
    fontSize: "1.35rem",
    lineHeight: 1,
    transition:
      "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), text-shadow 0.3s",
  },
  label: {
    fontSize: "0.65rem",
    lineHeight: 1,
    letterSpacing: "0.02em",
    transition: "all 0.25s ease-in-out",
  },
  activeBar: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "32px",
    height: "3.5px",
    background: "linear-gradient(90deg, #1b5e20 0%, #4caf50 100%)", // समृद्ध ऑर्गेनिक ग्रेडिएंट
    borderRadius: "0 0 4px 4px",
    boxShadow: "0 2px 8px rgba(46, 125, 50, 0.4)", // एक्टिव होने पर हल्का ग्लो
    animation: "fadeInBar 0.2s ease-out forward",
  },
};

export default BottomNav;
