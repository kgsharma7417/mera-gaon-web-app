import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

const SCHEMES = [
  {
    id: 1,
    icon: "🌱",
    keyHi: "पीएम किसान",
    keyEn: "PM Kisan",
    descHi: "किसानों को ₹6000/वर्ष",
    descEn: "₹6000/year for farmers",
    status: "active",
    color: "#e8f5e9",
    border: "#a5d6a7",
  },
  {
    id: 2,
    icon: "🔨",
    keyHi: "नरेगा",
    keyEn: "NREGA",
    descHi: "100 दिन रोजगार गारंटी",
    descEn: "100-day employment guarantee",
    status: "active",
    color: "#fff8e1",
    border: "#ffecb3",
  },
  {
    id: 3,
    icon: "🏠",
    keyHi: "आवास योजना",
    keyEn: "Awas Yojana",
    descHi: "पक्का मकान योजना",
    descEn: "Pucca house scheme",
    status: "pending",
    color: "#e8eaf6",
    border: "#c5cae9",
  },
  {
    id: 4,
    icon: "🍚",
    keyHi: "राशन कार्ड",
    keyEn: "Ration Card",
    descHi: "खाद्य सुरक्षा योजना",
    descEn: "Food security scheme",
    status: "active",
    color: "#fce4ec",
    border: "#f8bbd0",
  },
];

const COMPLAINT_TYPES = [
  { key: "water", hiLabel: "पानी", enLabel: "Water", icon: "💧" },
  { key: "electricity", hiLabel: "बिजली", enLabel: "Electricity", icon: "⚡" },
  { key: "road", hiLabel: "सड़क", enLabel: "Road", icon: "🛣️" },
  { key: "sanitation", hiLabel: "सफाई", enLabel: "Sanitation", icon: "🧹" },
  { key: "other", hiLabel: "अन्य", enLabel: "Other", icon: "📌" },
];

const TABS = ["schemes", "complaints", "notices"];

