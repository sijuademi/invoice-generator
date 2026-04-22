import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import AppLayout from "./AppLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ path: "/home", element: <Home /> },
			{ path: "/details", element: <InvoiceDetailPage /> },
		],
	},
]);

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
