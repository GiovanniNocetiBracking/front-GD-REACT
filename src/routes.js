import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import ContactUs from "views/ContactUs.js";
import Reports from "views/Report.js";

var routes = [
	{
		path: "/dashboard",
		name: "Panel de control",
		icon: "tim-icons icon-chart-pie-36",
		component: Dashboard,
		layout: "/admin",
	},
	{
		path: "/user-profile",
		name: "Perfil de usuario",
		icon: "tim-icons icon-single-02",
		component: UserProfile,
		layout: "/admin",
	},
	{
		path: "/contact-us",
		name: "contactanos",
		icon: "tim-icons icon-email-85",
		component: ContactUs,
		layout: "/admin",
	},
	{
		path: "/reports",
		name: "Reportes",
		icon: "tim-icons icon-single-copy-04",
		component: Reports,
		layout: "/admin",
	},
];
export default routes;
