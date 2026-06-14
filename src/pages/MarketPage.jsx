import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "all", hi: "सभी", en: "All", emoji: "🏪" },
  { key: "grocery", hi: "किराना", en: "Grocery", emoji: "🛒" },
  { key: "medical", hi: "मेडिकल", en: "Medical", emoji: "💊" },
  { key: "dairy", hi: "डेयरी", en: "Dairy", emoji: "🥛" },
  { key: "seeds", hi: "खाद-बीज", en: "Seeds", emoji: "🌱" },
  { key: "repair", hi: "रिपेयर", en: "Repair", emoji: "🔧" },
];

const SORT_OPTIONS = [
  { key: "open", hi: "खुले पहले", en: "Open First" },
  { key: "rating", hi: "टॉप रेटेड", en: "Top Rated" },
  { key: "delivery", hi: "डिलीवरी", en: "Delivery" },
  { key: "az", hi: "A–Z", en: "A–Z" },
];

const INITIAL_SHOPS = [
  {
    id: 1,
    cat: "grocery",
    isOpen: true,
    isOwner: true,
    nameHi: "राम किराना स्टोर",
    nameEn: "Ram Kirana Store",
    ownerHi: "रामजी शर्मा",
    ownerEn: "Ramji Sharma",
    phone: "9876543210",
    upi: "ramji@upi",
    offersHi: "चावल पर 5% छूट",
    offersEn: "5% off on rice",
    deliveryHi: "होम डिलीवरी उपलब्ध",
    deliveryEn: "Home delivery available",
    hasDelivery: true,
    timingHi: "सुबह 7 – रात 9",
    timingEn: "7 AM – 9 PM",
    announcementHi: "आज गेहूं का आटा ताज़ा आया है!",
    announcementEn: "Fresh wheat flour arrived today!",
    rating: 4.3,
    ratingCount: 18,
    reviews: [
      {
        name: "सुनीता देवी",
        stars: 5,
        text: "बहुत अच्छी दुकान, ताज़ा सामान मिलता है",
        time: "2 दिन पहले",
      },
      {
        name: "राजेश कुमार",
        stars: 4,
        text: "सही दाम में मिलता है, भरोसेमंद दुकान",
        time: "1 हफ्ते पहले",
      },
    ],
    products: [
      { name: "चावल (बासमती)", price: "₹75/kg", inStock: true },
      { name: "आटा (गेहूं)", price: "₹38/kg", inStock: true },
      { name: "चना दाल", price: "₹120/kg", inStock: false },
      { name: "सरसों तेल", price: "₹185/L", inStock: true },
      { name: "चीनी", price: "₹45/kg", inStock: true },
      { name: "नमक", price: "₹20/kg", inStock: true },
    ],
    photos: ["🛒", "🌾", "🍚"],
    lat: 27.553,
    lng: 78.0413,
    addressHi: "मुख्य बाज़ार, गाँव चौराहा",
    addressEn: "Main Market, Village Chowraha",
    emoji: "🛒",
  },
  {
    id: 2,
    cat: "medical",
    isOpen: true,
    isOwner: false,
    nameHi: "जन सेवा मेडिकल",
    nameEn: "Jan Seva Medical",
    ownerHi: "डॉ. सुरेश वर्मा",
    ownerEn: "Dr. Suresh Verma",
    phone: "9876543211",
    upi: "drsuresh@okaxis",
    offersHi: "जेनेरिक दवाएं 20% सस्ती",
    offersEn: "Generic medicines 20% off",
    deliveryHi: "डिलीवरी नहीं — आकर लें",
    deliveryEn: "No delivery — walk in only",
    hasDelivery: false,
    timingHi: "सुबह 8 – रात 10",
    timingEn: "8 AM – 10 PM",
    announcementHi: "",
    announcementEn: "",
    rating: 4.7,
    ratingCount: 34,
    reviews: [
      {
        name: "मीना शर्मा",
        stars: 5,
        text: "डॉक्टर साहब बहुत अच्छे हैं, सही सलाह देते हैं",
        time: "3 दिन पहले",
      },
      {
        name: "अजय सिंह",
        stars: 5,
        text: "हमेशा असली दवाइयाँ मिलती हैं यहाँ",
        time: "5 दिन पहले",
      },
    ],
    products: [
      { name: "Paracetamol 500mg", price: "₹12", inStock: true },
      { name: "BP Medicine", price: "₹45", inStock: true },
      { name: "Vitamin C", price: "₹60", inStock: true },
      { name: "Antacid Syrup", price: "₹55", inStock: false },
      { name: "Cough Syrup", price: "₹85", inStock: true },
      { name: "Bandage Roll", price: "₹25", inStock: true },
    ],
    photos: ["💊", "🏥", "💉"],
    lat: 27.5535,
    lng: 78.0418,
    addressHi: "अस्पताल के पास, वार्ड 3",
    addressEn: "Near Hospital, Ward 3",
    emoji: "💊",
  },
  {
    id: 3,
    cat: "dairy",
    isOpen: false,
    isOwner: false,
    nameHi: "श्याम डेयरी",
    nameEn: "Shyam Dairy",
    ownerHi: "श्याम यादव",
    ownerEn: "Shyam Yadav",
    phone: "9876543212",
    upi: "shyam.dairy@paytm",
    offersHi: "ताज़ा दूध हर रोज़ सुबह",
    offersEn: "Fresh milk every morning",
    deliveryHi: "सुबह 6–9 बजे डिलीवरी",
    deliveryEn: "Morning delivery 6–9 AM",
    hasDelivery: true,
    timingHi: "सुबह 5 – सुबह 10",
    timingEn: "5 AM – 10 AM",
    announcementHi: "आज बंद है, कल से खुलेगी",
    announcementEn: "Closed today, opens tomorrow",
    rating: 4.1,
    ratingCount: 12,
    reviews: [
      {
        name: "गीता देवी",
        stars: 4,
        text: "दूध बिल्कुल ताज़ा और शुद्ध होता है",
        time: "1 हफ्ते पहले",
      },
    ],
    products: [
      { name: "गाय का दूध", price: "₹60/L", inStock: false },
      { name: "दही", price: "₹80/kg", inStock: false },
      { name: "पनीर", price: "₹350/kg", inStock: false },
      { name: "देशी घी", price: "₹600/kg", inStock: false },
      { name: "लस्सी", price: "₹30/glass", inStock: false },
      { name: "मक्खन", price: "₹500/kg", inStock: false },
    ],
    photos: ["🥛", "🐄", "🧈"],
    lat: 27.5525,
    lng: 78.0408,
    addressHi: "गोशाला रोड",
    addressEn: "Goshala Road",
    emoji: "🥛",
  },
  {
    id: 4,
    cat: "seeds",
    isOpen: true,
    isOwner: false,
    nameHi: "किसान खाद बीज भंडार",
    nameEn: "Kisan Seeds Store",
    ownerHi: "मोहन लाल पटेल",
    ownerEn: "Mohan Lal Patel",
    phone: "9876543213",
    upi: "mohan.kisan@sbi",
    offersHi: "बीज पर 10% छूट इस सीज़न",
    offersEn: "10% off on seeds this season",
    deliveryHi: "₹50+ ऑर्डर पर फ्री डिलीवरी",
    deliveryEn: "Free delivery on ₹50+ order",
    hasDelivery: true,
    timingHi: "सुबह 9 – शाम 6",
    timingEn: "9 AM – 6 PM",
    announcementHi: "नए रबी बीज आ गए हैं!",
    announcementEn: "New Rabi seeds are here!",
    rating: 3.9,
    ratingCount: 8,
    reviews: [],
    products: [
      { name: "गेहूं बीज (HD-2967)", price: "₹45/kg", inStock: true },
      { name: "धान बीज", price: "₹55/kg", inStock: true },
      { name: "यूरिया खाद", price: "₹270/bag", inStock: true },
      { name: "DAP खाद", price: "₹1350/bag", inStock: false },
      { name: "सरसों बीज", price: "₹65/kg", inStock: true },
      { name: "कीटनाशक", price: "₹120/L", inStock: true },
    ],
    photos: ["🌱", "🌾", "🚜"],
    lat: 27.554,
    lng: 78.042,
    addressHi: "मंडी के पास",
    addressEn: "Near Mandi",
    emoji: "🌱",
  },
  {
    id: 5,
    cat: "repair",
    isOpen: true,
    isOwner: false,
    nameHi: "टेक रिपेयर सेंटर",
    nameEn: "Tech Repair Centre",
    ownerHi: "गोपाल मिस्त्री",
    ownerEn: "Gopal Mistry",
    phone: "9876543214",
    upi: "gopal.repair@gpay",
    offersHi: "मोबाइल स्क्रीन ₹299 में",
    offersEn: "Mobile screen repair ₹299",
    deliveryHi: "पिकअप सर्विस उपलब्ध",
    deliveryEn: "Pickup service available",
    hasDelivery: true,
    timingHi: "सुबह 10 – रात 8",
    timingEn: "10 AM – 8 PM",
    announcementHi: "",
    announcementEn: "",
    rating: 4.5,
    ratingCount: 27,
    reviews: [
      {
        name: "अजय मिश्रा",
        stars: 5,
        text: "बहुत जल्दी और सही ठीक कर दिया फोन",
        time: "1 दिन पहले",
      },
      {
        name: "प्रिया वर्मा",
        stars: 4,
        text: "अच्छा काम करते हैं, दाम भी सही है",
        time: "4 दिन पहले",
      },
    ],
    products: [
      { name: "Screen Repair", price: "₹299", inStock: true },
      { name: "Battery Replace", price: "₹399", inStock: true },
      { name: "Charging Port", price: "₹199", inStock: true },
      { name: "Back Cover", price: "₹149", inStock: false },
      { name: "Speaker Fix", price: "₹249", inStock: true },
      { name: "Water Damage", price: "₹499", inStock: true },
    ],
    photos: ["🔧", "📱", "⚙️"],
    lat: 27.5528,
    lng: 78.0415,
    addressHi: "बस स्टैंड के पास",
    addressEn: "Near Bus Stand",
    emoji: "🔧",
  },
];

