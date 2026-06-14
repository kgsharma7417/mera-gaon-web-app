import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const DOCTORS = [
  {
    id: 1,
    nameHi: "डॉ. सुनीता वर्मा",
    nameEn: "Dr. Sunita Verma",
    specHi: "सामान्य चिकित्सक",
    specEn: "General Physician",
    exp: 12,
    fee: 200,
    rating: 4.8,
    reviews: 312,
    available: true,
    nextSlot: "10:30 AM",
    avatar: "👩‍⚕️",
    langHi: "हिंदी, अंग्रेज़ी",
    langEn: "Hindi, English",
  },
  {
    id: 2,
    nameHi: "डॉ. रमेश कुमार",
    nameEn: "Dr. Ramesh Kumar",
    specHi: "बाल रोग विशेषज्ञ",
    specEn: "Pediatrician",
    exp: 8,
    fee: 250,
    rating: 4.6,
    reviews: 198,
    available: true,
    nextSlot: "11:00 AM",
    avatar: "👨‍⚕️",
    langHi: "हिंदी, भोजपुरी",
    langEn: "Hindi, Bhojpuri",
  },
  {
    id: 3,
    nameHi: "डॉ. प्रीति सिंह",
    nameEn: "Dr. Preeti Singh",
    specHi: "स्त्री रोग विशेषज्ञ",
    specEn: "Gynecologist",
    exp: 15,
    fee: 300,
    rating: 4.9,
    reviews: 445,
    available: false,
    nextSlot: "2:00 PM",
    avatar: "👩‍⚕️",
    langHi: "हिंदी, अवधी",
    langEn: "Hindi, Awadhi",
  },
  {
    id: 4,
    nameHi: "डॉ. अजय मिश्रा",
    nameEn: "Dr. Ajay Mishra",
    specHi: "त्वचा रोग विशेषज्ञ",
    specEn: "Dermatologist",
    exp: 10,
    fee: 350,
    rating: 4.5,
    reviews: 156,
    available: true,
    nextSlot: "12:30 PM",
    avatar: "👨‍⚕️",
    langHi: "हिंदी",
    langEn: "Hindi",
  },
];

const SPECIALTIES = [
  { hi: "सभी", en: "All", icon: "🏥" },
  { hi: "सामान्य", en: "General", icon: "👨‍⚕️" },
  { hi: "बच्चे", en: "Child", icon: "👶" },
  { hi: "महिला", en: "Women", icon: "👩" },
  { hi: "त्वचा", en: "Skin", icon: "🧴" },
];

const SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "4:00 PM",
  "4:30 PM",
];

