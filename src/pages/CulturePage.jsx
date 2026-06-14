import React, { useState, useEffect, useRef } from "react";

// ─── MOCK CONTEXT (replace with your real imports) ───────────────────────────
const useLanguage = () => ({ language: "hi" });
const ROLES = {
  SECRETARY: "secretary",
  PLAYER: "player",
  ORGANIZER: "organizer",
};
const useAuth = () => ({
  currentUser: {
    name: "अमित शर्मा",
    nameEn: "Amit Sharma",
    role: ROLES.SECRETARY,
    id: "u1",
  },
});
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════ DATA ═══════════════════
const SPORT_TYPES = [
  { id: "all", icon: "🏅", hi: "सभी", en: "All" },
  { id: "cricket", icon: "🏏", hi: "क्रिकेट", en: "Cricket" },
  { id: "kabaddi", icon: "🤼", hi: "कबड्डी", en: "Kabaddi" },
  { id: "kushti", icon: "🤼‍♂️", hi: "कुश्ती", en: "Wrestling" },
  { id: "kho", icon: "🏃", hi: "खो-खो", en: "Kho-Kho" },
  { id: "volleyball", icon: "🏐", hi: "वॉलीबॉल", en: "Volleyball" },
];

const INIT_TOURNAMENTS = [
  {
    id: "t1",
    sport: "kushti",
    status: "open",
    titleHi: "सालाना महा-दंगल 2026",
    titleEn: "Annual Mega Wrestling 2026",
    organizerHi: "रामपुर स्पोर्ट्स क्लब",
    organizerEn: "Rampur Sports Club",
    date: "2026-06-25",
    venueHi: "पंचायत भवन मैदान",
    venueEn: "Panchayat Ground",
    feeHi: "निशुल्क",
    feeEn: "Free",
    maxPlayers: 32,
    prize: { first: 5000, second: 2000, third: 1000 },
    registrations: [
      {
        id: "u2",
        name: "रामवीर सिंह",
        nameEn: "Ramveer Singh",
        time: Date.now() - 86400000,
      },
      {
        id: "u3",
        name: "संदीप यादव",
        nameEn: "Sandeep Yadav",
        time: Date.now() - 43200000,
      },
    ],
    rules:
      "• 2 बाउट प्रत्येक मैच में\n• निर्णय पंच का अंतिम होगा\n• वजन वर्ग: 65kg, 75kg, 85kg+",
    deadline: "2026-06-23",
    scores: [],
  },
  {
    id: "t2",
    sport: "cricket",
    status: "open",
    titleHi: "रामपुर प्रीमियर लीग",
    titleEn: "Rampur Premier League",
    organizerHi: "युवा एकता ग्रुप",
    organizerEn: "Youth Unity Group",
    date: "2026-07-02",
    venueHi: "सरकारी स्कूल मैदान",
    venueEn: "Govt School Ground",
    feeHi: "₹200 प्रति टीम",
    feeEn: "₹200/Team",
    maxPlayers: 8,
    prize: { first: 10000, second: 5000, third: 2000 },
    registrations: [],
    rules: "• T-20 फॉर्मेट\n• 8 टीमें\n• फाइनल 10 जुलाई को",
    deadline: "2026-06-28",
    scores: [
      {
        team1: "रामपुर XI",
        team2: "हाथरस किंग्स",
        score1: "145/6",
        score2: "142/8",
        result: "रामपुर जीता",
      },
    ],
  },
  {
    id: "t3",
    sport: "kabaddi",
    status: "completed",
    titleHi: "कबड्डी महाकुंभ 2026",
    titleEn: "Kabaddi Mahakumbh 2026",
    organizerHi: "ग्राम सभा",
    organizerEn: "Gram Sabha",
    date: "2026-05-15",
    venueHi: "गाँव का अखाड़ा",
    venueEn: "Village Akhara",
    feeHi: "₹100",
    feeEn: "₹100",
    maxPlayers: 16,
    prize: { first: 7000, second: 3000, third: 1500 },
    registrations: [
      {
        id: "u4",
        name: "सुरेश पाल",
        nameEn: "Suresh Pal",
        time: Date.now() - 200000000,
      },
      {
        id: "u5",
        name: "मोहन लाल",
        nameEn: "Mohan Lal",
        time: Date.now() - 190000000,
      },
      {
        id: "u6",
        name: "विक्रम सिंह",
        nameEn: "Vikram Singh",
        time: Date.now() - 180000000,
      },
    ],
    rules: "",
    deadline: "2026-05-13",
    winner: { nameHi: "रामपुर टाइगर्स", nameEn: "Rampur Tigers" },
    scores: [],
  },
];

const INIT_PLAYERS = [
  {
    id: "u2",
    name: "रामवीर सिंह",
    nameEn: "Ramveer Singh",
    sport: "kushti",
    wins: 12,
    matches: 15,
    badge: "🥇",
    points: 1200,
  },
  {
    id: "u5",
    name: "मोहन लाल",
    nameEn: "Mohan Lal",
    sport: "kabaddi",
    wins: 9,
    matches: 12,
    badge: "🥈",
    points: 900,
  },
  {
    id: "u3",
    name: "संदीप यादव",
    nameEn: "Sandeep Yadav",
    sport: "cricket",
    wins: 7,
    matches: 10,
    badge: "🥉",
    points: 700,
  },
  {
    id: "u4",
    name: "सुरेश पाल",
    nameEn: "Suresh Pal",
    sport: "kushti",
    wins: 6,
    matches: 11,
    badge: "⭐",
    points: 600,
  },
  {
    id: "u6",
    name: "विक्रम सिंह",
    nameEn: "Vikram Singh",
    sport: "kho",
    wins: 5,
    matches: 8,
    badge: "⭐",
    points: 500,
  },
];