// ─── STAR DISPLAY ─────────────────────────────────────────────────────────────
function Stars({ rating, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            fontSize: size,
            color: i <= Math.round(rating) ? "#f59e0b" : "#d1d5db",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, visible }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 90,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#1a1a2e",
        color: "#fff",
        fontSize: "0.82rem",
        fontWeight: 500,
        padding: "10px 20px",
        borderRadius: 50,
        zIndex: 9999,
        whiteSpace: "nowrap",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {msg}
    </div>
  );
}

// ─── QR CODE (SVG-based placeholder) ─────────────────────────────────────────
function QRDisplay({ upiId }) {
  // generates a decorative QR-like SVG pattern seeded from upiId
  const cells = [];
  const seed = upiId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const size = 9;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const filled = (seed * (r + 1) * (c + 1)) % 7 < 4;
      cells.push({ r, c, filled });
    }
  }
  const cornerRects = [
    { x: 0, y: 0 },
    { x: 6, y: 0 },
    { x: 0, y: 6 },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 10,
          borderRadius: 12,
          border: "1.5px solid #e5e7eb",
        }}
      >
        <svg width={110} height={110} viewBox="0 0 110 110">
          {cells.map(({ r, c, filled }) => (
            <rect
              key={`${r}-${c}`}
              x={8 + c * 11}
              y={8 + r * 11}
              width={9}
              height={9}
              rx={1.5}
              fill={filled ? "#1a1a2e" : "transparent"}
            />
          ))}
          {cornerRects.map((pos, i) => (
            <g key={i}>
              <rect
                x={8 + pos.x * 11 - 2}
                y={8 + pos.y * 11 - 2}
                width={37}
                height={37}
                rx={4}
                fill="#1a1a2e"
              />
              <rect
                x={8 + pos.x * 11 + 2}
                y={8 + pos.y * 11 + 2}
                width={29}
                height={29}
                rx={2}
                fill="#fff"
              />
              <rect
                x={8 + pos.x * 11 + 6}
                y={8 + pos.y * 11 + 6}
                width={21}
                height={21}
                rx={1}
                fill="#1a1a2e"
              />
            </g>
          ))}
        </svg>
      </div>
      <p
        style={{
          fontSize: "0.7rem",
          color: "#6b7280",
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        स्कैन करें · {upiId}
      </p>
    </div>
  );
}

