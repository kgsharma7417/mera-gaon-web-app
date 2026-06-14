import React, { createContext, useContext, useState, useEffect } from "react";

// 🔥 FIREBASE SETUP (uncomment after `npm install firebase`)
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
//
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };
//
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

export const ROLES = {
  USER: "user",
  SECRETARY: "secretary",
  SHOP_OWNER: "shopOwner",
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // 🔥 Firebase: replace this block with onAuthStateChanged
    // const unsub = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     const snap = await getDoc(doc(db, "users", user.uid));
    //     const extra = snap.exists() ? snap.data() : {};
    //     setCurrentUser({
    //       uid: user.uid,
    //       email: user.email,
    //       name: extra.name || user.displayName,
    //       nameEn: extra.nameEn || user.displayName,
    //       phone: extra.mobile,
    //       village: extra.village,
    //       villageEn: extra.villageEn,
    //       role: extra.role || ROLES.USER,
    //     });
    //   } else {
    //     setCurrentUser(null);
    //   }
    //   setAuthLoading(false);
    // });
    // return unsub;

    // Temporary: no persisted session until Firebase is wired in
    setAuthLoading(false);
  }, []);

  const login = async (email, password) => {
    // 🔥 Firebase:
    // const { user } = await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged listener above will set currentUser
    // return user;

    // Placeholder (remove once Firebase is connected)
    setCurrentUser({
      uid: "temp-uid",
      email,
      name: "राम प्रसाद",
      nameEn: "Ram Prasad",
      role: ROLES.USER,
      village: "रामपुर",
      villageEn: "Rampur",
      phone: "9876543210",
    });
  };

  const signup = async ({ name, mobile, email, village, password }) => {
    // 🔥 Firebase:
    // const { user } = await createUserWithEmailAndPassword(auth, email, password);
    // await updateProfile(user, { displayName: name });
    // await setDoc(doc(db, "users", user.uid), {
    //   name, mobile, email, village, role: ROLES.USER,
    // });
    // return user;

    // Placeholder (remove once Firebase is connected)
    setCurrentUser({
      uid: "temp-uid",
      email,
      name,
      nameEn: name,
      role: ROLES.USER,
      village,
      villageEn: village,
      phone: mobile,
    });
  };

  const loginWithGoogle = async () => {
    // 🔥 Firebase:
    // const provider = new GoogleAuthProvider();
    // const { user } = await signInWithPopup(auth, provider);
    // const ref = doc(db, "users", user.uid);
    // const snap = await getDoc(ref);
    // if (!snap.exists()) {
    //   await setDoc(ref, {
    //     name: user.displayName, email: user.email,
    //     mobile: "", village: "", role: ROLES.USER,
    //   });
    // }
    // return user;

    // Placeholder (remove once Firebase is connected)
    setCurrentUser({
      uid: "temp-google-uid",
      email: "user@gmail.com",
      name: "Google उपयोगकर्ता",
      nameEn: "Google User",
      role: ROLES.USER,
      village: "रामपुर",
      villageEn: "Rampur",
      phone: "",
    });
  };

  const logout = async () => {
    // 🔥 Firebase: await signOut(auth);
    setCurrentUser(null);
  };

  const switchRole = (role) => setCurrentUser((p) => (p ? { ...p, role } : p));

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authLoading,
        switchRole,
        login,
        signup,
        loginWithGoogle,
        logout,
        isSecretary: currentUser?.role === ROLES.SECRETARY,
        isShopOwner: currentUser?.role === ROLES.SHOP_OWNER,
        isUser: currentUser?.role === ROLES.USER,
        ROLES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
