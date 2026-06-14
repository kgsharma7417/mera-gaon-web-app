import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const TABS = ["pregnancy", "vaccine", "growth", "nutrition"];

const PREGNANCY_WEEKS = [
  {
    week: 1,
    hi: "भ्रूण का आकार: तिल के दाने जितना।",
    en: "Embryo size: like a sesame seed.",
    tip: "💊",
    tipHi: "फोलिक एसिड लेना शुरू करें।",
    tipEn: "Start taking folic acid.",
  },
  {
    week: 4,
    hi: "हृदय धड़कने लगता है।",
    en: "Heart starts beating.",
    tip: "🍎",
    tipHi: "आयरन युक्त भोजन खाएं।",
    tipEn: "Eat iron-rich foods.",
  },
  {
    week: 8,
    hi: "अंगुलियाँ और कान बनने लगते हैं।",
    en: "Fingers and ears start forming.",
    tip: "💉",
    tipHi: "पहला अल्ट्रासाउंड करवाएं।",
    tipEn: "Get your first ultrasound.",
  },
  {
    week: 12,
    hi: "पहली तिमाही पूरी। बच्चा हिलने लगता है।",
    en: "First trimester complete. Baby starts moving.",
    tip: "🏥",
    tipHi: "डॉक्टर से NT scan करवाएं।",
    tipEn: "Get NT scan done.",
  },
  {
    week: 16,
    hi: "बच्चा पलकें झपकाने लगता है।",
    en: "Baby starts blinking.",
    tip: "🥛",
    tipHi: "कैल्शियम बढ़ाएं — दूध, दही।",
    tipEn: "Increase calcium — milk, curd.",
  },
  {
    week: 20,
    hi: "दूसरी तिमाही की शुरुआत। लिंग पता चल सकता है।",
    en: "Second trimester begins. Gender can be detected.",
    tip: "💉",
    tipHi: "एनीमिया जांच करवाएं।",
    tipEn: "Check for anaemia.",
  },
  {
    week: 24,
    hi: "बच्चा आवाज़ सुनने लगता है।",
    en: "Baby starts hearing sounds.",
    tip: "🎵",
    tipHi: "बच्चे से बात करें, गाना सुनाएं।",
    tipEn: "Talk to baby, play music.",
  },
  {
    week: 28,
    hi: "तीसरी तिमाही शुरू। बच्चे की आँखें खुलती हैं।",
    en: "Third trimester starts. Baby's eyes open.",
    tip: "🏃‍♀️",
    tipHi: "हल्की वॉकिंग जारी रखें।",
    tipEn: "Continue light walking.",
  },
  {
    week: 32,
    hi: "बच्चा अब बहुत सक्रिय है। वज़न बढ़ रहा है।",
    en: "Baby is very active. Weight is increasing.",
    tip: "🛌",
    tipHi: "बाईं करवट सोएं।",
    tipEn: "Sleep on your left side.",
  },
  {
    week: 36,
    hi: "बच्चा जन्म की तैयारी करने लगता है।",
    en: "Baby starts preparing for birth.",
    tip: "🏥",
    tipHi: "अस्पताल बैग तैयार रखें।",
    tipEn: "Keep hospital bag ready.",
  },
  {
    week: 40,
    hi: "प्रसव का समय! डॉक्टर से मिलें।",
    en: "Time for delivery! Meet your doctor.",
    tip: "🤱",
    tipHi: "शांत रहें, डॉक्टर की सलाह मानें।",
    tipEn: "Stay calm, follow doctor's advice.",
  },
];

