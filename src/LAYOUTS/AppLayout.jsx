import { Outlet } from "react-router-dom";
import Header from '../components/header'
import Footer from '../components/footer'

export default function AppLayout() {
  return (
    <div>
      <main className="min-h-screen p-4">
        <Header />
        <Outlet />
      </main>

      <div className="p-10 text-center bg-slate-500 mt-10">
        <Footer />
      </div>
    </div>
  );
}