const INIT_GALLERY = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600",
    captionHi: "कुश्ती दंगल का शानदार पल",
    captionEn: "Epic moment from Wrestling Dangal",
    user: "अमित शर्मा",
    userId: "u1",
    likes: [],
    comments: [],
    time: Date.now() - 7200000,
    tournament: "t1",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=600",
    captionHi: "क्रिकेट मैच की शुरुआत",
    captionEn: "Cricket match begins",
    user: "राहुल सिंह",
    userId: "u7",
    likes: ["u1", "u2"],
    comments: [{ user: "मोहन", text: "वाह क्या शॉट था!" }],
    time: Date.now() - 86400000,
    tournament: "t2",
  },
];

const CULTURAL_EVENTS = [
  {
    id: "e1",
    icon: "🎊",
    hi: "रक्षाबंधन मेला",
    en: "Rakshabandhan Fair",
    date: "9 Aug 2026",
    venueHi: "मुख्य चौक",
    venueEn: "Main Chowk",
    descHi: "पारंपरिक मेला, झूले, मिठाई और सांस्कृतिक कार्यक्रम",
    descEn: "Traditional fair with rides, sweets and cultural programs",
  },
  {
    id: "e2",
    icon: "🏮",
    hi: "दिवाली सांस्कृतिक संध्या",
    en: "Diwali Cultural Evening",
    date: "20 Oct 2026",
    venueHi: "ग्राम पंचायत भवन",
    venueEn: "Gram Panchayat Hall",
    descHi: "नृत्य, संगीत और दीप प्रज्वलन",
    descEn: "Dance, music and lamp lighting ceremony",
  },
  {
    id: "e3",
    icon: "🌾",
    hi: "फसल उत्सव",
    en: "Harvest Festival",
    date: "12 Nov 2026",
    venueHi: "मुख्य मैदान",
    venueEn: "Main Ground",
    descHi: "किसान सम्मान और लोक संगीत",
    descEn: "Farmer felicitation and folk music",
  },
];

// ═══════════════════ HELPERS ═══════════════════
const daysLeft = (dateStr) => {
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / 86400000));
};
const fmtDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const sportIcon = (s) => SPORT_TYPES.find((x) => x.id === s)?.icon || "🏅";

// ═══════════════════ TOAST ═══════════════════
const Toast = ({ toasts }) => (
  <div style={tw.toastWrapper}>
    {toasts.map((t) => (
      <div
        key={t.id}
        style={{
          ...tw.toast,
          background:
            t.type === "success"
              ? "#1DB954"
              : t.type === "error"
                ? "#E8394A"
                : "#F5A623",
        }}
      >
        <span style={{ fontSize: "1.1rem" }}>
          {t.type === "success" ? "✅" : t.type === "error" ? "❌" : "ℹ️"}
        </span>
        <span>{t.msg}</span>
      </div>
    ))}
  </div>
);

// ═══════════════════ COUNTDOWN ═══════════════════
const Countdown = ({ deadline, language }) => {
  const d = daysLeft(deadline);
  if (d === 0)
    return (
      <span style={{ color: "#E8394A", fontWeight: 700, fontSize: "0.75rem" }}>
        {language === "hi" ? "⏰ आज अंतिम दिन!" : "⏰ Last day!"}
      </span>
    );
  return (
    <span style={{ color: "#F5A623", fontWeight: 700, fontSize: "0.75rem" }}>
      {language === "hi" ? `⏳ ${d} दिन बाकी` : `⏳ ${d} days left`}
    </span>
  );
};

// ═══════════════════ BADGE ═══════════════════
const StatusBadge = ({ status, language }) => {
  const map = {
    open: {
      bg: "#D1FAE5",
      color: "#065F46",
      hi: "🟢 रजिस्ट्रेशन खुला",
      en: "🟢 Open",
    },
    full: { bg: "#FEE2E2", color: "#991B1B", hi: "🔴 भर गया", en: "🔴 Full" },
    completed: {
      bg: "#E0E7FF",
      color: "#3730A3",
      hi: "✅ समाप्त",
      en: "✅ Ended",
    },
  };
  const s = map[status] || map.open;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: "0.7rem",
        fontWeight: 700,
      }}
    >
      {language === "hi" ? s.hi : s.en}
    </span>
  );
};

