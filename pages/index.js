import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

import DatabaseProvider from "@/database/db-provider";
import { get, set } from "idb-keyval";

import Layout from "@/layouts/layout";
import Exhibitor from "@/components/exhibitor";
import Trophy from "@/components/trophy";

export default function Home() {
	const { data: session, status } = useSession();
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

	useEffect(() => {
		if (session === undefined) return;
		if (session === null) {
			signIn();
		} else if (session) {
			console.log("session", session);
		}
	}, [session]);

	if (!osr_info) return null;

	return (
		<DatabaseProvider db_name={osr_info.db_name}>
			<Layout module={module} setModule={setModule}>
				<main className="flex flex-col items-center justify-start w-full">
					{module === "exhibitor" && <Exhibitor setModule={setModule} />}

					{module === "trophy" && <Trophy setModule={setModule} />}
					{!module && (
						<div className="flex flex-col items-center justify-start p-4 ">
							<div className="font-bold">No Module</div>
						</div>
					)}
				</main>
			</Layout>
		</DatabaseProvider>
	);
}
