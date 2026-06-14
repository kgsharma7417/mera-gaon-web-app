import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

const TXT = {
  appName: { hi: "ग्राम सेवा", en: "Gram Seva" },
  tagline: {
    hi: "आपके गांव की डिजिटल सेवाएं, एक ही जगह",
    en: "Your village's digital services, all in one place",
  },
  signIn: { hi: "साइन इन", en: "Sign In" },
  signUp: { hi: "साइन अप", en: "Sign Up" },
  welcomeBack: { hi: "वापसी पर स्वागत है 👋", en: "Welcome back 👋" },
  createAccount: { hi: "नया खाता बनाएं", en: "Create your account" },
  fullName: { hi: "पूरा नाम", en: "Full Name" },
  mobile: { hi: "मोबाइल नंबर", en: "Mobile Number" },
  email: { hi: "ईमेल", en: "Email" },
  password: { hi: "पासवर्ड", en: "Password" },
  confirmPassword: { hi: "पासवर्ड पुनः लिखें", en: "Confirm Password" },
  village: { hi: "गांव का नाम", en: "Village Name" },
  signInBtn: { hi: "साइन इन करें", en: "Sign In" },
  signUpBtn: { hi: "खाता बनाएं", en: "Create Account" },
  orContinue: { hi: "या इसके साथ जारी रखें", en: "or continue with" },
  google: { hi: "Google से साइन इन करें", en: "Continue with Google" },
  noAccount: { hi: "खाता नहीं है?", en: "Don't have an account?" },
  haveAccount: { hi: "पहले से खाता है?", en: "Already have an account?" },
  forgotPassword: { hi: "पासवर्ड भूल गए?", en: "Forgot password?" },
  namePlaceholder: { hi: "जैसे: रमेश कुमार", en: "e.g. Ramesh Kumar" },
  mobilePlaceholder: { hi: "10 अंकों का मोबाइल नंबर", en: "10-digit mobile number" },
  emailPlaceholder: { hi: "you@example.com", en: "you@example.com" },
  villagePlaceholder: { hi: "अपने गांव का नाम लिखें", en: "Enter your village name" },
  passwordError: { hi: "पासवर्ड मेल नहीं खा रहे हैं", en: "Passwords do not match" },
  fillAllFields: { hi: "कृपया सभी फ़ील्ड भरें", en: "Please fill all fields" },
  loading: { hi: "कृपया प्रतीक्षा करें...", en: "Please wait..." },
  showPassword: { hi: "दिखाएं", en: "Show" },
  hidePassword: { hi: "छुपाएं", en: "Hide" },
  back: { hi: "← होम पर वापस जाएं", en: "← Back to Home" },
};

