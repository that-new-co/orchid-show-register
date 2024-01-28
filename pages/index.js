import { useState, useEffect } from "react";
// import { useSession, signIn } from "next-auth/react";

import DatabaseProvider from "@/database/db-provider";
import { get, set } from "idb-keyval";

import Layout from "@/layouts/layout";
import Register from "@/components/register/_";
import Classes from "@/components/classes/_";
import Trophy from "@/components/trophy";

export default function Home() {
	// const { data: session, status } = useSession();
	const [osr_info, setOsr_info] = useState();
	const [module, setModule] = useState("exhibitor");

	useEffect(() => {
		get("osr_info").then((osr_info) => {
			osr_info
				? setOsr_info(osr_info)
				: set("osr_info", {
						db_name: "osr",
				  }).then((osr_info) => {
						setOsr_info(osr_info);
				  });
		});
	}, []);

	// useEffect(() => {
	// 	if (session === undefined) return;
	// 	if (session === null) {
	// 		signIn();
	// 	} else if (session) {
	// 		console.log("session", session);
	// 	}
	// }, [session]);

	if (!osr_info) return null;

	const modules = ["exhibitor", "class", "trophy"];

	return (
		<DatabaseProvider db_name={osr_info.db_name}>
			<Layout module={module} setModule={setModule}>
				<main className="flex flex-col items-center justify-start w-full h-full overflow-hidden ">
					{module === "exhibitor" && <Register setModule={setModule} />}
					{module === "class" && <Classes setModule={setModule} />}
					{module === "trophy" && <Trophy setModule={setModule} />}
					{!modules.includes(module) && (
						<div className="flex flex-col items-center justify-start h-full p-4 ">
							<div className="font-bold">No Module</div>
						</div>
					)}
				</main>
			</Layout>
		</DatabaseProvider>
	);
}
