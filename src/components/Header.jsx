// components
import Hero from "./Hero";
import Nav from "@/components/Nav";

function Header({ firstName, lastName }) {
  return (
    <header className="header">
      <Hero />
      <Nav firstName={firstName} lastName={lastName} />
    </header>
  );
}

export default Header;
