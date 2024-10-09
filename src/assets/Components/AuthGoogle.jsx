import React, { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "../../firebase";
import { FaGoogle } from "react-icons/fa";

const AuthGoogle = () => {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Google Giriş Hatası:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Çıkış Hatası:", error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome Back, {user.displayName}</h3>
          <FaGoogle style={{ marginRight: "8px" }} />

          <button onClick={handleSignOut}>Sign Out </button>
        </div>
      ) : (
        <>
          {" "}
          <FaGoogle style={{ marginRight: "8px" }} />
          <button onClick={handleGoogleSignIn}>Sign with Google</button>
        </>
      )}
    </div>
  );
};

export default AuthGoogle;