// ─── MAP VIEW (OpenStreetMap iframe embed) ────────────────────────────────────
function MapView({ shops, lang }) {
  const center = shops[0] || { lat: 27.553, lng: 78.041 };
  const markers = shops
    .map(
      (s) =>
        `${s.lat},${s.lng},${encodeURIComponent(lang === "hi" ? s.nameHi : s.nameEn)}`,
    )
    .join("|");
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.01},${center.lat - 0.01},${center.lng + 0.01},${center.lat + 0.01}&layer=mapnik`;

  return (
    <div
      style={{
        margin: "0 0 12px",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        background: "#f0f9f0",
      }}
    >
      <iframe
        title="Village Market Map"
        src={mapUrl}
        width="100%"
        height={220}
        style={{ border: "none", display: "block" }}
        loading="lazy"
      />
      <div style={{ padding: "10px 14px", background: "#fff" }}>
        <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>
          📍{" "}
          {lang === "hi"
            ? `${shops.length} दुकानें इस नक्शे पर`
            : `${shops.length} shops on this map`}
        </p>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 7 }}
        >
          {shops.map((s) => (
            <a
              key={s.id}
              href={`https://www.google.com/maps?q=${s.lat},${s.lng}`}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "0.72rem",
                background: s.isOpen ? "#f0fdf4" : "#f9fafb",
                border: `1px solid ${s.isOpen ? "#86efac" : "#e5e7eb"}`,
                borderRadius: 20,
                padding: "3px 10px",
                textDecoration: "none",
                color: s.isOpen ? "#15803d" : "#9ca3af",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span>{s.emoji}</span>
              {lang === "hi" ? s.nameHi : s.nameEn}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADD SHOP MODAL ───────────────────────────────────────────────────────────
function AddShopModal({ lang, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    owner: "",
    phone: "",
    upi: "",
    cat: "grocery",
    timingHi: "",
    timingEn: "",
    offer: "",
    hasDelivery: false,
  });
  const l = (h, e) => (lang === "hi" ? h : e);
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name || !form.owner || !form.phone) return;
    onAdd({
      id: Date.now(),
      cat: form.cat,
      isOpen: true,
      isOwner: false,
      nameHi: form.name,
      nameEn: form.name,
      ownerHi: form.owner,
      ownerEn: form.owner,
      phone: form.phone,
      upi: form.upi,
      offersHi: form.offer || "—",
      offersEn: form.offer || "—",
      deliveryHi: form.hasDelivery ? "डिलीवरी उपलब्ध" : "डिलीवरी नहीं",
      deliveryEn: form.hasDelivery ? "Delivery available" : "No delivery",
      hasDelivery: form.hasDelivery,
      timingHi: form.timingHi || "—",
      timingEn: form.timingEn || form.timingHi || "—",
      announcementHi: "",
      announcementEn: "",
      rating: 0,
      ratingCount: 0,
      reviews: [],
      products: [],
      photos: ["🏪"],
      lat: 27.553 + (Math.random() - 0.5) * 0.02,
      lng: 78.041 + (Math.random() - 0.5) * 0.02,
      addressHi: "नया पता",
      addressEn: "New address",
      emoji: "🏪",
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "20px 18px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <span
            style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e" }}
          >
            🏪 {l("नई दुकान जोड़ें", "Register Your Shop")}
          </span>
          <button onClick={onClose} style={closeBtn}>
            ✕
          </button>
        </div>

        {[
          {
            label: l("दुकान का नाम *", "Shop Name *"),
            key: "name",
            ph: l("जैसे: राम किराना स्टोर", "e.g. Ram Kirana Store"),
          },
          {
            label: l("दुकानदार का नाम *", "Owner Name *"),
            key: "owner",
            ph: l("आपका पूरा नाम", "Your full name"),
          },
          {
            label: l("मोबाइल नंबर *", "Mobile Number *"),
            key: "phone",
            ph: "9XXXXXXXXX",
            type: "tel",
          },
          { label: "UPI ID", key: "upi", ph: "name@upi" },
          {
            label: l("समय", "Timing"),
            key: "timingHi",
            ph: l("जैसे: सुबह 9 – शाम 6", "e.g. 9 AM – 6 PM"),
          },
          {
            label: l("ऑफर / विशेष", "Offer / Special"),
            key: "offer",
            ph: l("जैसे: 10% छूट", "e.g. 10% off"),
          },
        ].map((f) => (
          <div key={f.key} style={{ marginBottom: 12 }}>
            <label
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#374151",
                display: "block",
                marginBottom: 4,
              }}
            >
              {f.label}
            </label>
            <input
              value={form[f.key]}
              type={f.type || "text"}
              placeholder={f.ph}
              onChange={(e) => up(f.key, e.target.value)}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ marginBottom: 12 }}>
          <label
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#374151",
              display: "block",
              marginBottom: 4,
            }}
          >
            {l("श्रेणी", "Category")}
          </label>
          <select
            value={form.cat}
            onChange={(e) => up("cat", e.target.value)}
            style={inputStyle}
          >
            {CATEGORIES.filter((c) => c.key !== "all").map((c) => (
              <option key={c.key} value={c.key}>
                {c.emoji} {l(c.hi, c.en)}
              </option>
            ))}
          </select>
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={form.hasDelivery}
            onChange={(e) => up("hasDelivery", e.target.checked)}
            style={{ width: 16, height: 16 }}
          />
          <span
            style={{ fontSize: "0.85rem", color: "#374151", fontWeight: 500 }}
          >
            🚴 {l("होम डिलीवरी उपलब्ध है", "Home delivery available")}
          </span>
        </label>

        <button
          onClick={submit}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, #7b5800 0%, #f5a623 100%)",
            color: "#fff",
            fontSize: "0.95rem",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.2px",
          }}
        >
          ✅ {l("दुकान रजिस्टर करें", "Register Shop")}
        </button>
      </div>
    </div>
  );
}

