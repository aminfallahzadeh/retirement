// IMPORTS
import { NavBar } from "./sub/NavBar";
import { Banner } from "./sub/Banner";

export const Header = () => {
  const content = (
    <section className="header">
      <Banner />
      <NavBar />
    </section>
  );

  return content;
};