export default function TelemedicinePage({ onBack }) {
  const { language } = useLanguage();
  const [selectedSpec, setSelectedSpec] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingStep, setBookingStep] = useState(0); // 0=list, 1=book-form, 2=confirm
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({ name: "", age: "", problem: "" });

  const t = (hi, en) => (language === "hi" ? hi : en);

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingStep(1);
    setSelectedSlot(null);
  };

  const handleConfirm = () => {
    if (!selectedSlot || !formData.name || !formData.problem) return;
    setBookingStep(2);
  };

  /* ── Booking Confirmation Screen ── */
  if (bookingStep === 2) {
    return (
      <div className="page page-enter">
        <div
          style={{
            ...ps.header,
            background: "linear-gradient(135deg,#1565c0,#1e88e5)",
          }}
        >
          <button
            onClick={() => {
              setBookingStep(0);
              setSelectedDoctor(null);
            }}
            style={ps.backBtn}
          >
            ← {t("वापस", "Back")}
          </button>
          <span style={ps.headerTitle}>
            {t("बुकिंग पक्की हुई", "Booking Confirmed")}
          </span>
          <span />
        </div>
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={ps.successCircle}>✅</div>
          <div style={ps.successTitle}>
            {t("अपॉइंटमेंट बुक हो गया!", "Appointment Booked!")}
          </div>
          <div style={ps.confirmCard}>
            <div style={ps.confirmRow}>
              <span style={ps.confirmLabel}>{t("डॉक्टर", "Doctor")}</span>
              <span style={ps.confirmVal}>
                {t(selectedDoctor.nameHi, selectedDoctor.nameEn)}
              </span>
            </div>
            <div style={ps.confirmRow}>
              <span style={ps.confirmLabel}>{t("समय", "Time")}</span>
              <span style={ps.confirmVal}>{selectedSlot}</span>
            </div>
            <div style={ps.confirmRow}>
              <span style={ps.confirmLabel}>{t("मरीज़", "Patient")}</span>
              <span style={ps.confirmVal}>{formData.name}</span>
            </div>
            <div style={ps.confirmRow}>
              <span style={ps.confirmLabel}>{t("फ़ीस", "Fee")}</span>
              <span
                style={{ ...ps.confirmVal, color: "#1565c0", fontWeight: 700 }}
              >
                ₹{selectedDoctor.fee}
              </span>
            </div>
          </div>
          <div style={ps.infoBox}>
            💬{" "}
            {t(
              "डॉक्टर आपको समय पर WhatsApp/कॉल करेंगे। तैयार रहें।",
              "Doctor will WhatsApp/call you at your slot. Stay ready.",
            )}
          </div>
          <button
            className="btn btn-primary btn-full"
            onClick={onBack}
            style={{ marginTop: 8 }}
          >
            {t("होम पर जाएं", "Go to Home")}
          </button>
        </div>
      </div>
    );
  }

  /* ── Booking Form Screen ── */
  if (bookingStep === 1 && selectedDoctor) {
    return (
      <div className="page page-enter">
        <div
          style={{
            ...ps.header,
            background: "linear-gradient(135deg,#1565c0,#1e88e5)",
          }}
        >
          <button onClick={() => setBookingStep(0)} style={ps.backBtn}>
            ← {t("वापस", "Back")}
          </button>
          <span style={ps.headerTitle}>
            {t("अपॉइंटमेंट बुक करें", "Book Appointment")}
          </span>
          <span />
        </div>
        <div style={{ padding: "16px" }}>
          {/* Doctor mini card */}
          <div style={ps.miniDocCard}>
            <div style={ps.docAvatar}>{selectedDoctor.avatar}</div>
            <div>
              <div style={ps.docName}>
                {t(selectedDoctor.nameHi, selectedDoctor.nameEn)}
              </div>
              <div style={ps.docSpec}>
                {t(selectedDoctor.specHi, selectedDoctor.specEn)}
              </div>
            </div>
            <div style={ps.feePill}>₹{selectedDoctor.fee}</div>
          </div>

          {/* Slot picker */}
          <div style={ps.sectionHead}>{t("समय चुनें", "Select Time Slot")}</div>
          <div style={ps.slotGrid}>
            {SLOTS.map((sl) => (
              <button
                key={sl}
                onClick={() => setSelectedSlot(sl)}
                style={{
                  ...ps.slotBtn,
                  background: selectedSlot === sl ? "#1565c0" : "#f0f4ff",
                  color: selectedSlot === sl ? "#fff" : "#1565c0",
                  border: `1.5px solid ${selectedSlot === sl ? "#1565c0" : "#c5cae9"}`,
                }}
              >
                {sl}
              </button>
            ))}
          </div>

          {/* Patient form */}
          <div style={ps.sectionHead}>
            {t("मरीज़ की जानकारी", "Patient Details")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              style={ps.input}
              placeholder={t("पूरा नाम *", "Full Name *")}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              style={ps.input}
              placeholder={t("उम्र", "Age")}
              type="number"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
            />
            <textarea
              style={{ ...ps.input, minHeight: 80, resize: "vertical" }}
              placeholder={t("मुख्य समस्या लिखें *", "Describe your problem *")}
              value={formData.problem}
              onChange={(e) =>
                setFormData({ ...formData, problem: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleConfirm}
            className="btn btn-primary btn-full"
            style={{
              marginTop: 16,
              opacity:
                !selectedSlot || !formData.name || !formData.problem ? 0.5 : 1,
            }}
            disabled={!selectedSlot || !formData.name || !formData.problem}
          >
            {t(
              `बुक करें — ₹${selectedDoctor.fee}`,
              `Book — ₹${selectedDoctor.fee}`,
            )}
          </button>
          <div style={ps.fineText}>
            {t(
              "📞 डॉक्टर आपको सीधे कॉल करेंगे।",
              "📞 Doctor will call you directly at the slot.",
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Doctor List Screen ── */
  return (
    <div className="page page-enter">
      <div
        style={{
          ...ps.header,
          background: "linear-gradient(135deg,#1565c0,#1e88e5)",
        }}
      >
        <button onClick={onBack} style={ps.backBtn}>
          ← {t("वापस", "Back")}
        </button>
        <span style={ps.headerTitle}>
          🩺 {t("ऑनलाइन डॉक्टर", "Online Doctor")}
        </span>
        <span />
      </div>

      {/* Free banner */}
      <div style={ps.freeBanner}>
        🏛️{" "}
        {t(
          "eSanjeevani पर सरकारी डॉक्टर से मुफ़्त परामर्श भी उपलब्ध है।",
          "Free govt. consultation also available via eSanjeevani.",
        )}
        <a
          href="https://esanjeevaniopd.in"
          target="_blank"
          rel="noreferrer"
          style={ps.bannerLink}
        >
          {" "}
          {t("अभी देखें →", "Visit →")}
        </a>
      </div>

      {/* Specialty filter */}
      <div style={{ overflowX: "auto", padding: "10px 14px 0" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {SPECIALTIES.map((sp, i) => (
            <button
              key={i}
              onClick={() => setSelectedSpec(i)}
              style={{
                ...ps.specChip,
                background: selectedSpec === i ? "#1565c0" : "#e8eaf6",
                color: selectedSpec === i ? "#fff" : "#1565c0",
              }}
            >
              {sp.icon} {t(sp.hi, sp.en)}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor cards */}
      <div
        style={{
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {DOCTORS.map((doc) => (
          <div key={doc.id} style={ps.docCard}>
            <div style={ps.docCardTop}>
              <div style={ps.docAvatar}>{doc.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={ps.docName}>{t(doc.nameHi, doc.nameEn)}</div>
                <div style={ps.docSpec}>
                  {t(doc.specHi, doc.specEn)} · {doc.exp} {t("वर्ष", "yrs")}
                </div>
                <div style={ps.docLang}>🗣️ {t(doc.langHi, doc.langEn)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={ps.feeText}>₹{doc.fee}</div>
                <div style={ps.feeLabel}>{t("फ़ीस", "fee")}</div>
              </div>
            </div>
            <div style={ps.docCardBottom}>
              <div style={ps.ratingRow}>
                ⭐ {doc.rating} · {doc.reviews} {t("समीक्षा", "reviews")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    ...ps.availDot,
                    background: doc.available ? "#43a047" : "#ef5350",
                  }}
                />
                <span style={ps.nextSlotText}>
                  {doc.available
                    ? t("अभी उपलब्ध", "Available now")
                    : t("अगला स्लॉट", "Next slot")}{" "}
                  · {doc.nextSlot}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleBook(doc)}
              className="btn btn-primary btn-full"
              style={{ marginTop: 10, background: "#1565c0" }}
            >
              📅 {t("अपॉइंटमेंट लें", "Book Appointment")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const ps = {
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
  freeBanner: {
    background: "#e3f2fd",
    color: "#0d47a1",
    padding: "10px 14px",
    fontSize: "0.78rem",
    borderBottom: "1px solid #bbdefb",
  },
  bannerLink: {
    color: "#0d47a1",
    fontWeight: 700,
    textDecoration: "underline",
  },
  specChip: {
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: "0.8rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    flexShrink: 0,
    transition: "all 0.15s",
  },
  docCard: {
    background: "#fff",
    border: "1px solid #e3e8f0",
    borderRadius: 14,
    padding: "14px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  docCardTop: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 10,
  },
  docAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: "#e3f2fd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
    flexShrink: 0,
  },
  docName: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "var(--text-primary)",
  },
  docSpec: { fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 },
  docLang: { fontSize: "0.72rem", color: "#1565c0", marginTop: 3 },
  feeText: { fontSize: "1rem", fontWeight: 700, color: "#1565c0" },
  feeLabel: { fontSize: "0.68rem", color: "var(--text-muted)" },
  docCardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTop: "1px solid #f0f0f0",
  },
  ratingRow: { fontSize: "0.78rem", color: "var(--text-muted)" },
  availDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "inline-block",
  },
  nextSlotText: { fontSize: "0.75rem", color: "var(--text-muted)" },
  // booking form
  miniDocCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#e8eaf6",
    borderRadius: 12,
    padding: "12px 14px",
    marginBottom: 16,
  },
  feePill: {
    marginLeft: "auto",
    background: "#1565c0",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: 20,
    fontWeight: 700,
    fontSize: "0.85rem",
  },
  sectionHead: {
    fontSize: "0.82rem",
    fontWeight: 700,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    margin: "14px 0 8px",
  },
  slotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    marginBottom: 4,
  },
  slotBtn: {
    padding: "8px 4px",
    borderRadius: 8,
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1.5px solid #e0e0e0",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    background: "#fafafa",
    outline: "none",
    boxSizing: "border-box",
  },
  fineText: {
    textAlign: "center",
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    marginTop: 10,
  },
  // confirm
  successCircle: { fontSize: "4rem", marginTop: 20 },
  successTitle: { fontSize: "1.2rem", fontWeight: 700, color: "#1b5e20" },
  confirmCard: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: 14,
    padding: "14px 18px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  confirmRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottom: "1px solid #f5f5f5",
  },
  confirmLabel: { fontSize: "0.82rem", color: "var(--text-muted)" },
  confirmVal: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--text-primary)",
  },
  infoBox: {
    background: "#e8f5e9",
    border: "1px solid #c8e6c9",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: "0.8rem",
    color: "#2e7d32",
  },
};
