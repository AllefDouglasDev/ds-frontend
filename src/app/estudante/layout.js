import { Navbar } from "../../components/Navbar";

export const metadata = {
  title: "Estudante",
  description: "",
};

export default function Layout({ children }) {
  return (
    <div>
      <Navbar type='estudante' />
      {children}
    </div>
  );
}

