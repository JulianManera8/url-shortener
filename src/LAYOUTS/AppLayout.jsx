import { Outlet } from "react-router-dom";
import Header from '../COMPONENTS/header'

export default function AppLayout() {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>

      <div className="p-10 text-center bg-slate-500 mt-10">
        Hecho por Julian Manera
      </div>
    </div>
  );
}