export default function LoginPage() {
  const { language, setLanguage } = useLanguage();
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    village: "",
    password: "",
    confirmPassword: "",
  });

  const t = (key) => TXT[key]?.[language] ?? key;

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signin") {
      if (!form.email || !form.password) {
        setError(t("fillAllFields"));
        return;
      }
      try {
        setLoading(true);
        // 🔥 Firebase: signInWithEmailAndPassword(auth, form.email, form.password)
        await login(form.email, form.password);
        navigate("/");
      } catch (err) {
        setError(err.message || (language === "hi" ? "लॉगिन विफल" : "Login failed"));
      } finally {
        setLoading(false);
      }
    } else {
      if (
        !form.name ||
        !form.mobile ||
        !form.email ||
        !form.password ||
        !form.confirmPassword
      ) {
        setError(t("fillAllFields"));
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError(t("passwordError"));
        return;
      }
      try {
        setLoading(true);
        // 🔥 Firebase: createUserWithEmailAndPassword(auth, form.email, form.password)
        // then updateProfile(user, { displayName: form.name })
        // then store { name, mobile, village } in Firestore under users/{uid}
        await signup({
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          village: form.village,
          password: form.password,
        });
        navigate("/");
      } catch (err) {
        setError(err.message || (language === "hi" ? "साइन अप विफल" : "Sign up failed"));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    try {
      setLoading(true);
      // 🔥 Firebase: signInWithPopup(auth, new GoogleAuthProvider())
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message || (language === "hi" ? "Google साइन इन विफल" : "Google sign-in failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      {/* Language toggle */}
      <div style={s.langToggle}>
        <button
          onClick={() => setLanguage("hi")}
          style={{ ...s.langBtn, ...(language === "hi" ? s.langBtnActive : {}) }}
        >
          हिं
        </button>
        <button
          onClick={() => setLanguage("en")}
          style={{ ...s.langBtn, ...(language === "en" ? s.langBtnActive : {}) }}
        >
          EN
        </button>
      </div>

      {/* Decorative blobs */}
      <div style={s.blobTop} />
      <div style={s.blobBottom} />

      <div style={s.card}>
        <div style={s.brand}>
          <div style={s.brandIcon}>🌾</div>
          <div style={s.brandName}>{t("appName")}</div>
          <div style={s.brandTagline}>{t("tagline")}</div>
        </div>

        {/* Tabs */}
        <div style={s.tabRow}>
          <button
            onClick={() => {
              setMode("signin");
              setError("");
            }}
            style={{ ...s.tab, ...(mode === "signin" ? s.tabActive : {}) }}
          >
            {t("signIn")}
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setError("");
            }}
            style={{ ...s.tab, ...(mode === "signup" ? s.tabActive : {}) }}
          >
            {t("signUp")}
          </button>
        </div>

        <div style={s.heading}>
          {mode === "signin" ? t("welcomeBack") : t("createAccount")}
        </div>

        {error && <div style={s.errorBox}>{error}</div>}

        <form onSubmit={handleEmailAuth} style={s.form}>
          {mode === "signup" && (
            <>
              <Field
                label={t("fullName")}
                icon="👤"
                value={form.name}
                onChange={update("name")}
                placeholder={t("namePlaceholder")}
                type="text"
              />
              <Field
                label={t("mobile")}
                icon="📱"
                value={form.mobile}
                onChange={update("mobile")}
                placeholder={t("mobilePlaceholder")}
                type="tel"
                maxLength={10}
              />
              <Field
                label={t("village")}
                icon="📍"
                value={form.village}
                onChange={update("village")}
                placeholder={t("villagePlaceholder")}
                type="text"
              />
            </>
          )}

          <Field
            label={t("email")}
            icon="✉️"
            value={form.email}
            onChange={update("email")}
            placeholder={t("emailPlaceholder")}
            type="email"
          />

          <div>
            <label style={s.label}>
              <span style={s.labelIcon}>🔒</span> {t("password")}
            </label>
            <div style={s.passwordRow}>
              <input
                style={s.input}
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={update("password")}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                style={s.showBtn}
              >
                {showPassword ? t("hidePassword") : t("showPassword")}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <Field
              label={t("confirmPassword")}
              icon="🔒"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
            />
          )}

          {mode === "signin" && (
            <div style={s.forgotRow}>
              <button type="button" style={s.linkBtn}>
                {t("forgotPassword")}
              </button>
            </div>
          )}

          <button type="submit" style={s.submitBtn} disabled={loading}>
            {loading ? t("loading") : mode === "signin" ? t("signInBtn") : t("signUpBtn")}
          </button>
        </form>

        <div style={s.divider}>
          <span style={s.dividerLine} />
          <span style={s.dividerText}>{t("orContinue")}</span>
          <span style={s.dividerLine} />
        </div>

        <button onClick={handleGoogleAuth} style={s.googleBtn} disabled={loading}>
          <GoogleIcon />
          {t("google")}
        </button>

        <div style={s.switchRow}>
          {mode === "signin" ? t("noAccount") : t("haveAccount")}{" "}
          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
            }}
            style={s.linkBtn}
          >
            {mode === "signin" ? t("signUp") : t("signIn")}
          </button>
        </div>

        <button onClick={() => navigate("/")} style={s.backBtn}>
          {t("back")}
        </button>
      </div>
    </div>
  );
}

