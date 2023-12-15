import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginRoute from "./routes/LoginRoute";

function App() {
  return (
    <Routes>
      <Route element={<LoginRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/note" element={<NotePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