const VACCINES = [
  {
    age: "जन्म",
    ageEn: "Birth",
    name: "BCG, OPV-0, Hep-B1",
    forHi: "टीबी, पोलियो, हेपेटाइटिस B",
    forEn: "TB, Polio, Hepatitis B",
    done: true,
  },
  {
    age: "6 हफ्ते",
    ageEn: "6 Weeks",
    name: "DTwP-1, IPV-1, Hib-1, Hep-B2, RV-1",
    forHi: "डिप्थीरिया, काली खांसी, पोलियो",
    forEn: "Diphtheria, Whooping cough, Polio",
    done: true,
  },
  {
    age: "10 हफ्ते",
    ageEn: "10 Weeks",
    name: "DTwP-2, IPV-2, Hib-2, RV-2",
    forHi: "वही + रोटावायरस",
    forEn: "Same + Rotavirus",
    done: true,
  },
  {
    age: "14 हफ्ते",
    ageEn: "14 Weeks",
    name: "DTwP-3, IPV-3, Hib-3, RV-3",
    forHi: "तीसरी खुराक",
    forEn: "Third dose",
    done: false,
  },
  {
    age: "9 महीने",
    ageEn: "9 Months",
    name: "MR-1, JE-1, Vit A",
    forHi: "खसरा, जापानी इन्सेफेलाइटिस, विटामिन A",
    forEn: "Measles, JE, Vitamin A",
    done: false,
  },
  {
    age: "12 महीने",
    ageEn: "12 Months",
    name: "Hep A-1",
    forHi: "हेपेटाइटिस A",
    forEn: "Hepatitis A",
    done: false,
  },
  {
    age: "15 महीने",
    ageEn: "15 Months",
    name: "MMR-1, Varicella, DTwP B1",
    forHi: "खसरा, रूबेला, चिकनपॉक्स",
    forEn: "Measles, Rubella, Chickenpox",
    done: false,
  },
  {
    age: "2 साल",
    ageEn: "2 Years",
    name: "Hep A-2, Typhoid CV",
    forHi: "हेपेटाइटिस A, टाइफाइड",
    forEn: "Hepatitis A, Typhoid",
    done: false,
  },
];

const GROWTH_DATA = [
  {
    age: "1 महीना",
    ageEn: "1 Month",
    boyWt: "4.5",
    girlWt: "4.2",
    boyHt: "54",
    girlHt: "53",
  },
  {
    age: "3 महीना",
    ageEn: "3 Months",
    boyWt: "6.4",
    girlWt: "5.8",
    boyHt: "61",
    girlHt: "60",
  },
  {
    age: "6 महीना",
    ageEn: "6 Months",
    boyWt: "7.9",
    girlWt: "7.3",
    boyHt: "67",
    girlHt: "66",
  },
  {
    age: "9 महीना",
    ageEn: "9 Months",
    boyWt: "9.0",
    girlWt: "8.4",
    boyHt: "72",
    girlHt: "71",
  },
  {
    age: "1 साल",
    ageEn: "1 Year",
    boyWt: "10.0",
    girlWt: "9.2",
    boyHt: "76",
    girlHt: "74",
  },
  {
    age: "2 साल",
    ageEn: "2 Years",
    boyWt: "12.2",
    girlWt: "11.5",
    boyHt: "87",
    girlHt: "85",
  },
  {
    age: "3 साल",
    ageEn: "3 Years",
    boyWt: "14.3",
    girlWt: "13.9",
    boyHt: "96",
    girlHt: "95",
  },
];

const NUTRITION = [
  {
    icon: "🍳",
    titleHi: "पहली तिमाही (1-12 हफ्ते)",
    titleEn: "First Trimester (1-12 Weeks)",
    items: [
      {
        hi: "फोलिक एसिड — हरी सब्जियाँ, दाल",
        en: "Folic acid — leafy greens, lentils",
      },
      {
        hi: "आयरन — पालक, चुकंदर, गुड़",
        en: "Iron — spinach, beetroot, jaggery",
      },
      { hi: "पानी — दिन में 8-10 गिलास", en: "Water — 8-10 glasses daily" },
    ],
  },
  {
    icon: "🥛",
    titleHi: "दूसरी तिमाही (13-26 हफ्ते)",
    titleEn: "Second Trimester (13-26 Weeks)",
    items: [
      { hi: "कैल्शियम — दूध, दही, पनीर", en: "Calcium — milk, curd, paneer" },
      {
        hi: "प्रोटीन — दाल, अंडा, सोयाबीन",
        en: "Protein — lentils, eggs, soybean",
      },
      { hi: "विटामिन D — धूप में बैठें", en: "Vitamin D — sit in sunlight" },
    ],
  },
  {
    icon: "🍎",
    titleHi: "तीसरी तिमाही (27-40 हफ्ते)",
    titleEn: "Third Trimester (27-40 Weeks)",
    items: [
      {
        hi: "ओमेगा-3 — अखरोट, अलसी के बीज",
        en: "Omega-3 — walnuts, flaxseeds",
      },
      { hi: "फाइबर — साबुत अनाज, फल", en: "Fiber — whole grains, fruits" },
      { hi: "छोटे-छोटे बार-बार खाएं", en: "Eat small meals frequently" },
    ],
  },
  {
    icon: "🤱",
    titleHi: "स्तनपान के दौरान",
    titleEn: "During Breastfeeding",
    items: [
      { hi: "अतिरिक्त 500 कैलोरी रोज़ाना", en: "Extra 500 calories daily" },
      { hi: "खूब पानी और सूप पिएं", en: "Drink lots of water and soups" },
      {
        hi: "मेथी, सौंफ — दूध बढ़ाता है",
        en: "Fenugreek, fennel — boosts milk",
      },
    ],
  },
];

