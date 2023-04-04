import React from "react";
import style from "./Login.module.scss";
import { logoApple } from "ionicons/icons";
import { IonContent, IonIcon, IonPage } from "@ionic/react";

export const Login = () => {
  let googleIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327";
  return (
    <>
      <IonPage>
        <IonContent>
          <div className={style.loginBody}>
            <div className={style.pageWrapper}>
              <header className={style.loginHeader}>
                <div className={style.headerLogin}>Login</div>
                <div className={style.headerWelcome}>Welcome</div>
              </header>

              <div className={style.loginContainer}>
                <div className={style.signIn}>Sign in</div>
                <div
                  id="googleId-signIn"
                  className={style.googleId}
                  datatype="sign-in"
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
                >
                  <IonIcon
                    className={style.appleIcon}
                    icon={logoApple}
                    slot="start"
                  />
                  Sign in with Apple
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};
