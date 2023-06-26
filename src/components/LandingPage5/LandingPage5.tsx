import * as React from "react";
import landing5Style from "./landing5.module.css";

function LandingPageFive() {
  return (
    <div>
      <div className={landing5Style.main}>
        <div className={landing5Style.container}>
          <div className={landing5Style.information}>
            <div className={landing5Style.bar}></div>
            <div className={landing5Style.info}>
              <p className={landing5Style.header}>
                Emergency help at the touch of a button.
              </p>
              <p className={landing5Style.parag}>
                In three simple steps, get the professional help you need.
              </p>
            </div>
          </div>
        </div>
        <div className={landing5Style.cards}>
          <section className={landing5Style.login}>
            <img src="../Login.png" alt="auth" />
            <a href="/signup">Login or Register</a>
            <p>
              Securely log in or register your account to unlock the full
              potential of E-Aid. Your safety and privacy are our top
              priorities.
            </p>
          </section>

          <section className={landing5Style.book}>
            <img src="../Dashboard.png" alt="auth" />
            <a href="#">Book a session</a>
            <p>
              Easily schedule a session with a qualified medical professional,
              we connect you with the right expertise.
            </p>
          </section>

          <section className={landing5Style.talk}>
            <img src="../Spinning.png" alt="auth" />
            <a href="/askdoctor">Talk to a Doctor</a>
            <p>
              Need immediate medical advice? Engage in real-time conversations
              with licensed doctors. Get prompt guidance and peace of mind right
              from your device.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LandingPageFive;