export default function MaternalPage({ onBack }) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("pregnancy");
  const [currentWeek, setCurrentWeek] = useState(12);

  const t = (hi, en) => (language === "hi" ? hi : en);

  const tabLabels = {
    pregnancy: { hi: "🤰 गर्भावस्था", en: "🤰 Pregnancy" },
    vaccine: { hi: "💉 टीकाकरण", en: "💉 Vaccines" },
    growth: { hi: "📈 वृद्धि", en: "📈 Growth" },
    nutrition: { hi: "🥗 पोषण", en: "🥗 Nutrition" },
  };

  const progressPct = Math.round((currentWeek / 40) * 100);
  const currentInfo = PREGNANCY_WEEKS.reduce(
    (acc, pw) => (pw.week <= currentWeek ? pw : acc),
    PREGNANCY_WEEKS[0],
  );

  return (
    <div className="page page-enter">
      {/* Header */}
      <div
        style={{
          ...mat.header,
          background: "linear-gradient(135deg,#6a1b9a,#ab47bc)",
        }}
      >
        <button onClick={onBack} style={mat.backBtn}>
          ← {t("वापस", "Back")}
        </button>
        <span style={mat.headerTitle}>
          🤱 {t("माँ और बच्चा", "Mother & Child")}
        </span>
        <span />
      </div>

      {/* Tabs */}
      <div style={{ overflowX: "auto" }}>
        <div style={mat.tabBar}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...mat.tab,
                background: activeTab === tab ? "#6a1b9a" : "transparent",
                color: activeTab === tab ? "#fff" : "var(--text-muted)",
                fontWeight: activeTab === tab ? 700 : 400,
              }}
            >
              {tabLabels[tab][language]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* ── PREGNANCY TAB ── */}
        {activeTab === "pregnancy" && (
          <>
            {/* Week selector */}
            <div style={mat.weekCard}>
              <div style={mat.weekHeader}>
                <div>
                  <div style={mat.weekLabel}>
                    {t("गर्भावस्था सप्ताह", "Pregnancy Week")}
                  </div>
                  <div style={mat.weekNum}>
                    {t(`सप्ताह ${currentWeek}`, `Week ${currentWeek}`)}
                  </div>
                </div>
                <div style={mat.trimesterBadge}>
                  {currentWeek <= 12
                    ? t("पहली तिमाही", "1st Trimester")
                    : currentWeek <= 26
                      ? t("दूसरी तिमाही", "2nd Trimester")
                      : t("तीसरी तिमाही", "3rd Trimester")}
                </div>
              </div>

              {/* Progress bar */}
              <div style={mat.progressTrack}>
                <div
                  style={{ ...mat.progressFill, width: `${progressPct}%` }}
                />
              </div>
              <div style={mat.progressLabels}>
                <span>{t("सप्ताह 1", "Week 1")}</span>
                <span style={{ color: "#6a1b9a", fontWeight: 700 }}>
                  {progressPct}%
                </span>
                <span>{t("सप्ताह 40", "Week 40")}</span>
              </div>

              <input
                type="range"
                min={1}
                max={40}
                value={currentWeek}
                onChange={(e) => setCurrentWeek(Number(e.target.value))}
                style={{ width: "100%", marginTop: 8, accentColor: "#6a1b9a" }}
              />
            </div>

            {/* Current week info */}
            <div style={mat.infoCard}>
              <div style={mat.infoTitle}>
                {t(`सप्ताह ${currentWeek} में:`, `At Week ${currentWeek}:`)}
              </div>
              <div style={mat.infoText}>
                {t(currentInfo.hi, currentInfo.en)}
              </div>
              <div style={mat.tipBox}>
                {currentInfo.tip} {t(currentInfo.tipHi, currentInfo.tipEn)}
              </div>
            </div>

            {/* Week timeline */}
            <div style={mat.timelineTitle}>
              {t("पूरा सफ़र", "Full Journey")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PREGNANCY_WEEKS.map((pw) => (
                <div
                  key={pw.week}
                  onClick={() => setCurrentWeek(pw.week)}
                  style={{
                    ...mat.weekRow,
                    background: currentWeek >= pw.week ? "#f3e5f5" : "#fff",
                    borderLeft: `3px solid ${currentWeek >= pw.week ? "#6a1b9a" : "#e0e0e0"}`,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      ...mat.weekBadge,
                      background:
                        currentWeek >= pw.week ? "#6a1b9a" : "#e0e0e0",
                      color: currentWeek >= pw.week ? "#fff" : "#999",
                    }}
                  >
                    {t(`सप्ताह ${pw.week}`, `W${pw.week}`)}
                  </div>
                  <div style={mat.weekRowText}>{t(pw.hi, pw.en)}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── VACCINE TAB ── */}
        {activeTab === "vaccine" && (
          <>
            <div style={mat.vaccineNote}>
              💉{" "}
              {t(
                "यह भारत सरकार का अनुशंसित टीकाकरण कार्यक्रम है। सभी टीके मुफ़्त हैं।",
                "This is the Government of India recommended schedule. All vaccines are free.",
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {VACCINES.map((v, i) => (
                <div
                  key={i}
                  style={{
                    ...mat.vaccineCard,
                    borderLeft: `4px solid ${v.done ? "#43a047" : "#6a1b9a"}`,
                  }}
                >
                  <div
                    style={{
                      ...mat.vaccineAge,
                      background: v.done ? "#e8f5e9" : "#f3e5f5",
                      color: v.done ? "#2e7d32" : "#6a1b9a",
                    }}
                  >
                    {t(v.age, v.ageEn)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={mat.vaccineName}>{v.name}</div>
                    <div style={mat.vaccineFor}>{t(v.forHi, v.forEn)}</div>
                  </div>
                  <div
                    style={{
                      ...mat.vaccineStatus,
                      color: v.done ? "#2e7d32" : "#9e9e9e",
                    }}
                  >
                    {v.done ? "✅" : "⏳"}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── GROWTH TAB ── */}
        {activeTab === "growth" && (
          <>
            <div style={mat.growthNote}>
              📏{" "}
              {t(
                "WHO मानक के अनुसार बच्चे का सामान्य वज़न और लंबाई।",
                "Normal weight & height as per WHO standards.",
              )}
            </div>
            <div style={mat.growthTable}>
              <div style={mat.growthHeader}>
                <span>{t("उम्र", "Age")}</span>
                <span>{t("लड़का वज़न (kg)", "Boy Wt (kg)")}</span>
                <span>{t("लड़की वज़न (kg)", "Girl Wt (kg)")}</span>
                <span>{t("लंबाई (cm)", "Height (cm)")}</span>
              </div>
              {GROWTH_DATA.map((row, i) => (
                <div
                  key={i}
                  style={{
                    ...mat.growthRow,
                    background: i % 2 === 0 ? "#f9f0ff" : "#fff",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {t(row.age, row.ageEn)}
                  </span>
                  <span>♂ {row.boyWt}</span>
                  <span>♀ {row.girlWt}</span>
                  <span>
                    {row.boyHt}–{row.girlHt}
                  </span>
                </div>
              ))}
            </div>
            <div style={mat.growthTip}>
              ⚠️{" "}
              {t(
                "अगर वज़न इससे कम है तो आंगनवाड़ी कार्यकर्ता या डॉक्टर से मिलें।",
                "If weight is below this, consult anganwadi worker or doctor.",
              )}
            </div>
          </>
        )}

        {/* ── NUTRITION TAB ── */}
        {activeTab === "nutrition" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {NUTRITION.map((sec, i) => (
              <div key={i} style={mat.nutCard}>
                <div style={mat.nutTitle}>
                  {sec.icon} {t(sec.titleHi, sec.titleEn)}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginTop: 8,
                  }}
                >
                  {sec.items.map((item, j) => (
                    <div key={j} style={mat.nutItem}>
                      <span style={mat.nutDot}>●</span>
                      <span>{t(item.hi, item.en)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const mat = {
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
    minWidth: "max-content",
  },
  tab: {
    padding: "7px 10px",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    fontSize: "0.72rem",
    fontFamily: "inherit",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  // pregnancy
  weekCard: {
    background: "#f9f0ff",
    border: "1.5px solid #ce93d8",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  weekHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  weekLabel: { fontSize: "0.75rem", color: "#6a1b9a", fontWeight: 600 },
  weekNum: { fontSize: "1.4rem", fontWeight: 700, color: "#4a148c" },
  trimesterBadge: {
    background: "#6a1b9a",
    color: "#fff",
    fontSize: "0.68rem",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 20,
  },
  progressTrack: {
    height: 8,
    background: "#e1bee7",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#ab47bc,#6a1b9a)",
    borderRadius: 10,
    transition: "width 0.3s",
  },
  progressLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.68rem",
    color: "#888",
  },
  infoCard: {
    background: "#fff",
    border: "1px solid #e1bee7",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  infoTitle: {
    fontSize: "0.78rem",
    color: "#6a1b9a",
    fontWeight: 700,
    marginBottom: 4,
  },
  infoText: {
    fontSize: "0.9rem",
    color: "#333",
    lineHeight: 1.5,
    marginBottom: 8,
  },
  tipBox: {
    background: "#f3e5f5",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: "0.8rem",
    color: "#4a148c",
    fontWeight: 600,
  },
  timelineTitle: {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 8,
  },
  weekRow: {
    borderRadius: 10,
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  weekBadge: {
    minWidth: 62,
    textAlign: "center",
    padding: "3px 6px",
    borderRadius: 8,
    fontSize: "0.7rem",
    fontWeight: 700,
    flexShrink: 0,
  },
  weekRowText: { fontSize: "0.82rem", color: "#444", lineHeight: 1.4 },
  // vaccine
  vaccineNote: {
    background: "#f3e5f5",
    color: "#4a148c",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: "0.78rem",
    fontWeight: 600,
    marginBottom: 12,
    border: "1px solid #ce93d8",
  },
  vaccineCard: {
    background: "#fff",
    borderRadius: 10,
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid #f0e0ff",
  },
  vaccineAge: {
    minWidth: 68,
    padding: "4px 8px",
    borderRadius: 8,
    fontSize: "0.72rem",
    fontWeight: 700,
    textAlign: "center",
    flexShrink: 0,
  },
  vaccineName: { fontSize: "0.82rem", fontWeight: 700, color: "#1a1a1a" },
  vaccineFor: { fontSize: "0.72rem", color: "#666", marginTop: 2 },
  vaccineStatus: { fontSize: "1.2rem" },
  // growth
  growthNote: {
    background: "#f3e5f5",
    color: "#4a148c",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: "0.78rem",
    marginBottom: 10,
    border: "1px solid #ce93d8",
  },
  growthTable: {
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #e1bee7",
  },
  growthHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr 1.2fr 1fr",
    padding: "10px 12px",
    background: "#6a1b9a",
    color: "#fff",
    fontSize: "0.7rem",
    fontWeight: 700,
    gap: 4,
  },
  growthRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr 1.2fr 1fr",
    padding: "9px 12px",
    fontSize: "0.78rem",
    color: "#333",
    gap: 4,
  },
  growthTip: {
    background: "#fff8e1",
    color: "#e65100",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: "0.78rem",
    marginTop: 10,
    border: "1px solid #ffe082",
  },
  // nutrition
  nutCard: {
    background: "#fff",
    border: "1px solid #e1bee7",
    borderRadius: 12,
    padding: "14px 16px",
  },
  nutTitle: { fontSize: "0.9rem", fontWeight: 700, color: "#4a148c" },
  nutItem: {
    display: "flex",
    gap: 8,
    fontSize: "0.82rem",
    color: "#444",
    lineHeight: 1.4,
  },
  nutDot: { color: "#ab47bc", flexShrink: 0 },
};
