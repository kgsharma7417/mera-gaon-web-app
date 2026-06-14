import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const TABS = ["check", "helplines", "tips"];

const QUIZ_QUESTIONS = [
  {
    qHi: "पिछले 2 हफ्तों में आप कितनी बार उदास या निराश महसूस करते हैं?",
    qEn: "In the last 2 weeks, how often have you felt sad or hopeless?",
    options: [
      { hi: "बिल्कुल नहीं", en: "Not at all", score: 0 },
      { hi: "कभी-कभी", en: "Sometimes", score: 1 },
      { hi: "अधिकतर दिन", en: "Most days", score: 2 },
      { hi: "हर रोज़", en: "Every day", score: 3 },
    ],
  },
  {
    qHi: "क्या आपको नींद में परेशानी होती है?",
    qEn: "Do you have trouble sleeping?",
    options: [
      { hi: "नहीं, ठीक से सोता/सोती हूं", en: "No, I sleep fine", score: 0 },
      { hi: "कभी-कभी नींद नहीं आती", en: "Sometimes can't sleep", score: 1 },
      { hi: "अक्सर नींद नहीं आती", en: "Often can't sleep", score: 2 },
      { hi: "रोज़ नींद की समस्या है", en: "Sleep problem every day", score: 3 },
    ],
  },
  {
    qHi: "क्या आप अपनी रोज़मर्रा की गतिविधियों में रुचि खो चुके हैं?",
    qEn: "Have you lost interest in your daily activities?",
    options: [
      { hi: "नहीं, सब ठीक है", en: "No, all fine", score: 0 },
      { hi: "थोड़ी कम रुचि है", en: "Slightly less interest", score: 1 },
      { hi: "काफ़ी कम रुचि है", en: "Much less interest", score: 2 },
      { hi: "कोई रुचि नहीं बची", en: "No interest left", score: 3 },
    ],
  },
  {
    qHi: "क्या आप बहुत थका हुआ महसूस करते हैं?",
    qEn: "Do you feel very tired or low on energy?",
    options: [
      { hi: "नहीं", en: "No", score: 0 },
      { hi: "कभी-कभी", en: "Sometimes", score: 1 },
      { hi: "अक्सर", en: "Often", score: 2 },
      { hi: "हर समय", en: "All the time", score: 3 },
    ],
  },
  {
    qHi: "क्या आपको चिंता या घबराहट होती है?",
    qEn: "Do you feel anxious or worried?",
    options: [
      { hi: "नहीं", en: "No", score: 0 },
      { hi: "हल्की सी", en: "Mildly", score: 1 },
      { hi: "काफ़ी ज़्यादा", en: "Quite a lot", score: 2 },
      { hi: "बहुत ज़्यादा, हर वक़्त", en: "Very much, all the time", score: 3 },
    ],
  },
];

const HELPLINES = [
  {
    nameHi: "iCall — मानसिक स्वास्थ्य",
    nameEn: "iCall Mental Health",
    number: "9152987821",
    descHi: "TISS द्वारा, सोम-शनि 8am–10pm",
    descEn: "By TISS, Mon–Sat 8am–10pm",
    icon: "🧠",
    color: "#e8eaf6",
    border: "#c5cae9",
  },
  {
    nameHi: "Vandrevala Foundation",
    nameEn: "Vandrevala Foundation",
    number: "18602662345",
    descHi: "24×7 निःशुल्क, हिंदी में",
    descEn: "24×7 Free, in Hindi",
    icon: "💙",
    color: "#e3f2fd",
    border: "#bbdefb",
  },
  {
    nameHi: "NIMHANS — बेंगलुरु",
    nameEn: "NIMHANS Bangalore",
    number: "08046110007",
    descHi: "राष्ट्रीय मानसिक स्वास्थ्य",
    descEn: "National Mental Health Institute",
    icon: "🏥",
    color: "#e8f5e9",
    border: "#c8e6c9",
  },
  {
    nameHi: "Snehi India",
    nameEn: "Snehi India",
    number: "044-24640050",
    descHi: "आत्महत्या रोकथाम हेल्पलाइन",
    descEn: "Suicide prevention helpline",
    icon: "🤝",
    color: "#fff3e0",
    border: "#ffe0b2",
  },
];

