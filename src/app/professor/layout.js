import { Navbar } from "../../components/Navbar";

export const metadata = {
  title: "Professor",
  description: "",
};

export default function Layout({ children }) {
  return (
    <div>
      <Navbar type='professor'/>
      {children}
    </div>
  );
}


