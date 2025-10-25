import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Subject from "./pages/Subject";
import File from "./pages/File";
import Content from "./pages/Content";
import User from "./pages/User";
import Home from "./pages/Home";

const App = () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  return username && password ? (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="subject" element={<Subject />} />
        <Route path="file" element={<File />} />
        <Route path="content" element={<Content />} />
        <Route path="user" element={<User />} />
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  ) : (
    <Login />
  );
};

export default App;
