import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

import DatabaseProvider from "@/database/db-provider";

import Layout from "@/layouts/layout";
import Exhibitor from "@/components/exhibitor";
import Trophy from "@/components/trophy";
import Register from "@/components/register";

export default function Home() {
	const { data: session, status } = useSession();
	const [user, setUser] = useState();

	useEffect(() => {
		if (session === null) signIn();
		if (!session) return;
		setUser(session.user);
	}, [session]);

	const [module, setModule] = useState();

	if (!user) return null;

	return (
		<DatabaseProvider user={session?.user}>
			<Layout module={module} setModule={setModule}>
				<main className="flex flex-col items-center justify-start">
					{module === "exhibitor" && <Exhibitor setModule={setModule} />}

					{module === "trophy" && <Trophy setModule={setModule} />}
					{module === "register" && (
						<Register module={module} setModule={setModule} />
					)}
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
