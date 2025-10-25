// import { useGetSubjectQuery } from "./context/services/subject.service";
import { Link, Outlet } from "react-router-dom";
const Layout = () => {
  // const { data: subjects = [], isLoading: subjectsLoading } =
  //   useGetSubjectQuery();
  return (
    <div className="layout">
      <aside>
        <Link to={"/"}>Bosh sahifa</Link>
        <Link to={"/file"}>Fayllar</Link>
        <Link to={"/subject"}>Fanlar</Link>
        <Link to={"/content"}>Materiallar</Link>
        <Link to={"/user"}>Foydalanuvchilar</Link>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