const TIPS = [
  {
    icon: "🌬️",
    titleHi: "4-7-8 श्वास व्यायाम",
    titleEn: "4-7-8 Breathing",
    stepsHi: [
      "4 सेकंड तक सांस अंदर लें",
      "7 सेकंड तक रोकें",
      "8 सेकंड में धीरे-धीरे छोड़ें",
      "3-4 बार दोहराएं",
    ],
    stepsEn: [
      "Breathe in for 4 seconds",
      "Hold for 7 seconds",
      "Breathe out slowly for 8 seconds",
      "Repeat 3-4 times",
    ],
    color: "#e3f2fd",
    accent: "#1565c0",
  },
  {
    icon: "🧘",
    titleHi: "5-4-3-2-1 ग्राउंडिंग",
    titleEn: "5-4-3-2-1 Grounding",
    stepsHi: [
      "5 चीज़ें देखें",
      "4 चीज़ें छुएं",
      "3 आवाज़ें सुनें",
      "2 चीज़ें सूंघें",
      "1 चीज़ का स्वाद लें",
    ],
    stepsEn: [
      "See 5 things",
      "Touch 4 things",
      "Hear 3 sounds",
      "Smell 2 things",
      "Taste 1 thing",
    ],
    color: "#f3e5f5",
    accent: "#6a1b9a",
  },
  {
    icon: "🚶",
    titleHi: "रोज़ 20 मिनट वॉकिंग",
    titleEn: "20 Min Daily Walk",
    stepsHi: [
      "सुबह या शाम टहलें",
      "प्रकृति में जाएं — खेत, बाग़",
      "फ़ोन बंद करके चलें",
      "गहरी सांसें लेते हुए चलें",
    ],
    stepsEn: [
      "Walk morning or evening",
      "Go in nature — fields, garden",
      "Walk with phone off",
      "Breathe deeply while walking",
    ],
    color: "#e8f5e9",
    accent: "#2e7d32",
  },
  {
    icon: "✍️",
    titleHi: "भावना डायरी",
    titleEn: "Emotion Journal",
    stepsHi: [
      "रोज़ रात 5 मिनट लिखें",
      "आज क्या अच्छा हुआ?",
      "क्या परेशान किया?",
      "कल क्या करना चाहते हैं?",
    ],
    stepsEn: [
      "Write 5 minutes every night",
      "What went well today?",
      "What troubled you?",
      "What do you want to do tomorrow?",
    ],
    color: "#fff8e1",
    accent: "#f57f17",
  },
];

function getResult(score, language) {
  if (score <= 4)
    return {
      levelHi: "अच्छा",
      levelEn: "Good",
      msgHi: "आपकी मानसिक स्थिति ठीक लग रही है। अपना ख़याल रखें।",
      msgEn: "Your mental health seems good. Keep taking care of yourself.",
      color: "#e8f5e9",
      accent: "#2e7d32",
      emoji: "😊",
    };
  if (score <= 9)
    return {
      levelHi: "सामान्य तनाव",
      levelEn: "Mild Stress",
      msgHi:
        "कुछ तनाव है। नीचे दिए टिप्स आज़माएं और ज़रूरत पड़ने पर हेल्पलाइन कॉल करें।",
      msgEn:
        "Some stress detected. Try the tips below and call helpline if needed.",
      color: "#fff8e1",
      accent: "#f57f17",
      emoji: "😐",
    };
  return {
    levelHi: "ध्यान देने की ज़रूरत",
    levelEn: "Needs Attention",
    msgHi: "आपको किसी से बात करनी चाहिए। नीचे दिए हेल्पलाइन नंबर पर कॉल करें।",
    msgEn:
      "You should talk to someone. Please call the helpline numbers below.",
    color: "#fce4ec",
    accent: "#c62828",
    emoji: "😔",
  };
}