export default function AdminPage() {
  const { t, language } = useLanguage();
  const { isSecretary } = useAuth();
  const [activeTab, setActiveTab] = useState("schemes");
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      type: "water",
      descHi: "नल में पानी नहीं आ रहा।",
      descEn: "No water in tap.",
      status: "pending",
      date: "2025-07-10",
    },
    {
      id: 2,
      type: "road",
      descHi: "मुख्य सड़क पर बड़ा गड्ढा है।",
      descEn: "Large pothole on main road.",
      status: "inProgress",
      date: "2025-07-08",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "water", desc: "" });
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const submitComplaint = () => {
    if (!form.desc.trim()) return;
    const newC = {
      id: Date.now(),
      type: form.type,
      descHi: form.desc,
      descEn: form.desc,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };
    setComplaints((p) => [newC, ...p]);
    setForm({ type: "water", desc: "" });
    setShowForm(false);
    showToast(t("complaintSubmitted"));
  };

  const statusStyle = {
    pending: {
      bg: "#fff8e1",
      color: "#7b5800",
      label: { hi: "लंबित", en: "Pending" },
    },
    inProgress: {
      bg: "#e3f2fd",
      color: "#0d47a1",
      label: { hi: "प्रक्रिया में", en: "In Progress" },
    },
    resolved: {
      bg: "#e8f5e9",
      color: "#1b5e20",
      label: { hi: "हल हुआ", en: "Resolved" },
    },
    active: {
      bg: "#e8f5e9",
      color: "#1b5e20",
      label: { hi: "सक्रिय", en: "Active" },
    },
  };

  const tabLabels = {
    schemes: { hi: "📋 योजनाएं", en: "📋 Schemes" },
    complaints: { hi: "📣 शिकायतें", en: "📣 Complaints" },
    notices: { hi: "📢 सूचनाएं", en: "📢 Notices" },
  };

  return (
    <div className="page page-enter">
      <div style={s.topBanner}>
        <div style={s.bannerText}>
          <div style={s.bannerTitle}>
            {language === "hi" ? "प्रशासन पैनल" : "Admin Panel"}
          </div>
          <div style={s.bannerSub}>
            {language === "hi"
              ? "ग्राम सेवाएं और योजनाएं"
              : "Village Services & Schemes"}
          </div>
        </div>
        <div style={s.bannerIcon}>🏛️</div>
      </div>

      {/* Tabs */}
      <div style={s.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...s.tab,
              background: activeTab === tab ? "var(--primary)" : "transparent",
              color: activeTab === tab ? "#fff" : "var(--text-muted)",
              fontWeight: activeTab === tab ? 700 : 400,
            }}
          >
            {tabLabels[tab][language]}
          </button>
        ))}
      </div>

      <div className="page-content">
        {/* SCHEMES */}
        {activeTab === "schemes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SCHEMES.map((sc) => {
              const ss = statusStyle[sc.status];
              return (
                <div
                  key={sc.id}
                  style={{
                    ...s.schemeCard,
                    background: sc.color,
                    borderColor: sc.border,
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{sc.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={s.schemeName}>
                      {language === "hi" ? sc.keyHi : sc.keyEn}
                    </div>
                    <div style={s.schemeDesc}>
                      {language === "hi" ? sc.descHi : sc.descEn}
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <a href="#" style={s.schemeBtn}>
                        {t("checkStatus")} →
                      </a>
                      <a
                        href="#"
                        style={{
                          ...s.schemeBtn,
                          background: "var(--primary)",
                          color: "#fff",
                        }}
                      >
                        {t("applyNow")}
                      </a>
                    </div>
                  </div>
                  <span
                    style={{
                      ...s.statusBadge,
                      background: ss.bg,
                      color: ss.color,
                    }}
                  >
                    {ss.label[language]}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* COMPLAINTS */}
        {activeTab === "complaints" && (
          <>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="btn btn-primary btn-full"
              style={{ marginBottom: 16 }}
            >
              {showForm ? "✕ " + t("cancel") : "＋ " + t("addComplaint")}
            </button>

            {showForm && (
              <div style={s.formCard}>
                <div style={{ marginBottom: 14 }}>
                  <label style={s.label}>{t("complaintType")}</label>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginTop: 6,
                    }}
                  >
                    {COMPLAINT_TYPES.map((ct) => (
                      <button
                        key={ct.key}
                        onClick={() => setForm((f) => ({ ...f, type: ct.key }))}
                        style={{
                          ...s.typeChip,
                          background:
                            form.type === ct.key
                              ? "var(--primary)"
                              : "var(--gray-100)",
                          color:
                            form.type === ct.key
                              ? "#fff"
                              : "var(--text-secondary)",
                        }}
                      >
                        {ct.icon} {language === "hi" ? ct.hiLabel : ct.enLabel}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t("complaintDesc2")}</label>
                  <textarea
                    className="form-textarea"
                    value={form.desc}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, desc: e.target.value }))
                    }
                    placeholder={
                      language === "hi"
                        ? "समस्या का विवरण यहाँ लिखें..."
                        : "Describe the issue here..."
                    }
                  />
                </div>
                <button
                  onClick={submitComplaint}
                  className="btn btn-primary btn-full"
                >
                  {t("submit")} ✓
                </button>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {complaints.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📭</span>
                  <p>{t("noComplaints")}</p>
                </div>
              ) : (
                complaints.map((c) => {
                  const ct = COMPLAINT_TYPES.find((t) => t.key === c.type);
                  const ss = statusStyle[c.status];
                  return (
                    <div key={c.id} style={s.complaintCard}>
                      <div style={s.complaintIcon}>{ct?.icon || "📌"}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                          {language === "hi"
                            ? COMPLAINT_TYPES.find((t) => t.key === c.type)
                                ?.hiLabel
                            : COMPLAINT_TYPES.find((t) => t.key === c.type)
                                ?.enLabel}
                        </div>
                        <div
                          style={{
                            fontSize: "0.82rem",
                            color: "var(--text-secondary)",
                            marginTop: 2,
                          }}
                        >
                          {language === "hi" ? c.descHi : c.descEn}
                        </div>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--text-muted)",
                            marginTop: 4,
                          }}
                        >
                          📅 {c.date}
                        </div>
                      </div>
                      <span
                        style={{
                          ...s.statusBadge,
                          background: ss.bg,
                          color: ss.color,
                        }}
                      >
                        {ss.label[language]}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* NOTICES */}
        {activeTab === "notices" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {isSecretary && (
              <div style={s.secBanner}>
                🔑{" "}
                {language === "hi"
                  ? "सचिव मोड — आप नोटिस जोड़ सकते हैं"
                  : "Secretary Mode — You can add notices"}
              </div>
            )}
            {[
              {
                icon: "📢",
                titleHi: "ग्राम सभा बैठक",
                titleEn: "Gram Sabha Meeting",
                descHi: "15 जुलाई, दोपहर 2 बजे, पंचायत भवन",
                descEn: "July 15, 2 PM, Panchayat Bhawan",
                date: "2025-07-15",
              },
              {
                icon: "🏗️",
                titleHi: "सड़क निर्माण",
                titleEn: "Road Construction",
                descHi: "वार्ड 3 में सड़क बनने का काम 20 जुलाई से शुरू।",
                descEn: "Road construction in Ward 3 starts July 20.",
                date: "2025-07-20",
              },
              {
                icon: "📚",
                titleHi: "छात्रवृत्ति आवेदन",
                titleEn: "Scholarship Application",
                descHi: "कक्षा 9-12 के छात्र 30 जुलाई तक आवेदन करें।",
                descEn: "Students of class 9-12 apply by July 30.",
                date: "2025-07-30",
              },
            ].map((n, i) => (
              <div key={i} style={s.noticeCard}>
                <div style={s.noticeIconBox}>{n.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    {language === "hi" ? n.titleHi : n.titleEn}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-secondary)",
                      marginTop: 3,
                      lineHeight: 1.5,
                    }}
                  >
                    {language === "hi" ? n.descHi : n.descEn}
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      marginTop: 4,
                    }}
                  >
                    📅 {n.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

const s = {
  topBanner: {
    background: "linear-gradient(135deg, #283593 0%, #3f51b5 100%)",
    padding: "20px 16px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerText: {},
  bannerTitle: { fontSize: "1.3rem", fontWeight: 700, color: "#fff" },
  bannerSub: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  bannerIcon: { fontSize: "3rem", opacity: 0.25 },
  tabBar: {
    display: "flex",
    gap: 0,
    background: "#fff",
    borderBottom: "1px solid var(--border)",
    padding: "8px 12px",
    gap: 6,
    overflowX: "auto",
  },
  tab: {
    flex: 1,
    padding: "8px 10px",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.78rem",
    fontFamily: "inherit",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  schemeCard: {
    border: "1.5px solid",
    borderRadius: "var(--radius-md)",
    padding: "16px",
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    position: "relative",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  schemeName: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--text-primary)",
  },
  schemeDesc: {
    fontSize: "0.82rem",
    color: "var(--text-secondary)",
    marginTop: 2,
  },
  schemeBtn: {
    padding: "7px 14px",
    background: "rgba(255,255,255,0.8)",
    border: "1.5px solid var(--border-strong)",
    borderRadius: 8,
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "var(--primary)",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "all 0.2s",
  },
  statusBadge: {
    fontSize: "0.68rem",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 20,
    flexShrink: 0,
    height: "fit-content",
  },
  formCard: {
    background: "#fff",
    border: "1.5px solid var(--border-strong)",
    borderRadius: "var(--radius-md)",
    padding: 16,
    marginBottom: 16,
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    animation: "pageSlideUp 0.3s ease",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
  },
  typeChip: {
    padding: "6px 12px",
    borderRadius: 20,
    border: "none",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  complaintCard: {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: 14,
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  complaintIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "var(--gray-100)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    flexShrink: 0,
  },
  secBanner: {
    background: "#e8eaf6",
    color: "#303f9f",
    padding: "10px 14px",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: 4,
  },
  noticeCard: {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: 14,
    display: "flex",
    gap: 12,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  noticeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: "var(--indigo-50)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    flexShrink: 0,
  },
};
