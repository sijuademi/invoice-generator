import { Outlet } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";

function AppLayout() {
	return (
		<div className="grid grid-rows-[4.5rem_auto] md:grid-rows-[5rem_auto]  lg:grid-cols-[103px_auto] font-brand bg-light-bg min-h-screen">
			<aside className="rela">
				<Sidebar />
			</aside>
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default AppLayout;