const closeBtn = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  cursor: "pointer",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6b7280",
};
const inputStyle = {
  width: "100%",
  border: "1.5px solid #e5e7eb",
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: "0.88rem",
  fontFamily: "inherit",
  color: "#1a1a2e",
  background: "#fafafa",
  outline: "none",
  boxSizing: "border-box",
};

// ─── SHOP CARD ────────────────────────────────────────────────────────────────
function ShopCard({ shop, lang, expanded, onToggle, onFav, isFav, onToast }) {
  const l = (h, e) => (lang === "hi" ? h : e);
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(5);
  const [reviews, setReviews] = useState(shop.reviews);
  const [showQR, setShowQR] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [localRating, setLocalRating] = useState(shop.rating);
  const [localCount, setLocalCount] = useState(shop.ratingCount);

  const addReview = () => {
    if (!reviewText.trim()) {
      onToast(l("कुछ लिखें पहले", "Please write something"));
      return;
    }
    const newR = {
      name: l("आप", "You"),
      stars: reviewStars,
      text: reviewText,
      time: l("अभी", "Just now"),
    };
    const all = [...reviews, newR];
    setReviews(all);
    const avg = all.reduce((a, r) => a + r.stars, 0) / all.length;
    setLocalRating(Math.round(avg * 10) / 10);
    setLocalCount(localCount + 1);
    setReviewText("");
    setReviewStars(5);
    onToast(l("समीक्षा जोड़ी गई ✅", "Review added ✅"));
  };

  const copyUPI = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(shop.upi);
    onToast(l("UPI ID कॉपी हो गई!", "UPI ID copied!"));
  };

  const cardBg = shop.isOpen ? "#ffffff" : "#f9fafb";
  const accentColor = shop.isOpen ? "#7b5800" : "#9ca3af";

  return (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${shop.isOpen ? "#e5e7eb" : "#ececec"}`,
        borderRadius: 18,
        overflow: "hidden",
        opacity: shop.isOpen ? 1 : 0.8,
        transition: "box-shadow 0.2s",
        boxShadow: expanded
          ? "0 8px 32px rgba(0,0,0,0.1)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Announcement bar */}
      {shop.announcementHi && (
        <div
          style={{
            background: shop.isOpen ? "#fffbeb" : "#f3f4f6",
            borderBottom: `1px solid ${shop.isOpen ? "#fde68a" : "#e5e7eb"}`,
            padding: "7px 14px",
            fontSize: "0.73rem",
            color: shop.isOpen ? "#92400e" : "#6b7280",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          📢 {l(shop.announcementHi, shop.announcementEn)}
        </div>
      )}

      {/* Header row */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          padding: "14px 14px 12px",
          cursor: "pointer",
        }}
      >
        {/* Icon / photo carousel */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            flexShrink: 0,
            background: shop.isOpen ? "#fff8e7" : "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            border: "1px solid #f3f4f6",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span style={{ fontSize: "1.6rem" }}>
            {shop.photos[photoIdx % shop.photos.length]}
          </span>
          {shop.photos.length > 1 && expanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPhotoIdx((i) => (i + 1) % shop.photos.length);
              }}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "100%",
                background: "rgba(0,0,0,0.35)",
                border: "none",
                color: "#fff",
                fontSize: "0.55rem",
                padding: "2px 0",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              next
            </button>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#1a1a2e",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {l(shop.nameHi, shop.nameEn)}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: 1 }}>
            {l(shop.ownerHi, shop.ownerEn)}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 5,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                flexShrink: 0,
                background: shop.isOpen ? "#22c55e" : "#9ca3af",
                boxShadow: shop.isOpen ? "0 0 0 2px #dcfce7" : "none",
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: shop.isOpen ? "#16a34a" : "#9ca3af",
              }}
            >
              {l(shop.isOpen ? "खुला" : "बंद", shop.isOpen ? "Open" : "Closed")}
            </span>
            <span style={{ fontSize: "0.68rem", color: "#d1d5db" }}>·</span>
            <span style={{ fontSize: "0.68rem", color: "#9ca3af" }}>
              {l(shop.timingHi, shop.timingEn)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 4,
              flexWrap: "wrap",
            }}
          >
            <Stars rating={localRating} size={12} />
            <span
              style={{ fontSize: "0.72rem", fontWeight: 700, color: "#d97706" }}
            >
              {localRating.toFixed(1)}
            </span>
            <span style={{ fontSize: "0.68rem", color: "#9ca3af" }}>
              ({localCount})
            </span>
            {shop.hasDelivery && (
              <span
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #86efac",
                  borderRadius: 20,
                  padding: "1px 8px",
                  fontSize: "0.65rem",
                  color: "#15803d",
                  fontWeight: 600,
                }}
              >
                🚴 {l("डिलीवरी", "Delivery")}
              </span>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFav();
            }}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: `1px solid ${isFav ? "#fecaca" : "#e5e7eb"}`,
              background: isFav ? "#fff5f5" : "#f9fafb",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isFav ? "#ef4444" : "#d1d5db",
              transition: "all 0.15s",
            }}
          >
            ♥
          </button>
          <span
            style={{
              fontSize: "0.85rem",
              color: "#d1d5db",
              transition: "transform 0.25s",
              display: "block",
              transform: expanded ? "rotate(180deg)" : "none",
            }}
          >
            ▾
          </span>
        </div>
      </div>

      {/* Offer strip (collapsed) */}
      {!expanded && shop.offersHi && (
        <div
          style={{
            background: "linear-gradient(90deg,#fffbeb,#fff)",
            borderTop: "1px solid #fef3c7",
            padding: "6px 14px",
            fontSize: "0.75rem",
            color: "#92400e",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          🎁 {l(shop.offersHi, shop.offersEn)}
        </div>
      )}

      {/* Expanded detail */}
      {expanded && (
        <div style={{ borderTop: "1px solid #f3f4f6", background: "#fafafa" }}>
          {/* ── Info rows */}
          <div style={{ padding: "12px 14px 0" }}>
            {[
              { icon: "🎁", text: l(shop.offersHi, shop.offersEn) },
              { icon: "🚴", text: l(shop.deliveryHi, shop.deliveryEn) },
              { icon: "📍", text: l(shop.addressHi, shop.addressEn) },
              { icon: "📞", text: shop.phone },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: "0.95rem", flexShrink: 0 }}>
                  {row.icon}
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "#4b5563",
                    lineHeight: 1.55,
                  }}
                >
                  {row.text}
                </span>
              </div>
            ))}
          </div>

          {/* ── Action buttons */}
          <div style={{ display: "flex", gap: 7, padding: "10px 14px" }}>
            <a
              href={`tel:${shop.phone}`}
              style={{
                ...actionBtn,
                background: "#1a1a2e",
                color: "#fff",
                textDecoration: "none",
                flex: 1,
              }}
            >
              📞 {l("कॉल", "Call")}
            </a>
            <a
              href={`https://wa.me/91${shop.phone}?text=${encodeURIComponent(l("नमस्ते, मुझे ऑर्डर करना है 🙏", "Hello, I want to place an order 🙏"))}`}
              target="_blank"
              rel="noreferrer"
              style={{
                ...actionBtn,
                background: "#25d366",
                color: "#fff",
                textDecoration: "none",
                flex: 1,
              }}
            >
              <WhatsAppIcon /> WhatsApp
            </a>
            {shop.upi && (
              <button
                onClick={() => setShowQR((q) => !q)}
                style={{
                  ...actionBtn,
                  background: "#6d28d9",
                  color: "#fff",
                  flex: 1,
                }}
              >
                🔲 UPI
              </button>
            )}
          </div>

          {/* ── QR panel */}
          {showQR && shop.upi && (
            <div
              style={{
                margin: "0 14px 10px",
                background: "#fff",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#374151",
                  margin: 0,
                }}
              >
                {l("स्कैन करके पेमेंट करें", "Scan to Pay")}
              </p>
              <QRDisplay upiId={shop.upi} />
              <div style={{ display: "flex", gap: 7, width: "100%" }}>
                <button
                  onClick={copyUPI}
                  style={{
                    ...actionBtn,
                    flex: 1,
                    background: "#f3f4f6",
                    color: "#374151",
                    fontSize: "0.75rem",
                  }}
                >
                  📋 {l("UPI कॉपी करें", "Copy UPI")}
                </button>
                <a
                  href={`upi://pay?pa=${shop.upi}&pn=${encodeURIComponent(l(shop.nameHi, shop.nameEn))}`}
                  style={{
                    ...actionBtn,
                    flex: 1,
                    background: "#6d28d9",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "0.75rem",
                  }}
                >
                  ⚡ {l("सीधे पे करें", "Pay Now")}
                </a>
              </div>
            </div>
          )}

          {/* ── Products grid */}
          <div style={{ padding: "0 14px 10px" }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#374151",
                margin: "0 0 7px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              📦 {l("प्रोडक्ट / रेट", "Products & Rates")}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 5,
              }}
            >
              {shop.products.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: p.inStock ? "#fff" : "#f9fafb",
                    border: `1px solid ${p.inStock ? "#e5e7eb" : "#f3f4f6"}`,
                    borderRadius: 10,
                    padding: "7px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    opacity: p.inStock ? 1 : 0.55,
                  }}
                >
                  <span style={{ fontSize: "0.72rem", color: "#374151" }}>
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: p.inStock ? "#7b5800" : "#9ca3af",
                    }}
                  >
                    {p.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Map button */}
          <div style={{ padding: "0 14px 10px" }}>
            <a
              href={`https://www.google.com/maps?q=${shop.lat},${shop.lng}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#f0fdf4",
                border: "1px solid #86efac",
                borderRadius: 10,
                padding: "9px 12px",
                textDecoration: "none",
                color: "#15803d",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              📍 {l("Google Maps पर देखें", "Open in Google Maps")}
              <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>→</span>
            </a>
          </div>

          {/* ── Reviews */}
          <div
            style={{
              padding: "0 14px 14px",
              borderTop: "1px solid #f3f4f6",
              paddingTop: 12,
              marginTop: 4,
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#374151",
                margin: "0 0 9px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              ⭐ {l("समीक्षाएं", "Reviews")} ({localCount})
            </p>
            {reviews.map((rv, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #f3f4f6",
                  borderRadius: 10,
                  padding: "8px 10px",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#1a1a2e",
                    }}
                  >
                    {rv.name}
                  </span>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Stars rating={rv.stars} size={11} />
                    <span style={{ fontSize: "0.65rem", color: "#9ca3af" }}>
                      {rv.time}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.77rem",
                    color: "#4b5563",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {rv.text}
                </p>
              </div>
            ))}
            {reviews.length === 0 && (
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#9ca3af",
                  textAlign: "center",
                  padding: "8px 0",
                }}
              >
                {l("पहली समीक्षा लिखें!", "Be the first to review!")}
              </p>
            )}

            {/* Write review */}
            <div
              style={{
                marginTop: 10,
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: "10px 12px",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#374151",
                  margin: "0 0 7px",
                }}
              >
                {l("समीक्षा लिखें", "Write a Review")}
              </p>
              <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setReviewStars(s)}
                    style={{
                      fontSize: "1.2rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      color: s <= reviewStars ? "#f59e0b" : "#d1d5db",
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 7 }}>
                <input
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={l("आपका अनुभव...", "Your experience...")}
                  style={{
                    ...inputStyle,
                    flex: 1,
                    padding: "8px 10px",
                    fontSize: "0.8rem",
                  }}
                />
                <button
                  onClick={addReview}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    border: "none",
                    background: "#7b5800",
                    color: "#fff",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  {l("पोस्ट", "Post")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const actionBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
  padding: "10px 8px",
  borderRadius: 11,
  border: "none",
  fontSize: "0.8rem",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "inherit",
  lineHeight: 1,
};

function WhatsAppIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── OFFERS PAGE ──────────────────────────────────────────────────────────────
function OffersPage({ shops, lang }) {
  const l = (h, e) => (lang === "hi" ? h : e);
  return (
    <div style={{ padding: "12px 14px 80px" }}>
      <p
        style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "#9ca3af",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        🏷️ {l("आज के ऑफर", "Today's Offers")}
      </p>
      {shops
        .filter((s) => s.isOpen)
        .map((shop) => (
          <div
            key={shop.id}
            style={{
              background: "#fff",
              border: "1px solid #fef3c7",
              borderRadius: 14,
              padding: "12px 14px",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>
              {shop.emoji}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#1a1a2e",
                }}
              >
                {l(shop.nameHi, shop.nameEn)}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "#92400e",
                  marginTop: 3,
                  fontWeight: 500,
                }}
              >
                🎁 {l(shop.offersHi, shop.offersEn)}
              </div>
              {shop.announcementHi && (
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#b45309",
                    marginTop: 3,
                  }}
                >
                  📢 {l(shop.announcementHi, shop.announcementEn)}
                </div>
              )}
            </div>
            <a
              href={`tel:${shop.phone}`}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                background: "#7b5800",
                color: "#fff",
                fontSize: "0.72rem",
                fontWeight: 700,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              {l("कॉल", "Call")}
            </a>
          </div>
        ))}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MarketPage() {
  const lang = "hi"; // hook into your LanguageContext here
  const l = (h, e) => (lang === "hi" ? h : e);

  const [shops, setShops] = useState(INITIAL_SHOPS);
  const [favIds, setFavIds] = useState([3]);
  const [expandedId, setExpandedId] = useState(null);
  const [activeCat, setActiveCat] = useState("all");
  const [activeSort, setActiveSort] = useState("open");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("market");
  const [showMap, setShowMap] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [onlyDelivery, setOnlyDelivery] = useState(false);
  const [toast, setToast] = useState({ msg: "", visible: false });
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      2200,
    );
  }, []);

  const ownerShop = shops.find((s) => s.isOwner);

  const getFiltered = () => {
    let list = [...shops];
    const q = search.toLowerCase();
    if (q)
      list = list.filter(
        (s) =>
          l(s.nameHi, s.nameEn).toLowerCase().includes(q) ||
          s.products.some((p) => p.name.toLowerCase().includes(q)),
      );
    if (activeCat !== "all") list = list.filter((s) => s.cat === activeCat);
    if (activeTab === "fav") list = list.filter((s) => favIds.includes(s.id));
    if (onlyOpen) list = list.filter((s) => s.isOpen);
    if (onlyDelivery) list = list.filter((s) => s.hasDelivery);
    if (activeSort === "open") list.sort((a, b) => b.isOpen - a.isOpen);
    else if (activeSort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (activeSort === "delivery")
      list.sort((a, b) => b.hasDelivery - a.hasDelivery);
    else if (activeSort === "az")
      list.sort((a, b) =>
        l(a.nameHi, a.nameEn).localeCompare(l(b.nameHi, b.nameEn)),
      );
    return list;
  };

  const filtered = getFiltered();
  const openCount = shops.filter((s) => s.isOpen).length;

  const toggleOwner = () => {
    setShops((prev) =>
      prev.map((s) => (s.isOwner ? { ...s, isOpen: !s.isOpen } : s)),
    );
    const now = !ownerShop?.isOpen;
    showToast(
      l(
        now ? "दुकान खोल दी ✅" : "दुकान बंद की 🔴",
        now ? "Shop opened ✅" : "Shop closed 🔴",
      ),
    );
  };

  const addShop = (shop) => {
    setShops((prev) => [...prev, shop]);
    setShowAdd(false);
    showToast(l("दुकान जोड़ी गई! ✅", "Shop added! ✅"));
  };

  const tabStyle = (key) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    padding: "8px 0 10px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    fontFamily: "inherit",
    color: activeTab === key ? "#7b5800" : "#9ca3af",
    fontSize: "0.6rem",
    fontWeight: activeTab === key ? 700 : 500,
    transition: "color 0.15s",
    position: "relative",
  });

  const tabIconStyle = (key) => ({
    fontSize: "1.25rem",
    lineHeight: 1,
    filter: activeTab === key ? "none" : "grayscale(1) opacity(0.5)",
  });

  return (
    <div
      style={{
        background: "#f8f7f4",
        minHeight: "100vh",
        maxWidth: 430,
        margin: "0 auto",
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      {/* ── HERO ── */}
      <div
        style={{
          background:
            "linear-gradient(140deg, #3b2000 0%, #7b5800 50%, #f5a623 100%)",
          padding: "20px 16px 16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -20,
            top: -20,
            fontSize: 110,
            opacity: 0.07,
            userSelect: "none",
          }}
        >
          🛒
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.3px",
              }}
            >
              {l("गाँव का बाज़ार", "Village Market")}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.75)",
                marginTop: 2,
              }}
            >
              {l(
                `${openCount} दुकानें अभी खुली हैं`,
                `${openCount} shops open right now`,
              )}
            </div>
          </div>
          <button
            onClick={() => setShowMap((m) => !m)}
            style={{
              background: showMap ? "#fff" : "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 10,
              padding: "7px 12px",
              color: showMap ? "#7b5800" : "#fff",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {showMap ? "📋 " + l("लिस्ट", "List") : "🗺 " + l("नक्शा", "Map")}
          </button>
        </div>

        {/* Stat pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {[
            { label: l("खुली", "Open"), val: openCount, color: "#22c55e" },
            {
              label: l("कुल", "Total"),
              val: shops.length,
              color: "rgba(255,255,255,0.8)",
            },
            {
              label: l("डिलीवरी", "Delivery"),
              val: shops.filter((s) => s.hasDelivery).length,
              color: "#86efac",
            },
          ].map((st, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.14)",
                borderRadius: 10,
                padding: "6px 12px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                {st.val}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.7)",
                  marginTop: 1,
                }}
              >
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div style={{ padding: "12px 14px 0", display: "flex", gap: 8 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: 12,
            padding: "0 13px",
            height: 44,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <span style={{ fontSize: "1rem", color: "#9ca3af" }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={l(
              "दुकान या प्रोडक्ट खोजें...",
              "Search shops or products...",
            )}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "0.88rem",
              background: "transparent",
              fontFamily: "inherit",
              color: "#1a1a2e",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#9ca3af",
                fontSize: "1rem",
              }}
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={() => setFilterOpen((f) => !f)}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            border: "1.5px solid #e5e7eb",
            background: filterOpen ? "#7b5800" : "#fff",
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: filterOpen ? "#fff" : "#374151",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          ⚙️
        </button>
      </div>

      {/* ── FILTER PANEL ── */}
      {filterOpen && (
        <div
          style={{
            margin: "10px 14px 0",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "12px",
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#374151",
              marginBottom: 9,
              textTransform: "uppercase",
              letterSpacing: "0.4px",
            }}
          >
            फ़िल्टर
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              {
                label: l("✅ खुले ही दिखाएं", "✅ Open Only"),
                val: onlyOpen,
                set: setOnlyOpen,
              },
              {
                label: l("🚴 डिलीवरी वाले", "🚴 With Delivery"),
                val: onlyDelivery,
                set: setOnlyDelivery,
              },
            ].map((f, i) => (
              <label
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={f.val}
                  onChange={(e) => f.set(e.target.checked)}
                  style={{
                    width: 15,
                    height: 15,
                    accentColor: "#7b5800",
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: "0.82rem", color: "#374151" }}>
                  {f.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── CATEGORY CHIPS ── */}
      <div
        style={{
          overflowX: "auto",
          padding: "10px 14px 4px",
          scrollbarWidth: "none",
        }}
      >
        <div style={{ display: "flex", gap: 7, width: "max-content" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCat(c.key)}
              style={{
                padding: "7px 14px",
                borderRadius: 22,
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                background: activeCat === c.key ? "#7b5800" : "#fff",
                color: activeCat === c.key ? "#fff" : "#6b7280",
                border: `1.5px solid ${activeCat === c.key ? "#7b5800" : "#e5e7eb"}`,
                transition: "all 0.15s",
              }}
            >
              {c.emoji} {l(c.hi, c.en)}
            </button>
          ))}
        </div>
      </div>

      {/* ── SORT ROW ── */}
      <div
        style={{
          overflowX: "auto",
          padding: "4px 14px 8px",
          scrollbarWidth: "none",
        }}
      >
        <div style={{ display: "flex", gap: 6, width: "max-content" }}>
          {SORT_OPTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSort(s.key)}
              style={{
                padding: "5px 13px",
                borderRadius: 20,
                fontSize: "0.72rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                border: "1px solid",
                background: activeSort === s.key ? "#fff8e7" : "transparent",
                borderColor: activeSort === s.key ? "#f5a623" : "#e5e7eb",
                color: activeSort === s.key ? "#7b5800" : "#9ca3af",
                transition: "all 0.15s",
              }}
            >
              {l(s.hi, s.en)}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ padding: "0 14px 80px" }}>
        {/* Owner banner */}
        {ownerShop && activeTab === "market" && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #fef3c7",
              borderRadius: 14,
              padding: "11px 13px",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>👑</span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#1a1a2e",
                }}
              >
                {l("आपकी दुकान", "Your Shop")} —{" "}
                {l(ownerShop.nameHi, ownerShop.nameEn)}
              </div>
              <div
                style={{ fontSize: "0.72rem", color: "#92400e", marginTop: 1 }}
              >
                {l("खोलें या बंद करें", "Toggle open / close")}
              </div>
            </div>
            <button
              onClick={toggleOwner}
              style={{
                width: 48,
                height: 26,
                borderRadius: 13,
                border: "none",
                background: ownerShop.isOpen ? "#22c55e" : "#d1d5db",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 3,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  background: "#fff",
                  transition: "left 0.2s",
                  left: ownerShop.isOpen ? 25 : 3,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              />
            </button>
          </div>
        )}

        {/* Offers tab */}
        {activeTab === "offers" && <OffersPage shops={shops} lang={lang} />}

        {/* Map view */}
        {showMap && activeTab !== "offers" && (
          <MapView shops={filtered} lang={lang} />
        )}

        {/* Shop list */}
        {activeTab !== "offers" && (
          <>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#9ca3af",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {l(`${filtered.length} दुकानें`, `${filtered.length} shops`)}
            </p>
            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 20px",
                  color: "#9ca3af",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🏪</div>
                <p style={{ fontSize: "0.88rem" }}>
                  {l("कोई दुकान नहीं मिली", "No shops found")}
                </p>
                <p style={{ fontSize: "0.75rem", marginTop: 4 }}>
                  {l("खोज बदलकर देखें", "Try a different search")}
                </p>
              </div>
            ) : (
              filtered.map((shop) => (
                <div key={shop.id} style={{ marginBottom: 10 }}>
                  <ShopCard
                    shop={shop}
                    lang={lang}
                    expanded={expandedId === shop.id}
                    onToggle={() =>
                      setExpandedId(expandedId === shop.id ? null : shop.id)
                    }
                    isFav={favIds.includes(shop.id)}
                    onFav={() => {
                      const has = favIds.includes(shop.id);
                      setFavIds(
                        has
                          ? favIds.filter((x) => x !== shop.id)
                          : [...favIds, shop.id],
                      );
                      showToast(
                        l(
                          has ? "पसंदीदा से हटाया" : "पसंदीदा में जोड़ा ❤️",
                          has
                            ? "Removed from favorites"
                            : "Added to favorites ❤️",
                        ),
                      );
                    }}
                    onToast={showToast}
                  />
                </div>
              ))
            )}

            {/* Add shop CTA */}
            <button
              onClick={() => setShowAdd(true)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 14,
                border: "2px dashed #e5e7eb",
                background: "#fafafa",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                marginTop: 4,
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>➕</span>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#374151",
                }}
              >
                {l("अपनी दुकान जोड़ें", "Add Your Shop")}
              </span>
              <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                {l("बिल्कुल मुफ्त · 2 मिनट में", "Completely free · 2 minutes")}
              </span>
            </button>
          </>
        )}
      </div>

      {/* ── TAB BAR ── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          background: "rgba(255,255,255,0.97)",
          borderTop: "1px solid #f3f4f6",
          display: "flex",
          backdropFilter: "blur(12px)",
          zIndex: 100,
        }}
      >
        {[
          { key: "market", icon: "🏪", hi: "बाज़ार", en: "Market" },
          { key: "fav", icon: "❤️", hi: "पसंदीदा", en: "Saved" },
          { key: "offers", icon: "🏷️", hi: "ऑफर्स", en: "Offers" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={tabStyle(t.key)}
          >
            <span style={tabIconStyle(t.key)}>{t.icon}</span>
            {l(t.hi, t.en)}
          </button>
        ))}
        <button onClick={() => setShowAdd(true)} style={tabStyle("add")}>
          <span style={{ fontSize: "1.25rem" }}>➕</span>
          {l("जोड़ें", "Add")}
        </button>
      </div>

      {/* ── MODALS & OVERLAYS ── */}
      {showAdd && (
        <AddShopModal
          lang={lang}
          onClose={() => setShowAdd(false)}
          onAdd={addShop}
        />
      )}
      <Toast msg={toast.msg} visible={toast.visible} />
    </div>
  );
}
