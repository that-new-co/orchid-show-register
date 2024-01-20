import React, { useState } from "react";
import Layout from "@/layouts/layout";
import Registration from "@/components/registration";
import Trophy from "@/components/trophy";
import Register from "@/components/register";

const AppView = () => {
	const [user, setUser] = useState();
	const [module, setModule] = useState();

	return (
		<Layout module={module} setModule={setModule}>
			{module === "exhibitor" && <Registration />}

			{module === "trophy" && <Trophy setModule={setModule} />}
			{module === "register" && (
				<Register module={module} setModule={setModule} />
			)}
			{!module && (
				<div className="flex flex-col items-center justify-start p-4 ">
					<div className="font-bold">No Module</div>
				</div>
			)}
		</Layout>
	);
};
export default AppView;
