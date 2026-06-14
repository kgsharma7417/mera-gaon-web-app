import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import TelemedicinePage from "./TelemedicinePage";
import MedicinePage from "./MedicinePage";
import MaternalPage from "./MaternalPage";
import MentalHealthPage from "./MentalHealthPage";

const EMERGENCY = [
  {
    icon: "🚑",
    hi: "एंबुलेंस",
    en: "Ambulance",
    number: "108",
    color: "#fce4ec",
    border: "#f8bbd0",
  },
  {
    icon: "🚔",
    hi: "पुलिस",
    en: "Police",
    number: "112",
    color: "#e8eaf6",
    border: "#c5cae9",
  },
  {
    icon: "🔥",
    hi: "फायर",
    en: "Fire Station",
    number: "101",
    color: "#fff3e0",
    border: "#ffe0b2",
  },
  {
    icon: "🏥",
    hi: "सरकारी अस्पताल",
    en: "Govt Hospital",
    number: "9876500002",
    color: "#e8f5e9",
    border: "#c8e6c9",
  },
  {
    icon: "⚕️",
    hi: "डॉ. राम कुमार",
    en: "Dr. Ram Kumar",
    number: "9876500001",
    color: "#e8f5e9",
    border: "#c8e6c9",
  },
];

const BLOOD_DONORS = [
  {
    id: 1,
    hi: "सुरेश यादव",
    en: "Suresh Yadav",
    group: "O+",
    phone: "9876541111",
    available: true,
  },
  {
    id: 2,
    hi: "प्रिया शर्मा",
    en: "Priya Sharma",
    group: "A+",
    phone: "9876542222",
    available: true,
  },
  {
    id: 3,
    hi: "मोहन सिंह",
    en: "Mohan Singh",
    group: "B+",
    phone: "9876543333",
    available: false,
  },
  {
    id: 4,
    hi: "गीता देवी",
    en: "Geeta Devi",
    group: "AB+",
    phone: "9876544444",
    available: true,
  },
  {
    id: 5,
    hi: "रवि कुमार",
    en: "Ravi Kumar",
    group: "O-",
    phone: "9876545555",
    available: true,
  },
];

const ANGANWADI = [
  {
    labelHi: "अगला टीकाकरण",
    labelEn: "Next Vaccination",
    valueHi: "18 जुलाई, सुबह 9 बजे",
    valueEn: "July 18, 9 AM",
    icon: "💉",
  },
  {
    labelHi: "राशन वितरण",
    labelEn: "Ration Distribution",
    valueHi: "20 जुलाई, सुबह 10 बजे",
    valueEn: "July 20, 10 AM",
    icon: "🍚",
  },
  {
    labelHi: "पोषण मेला",
    labelEn: "Nutrition Fair",
    valueHi: "25 जुलाई",
    valueEn: "July 25",
    icon: "🥗",
  },
];

const TABS = ["emergency", "blood", "anganwadi"];

/* ─── 4 New Feature Tiles ─────────────────────────────────── */
const NEW_FEATURES = [
  {
    id: "telemedicine",
    icon: "🩺",
    hi: "ऑनलाइन डॉक्टर",
    en: "Online Doctor",
    descHi: "घर बैठे डॉक्टर से मिलें",
    descEn: "Consult doctor from home",
    gradient: "linear-gradient(135deg,#1565c0,#1e88e5)",
    badge: { hi: "24×7", en: "24×7" },
  },
  {
    id: "medicine",
    icon: "💊",
    hi: "दवाई & रिकॉर्ड",
    en: "Medicine & Records",
    descHi: "रिमाइंडर, इतिहास, दवा खोज",
    descEn: "Reminders, history, search",
    gradient: "linear-gradient(135deg,#00695c,#26a69a)",
    badge: { hi: "नया", en: "New" },
  },
  {
    id: "maternal",
    icon: "🤱",
    hi: "माँ और बच्चा",
    en: "Mother & Child",
    descHi: "गर्भावस्था, टीका, पोषण",
    descEn: "Pregnancy, vaccine, nutrition",
    gradient: "linear-gradient(135deg,#6a1b9a,#ab47bc)",
    badge: { hi: "निःशुल्क", en: "Free" },
  },
  {
    id: "mental",
    icon: "🧠",
    hi: "मानसिक स्वास्थ्य",
    en: "Mental Health",
    descHi: "तनाव, मूड, सहायता",
    descEn: "Stress, mood, support",
    gradient: "linear-gradient(135deg,#c62828,#ef5350)",
    badge: { hi: "सुरक्षित", en: "Safe" },
  },
];

