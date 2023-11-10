import { Navbar } from "../../components/Navbar";

export const metadata = {
  title: "Diretor",
  description: "",
};

export default function Layout({ children }) {
  return (
    <div>
      <Navbar type="diretor" />
      <div className="w-full h-full max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
