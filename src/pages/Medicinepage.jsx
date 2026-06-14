import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const TABS = ["reminder", "records", "search"];

const SAMPLE_MEDICINES = [
  {
    id: 1,
    nameHi: "मेटफोर्मिन 500mg",
    nameEn: "Metformin 500mg",
    forHi: "मधुमेह",
    forEn: "Diabetes",
    times: ["सुबह 8 बजे", "रात 8 बजे"],
    days: [true, true, true, true, true, true, true],
    icon: "💊",
    color: "#e3f2fd",
  },
  {
    id: 2,
    nameHi: "अमलोडिपिन 5mg",
    nameEn: "Amlodipine 5mg",
    forHi: "रक्तचाप",
    forEn: "Blood Pressure",
    times: ["सुबह 9 बजे"],
    days: [true, true, true, true, true, true, true],
    icon: "🔵",
    color: "#fce4ec",
  },
  {
    id: 3,
    nameHi: "विटामिन D3",
    nameEn: "Vitamin D3",
    forHi: "कमज़ोरी",
    forEn: "Weakness",
    times: ["दोपहर 1 बजे"],
    days: [true, false, true, false, true, false, true],
    icon: "🌟",
    color: "#fff9c4",
  },
];

const RECORDS = [
  {
    date: "12 जून 2025",
    dateEn: "12 Jun 2025",
    docHi: "डॉ. सुनीता वर्मा",
    docEn: "Dr. Sunita Verma",
    diagHi: "वायरल बुखार",
    diagEn: "Viral Fever",
    icon: "🤒",
    color: "#fff3e0",
  },
  {
    date: "3 मई 2025",
    dateEn: "3 May 2025",
    docHi: "डॉ. रमेश कुमार",
    docEn: "Dr. Ramesh Kumar",
    diagHi: "खांसी, सर्दी",
    diagEn: "Cough & Cold",
    icon: "🤧",
    color: "#e8f5e9",
  },
  {
    date: "20 फ़रवरी 2025",
    dateEn: "20 Feb 2025",
    docHi: "डॉ. प्रीति सिंह",
    docEn: "Dr. Preeti Singh",
    diagHi: "नियमित जांच",
    diagEn: "Routine Checkup",
    icon: "✅",
    color: "#e3f2fd",
  },
];

const MEDICINE_DB = [
  {
    nameHi: "पेरासिटामोल",
    nameEn: "Paracetamol",
    useHi: "बुखार, दर्द",
    useEn: "Fever, Pain",
    price: "₹10",
    generic: true,
  },
  {
    nameHi: "एमोक्सिसिलिन",
    nameEn: "Amoxicillin",
    useHi: "बैक्टीरियल इन्फेक्शन",
    useEn: "Bacterial Infection",
    price: "₹35",
    generic: true,
  },
  {
    nameHi: "ओमेप्राज़ोल",
    nameEn: "Omeprazole",
    useHi: "एसिडिटी, पेट दर्द",
    useEn: "Acidity, Stomach Pain",
    price: "₹18",
    generic: true,
  },
  {
    nameHi: "सेटिरिज़िन",
    nameEn: "Cetirizine",
    useHi: "एलर्जी, खुजली",
    useEn: "Allergy, Itching",
    price: "₹12",
    generic: true,
  },
  {
    nameHi: "मेटफोर्मिन",
    nameEn: "Metformin",
    useHi: "मधुमेह (टाइप 2)",
    useEn: "Diabetes Type 2",
    price: "₹22",
    generic: true,
  },
  {
    nameHi: "अमलोडिपिन",
    nameEn: "Amlodipine",
    useHi: "रक्तचाप, हृदय",
    useEn: "BP, Heart",
    price: "₹15",
    generic: true,
  },
];

const DAY_LABELS_HI = ["सो", "मं", "बु", "गु", "शु", "श", "र"];
const DAY_LABELS_EN = ["M", "T", "W", "T", "F", "S", "S"];