export default function HealthPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("emergency");
  const [shownPhone, setShownPhone] = useState(null);
  const [filterGroup, setFilterGroup] = useState("all");
  const [activePage, setActivePage] = useState(null); // which sub-page is open

  const tabLabels = {
    emergency: { hi: "🚨 आपातकाल", en: "🚨 Emergency" },
    blood: { hi: "🩸 रक्तदाता", en: "🩸 Blood Donors" },
    anganwadi: { hi: "👶 आंगनवाड़ी", en: "👶 Anganwadi" },
  };

  const groups = ["all", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const filteredDonors =
    filterGroup === "all"
      ? BLOOD_DONORS
      : BLOOD_DONORS.filter((d) => d.group === filterGroup);

  /* ── Sub-page routing ── */
  if (activePage === "telemedicine")
    return <TelemedicinePage onBack={() => setActivePage(null)} />;
  if (activePage === "medicine")
    return <MedicinePage onBack={() => setActivePage(null)} />;
  if (activePage === "maternal")
    return <MaternalPage onBack={() => setActivePage(null)} />;
  if (activePage === "mental")
    return <MentalHealthPage onBack={() => setActivePage(null)} />;

  return (
    <div className="page page-enter">
      {/* Hero */}
      <div style={s.hero}>
        <div>
          <div style={s.heroTitle}>
            {language === "hi" ? "स्वास्थ्य सेवाएं" : "Health Services"}
          </div>
          <div style={s.heroSub}>
            {language === "hi"
              ? "आपातकालीन सहायता, 24×7"
              : "Emergency support, 24×7"}
          </div>
        </div>
        <div style={s.heroIcon}>❤️</div>
      </div>

      {/* ── New Feature Tiles Grid ── */}
      <div style={s.featureSection}>
        <div style={s.sectionLabel}>
          {language === "hi" ? "✨ नई सेवाएं" : "✨ New Services"}
        </div>
        <div style={s.featureGrid}>
          {NEW_FEATURES.map((f) => (
            <button
              key={f.id}
              style={{ ...s.featureTile, background: f.gradient }}
              onClick={() => setActivePage(f.id)}
            >
              <div style={s.tileBadge}>{f.badge[language]}</div>
              <div style={s.tileIcon}>{f.icon}</div>
              <div style={s.tileName}>{language === "hi" ? f.hi : f.en}</div>
              <div style={s.tileDesc}>
                {language === "hi" ? f.descHi : f.descEn}
              </div>
              <div style={s.tileArrow}>→</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...s.tab,
              background: activeTab === tab ? "var(--danger)" : "transparent",
              color: activeTab === tab ? "#fff" : "var(--text-muted)",
              fontWeight: activeTab === tab ? 700 : 400,
            }}
          >
            {tabLabels[tab][language]}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px" }}>
        {/* EMERGENCY */}
        {activeTab === "emergency" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={s.alertBanner}>
              🚨{" "}
              {language === "hi"
                ? "किसी आपातकाल में, नीचे दिए नंबर पर तुरंत कॉल करें।"
                : "In case of emergency, call the numbers below immediately."}
            </div>
            {EMERGENCY.map((ec) => (
              <a
                key={ec.number}
                href={`tel:${ec.number}`}
                style={{
                  ...s.emergCard,
                  background: ec.color,
                  borderColor: ec.border,
                }}
              >
                <div style={s.emergLeft}>
                  <span style={s.emergIcon}>{ec.icon}</span>
                  <div>
                    <div style={s.emergName}>
                      {language === "hi" ? ec.hi : ec.en}
                    </div>
                    <div style={s.emergNum}>{ec.number}</div>
                  </div>
                </div>
                <div style={s.callBtn}>
                  <span>📞</span>
                  <span style={{ fontSize: "0.75rem" }}>
                    {language === "hi" ? "कॉल" : "Call"}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* BLOOD DONORS */}
        {activeTab === "blood" && (
          <>
            <div style={{ overflowX: "auto", marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 6, padding: "4px 0" }}>
                {groups.map((g) => (
                  <button
                    key={g}
                    onClick={() => setFilterGroup(g)}
                    style={{
                      ...s.groupChip,
                      background: filterGroup === g ? "#c62828" : "#fff",
                      color:
                        filterGroup === g ? "#fff" : "var(--text-secondary)",
                      border:
                        filterGroup === g
                          ? "1.5px solid #c62828"
                          : "1.5px solid var(--border)",
                    }}
                  >
                    {g === "all" ? (language === "hi" ? "सभी" : "All") : g}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filteredDonors.map((d) => (
                <div key={d.id} style={s.donorCard}>
                  <div
                    style={{
                      ...s.bloodGroupBadge,
                      background: d.available ? "#ffebee" : "#f5f5f5",
                      color: d.available ? "#c62828" : "#9e9e9e",
                    }}
                  >
                    {d.group}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={s.donorName}>
                      {language === "hi" ? d.hi : d.en}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 3,
                      }}
                    >
                      <span
                        className={`status-dot ${d.available ? "open" : "closed"}`}
                      />
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: d.available
                            ? "var(--primary)"
                            : "var(--text-muted)",
                        }}
                      >
                        {d.available
                          ? language === "hi"
                            ? "उपलब्ध"
                            : "Available"
                          : language === "hi"
                            ? "अनुपलब्ध"
                            : "Unavailable"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setShownPhone(shownPhone === d.id ? null : d.id)
                    }
                    style={s.showPhoneBtn}
                  >
                    {shownPhone === d.id
                      ? d.phone
                      : language === "hi"
                        ? "नंबर दिखाएं"
                        : "Show"}
                  </button>
                  {shownPhone === d.id && (
                    <a href={`tel:${d.phone}`} style={s.callSmall}>
                      📞
                    </a>
                  )}
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: 16 }}
            >
              🩸{" "}
              {language === "hi"
                ? "रक्तदाता के रूप में पंजीकरण करें"
                : "Register as Blood Donor"}
            </button>
          </>
        )}

        {/* ANGANWADI */}
        {activeTab === "anganwadi" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={s.anganInfo}>
              <div style={s.anganTitle}>
                {language === "hi"
                  ? "आंगनवाड़ी केंद्र — रामपुर"
                  : "Anganwadi Centre — Rampur"}
              </div>
              <div style={s.anganWorker}>
                {language === "hi"
                  ? "कार्यकर्ता: सुनीता देवी · 9876540001"
                  : "Worker: Sunita Devi · 9876540001"}
              </div>
              <a
                href="tel:9876540001"
                className="btn btn-primary btn-full"
                style={{ marginTop: 12 }}
              >
                📞 {language === "hi" ? "कॉल करें" : "Call"}
              </a>
            </div>
            {ANGANWADI.map((item, i) => (
              <div key={i} style={s.anganCard}>
                <div style={s.anganIcon}>{item.icon}</div>
                <div>
                  <div style={s.anganLabel}>
                    {language === "hi" ? item.labelHi : item.labelEn}
                  </div>
                  <div style={s.anganValue}>
                    {language === "hi" ? item.valueHi : item.valueEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const s = {
  hero: {
    background: "linear-gradient(135deg, #b71c1c 0%, #e53935 100%)",
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

  featureSection: { padding: "16px 14px 4px" },
  sectionLabel: {
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: 10,
  },
  featureGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  featureTile: {
    position: "relative",
    border: "none",
    borderRadius: 16,
    padding: "16px 14px 12px",
    textAlign: "left",
    cursor: "pointer",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minHeight: 120,
    transition: "transform 0.18s, box-shadow 0.18s",
    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
  },
  tileBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "rgba(255,255,255,0.22)",
    color: "#fff",
    fontSize: "0.65rem",
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 20,
    backdropFilter: "blur(4px)",
  },
  tileIcon: { fontSize: "1.7rem", marginBottom: 2 },
  tileName: {
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.2,
  },
  tileDesc: {
    fontSize: "0.7rem",
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.3,
  },
  tileArrow: {
    marginTop: "auto",
    fontSize: "1rem",
    color: "rgba(255,255,255,0.7)",
    alignSelf: "flex-end",
  },

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

  alertBanner: {
    background: "#fce4ec",
    color: "#b71c1c",
    padding: "10px 14px",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: 4,
    border: "1px solid #f8bbd0",
  },
  emergCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    border: "1.5px solid",
    borderRadius: "var(--radius-sm)",
    textDecoration: "none",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  emergLeft: { display: "flex", alignItems: "center", gap: 14 },
  emergIcon: { fontSize: "1.8rem" },
  emergName: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "var(--text-primary)",
  },
  emergNum: { fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 2 },
  callBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    background: "var(--danger)",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 10,
    fontSize: "1.1rem",
  },

  donorCard: {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: 14,
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  bloodGroupBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    fontWeight: 700,
    flexShrink: 0,
  },
  donorName: { fontSize: "0.9rem", fontWeight: 600 },
  showPhoneBtn: {
    padding: "6px 12px",
    background: "var(--green-50)",
    color: "var(--primary)",
    border: "1.5px solid var(--green-100)",
    borderRadius: 20,
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  callSmall: {
    fontSize: "1.3rem",
    textDecoration: "none",
    padding: "4px",
    borderRadius: 8,
  },
  groupChip: {
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    flexShrink: 0,
    transition: "all 0.18s",
  },

  anganInfo: {
    background: "#e8f5e9",
    border: "1.5px solid var(--green-100)",
    borderRadius: "var(--radius-md)",
    padding: 16,
  },
  anganTitle: { fontSize: "1rem", fontWeight: 700, color: "var(--green-900)" },
  anganWorker: {
    fontSize: "0.82rem",
    color: "var(--text-muted)",
    marginTop: 4,
  },
  anganCard: {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: 14,
    display: "flex",
    gap: 14,
    alignItems: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  anganIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: "var(--green-50)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    flexShrink: 0,
  },
  anganLabel: {
    fontSize: "0.82rem",
    color: "var(--text-muted)",
    fontWeight: 600,
  },
  anganValue: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginTop: 2,
  },
};
