import Navbar from "@/components/navigation/navbar";
import Menubar from "@/components/navigation/menubar";

const Layout = ({ module, setModule, children }) => {
	return (
		<div className="flex flex-col items-center w-screen h-screen overflow-hidden bg-base-200">
			<div className="flex flex-col items-center w-full h-full border-black max-w-7xl border-x bg-base-100">
				<Navbar />
				<Menubar module={module} setModule={setModule} />
				{children}
			</div>
		</div>
	);
};

export default Layout;
