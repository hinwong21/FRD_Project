import React, { useState } from "react";
import style from "./Login.module.scss";
import { logoApple } from "ionicons/icons";
import { IonContent, IonIcon, IonPage } from "@ionic/react";

import {
  googleSignIn,
  signInWithApple,
  signOut,
} from "../../service/firebaseConfig";
import { useToken } from "../../hooks/useToken";
import { usePushNotificationToken } from "../../hooks/usePushNotificationToken";
import { User } from "@capacitor-firebase/authentication";
import { useFetch } from "../../hooks/useFetch";
import { setName } from "../../service/LocalStorage/LocalStorage";

export const Login = () => {
  const [token, setToken] = useToken();
  const fetch = useFetch();
  const [pushNotificationToken, setPushNotificationToken] =
    usePushNotificationToken();

  const [error, setError] = useState("");

  let googleIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327";

  async function handleGoogleSignIn() {
    handleSignIn(googleSignIn);
  }

  async function handleAppleSignIn() {
    handleSignIn(signInWithApple);
  }

  async function handleSignIn(signIn: () => Promise<User | null>) {
    try {
      let user = await signIn();
      if (!user) {
        setToken("");
        return;
      }

      // login success
      let json = await fetch("post", "/user/getToken", {
        userId: user.uid,
        pushNotificationToken,
      });

      if (json.ok) {
        setToken(json.data);
        setName("token", json.data);
      } else {
        await signOut();
        setToken("");
      }
    } catch (error) {
      setError(String(error));
    }
  }

  return (
    <>
      <IonPage>
        <IonContent>
          <div className={style.loginBody}>
            <div className={style.pageWrapper}>
              <header className={style.loginHeader}>
                <div className={style.headerLogin}>Noticias</div>
                <div className={style.headerWelcome}>Welcome</div>
              </header>

              <div className={style.loginContainer}>
                <div className={style.signIn}>Sign in</div>
                <div
                  id="googleId-signIn"
                  className={style.googleId}
                  datatype="sign-in"
                  onClick={handleGoogleSignIn}
                >
                  <img
                    className={style.googleIcon}
                    src={googleIcon}
                    alt="google icon"
                  ></img>
                  <div>Sign in with Google</div>
                </div>

                <div
                  id="appleId-signIn"
                  className={style.appleId}
                  datatype="sign-in"
                  onClick={handleAppleSignIn}
                >
                  <IonIcon
                    className={style.appleIcon}
                    icon={logoApple}
                    slot="start"
                  />
                  Sign in with Apple
                </div>

                <p>{error}</p>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};
