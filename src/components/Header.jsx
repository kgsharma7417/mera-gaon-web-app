import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth, ROLES } from "../context/AuthContext";

const roleLabels = {
  [ROLES.USER]: { hi: "नागरिक 👤", en: "Citizen 👤" },
  [ROLES.SECRETARY]: { hi: "सचिव 🏛️", en: "Secretary 🏛️" },
  [ROLES.SHOP_OWNER]: { hi: "दुकानदार 🏪", en: "Shop Owner 🏪" },
};
const roleColors = {
  [ROLES.USER]: { bg: "#e8f5e9", color: "#1b5e20" },
  [ROLES.SECRETARY]: { bg: "#e8eaf6", color: "#303f9f" },
  [ROLES.SHOP_OWNER]: { bg: "#fff8e1", color: "#7b5800" },
};

const Header = ({ title, showBack, onBack }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { currentUser, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const rc = currentUser ? roleColors[currentUser.role] : null;

  return (
    <>
      <header style={s.header}>
        <div style={s.left}>
          {showBack ? (
            <button onClick={onBack} style={s.iconBtn}>
              ←
            </button>
          ) : (
            <div style={s.brand}>
              <div style={s.brandIcon}>🌾</div>
              <div>
                <div style={s.appName}>{t("appName")}</div>
                <div style={s.village}>
                  📍{" "}
                  {currentUser
                    ? language === "hi"
                      ? currentUser.village
                      : currentUser.villageEn
                    : language === "hi"
                      ? "मेहमान"
                      : "Guest"}
                </div>
              </div>
            </div>
          )}
          {showBack && title && <span style={s.pageTitle}>{title}</span>}
        </div>

        <div style={s.right}>
          <button onClick={toggleLanguage} style={s.langBtn}>
            <span style={s.langActive}>{language === "hi" ? "अ" : "A"}</span>
            <span style={s.langDiv}>/</span>
            <span style={s.langOther}>{language === "hi" ? "A" : "अ"}</span>
          </button>

          {currentUser ? (
            <button
              onClick={() => setShowMenu((v) => !v)}
              style={{ ...s.roleBadge, background: rc.bg, color: rc.color }}
            >
              {roleLabels[currentUser.role][language]}
            </button>
          ) : (
            <button onClick={() => navigate("/login")} style={s.loginBtn}>
              {language === "hi" ? "लॉगिन" : "Login"}
            </button>
          )}
        </div>
      </header>

      {showMenu && currentUser && (
        <>
          <div style={s.overlay} onClick={() => setShowMenu(false)} />
          <div style={s.menu}>
            <p style={s.menuTitle}>{t("changeRole")}</p>
            {Object.values(ROLES).map((role) => {
              const rc2 = roleColors[role];
              const active = currentUser.role === role;
              return (
                <button
                  key={role}
                  onClick={() => {
                    switchRole(role);
                    setShowMenu(false);
                  }}
                  style={{
                    ...s.menuOption,
                    background: active ? rc2.bg : "transparent",
                    color: rc2.color,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {roleLabels[role][language]}
                  {active && <span style={{ color: "#2e7d32" }}>✓</span>}
                </button>
              );
            })}

            <div style={s.menuDivider} />

            <button
              onClick={async () => {
                setShowMenu(false);
                await logout();
                navigate("/login");
              }}
              style={{ ...s.menuOption, color: "#b71c1c", fontWeight: 600 }}
            >
              {language === "hi" ? "लॉगआउट 🚪" : "Logout 🚪"}
            </button>

            <p style={s.menuNote}>
              {language === "hi"
                ? "डेमो मोड — असली ऐप में Firebase Auth"
                : "Demo mode — real app uses Firebase Auth"}
            </p>
          </div>
        </>
      )}
    </>
  );
};

const s = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    height: "var(--header-height)",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    boxShadow: "0 1px 8px rgba(46,125,50,0.08)",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "linear-gradient(135deg, #1e5128 0%, #4e9f3d 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  },
  appName: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--text-primary)",
    lineHeight: 1.2,
  },
  village: { fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.2 },
  pageTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--text-primary)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  right: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 },
  iconBtn: {
    background: "none",
    border: "none",
    fontSize: "1.3rem",
    cursor: "pointer",
    color: "var(--text-primary)",
    padding: "4px 8px",
    borderRadius: 6,
  },
  langBtn: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: "5px 10px",
    background: "var(--gray-100)",
    border: "1px solid var(--border)",
    borderRadius: 20,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  langActive: { fontSize: "0.9rem", fontWeight: 700, color: "var(--primary)" },
  langDiv: { fontSize: "0.8rem", color: "var(--text-muted)", margin: "0 1px" },
  langOther: {
    fontSize: "0.82rem",
    fontWeight: 400,
    color: "var(--text-muted)",
  },
  roleBadge: {
    padding: "5px 10px",
    borderRadius: 20,
    border: "none",
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "transform 0.15s",
  },
  loginBtn: {
    padding: "6px 14px",
    borderRadius: 20,
    border: "none",
    fontSize: "0.78rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    color: "#fff",
    background: "linear-gradient(135deg, #1e5128, #4e9f3d)",
  },
  overlay: { position: "fixed", inset: 0, zIndex: 199 },
  menu: {
    position: "fixed",
    top: 66,
    right: 16,
    background: "rgba(255,255,255,0.97)",
    backdropFilter: "blur(16px)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    padding: "12px 0",
    zIndex: 200,
    minWidth: 200,
    animation: "menuPop 0.2s cubic-bezier(0.34,1.56,0.64,1)",
  },
  menuTitle: {
    fontSize: "0.72rem",
    color: "var(--text-muted)",
    padding: "0 16px",
    marginBottom: 6,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  menuOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px 16px",
    border: "none",
    background: "transparent",
    fontSize: "0.9rem",
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
    transition: "background 0.15s",
  },
  menuDivider: {
    height: 1,
    background: "var(--border)",
    margin: "6px 0",
  },
  menuNote: {
    fontSize: "0.68rem",
    color: "#bbb",
    marginTop: 8,
    textAlign: "center",
    padding: "0 12px",
  },
};

export default Header;