export default function MentalHealthPage({ onBack }) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("check");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizDone, setQuizDone] = useState(false);

  const t = (hi, en) => (language === "hi" ? hi : en);
  const totalScore = answers.reduce((a, b) => a + b, 0);

  const tabLabels = {
    check: { hi: "🧪 मूड चेक", en: "🧪 Mood Check" },
    helplines: { hi: "📞 हेल्पलाइन", en: "📞 Helplines" },
    tips: { hi: "🌿 राहत टिप्स", en: "🌿 Relief Tips" },
  };

  const handleAnswer = (score) => {
    const updated = [...answers, score];
    setAnswers(updated);
    if (currentQ + 1 >= QUIZ_QUESTIONS.length) {
      setQuizDone(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setAnswers([]);
    setQuizDone(false);
  };

  const result = getResult(totalScore, language);

  return (
    <div className="page page-enter">
      {/* Header */}
      <div
        style={{
          ...mh.header,
          background: "linear-gradient(135deg,#c62828,#ef5350)",
        }}
      >
        <button onClick={onBack} style={mh.backBtn}>
          ← {t("वापस", "Back")}
        </button>
        <span style={mh.headerTitle}>
          🧠 {t("मानसिक स्वास्थ्य", "Mental Health")}
        </span>
        <span />
      </div>

      {/* Privacy note */}
      <div style={mh.privacyNote}>
        🔒{" "}
        {t(
          "यह जानकारी पूरी तरह निजी है। कहीं save नहीं होती।",
          "This info is completely private. Nothing is saved.",
        )}
      </div>

      {/* Tabs */}
      <div style={mh.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...mh.tab,
              background: activeTab === tab ? "#c62828" : "transparent",
              color: activeTab === tab ? "#fff" : "var(--text-muted)",
              fontWeight: activeTab === tab ? 700 : 400,
            }}
          >
            {tabLabels[tab][language]}
          </button>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        {/* ── MOOD CHECK TAB ── */}
        {activeTab === "check" && (
          <>
            {!quizDone ? (
              <>
                {/* Progress */}
                <div style={mh.quizProgress}>
                  <div style={mh.progressText}>
                    {t(
                      `प्रश्न ${currentQ + 1} / ${QUIZ_QUESTIONS.length}`,
                      `Question ${currentQ + 1} / ${QUIZ_QUESTIONS.length}`,
                    )}
                  </div>
                  <div style={mh.progressTrack}>
                    <div
                      style={{
                        ...mh.progressFill,
                        width: `${(currentQ / QUIZ_QUESTIONS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div style={mh.questionCard}>
                  <div style={mh.questionText}>
                    {t(
                      QUIZ_QUESTIONS[currentQ].qHi,
                      QUIZ_QUESTIONS[currentQ].qEn,
                    )}
                  </div>
                </div>

                {/* Options */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {QUIZ_QUESTIONS[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt.score)}
                      style={mh.optionBtn}
                    >
                      <span style={mh.optionNumber}>{i + 1}</span>
                      {t(opt.hi, opt.en)}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Result */
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div
                  style={{
                    ...mh.resultCard,
                    background: result.color,
                    border: `2px solid ${result.accent}`,
                  }}
                >
                  <div style={mh.resultEmoji}>{result.emoji}</div>
                  <div style={{ ...mh.resultLevel, color: result.accent }}>
                    {t(result.levelHi, result.levelEn)}
                  </div>
                  <div style={mh.resultMsg}>
                    {t(result.msgHi, result.msgEn)}
                  </div>
                  <div style={{ ...mh.resultScore, color: result.accent }}>
                    {t(`स्कोर: ${totalScore}/15`, `Score: ${totalScore}/15`)}
                  </div>
                </div>

                <button onClick={resetQuiz} style={mh.retakeBtn}>
                  {t("फिर से करें", "Retake Quiz")}
                </button>

                {totalScore >= 5 && (
                  <div style={mh.helpCTA}>
                    {t("किसी से बात करें:", "Talk to someone:")}
                    <a href="tel:9152987821" style={mh.helpNum}>
                      📞 iCall: 9152987821
                    </a>
                    <a href="tel:18602662345" style={mh.helpNum}>
                      📞 Vandrevala: 18602662345
                    </a>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ── HELPLINES TAB ── */}
        {activeTab === "helplines" && (
          <>
            <div style={mh.helpNote}>
              💬{" "}
              {t(
                "ये सब हेल्पलाइन नंबर पूरी तरह गुप्त और निःशुल्क हैं।",
                "All helpline numbers are completely confidential and free.",
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {HELPLINES.map((h, i) => (
                <a
                  key={i}
                  href={`tel:${h.number}`}
                  style={{
                    ...mh.helpCard,
                    background: h.color,
                    borderColor: h.border,
                  }}
                >
                  <div style={mh.helpLeft}>
                    <span style={mh.helpIcon}>{h.icon}</span>
                    <div>
                      <div style={mh.helpName}>{t(h.nameHi, h.nameEn)}</div>
                      <div style={mh.helpNum2}>{h.number}</div>
                      <div style={mh.helpDesc}>{t(h.descHi, h.descEn)}</div>
                    </div>
                  </div>
                  <div style={mh.callBtn}>📞</div>
                </a>
              ))}
            </div>
          </>
        )}

        {/* ── TIPS TAB ── */}
        {activeTab === "tips" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={mh.tipsIntro}>
              🌿{" "}
              {t(
                "इन आसान तकनीकों से तनाव कम होता है — रोज़ आज़माएं।",
                "These simple techniques reduce stress — try them daily.",
              )}
            </div>
            {TIPS.map((tip, i) => (
              <div
                key={i}
                style={{
                  ...mh.tipCard,
                  background: tip.color,
                  borderLeft: `4px solid ${tip.accent}`,
                }}
              >
                <div style={{ ...mh.tipTitle, color: tip.accent }}>
                  {tip.icon} {t(tip.titleHi, tip.titleEn)}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginTop: 8,
                  }}
                >
                  {t(tip.stepsHi, tip.stepsEn).map((step, j) => (
                    <div key={j} style={mh.tipStep}>
                      <span
                        style={{ ...mh.tipStepNum, background: tip.accent }}
                      >
                        {j + 1}
                      </span>
                      <span style={mh.tipStepText}>{step}</span>
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

const mh = {
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
  privacyNote: {
    background: "#fce4ec",
    color: "#880e4f",
    padding: "8px 14px",
    fontSize: "0.75rem",
    fontWeight: 600,
    borderBottom: "1px solid #f8bbd0",
  },
  tabBar: {
    display: "flex",
    gap: 6,
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
    fontSize: "0.75rem",
    fontFamily: "inherit",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  // quiz
  quizProgress: { marginBottom: 14 },
  progressText: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    marginBottom: 6,
    fontWeight: 600,
  },
  progressTrack: {
    height: 6,
    background: "#fce4ec",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#ef5350,#c62828)",
    borderRadius: 10,
    transition: "width 0.3s",
  },
  questionCard: {
    background: "#fff5f5",
    border: "1.5px solid #ffcdd2",
    borderRadius: 14,
    padding: "18px 16px",
    marginBottom: 14,
  },
  questionText: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#333",
    lineHeight: 1.5,
  },
  optionBtn: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: "1.5px solid #e0e0e0",
    background: "#fff",
    textAlign: "left",
    fontSize: "0.9rem",
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: 12,
    transition: "border-color 0.15s",
    color: "#333",
  },
  optionNumber: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#fce4ec",
    color: "#c62828",
    fontWeight: 700,
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  // result
  resultCard: {
    borderRadius: 16,
    padding: "24px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  resultEmoji: { fontSize: "3rem" },
  resultLevel: { fontSize: "1.2rem", fontWeight: 700 },
  resultMsg: { fontSize: "0.85rem", color: "#444", lineHeight: 1.5 },
  resultScore: { fontSize: "0.8rem", fontWeight: 700, marginTop: 4 },
  retakeBtn: {
    padding: "12px",
    borderRadius: 12,
    border: "1.5px solid #ccc",
    background: "#fff",
    fontSize: "0.88rem",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  helpCTA: {
    background: "#fff",
    border: "1.5px solid #c62828",
    borderRadius: 12,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: "0.82rem",
    fontWeight: 600,
    color: "#c62828",
  },
  helpNum: {
    color: "#c62828",
    fontSize: "0.9rem",
    fontWeight: 700,
    textDecoration: "none",
  },
  // helplines
  helpNote: {
    background: "#fce4ec",
    color: "#880e4f",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: "0.78rem",
    fontWeight: 600,
    marginBottom: 12,
    border: "1px solid #f8bbd0",
  },
  helpCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    border: "1.5px solid",
    borderRadius: 12,
    textDecoration: "none",
  },
  helpLeft: { display: "flex", alignItems: "center", gap: 12 },
  helpIcon: { fontSize: "1.8rem" },
  helpName: { fontSize: "0.88rem", fontWeight: 700, color: "#1a1a1a" },
  helpNum2: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#c62828",
    marginTop: 2,
  },
  helpDesc: { fontSize: "0.72rem", color: "#666", marginTop: 2 },
  callBtn: { fontSize: "1.5rem" },
  // tips
  tipsIntro: {
    background: "#f1f8e9",
    color: "#33691e",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: "0.8rem",
    fontWeight: 600,
    border: "1px solid #dcedc8",
  },
  tipCard: { borderRadius: 12, padding: "14px 16px" },
  tipTitle: { fontSize: "0.95rem", fontWeight: 700 },
  tipStep: { display: "flex", alignItems: "flex-start", gap: 10 },
  tipStepNum: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    color: "#fff",
    fontSize: "0.7rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  tipStepText: { fontSize: "0.82rem", color: "#444", lineHeight: 1.5 },
};
