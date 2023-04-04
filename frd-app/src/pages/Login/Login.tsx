import React from "react";
import style from "./Login.module.scss";
import { logoApple } from "ionicons/icons";
import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { googleSignIn } from "../../service/firebaseConfig";
import { setName } from "../../service/LocalStorage/LocalStorage";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../atoms";
export const Login = () => {
  const setIsLogin = useSetRecoilState(loginState);
  let googleIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327";

  async function handleGoogleSignIn() {
    let user = await googleSignIn();
    console.log(user);
    if (user) {
      // login success
      let res = await fetch(
        `${process.env.REACT_APP_EXPRESS_SERVER_URL}/getToken`
      );
      let json = await res.json();
      if (json.ok) {
        await setName("token", json.data.token);
        setIsLogin((isLogin) => {
          let newState = { ...isLogin };
          newState.isLogin = true;
          return newState;
        });
      } else {
        setIsLogin((isLogin) => {
          let newState = { ...isLogin };
          newState.isLogin = false;
          return newState;
        });
      }
    } else {
      setIsLogin((isLogin) => {
        let newState = { ...isLogin };
        newState.isLogin = false;
        return newState;
      });
    }
  }
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
