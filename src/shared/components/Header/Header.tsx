// IMPORTS
import { NavBar } from "./sub/NavBar";
import { Banner } from "./sub/Banner";

export const Header = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const content = (
    <section className="header">
      <Banner />
      <NavBar firstName={firstName} lastName={lastName} />
    </section>
  );

  return content;
};
