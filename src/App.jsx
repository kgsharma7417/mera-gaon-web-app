import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

// 📂 पुराने पेजेस के इम्पोर्ट्स
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import MarketPage from "./pages/MarketPage";
import HealthPage from "./pages/HealthPage";
import AgriculturePage from "./pages/AgriculturePage";
import CulturePage from "./pages/CulturePage";

// 🏥 नए हेल्थ सब-पेजेस के इम्पोर्ट्स (Casing Fixed for Vercel Linux Servers)
import Maternalpage from "./pages/Maternalpage";
import Medicinepage from "./pages/Medicinepage";
import Mentalhealthpage from "./pages/Mentalhealthpage";
import Telemedicinepage from "./pages/Telemedicinepage";

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <div
            style={{
              maxWidth: "480px",
              margin: "0 auto",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              background: "#f0f4f0",
              position: "relative",
              paddingBottom: "64px",
            }}
          >
            {/* 1. टॉप हेडर (रोल और भाषा चेंजर) */}
            <Header />

            {/* 2. डायनेमिक पेजेस रेंडरिंग एरिया */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              <Routes>
                {/* मुख्य पेजेस के रूट्स */}
                <Route path="/" element={<HomePage />} />
                <Route path="/market" element={<MarketPage />} />
                <Route path="/health" element={<HealthPage />} />
                <Route path="/agriculture" element={<AgriculturePage />} />
                <Route path="/culture" element={<CulturePage />} />
                <Route path="/admin" element={<AdminPage />} />

                {/* 🚨 नए हेल्थ सब-पेजेस के रूट्स (Sub-Routes) */}
                <Route path="/health/maternal" element={<Maternalpage />} />
                <Route path="/health/medicine" element={<Medicinepage />} />
                <Route
                  path="/health/mental-health"
                  element={<Mentalhealthpage />}
                />
                <Route
                  path="/health/telemedicine"
                  element={<Telemedicinepage />}
                />
              </Routes>
            </div>

            {/* 3. बॉटम नेविगेशन बार */}
            <BottomNav />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
