// IMPORTS
import { BannerHeader } from "@/shared/components/SVG";
import logoHollow from "@images/logo-hollow.png";
import logoText from "@images/logo-text.png";

export const Banner = () => {
  const content = (
    <section className="hero">
      <div className="hero__bg">
        <BannerHeader />
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

  return content;
};
