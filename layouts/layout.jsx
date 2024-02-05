import { useRef, useEffect } from "react";

import Navbar from "@/components/navigation/navbar";
import Menubar from "@/components/navigation/menubar";

import { useDoc, useAllDocs, usePouch } from "use-pouchdb";

const Layout = ({ module, setModule, children }) => {
	const db_info = usePouch("db_info");
	const { doc, loading, error } = useDoc("info", { db: "db_info" });
	const updating = useRef(false);

	useEffect(() => {
		if (!error) return;
		if (error.name === "not_found" && !updating.current) {
			console.log("error", error.name);
			updating.current = true;
			db_info
				.put({
					_id: "info",
					show_name: "Input Show Name Here",
				})
				.then((result) => {
					console.log("result", result);
					updating.current = false;
				})
				.catch((error) => {
					console.log("error", error);
					updating.current = false;
				});
			return;
		}
	}, [error]);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="flex flex-col items-center w-screen h-screen overflow-hidden bg-base-200 ">
			<div className="flex flex-col items-center w-full h-full overflow-hidden border-black max-w-7xl border-x bg-base-100 ">
				<Navbar docShowInfo={doc} />
				<Menubar module={module} setModule={setModule} />
				{children}
			</div>
		</div>
	);
};

export default Layout;
