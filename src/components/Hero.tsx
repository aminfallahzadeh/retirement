// components
import { Banner } from "./SVGs";

// ASSETS
import logoHollow from "@images/logo-hollow.png";
import logoText from "@images/logo-text.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <Banner />
      </div>
      <div className="hero__content">
        <div className="hero__title">
          <div className="hero__logo">
            <img src={logoHollow} alt="logo" className="hero__logo--img" />

            <img src={logoText} alt="logo text" className="hero__logo--txt" />
          </div>

          <h1 className="heading-primary">سامانه بازنشستگان و وظیفه بگیران</h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;