function Field({ label, icon, value, onChange, placeholder, type, maxLength }) {
  return (
    <div>
      <label style={s.label}>
        <span style={s.labelIcon}>{icon}</span> {label}
      </label>
      <input
        style={s.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.55-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.93v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.6.1-1.18.29-1.7V4.96H.93A9 9 0 0 0 0 9c0 1.45.35 2.83.93 4.04l3.02-2.34z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.6 8.6 0 0 0 9 0 9 9 0 0 0 .93 4.96l3.02 2.34C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(160deg, #f4fbf2 0%, #eef7ec 45%, #fef9ec 100%)",
    position: "relative",
    overflow: "hidden",
    padding: "24px 16px",
    fontFamily: "inherit",
  },
  blobTop: {
    position: "absolute",
    top: -120,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4e9f3d, #1e5128)",
    opacity: 0.18,
    filter: "blur(10px)",
  },
  blobBottom: {
    position: "absolute",
    bottom: -140,
    left: -110,
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ffd54f, #ff9800)",
    opacity: 0.15,
    filter: "blur(10px)",
  },
  langToggle: {
    position: "absolute",
    top: 16,
    right: 16,
    display: "flex",
    gap: 4,
    background: "#fff",
    borderRadius: 20,
    padding: 4,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    zIndex: 2,
  },
  langBtn: {
    border: "none",
    background: "transparent",
    padding: "6px 12px",
    borderRadius: 16,
    fontSize: "0.78rem",
    fontWeight: 700,
    cursor: "pointer",
    color: "#7b8b7a",
    fontFamily: "inherit",
  },
  langBtnActive: {
    background: "linear-gradient(135deg,#1e5128,#4e9f3d)",
    color: "#fff",
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 420,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(12px)",
    borderRadius: 24,
    padding: "32px 28px",
    boxShadow: "0 20px 60px rgba(30,81,40,0.12)",
    border: "1px solid rgba(255,255,255,0.6)",
  },
  brand: { textAlign: "center", marginBottom: 20 },
  brandIcon: {
    fontSize: "2.6rem",
    marginBottom: 6,
    filter: "drop-shadow(0 4px 10px rgba(30,81,40,0.25))",
  },
  brandName: {
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#1e5128",
    letterSpacing: "0.5px",
  },
  brandTagline: {
    fontSize: "0.8rem",
    color: "#7b8b7a",
    marginTop: 4,
  },
  tabRow: {
    display: "flex",
    background: "#f1f5ee",
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    border: "none",
    background: "transparent",
    padding: "10px 0",
    borderRadius: 10,
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#7b8b7a",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  tabActive: {
    background: "#fff",
    color: "#1e5128",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  heading: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#1e5128",
    marginBottom: 14,
    textAlign: "center",
  },
  errorBox: {
    background: "#fce4ec",
    color: "#b71c1c",
    fontSize: "0.8rem",
    fontWeight: 600,
    padding: "10px 12px",
    borderRadius: 10,
    marginBottom: 12,
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: 14 },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#3f5341",
    marginBottom: 6,
  },
  labelIcon: { fontSize: "0.9rem" },
  input: {
    width: "100%",
    border: "1.5px solid #e1ebdd",
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: "0.9rem",
    color: "#1f2d20",
    background: "#fafdf8",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  passwordRow: { position: "relative", display: "flex", alignItems: "center" },
  showBtn: {
    position: "absolute",
    right: 12,
    border: "none",
    background: "transparent",
    color: "#4e9f3d",
    fontSize: "0.74rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  forgotRow: { display: "flex", justifyContent: "flex-end", marginTop: -6 },
  linkBtn: {
    border: "none",
    background: "transparent",
    color: "#1e5128",
    fontWeight: 700,
    fontSize: "0.8rem",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: 0,
  },
  submitBtn: {
    marginTop: 4,
    border: "none",
    borderRadius: 14,
    padding: "14px 0",
    fontSize: "0.95rem",
    fontWeight: 800,
    color: "#fff",
    background: "linear-gradient(135deg, #1e5128, #4e9f3d)",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 8px 20px rgba(30,81,40,0.25)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "20px 0 16px",
  },
  dividerLine: { flex: 1, height: 1, background: "#e6ede2" },
  dividerText: { fontSize: "0.74rem", color: "#9aa89a", fontWeight: 600 },
  googleBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    border: "1.5px solid #e1ebdd",
    borderRadius: 14,
    padding: "12px 0",
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#3f5341",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.2s, box-shadow 0.2s",
  },
  switchRow: {
    textAlign: "center",
    marginTop: 18,
    fontSize: "0.84rem",
    color: "#7b8b7a",
  },
  backBtn: {
    display: "block",
    margin: "18px auto 0",
    border: "none",
    background: "transparent",
    color: "#9aa89a",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
};