// ═══════════════════ TOURNAMENT CARD ═══════════════════
const TournamentCard = ({
  t,
  language,
  currentUser,
  onApply,
  onWithdraw,
  onScore,
  isSecretary,
}) => {
  const [expanded, setExpanded] = useState(false);
  const isRegistered = t.registrations.some((r) => r.id === currentUser.id);
  const isFull = t.registrations.length >= t.maxPlayers;
  const [scoreInput, setScoreInput] = useState({
    team1: "",
    team2: "",
    score1: "",
    score2: "",
    result: "",
  });
  const [showScoreForm, setShowScoreForm] = useState(false);

  const shareText =
    language === "hi"
      ? `🏆 ${t.titleHi}\n📅 ${fmtDate(t.date)}\n📍 ${t.venueHi}\nभाग लें और जीतें!`
      : `🏆 ${t.titleEn}\n📅 ${fmtDate(t.date)}\n📍 ${t.venueEn}\nJoin & Win!`;

  const handleShare = () => {
    if (navigator.share)
      navigator.share({
        title: language === "hi" ? t.titleHi : t.titleEn,
        text: shareText,
      });
    else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div style={tw.gameCard}>
      {/* ── top row ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <div style={tw.sportPill}>
          <span>{sportIcon(t.sport)}</span>
          <span
            style={{ fontSize: "0.7rem", fontWeight: 700, color: "#F5A623" }}
          >
            {language === "hi"
              ? SPORT_TYPES.find((s) => s.id === t.sport)?.hi
              : SPORT_TYPES.find((s) => s.id === t.sport)?.en}
          </span>
        </div>
        <StatusBadge
          status={
            t.winner
              ? "completed"
              : t.registrations.length >= t.maxPlayers
                ? "full"
                : "open"
          }
          language={language}
        />
      </div>

      {/* ── title ── */}
      <h4 style={tw.gameTitle}>{language === "hi" ? t.titleHi : t.titleEn}</h4>

      {/* ── info grid ── */}
      <div style={tw.infoGrid}>
        <div style={tw.infoItem}>
          <span style={tw.infoIcon}>📅</span>
          {fmtDate(t.date)}
        </div>
        <div style={tw.infoItem}>
          <span style={tw.infoIcon}>📍</span>
          {language === "hi" ? t.venueHi : t.venueEn}
        </div>
        <div style={tw.infoItem}>
          <span style={tw.infoIcon}>👤</span>
          {language === "hi" ? t.organizerHi : t.organizerEn}
        </div>
        <div style={tw.infoItem}>
          <span style={tw.infoIcon}>💰</span>
          {language === "hi" ? t.feeHi : t.feeEn}
        </div>
      </div>

      {/* ── prize row ── */}
      <div style={tw.prizeRow}>
        <div style={tw.prizeChip}>
          <span>🥇</span> ₹{t.prize.first.toLocaleString()}
        </div>
        <div style={tw.prizeChip}>
          <span>🥈</span> ₹{t.prize.second.toLocaleString()}
        </div>
        <div style={tw.prizeChip}>
          <span>🥉</span> ₹{t.prize.third.toLocaleString()}
        </div>
      </div>

      {/* ── players bar ── */}
      <div style={tw.playerBar}>
        <div style={{ flex: 1 }}>
          <div style={tw.playerBarLabel}>
            <span style={{ fontWeight: 700, color: "#1DB954" }}>
              {t.registrations.length}
            </span>
            <span style={{ color: "#6B7280" }}>
              /{t.maxPlayers} {language === "hi" ? "खिलाड़ी" : "Players"}
            </span>
          </div>
          <div style={tw.progressOuter}>
            <div
              style={{
                ...tw.progressInner,
                width: `${Math.min(100, (t.registrations.length / t.maxPlayers) * 100)}%`,
              }}
            />
          </div>
        </div>
        <Countdown deadline={t.deadline} language={language} />
      </div>

      {/* ── expand: rules + players list ── */}
      <button onClick={() => setExpanded(!expanded)} style={tw.expandBtn}>
        {expanded
          ? language === "hi"
            ? "▲ कम दिखाएं"
            : "▲ Less"
          : language === "hi"
            ? "▼ विवरण देखें"
            : "▼ Details"}
      </button>

      {expanded && (
        <div style={tw.expandPanel}>
          {t.rules && (
            <div style={tw.rulesBox}>
              <div style={tw.rulesTitle}>
                {language === "hi" ? "📋 नियम" : "📋 Rules"}
              </div>
              <pre style={tw.rulesText}>{t.rules}</pre>
            </div>
          )}
          {t.registrations.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={tw.rulesTitle}>
                {language === "hi"
                  ? "👥 रजिस्टर्ड खिलाड़ी"
                  : "👥 Registered Players"}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginTop: 6,
                }}
              >
                {t.registrations.map((r) => (
                  <span key={r.id} style={tw.playerTag}>
                    {language === "hi" ? r.name : r.nameEn}
                  </span>
                ))}
              </div>
            </div>
          )}
          {t.winner && (
            <div style={tw.winnerBox}>
              🏆{" "}
              {language === "hi"
                ? `विजेता: ${t.winner.nameHi}`
                : `Winner: ${t.winner.nameEn}`}
            </div>
          )}
          {t.scores.map((s, i) => (
            <div key={i} style={tw.scoreBox}>
              <span style={{ fontWeight: 700 }}>{s.team1}</span> {s.score1} vs{" "}
              {s.score2} <span style={{ fontWeight: 700 }}>{s.team2}</span>
              <br />
              <span style={{ color: "#1DB954", fontSize: "0.8rem" }}>
                ✅ {s.result}
              </span>
            </div>
          ))}
          {/* Secretary can add scores */}
          {isSecretary && t.status !== "completed" && (
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => setShowScoreForm(!showScoreForm)}
                style={tw.miniBtn}
              >
                {language === "hi" ? "📝 स्कोर जोड़ें" : "📝 Add Score"}
              </button>
              {showScoreForm && (
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {["team1", "team2", "score1", "score2", "result"].map((f) => (
                    <input
                      key={f}
                      placeholder={f}
                      value={scoreInput[f]}
                      onChange={(e) =>
                        setScoreInput({ ...scoreInput, [f]: e.target.value })
                      }
                      style={tw.miniInput}
                    />
                  ))}
                  <button
                    onClick={() => {
                      onScore(t.id, scoreInput);
                      setShowScoreForm(false);
                      setScoreInput({
                        team1: "",
                        team2: "",
                        score1: "",
                        score2: "",
                        result: "",
                      });
                    }}
                    style={tw.miniBtn}
                  >
                    {language === "hi" ? "सेव करें" : "Save"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── action buttons ── */}
      {t.status !== "completed" && !t.winner && (
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {isRegistered ? (
            <button onClick={() => onWithdraw(t.id)} style={tw.withdrawBtn}>
              {language === "hi"
                ? "✅ रजिस्टर्ड — वापस लें"
                : "✅ Registered — Withdraw"}
            </button>
          ) : (
            <button
              onClick={() => onApply(t.id)}
              disabled={isFull}
              style={isFull ? tw.disabledBtn : tw.applyBtn}
            >
              {isFull
                ? language === "hi"
                  ? "🔴 भर गया"
                  : "🔴 Full"
                : language === "hi"
                  ? "✋ भाग लें"
                  : "✋ Register"}
            </button>
          )}
          <button onClick={handleShare} style={tw.shareBtn}>
            📤
          </button>
        </div>
      )}
    </div>
  );
};

// ═══════════════════ ADMIN FORM ═══════════════════
const AdminForm = ({ language, currentUser, onPublish }) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    venue: "",
    fee: "",
    sport: "cricket",
    maxPlayers: "16",
    prize1: "",
    prize2: "",
    prize3: "",
    rules: "",
    deadline: "",
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = () => {
    if (!form.title || !form.date) return;
    onPublish({
      id: Date.now().toString(),
      sport: form.sport,
      status: "open",
      titleHi: form.title,
      titleEn: form.title,
      organizerHi: currentUser.name,
      organizerEn: currentUser.nameEn,
      date: form.date,
      venueHi: form.venue,
      venueEn: form.venue,
      feeHi: form.fee || "फ्री",
      feeEn: form.fee || "Free",
      maxPlayers: parseInt(form.maxPlayers) || 16,
      prize: {
        first: parseInt(form.prize1) || 0,
        second: parseInt(form.prize2) || 0,
        third: parseInt(form.prize3) || 0,
      },
      registrations: [],
      rules: form.rules,
      deadline: form.deadline || form.date,
      scores: [],
    });
    setForm({
      title: "",
      date: "",
      venue: "",
      fee: "",
      sport: "cricket",
      maxPlayers: "16",
      prize1: "",
      prize2: "",
      prize3: "",
      rules: "",
      deadline: "",
    });
  };

  return (
    <div style={tw.adminCard}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <span style={tw.adminBadge}>ADMIN</span>
        <span style={tw.adminTitle}>
          {language === "hi"
            ? "📝 नई प्रतियोगिता बनाएं"
            : "📝 Create Tournament"}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <select value={form.sport} onChange={set("sport")} style={tw.inp}>
          {SPORT_TYPES.filter((s) => s.id !== "all").map((s) => (
            <option key={s.id} value={s.id}>
              {s.icon} {language === "hi" ? s.hi : s.en}
            </option>
          ))}
        </select>
        <input
          placeholder={
            language === "hi" ? "प्रतियोगिता का नाम *" : "Tournament Name *"
          }
          value={form.title}
          onChange={set("title")}
          style={tw.inp}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="date"
            placeholder="Date"
            value={form.date}
            onChange={set("date")}
            style={{ ...tw.inp, flex: 1 }}
          />
          <input
            type="date"
            placeholder={language === "hi" ? "अंतिम तिथि" : "Deadline"}
            value={form.deadline}
            onChange={set("deadline")}
            style={{ ...tw.inp, flex: 1 }}
          />
        </div>
        <input
          placeholder={language === "hi" ? "स्थान (वेन्यू)" : "Venue"}
          value={form.venue}
          onChange={set("venue")}
          style={tw.inp}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder={language === "hi" ? "फीस (₹ या फ्री)" : "Entry Fee"}
            value={form.fee}
            onChange={set("fee")}
            style={{ ...tw.inp, flex: 1 }}
          />
          <input
            type="number"
            placeholder={language === "hi" ? "Max खिलाड़ी" : "Max Players"}
            value={form.maxPlayers}
            onChange={set("maxPlayers")}
            style={{ ...tw.inp, flex: 1 }}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="number"
            placeholder="🥇 ₹"
            value={form.prize1}
            onChange={set("prize1")}
            style={{ ...tw.inp, flex: 1 }}
          />
          <input
            type="number"
            placeholder="🥈 ₹"
            value={form.prize2}
            onChange={set("prize2")}
            style={{ ...tw.inp, flex: 1 }}
          />
          <input
            type="number"
            placeholder="🥉 ₹"
            value={form.prize3}
            onChange={set("prize3")}
            style={{ ...tw.inp, flex: 1 }}
          />
        </div>
        <textarea
          placeholder={
            language === "hi" ? "नियम (optional)" : "Rules (optional)"
          }
          value={form.rules}
          onChange={set("rules")}
          rows={3}
          style={{ ...tw.inp, resize: "vertical" }}
        />
        <button onClick={handleSubmit} style={tw.publishBtn}>
          {language === "hi" ? "🚀 लाइव करें" : "🚀 Publish"}
        </button>
      </div>
    </div>
  );
};

// ═══════════════════ LEADERBOARD ═══════════════════
const Leaderboard = ({ language }) => {
  const [players] = useState(INIT_PLAYERS);
  const sportLabels = {
    kushti: { hi: "कुश्ती", en: "Wrestling" },
    kabaddi: { hi: "कबड्डी", en: "Kabaddi" },
    cricket: { hi: "क्रिकेट", en: "Cricket" },
    kho: { hi: "खो-खो", en: "Kho-Kho" },
  };

  return (
    <div style={{ padding: "0 0 8px" }}>
      <div style={tw.sectionHead}>
        {language === "hi" ? "🏆 खिलाड़ी रैंकिंग" : "🏆 Player Rankings"}
      </div>
      {players.map((p, i) => (
        <div
          key={p.id}
          style={{
            ...tw.lbRow,
            background: i === 0 ? "#FFFBEB" : i === 1 ? "#F8FAFC" : "#fff",
            borderLeft:
              i === 0
                ? "4px solid #F5A623"
                : i === 1
                  ? "4px solid #9CA3AF"
                  : i === 2
                    ? "4px solid #CD7C2B"
                    : "4px solid #E5E7EB",
          }}
        >
          <span style={tw.lbRank}>#{i + 1}</span>
          <div style={tw.lbAvatar}>{p.badge}</div>
          <div style={{ flex: 1 }}>
            <div style={tw.lbName}>{language === "hi" ? p.name : p.nameEn}</div>
            <div style={tw.lbSport}>
              {sportLabels[p.sport]?.[language] || p.sport} • {p.wins}W /{" "}
              {p.matches}M
            </div>
          </div>
          <div style={tw.lbPoints}>
            <div
              style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F1923" }}
            >
              {p.points}
            </div>
            <div style={{ fontSize: "0.65rem", color: "#9CA3AF" }}>pts</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════ GALLERY ═══════════════════
const Gallery = ({ language, currentUser }) => {
  const [images, setImages] = useState(INIT_GALLERY);
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});
  const fileRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const caption = prompt(
      language === "hi" ? "फोटो का विवरण लिखें:" : "Add a caption:",
    );
    setImages([
      {
        id: Date.now().toString(),
        url,
        captionHi: caption || "",
        captionEn: caption || "",
        user: currentUser.name,
        userId: currentUser.id,
        likes: [],
        comments: [],
        time: Date.now(),
        tournament: null,
      },
      ...images,
    ]);
  };

  const toggleLike = (id) => {
    setImages((prev) =>
      prev.map((img) => {
        if (img.id !== id) return img;
        const liked = img.likes.includes(currentUser.id);
        return {
          ...img,
          likes: liked
            ? img.likes.filter((x) => x !== currentUser.id)
            : [...img.likes, currentUser.id],
        };
      }),
    );
  };

  const addComment = (id) => {
    const text = commentInputs[id];
    if (!text?.trim()) return;
    setImages((prev) =>
      prev.map((img) =>
        img.id !== id
          ? img
          : {
              ...img,
              comments: [...img.comments, { user: currentUser.name, text }],
            },
      ),
    );
    setCommentInputs({ ...commentInputs, [id]: "" });
  };

  const deletePhoto = (id) => {
    setImages((prev) =>
      prev.filter((img) => !(img.id === id && img.userId === currentUser.id)),
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={tw.sectionHead}>
          {language === "hi" ? "📸 गाँव की गैलरी" : "📸 Village Gallery"}
        </div>
        <button onClick={() => fileRef.current.click()} style={tw.uploadBtn2}>
          {language === "hi" ? "✨ फोटो जोड़ें" : "✨ Add Photo"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {images.map((img) => {
          const liked = img.likes.includes(currentUser.id);
          const isOwn = img.userId === currentUser.id;
          const timeAgo = Math.round((Date.now() - img.time) / 3600000);
          return (
            <div key={img.id} style={tw.instaCard}>
              <div style={tw.instaHeader}>
                <div style={tw.instaAvatar}>{img.user[0]}</div>
                <div>
                  <div style={tw.instaUser}>{img.user}</div>
                  <div style={tw.instaTime}>
                    {timeAgo < 1
                      ? language === "hi"
                        ? "अभी"
                        : "Just now"
                      : `${timeAgo}h`}
                  </div>
                </div>
                {isOwn && (
                  <button
                    onClick={() => deletePhoto(img.id)}
                    style={tw.deleteBtn}
                  >
                    🗑️
                  </button>
                )}
              </div>
              <img src={img.url} alt="" style={tw.instaImg} />
              <div style={tw.instaCaption}>
                {language === "hi" ? img.captionHi : img.captionEn}
              </div>
              <div style={tw.instaActions}>
                <button
                  onClick={() => toggleLike(img.id)}
                  style={{
                    ...tw.likeBtn2,
                    color: liked ? "#E8394A" : "#6B7280",
                  }}
                >
                  {liked ? "❤️" : "🤍"} {img.likes.length}
                </button>
                <button
                  onClick={() =>
                    setShowComments({
                      ...showComments,
                      [img.id]: !showComments[img.id],
                    })
                  }
                  style={tw.commentToggle}
                >
                  💬 {img.comments.length}
                </button>
              </div>
              {showComments[img.id] && (
                <div style={tw.commentSection}>
                  {img.comments.map((c, i) => (
                    <div key={i} style={tw.commentRow}>
                      <span style={tw.commentUser}>{c.user}:</span> {c.text}
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <input
                      placeholder={
                        language === "hi" ? "टिप्पणी करें..." : "Add comment..."
                      }
                      value={commentInputs[img.id] || ""}
                      onChange={(e) =>
                        setCommentInputs({
                          ...commentInputs,
                          [img.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) => e.key === "Enter" && addComment(img.id)}
                      style={tw.commentInput}
                    />
                    <button
                      onClick={() => addComment(img.id)}
                      style={tw.sendBtn}
                    >
                      ➤
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════ EVENTS ═══════════════════
const Events = ({ language }) => (
  <div>
    <div style={tw.sectionHead}>
      {language === "hi" ? "🎊 सांस्कृतिक कार्यक्रम" : "🎊 Cultural Events"}
    </div>
    {CULTURAL_EVENTS.map((ev) => (
      <div key={ev.id} style={tw.eventCard}>
        <div style={tw.eventIcon}>{ev.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={tw.eventTitle}>{language === "hi" ? ev.hi : ev.en}</div>
          <div style={tw.eventDate}>
            📅 {ev.date} &nbsp; 📍 {language === "hi" ? ev.venueHi : ev.venueEn}
          </div>
          <div style={tw.eventDesc}>
            {language === "hi" ? ev.descHi : ev.descEn}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ═══════════════════ LIVE TICKER ═══════════════════
const LiveTicker = ({ language }) => {
  const scores = [
    language === "hi"
      ? "🏏 रामपुर XI vs हाथरस किंग्स — 145/6 vs 142/8 | रामपुर जीता!"
      : "🏏 Rampur XI vs Hathras Kings — 145/6 vs 142/8 | Rampur Won!",
    language === "hi"
      ? "🤼 दंगल: रामवीर ने सुरेश को हराया — फाइनल में!"
      : "🤼 Dangal: Ramveer beats Suresh — Into Final!",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % scores.length), 4000);
    return () => clearInterval(t);
  }, [language]);
  return (
    <div style={tw.ticker}>
      <span style={tw.tickerLive}>🔴 LIVE</span>
      <span style={tw.tickerText}>{scores[idx]}</span>
    </div>
  );
};

// ═══════════════════ MAIN PAGE ═══════════════════
export default function CulturePage() {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const isSecretary = [ROLES.SECRETARY, "organizer"].includes(currentUser.role);

  const [tournaments, setTournaments] = useState(INIT_TOURNAMENTS);
  const [sportFilter, setSportFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("tournaments");
  const [toasts, setToasts] = useState([]);

  const toast = (msg, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3000,
    );
  };

  const handleApply = (id) => {
    setTournaments((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        if (t.registrations.some((r) => r.id === currentUser.id)) {
          toast(
            language === "hi"
              ? "पहले से रजिस्टर्ड हैं!"
              : "Already registered!",
            "error",
          );
          return t;
        }
        if (t.registrations.length >= t.maxPlayers) {
          toast(
            language === "hi" ? "प्रतियोगिता भर गई है!" : "Tournament is full!",
            "error",
          );
          return t;
        }
        return {
          ...t,
          registrations: [
            ...t.registrations,
            {
              id: currentUser.id,
              name: currentUser.name,
              nameEn: currentUser.nameEn,
              time: Date.now(),
            },
          ],
        };
      }),
    );
    toast(
      language === "hi" ? "🎉 रजिस्ट्रेशन सफल!" : "🎉 Registration Successful!",
    );
  };

  const handleWithdraw = (id) => {
    setTournaments((prev) =>
      prev.map((t) =>
        t.id !== id
          ? t
          : {
              ...t,
              registrations: t.registrations.filter(
                (r) => r.id !== currentUser.id,
              ),
            },
      ),
    );
    toast(
      language === "hi" ? "नाम वापस लिया गया" : "Registration withdrawn",
      "info",
    );
  };

  const handlePublish = (newT) => {
    setTournaments((prev) => [newT, ...prev]);
    toast(
      language === "hi"
        ? "🚀 प्रतियोगिता लाइव हो गई!"
        : "🚀 Tournament Published!",
    );
  };

  const handleScore = (id, score) => {
    setTournaments((prev) =>
      prev.map((t) =>
        t.id !== id ? t : { ...t, scores: [...(t.scores || []), score] },
      ),
    );
    toast(language === "hi" ? "स्कोर जोड़ा गया ✅" : "Score added ✅");
  };

  const filtered = tournaments.filter(
    (t) => sportFilter === "all" || t.sport === sportFilter,
  );

  const TABS = [
    { id: "tournaments", hi: "🏅 टूर्नामेंट", en: "🏅 Tournaments" },
    { id: "leaderboard", hi: "📊 रैंकिंग", en: "📊 Rankings" },
    { id: "gallery", hi: "📸 गैलरी", en: "📸 Gallery" },
    { id: "events", hi: "🎊 कार्यक्रम", en: "🎊 Events" },
  ];

  return (
    <div style={tw.page}>
      <Toast toasts={toasts} />

      {/* ── HERO ── */}
      <div style={tw.hero}>
        <div style={tw.heroContent}>
          <div style={tw.heroEye}>
            {language === "hi" ? "खेल & संस्कृति" : "Sports & Culture"}
          </div>
          <div style={tw.heroTitle}>
            {language === "hi" ? "रामपुर खेल मैदान" : "Rampur Sports Arena"}
          </div>
          <div style={tw.heroSub}>
            {language === "hi"
              ? "दंगल · क्रिकेट · कबड्डी · गाँव की गैलरी"
              : "Dangal · Cricket · Kabaddi · Village Gallery"}
          </div>
          <div style={tw.heroStats}>
            <div style={tw.heroStat}>
              <span style={tw.heroStatNum}>
                {tournaments.filter((t) => !t.winner).length}
              </span>
              <span style={tw.heroStatLabel}>
                {language === "hi" ? "Active" : "Active"}
              </span>
            </div>
            <div style={tw.heroStatDiv} />
            <div style={tw.heroStat}>
              <span style={tw.heroStatNum}>
                {tournaments.reduce((a, t) => a + t.registrations.length, 0)}
              </span>
              <span style={tw.heroStatLabel}>
                {language === "hi" ? "खिलाड़ी" : "Players"}
              </span>
            </div>
            <div style={tw.heroStatDiv} />
            <div style={tw.heroStat}>
              <span style={tw.heroStatNum}>
                ₹
                {(
                  tournaments.reduce((a, t) => a + t.prize.first, 0) / 1000
                ).toFixed(0)}
                k
              </span>
              <span style={tw.heroStatLabel}>
                {language === "hi" ? "इनाम" : "Prizes"}
              </span>
            </div>
          </div>
        </div>
        <div style={tw.heroBg}>🏆</div>
      </div>

      {/* ── LIVE TICKER ── */}
      <LiveTicker language={language} />

      {/* ── TAB BAR ── */}
      <div style={tw.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ ...tw.tab, ...(activeTab === tab.id ? tw.tabActive : {}) }}
          >
            {language === "hi" ? tab.hi : tab.en}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 14px 80px" }}>
        {/* ── TOURNAMENTS TAB ── */}
        {activeTab === "tournaments" && (
          <>
            {isSecretary && (
              <AdminForm
                language={language}
                currentUser={currentUser}
                onPublish={handlePublish}
              />
            )}

            {/* Sport filter pills */}
            <div style={tw.filterRow}>
              {SPORT_TYPES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSportFilter(s.id)}
                  style={{
                    ...tw.filterPill,
                    ...(sportFilter === s.id ? tw.filterPillActive : {}),
                  }}
                >
                  {s.icon} {language === "hi" ? s.hi : s.en}
                </button>
              ))}
            </div>

            {/* Count */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <span style={tw.countLabel}>
                {filtered.length}{" "}
                {language === "hi" ? "प्रतियोगिताएं" : "Tournaments"}
              </span>
            </div>

            {filtered.length === 0 ? (
              <div style={tw.emptyState}>
                <div style={{ fontSize: "2.5rem" }}>🏟️</div>
                <div
                  style={{ fontWeight: 700, color: "#374151", marginTop: 8 }}
                >
                  {language === "hi"
                    ? "कोई प्रतियोगिता नहीं"
                    : "No tournaments yet"}
                </div>
                <div style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>
                  {language === "hi"
                    ? "जल्द ही नई प्रतियोगिता आएगी"
                    : "New tournaments coming soon"}
                </div>
              </div>
            ) : (
              filtered.map((t) => (
                <TournamentCard
                  key={t.id}
                  t={t}
                  language={language}
                  currentUser={currentUser}
                  onApply={handleApply}
                  onWithdraw={handleWithdraw}
                  onScore={handleScore}
                  isSecretary={isSecretary}
                />
              ))
            )}
          </>
        )}

        {activeTab === "leaderboard" && <Leaderboard language={language} />}
        {activeTab === "gallery" && (
          <Gallery language={language} currentUser={currentUser} />
        )}
        {activeTab === "events" && <Events language={language} />}
      </div>
    </div>
  );
}

// ═══════════════════ STYLES ═══════════════════
const tw = {
  page: {
    background: "#F3F4F6",
    minHeight: "100vh",
    fontFamily: "system-ui,-apple-system,sans-serif",
    position: "relative",
  },
  // TOAST
  toastWrapper: {
    position: "fixed",
    top: 16,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "90%",
    maxWidth: 360,
    pointerEvents: "none",
  },
  toast: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    borderRadius: 12,
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.88rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  // HERO
  hero: {
    background: "#0F1923",
    padding: "24px 16px 20px",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: { position: "relative", zIndex: 1 },
  heroEye: {
    fontSize: "0.7rem",
    fontWeight: 800,
    color: "#F5A623",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: "1.6rem",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1.1,
    marginBottom: 4,
  },
  heroSub: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.55)",
    marginBottom: 16,
  },
  heroStats: { display: "flex", alignItems: "center", gap: 16 },
  heroStat: { display: "flex", flexDirection: "column", alignItems: "center" },
  heroStatNum: { fontSize: "1.3rem", fontWeight: 900, color: "#F5A623" },
  heroStatLabel: {
    fontSize: "0.65rem",
    color: "rgba(255,255,255,0.5)",
    marginTop: 2,
  },
  heroStatDiv: { width: 1, height: 32, background: "rgba(255,255,255,0.15)" },
  heroBg: {
    position: "absolute",
    right: -10,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "6rem",
    opacity: 0.06,
  },
  // TICKER
  ticker: {
    background: "#0F1923",
    padding: "8px 14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    overflow: "hidden",
  },
  tickerLive: {
    background: "#E8394A",
    color: "#fff",
    fontSize: "0.6rem",
    fontWeight: 900,
    padding: "2px 6px",
    borderRadius: 4,
    flexShrink: 0,
    letterSpacing: "0.08em",
  },
  tickerText: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.85)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  // TABS
  tabBar: {
    display: "flex",
    background: "#fff",
    borderBottom: "1px solid #E5E7EB",
    overflowX: "auto",
  },
  tab: {
    flex: 1,
    padding: "12px 4px",
    border: "none",
    background: "transparent",
    fontSize: "0.72rem",
    color: "#9CA3AF",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    borderBottom: "2px solid transparent",
    fontFamily: "inherit",
  },
  tabActive: {
    color: "#0F1923",
    borderBottom: "2px solid #F5A623",
    fontWeight: 800,
  },
  // ADMIN
  adminCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    border: "1px solid #E5E7EB",
  },
  adminBadge: {
    background: "#EEF2FF",
    color: "#4338CA",
    fontSize: "0.6rem",
    fontWeight: 900,
    padding: "3px 8px",
    borderRadius: 6,
    letterSpacing: "0.08em",
  },
  adminTitle: { fontSize: "1rem", fontWeight: 800, color: "#0F1923" },
  inp: {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #E5E7EB",
    borderRadius: 10,
    fontSize: "0.88rem",
    background: "#F9FAFB",
    boxSizing: "border-box",
    fontFamily: "inherit",
    outline: "none",
  },
  publishBtn: {
    background: "#0F1923",
    color: "#F5A623",
    border: "none",
    padding: "13px",
    borderRadius: 12,
    fontWeight: 800,
    fontSize: "0.95rem",
    cursor: "pointer",
    width: "100%",
    fontFamily: "inherit",
  },
  // FILTERS
  filterRow: {
    display: "flex",
    gap: 6,
    overflowX: "auto",
    marginBottom: 14,
    paddingBottom: 4,
  },
  filterPill: {
    padding: "6px 12px",
    border: "1.5px solid #E5E7EB",
    borderRadius: 20,
    background: "#fff",
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    color: "#6B7280",
    fontFamily: "inherit",
  },
  filterPillActive: {
    background: "#0F1923",
    color: "#F5A623",
    borderColor: "#0F1923",
  },
  countLabel: { fontSize: "0.82rem", color: "#9CA3AF", fontWeight: 600 },
  // GAME CARD
  gameCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    border: "1px solid #E5E7EB",
  },
  sportPill: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    background: "#0F1923",
    padding: "4px 10px",
    borderRadius: 20,
  },
  gameTitle: {
    fontSize: "1.05rem",
    fontWeight: 800,
    color: "#0F1923",
    margin: "12px 0 10px",
    lineHeight: 1.3,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "6px 12px",
    marginBottom: 12,
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: "0.78rem",
    color: "#4B5563",
  },
  infoIcon: { fontSize: "0.9rem" },
  prizeRow: { display: "flex", gap: 6, marginBottom: 12 },
  prizeChip: {
    flex: 1,
    background: "#FFFBEB",
    border: "1px solid #FDE68A",
    borderRadius: 8,
    padding: "6px 4px",
    textAlign: "center",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#92400E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  playerBar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
    background: "#F9FAFB",
    padding: "10px 12px",
    borderRadius: 10,
  },
  playerBarLabel: { fontSize: "0.78rem", marginBottom: 5 },
  progressOuter: { height: 5, background: "#E5E7EB", borderRadius: 99 },
  progressInner: {
    height: 5,
    background: "#1DB954",
    borderRadius: 99,
    transition: "width 0.4s",
  },
  expandBtn: {
    background: "none",
    border: "none",
    color: "#9CA3AF",
    fontSize: "0.75rem",
    cursor: "pointer",
    padding: "4px 0",
    fontFamily: "inherit",
  },
  expandPanel: { borderTop: "1px solid #F3F4F6", marginTop: 8, paddingTop: 12 },
  rulesBox: { background: "#F8FAFC", borderRadius: 8, padding: "10px 12px" },
  rulesTitle: {
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#374151",
    marginBottom: 6,
  },
  rulesText: {
    fontSize: "0.78rem",
    color: "#6B7280",
    margin: 0,
    whiteSpace: "pre-wrap",
    fontFamily: "inherit",
  },
  playerTag: {
    background: "#EFF6FF",
    color: "#1D4ED8",
    fontSize: "0.72rem",
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 20,
  },
  winnerBox: {
    background: "#FFFBEB",
    border: "1px solid #FDE68A",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#92400E",
    marginTop: 10,
  },
  scoreBox: {
    background: "#F0FDF4",
    border: "1px solid #BBF7D0",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: "0.8rem",
    marginTop: 8,
  },
  miniBtn: {
    background: "#F3F4F6",
    border: "1px solid #E5E7EB",
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  miniInput: {
    padding: "6px 10px",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    fontSize: "0.8rem",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  applyBtn: {
    flex: 1,
    background: "#F5A623",
    color: "#0F1923",
    border: "none",
    padding: "12px",
    borderRadius: 12,
    fontWeight: 800,
    fontSize: "0.9rem",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  withdrawBtn: {
    flex: 1,
    background: "#F0FDF4",
    color: "#15803D",
    border: "1.5px solid #BBF7D0",
    padding: "12px",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: "0.85rem",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  disabledBtn: {
    flex: 1,
    background: "#F3F4F6",
    color: "#9CA3AF",
    border: "none",
    padding: "12px",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: "0.85rem",
    cursor: "not-allowed",
    fontFamily: "inherit",
  },
  shareBtn: {
    background: "#F3F4F6",
    border: "none",
    padding: "12px 14px",
    borderRadius: 12,
    fontSize: "1rem",
    cursor: "pointer",
  },
  // LEADERBOARD
  sectionHead: {
    fontSize: "1.05rem",
    fontWeight: 800,
    color: "#0F1923",
    marginBottom: 14,
  },
  lbRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#fff",
    borderRadius: 12,
    padding: "12px 14px",
    marginBottom: 8,
    border: "1px solid #F3F4F6",
  },
  lbRank: {
    fontSize: "0.8rem",
    fontWeight: 800,
    color: "#9CA3AF",
    width: 22,
    flexShrink: 0,
  },
  lbAvatar: { fontSize: "1.4rem", width: 36, textAlign: "center" },
  lbName: { fontSize: "0.9rem", fontWeight: 700, color: "#111827" },
  lbSport: { fontSize: "0.72rem", color: "#9CA3AF", marginTop: 2 },
  lbPoints: { textAlign: "right" },
  // GALLERY
  uploadBtn2: {
    background: "#0F1923",
    color: "#F5A623",
    border: "none",
    padding: "8px 14px",
    borderRadius: 20,
    fontSize: "0.78rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  instaCard: {
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid #E5E7EB",
  },
  instaHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 14px",
  },
  instaAvatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#0F1923",
    color: "#F5A623",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "0.9rem",
    flexShrink: 0,
  },
  instaUser: { fontSize: "0.85rem", fontWeight: 700, color: "#111827" },
  instaTime: { fontSize: "0.68rem", color: "#9CA3AF" },
  deleteBtn: {
    marginLeft: "auto",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  instaImg: {
    width: "100%",
    aspectRatio: "4/3",
    objectFit: "cover",
    display: "block",
  },
  instaCaption: {
    padding: "10px 14px 6px",
    fontSize: "0.82rem",
    color: "#374151",
  },
  instaActions: { display: "flex", gap: 10, padding: "6px 14px 12px" },
  likeBtn2: {
    background: "none",
    border: "none",
    fontSize: "0.88rem",
    cursor: "pointer",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontFamily: "inherit",
  },
  commentToggle: {
    background: "none",
    border: "none",
    fontSize: "0.88rem",
    cursor: "pointer",
    fontWeight: 600,
    color: "#6B7280",
    fontFamily: "inherit",
  },
  commentSection: { borderTop: "1px solid #F3F4F6", padding: "10px 14px 14px" },
  commentRow: { fontSize: "0.8rem", color: "#374151", marginBottom: 4 },
  commentUser: { fontWeight: 700, color: "#111827" },
  commentInput: {
    flex: 1,
    padding: "8px 12px",
    border: "1.5px solid #E5E7EB",
    borderRadius: 20,
    fontSize: "0.82rem",
    fontFamily: "inherit",
    outline: "none",
  },
  sendBtn: {
    background: "#0F1923",
    color: "#F5A623",
    border: "none",
    width: 36,
    height: 36,
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: "0.85rem",
  },
  // EVENTS
  eventCard: {
    display: "flex",
    gap: 14,
    background: "#fff",
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 12,
    border: "1px solid #E5E7EB",
  },
  eventIcon: { fontSize: "2rem", flexShrink: 0 },
  eventTitle: {
    fontSize: "0.95rem",
    fontWeight: 800,
    color: "#111827",
    marginBottom: 4,
  },
  eventDate: { fontSize: "0.75rem", color: "#6B7280", marginBottom: 4 },
  eventDesc: { fontSize: "0.78rem", color: "#9CA3AF", lineHeight: 1.5 },
  // EMPTY
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    background: "#fff",
    borderRadius: 16,
  },
};