export default function MedicinePage({ onBack }) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("reminder");
  const [medicines, setMedicines] = useState(SAMPLE_MEDICINES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({ name: "", for: "", time: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [takenToday, setTakenToday] = useState({});

  const t = (hi, en) => (language === "hi" ? hi : en);

  const filteredMeds = MEDICINE_DB.filter((m) =>
    (t(m.nameHi, m.nameEn) + t(m.useHi, m.useEn))
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const tabLabels = {
    reminder: { hi: "⏰ रिमाइंडर", en: "⏰ Reminder" },
    records: { hi: "📋 इतिहास", en: "📋 History" },
    search: { hi: "🔍 दवा खोज", en: "🔍 Search Med" },
  };

  const toggleTaken = (id, time) => {
    const key = `${id}-${time}`;
    setTakenToday((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addMedicine = () => {
    if (!newMed.name || !newMed.time) return;
    const m = {
      id: Date.now(),
      nameHi: newMed.name,
      nameEn: newMed.name,
      forHi: newMed.for,
      forEn: newMed.for,
      times: [newMed.time],
      days: [true, true, true, true, true, true, true],
      icon: "💊",
      color: "#f3e5f5",
    };
    setMedicines((prev) => [...prev, m]);
    setNewMed({ name: "", for: "", time: "" });
    setShowAddForm(false);
  };

  return (
    <div className="page page-enter">
      {/* Header */}
      <div
        style={{
          ...ms.header,
          background: "linear-gradient(135deg,#00695c,#26a69a)",
        }}
      >
        <button onClick={onBack} style={ms.backBtn}>
          ← {t("वापस", "Back")}
        </button>
        <span style={ms.headerTitle}>
          💊 {t("दवाई & रिकॉर्ड", "Medicine & Records")}
        </span>
        <span />
      </div>

      {/* Tabs */}
      <div style={ms.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...ms.tab,
              background: activeTab === tab ? "#00695c" : "transparent",
              color: activeTab === tab ? "#fff" : "var(--text-muted)",
              fontWeight: activeTab === tab ? 700 : 400,
            }}
          >
            {tabLabels[tab][language]}
          </button>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        {/* ── REMINDER TAB ── */}
        {activeTab === "reminder" && (
          <>
            <div style={ms.todayBanner}>
              📅 {t("आज की दवाइयाँ", "Today's Medicines")} —{" "}
              {new Date().toLocaleDateString(
                language === "hi" ? "hi-IN" : "en-IN",
                { day: "numeric", month: "long" },
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {medicines.map((med) => (
                <div
                  key={med.id}
                  style={{
                    ...ms.medCard,
                    background: med.color,
                    borderLeft: "4px solid #00695c",
                  }}
                >
                  <div style={ms.medTop}>
                    <div style={ms.medIcon}>{med.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={ms.medName}>{t(med.nameHi, med.nameEn)}</div>
                      <div style={ms.medFor}>
                        {t("के लिए:", "For:")} {t(med.forHi, med.forEn)}
                      </div>
                    </div>
                  </div>

                  {/* Day indicators */}
                  <div style={ms.dayRow}>
                    {med.days.map((active, i) => (
                      <div
                        key={i}
                        style={{
                          ...ms.dayDot,
                          background: active ? "#00695c" : "#ddd",
                          color: active ? "#fff" : "#999",
                        }}
                      >
                        {t(DAY_LABELS_HI[i], DAY_LABELS_EN[i])}
                      </div>
                    ))}
                  </div>

                  {/* Time slots with taken toggle */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      marginTop: 8,
                    }}
                  >
                    {med.times.map((time) => {
                      const key = `${med.id}-${time}`;
                      const taken = takenToday[key];
                      return (
                        <div key={time} style={ms.timeRow}>
                          <span style={ms.timeText}>⏰ {time}</span>
                          <button
                            onClick={() => toggleTaken(med.id, time)}
                            style={{
                              ...ms.takenBtn,
                              background: taken ? "#00695c" : "#fff",
                              color: taken ? "#fff" : "#00695c",
                              border: "1.5px solid #00695c",
                            }}
                          >
                            {taken ? t("✓ ली", "✓ Taken") : t("ली?", "Taken?")}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Add medicine form */}
            {showAddForm ? (
              <div style={ms.addForm}>
                <div style={ms.addFormTitle}>
                  {t("नई दवाई जोड़ें", "Add New Medicine")}
                </div>
                <input
                  style={ms.input}
                  placeholder={t("दवाई का नाम *", "Medicine Name *")}
                  value={newMed.name}
                  onChange={(e) =>
                    setNewMed({ ...newMed, name: e.target.value })
                  }
                />
                <input
                  style={ms.input}
                  placeholder={t("किस बीमारी के लिए", "For which condition")}
                  value={newMed.for}
                  onChange={(e) =>
                    setNewMed({ ...newMed, for: e.target.value })
                  }
                />
                <input
                  style={ms.input}
                  placeholder={t(
                    "समय (जैसे: सुबह 8 बजे)",
                    "Time (e.g., 8:00 AM)",
                  )}
                  value={newMed.time}
                  onChange={(e) =>
                    setNewMed({ ...newMed, time: e.target.value })
                  }
                />
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button
                    onClick={() => setShowAddForm(false)}
                    style={ms.cancelBtn}
                  >
                    {t("रद्द करें", "Cancel")}
                  </button>
                  <button
                    onClick={addMedicine}
                    className="btn btn-primary"
                    style={{ flex: 1, background: "#00695c" }}
                  >
                    {t("जोड़ें", "Add")}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary btn-full"
                style={{ marginTop: 16, background: "#00695c" }}
              >
                + {t("नई दवाई जोड़ें", "Add New Medicine")}
              </button>
            )}
          </>
        )}

        {/* ── RECORDS TAB ── */}
        {activeTab === "records" && (
          <>
            <div style={ms.infoNote}>
              📁{" "}
              {t(
                "आपके पिछले डॉक्टर विज़िट और रिपोर्ट यहाँ दिखेंगी।",
                "Your past doctor visits and reports will appear here.",
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {RECORDS.map((rec, i) => (
                <div
                  key={i}
                  style={{ ...ms.recordCard, background: rec.color }}
                >
                  <div style={ms.recLeft}>
                    <div style={ms.recIcon}>{rec.icon}</div>
                    <div>
                      <div style={ms.recDiag}>{t(rec.diagHi, rec.diagEn)}</div>
                      <div style={ms.recDoc}>{t(rec.docHi, rec.docEn)}</div>
                      <div style={ms.recDate}>{t(rec.date, rec.dateEn)}</div>
                    </div>
                  </div>
                  <button style={ms.viewBtn}>{t("देखें", "View")}</button>
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: 16, background: "#00695c" }}
            >
              + {t("नया रिकॉर्ड जोड़ें", "Add New Record")}
            </button>
          </>
        )}

        {/* ── SEARCH TAB ── */}
        {activeTab === "search" && (
          <>
            <input
              style={{ ...ms.input, marginBottom: 12 }}
              placeholder={t(
                "🔍 दवाई का नाम लिखें...",
                "🔍 Search medicine name...",
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div style={ms.genericNote}>
              🏥{" "}
              {t(
                "जन औषधि केंद्र पर ये दवाइयाँ 50–90% सस्ती मिलती हैं।",
                "Jan Aushadhi stores offer 50–90% cheaper generic medicines.",
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(searchQuery ? filteredMeds : MEDICINE_DB).map((med, i) => (
                <div key={i} style={ms.searchCard}>
                  <div style={{ flex: 1 }}>
                    <div style={ms.searchMedName}>
                      {t(med.nameHi, med.nameEn)}
                    </div>
                    <div style={ms.searchMedUse}>{t(med.useHi, med.useEn)}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={ms.searchPrice}>{med.price}</div>
                    {med.generic && (
                      <div style={ms.genericBadge}>
                        {t("जेनेरिक", "Generic")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {searchQuery && filteredMeds.length === 0 && (
                <div style={ms.noResult}>
                  {t("कोई दवाई नहीं मिली।", "No medicine found.")}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const ms = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
  },
  backBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "#fff",
    borderRadius: 20,
    padding: "6px 12px",
    fontSize: "0.82rem",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  headerTitle: { fontSize: "1rem", fontWeight: 700, color: "#fff" },
  tabBar: {
    display: "flex",
    gap: 4,
    padding: "8px 10px",
    background: "#fff",
    borderBottom: "1px solid var(--border)",
  },
  tab: {
    flex: 1,
    padding: "7px 4px",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.7rem",
    fontFamily: "inherit",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  todayBanner: {
    background: "#e0f2f1",
    color: "#004d40",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: 12,
    border: "1px solid #b2dfdb",
  },
  medCard: {
    borderRadius: 12,
    padding: "12px 14px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  medTop: { display: "flex", gap: 10, alignItems: "center", marginBottom: 8 },
  medIcon: { fontSize: "1.6rem" },
  medName: { fontSize: "0.9rem", fontWeight: 700, color: "#1a1a1a" },
  medFor: { fontSize: "0.75rem", color: "#666", marginTop: 2 },
  dayRow: { display: "flex", gap: 4, marginBottom: 4 },
  dayDot: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.65rem",
    fontWeight: 700,
  },
  timeRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.6)",
    borderRadius: 8,
    padding: "6px 10px",
  },
  timeText: { fontSize: "0.82rem", fontWeight: 600, color: "#333" },
  takenBtn: {
    padding: "4px 14px",
    borderRadius: 20,
    fontSize: "0.75rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  addForm: {
    background: "#f5f5f5",
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  addFormTitle: { fontSize: "0.9rem", fontWeight: 700, marginBottom: 4 },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1.5px solid #e0e0e0",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },
  cancelBtn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "1.5px solid #ccc",
    background: "#fff",
    fontSize: "0.85rem",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  infoNote: {
    background: "#e8f5e9",
    color: "#1b5e20",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: "0.8rem",
    marginBottom: 12,
    border: "1px solid #c8e6c9",
  },
  recordCard: {
    borderRadius: 12,
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recLeft: { display: "flex", gap: 12, alignItems: "center" },
  recIcon: { fontSize: "1.8rem" },
  recDiag: { fontSize: "0.9rem", fontWeight: 700, color: "#1a1a1a" },
  recDoc: { fontSize: "0.75rem", color: "#555", marginTop: 2 },
  recDate: { fontSize: "0.72rem", color: "#888", marginTop: 2 },
  viewBtn: {
    padding: "6px 14px",
    borderRadius: 20,
    border: "1.5px solid #00695c",
    background: "#fff",
    color: "#00695c",
    fontSize: "0.75rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  genericNote: {
    background: "#fff8e1",
    color: "#f57f17",
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: "0.77rem",
    marginBottom: 10,
    border: "1px solid #ffe082",
  },
  searchCard: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: 10,
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  searchMedName: { fontSize: "0.9rem", fontWeight: 700, color: "#1a1a1a" },
  searchMedUse: { fontSize: "0.75rem", color: "#666", marginTop: 2 },
  searchPrice: { fontSize: "0.95rem", fontWeight: 700, color: "#00695c" },
  genericBadge: {
    background: "#e8f5e9",
    color: "#1b5e20",
    fontSize: "0.65rem",
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 10,
    marginTop: 3,
    textAlign: "center",
  },
  noResult: {
    textAlign: "center",
    color: "#999",
    fontSize: "0.85rem",
    padding: 20,
  },
};
