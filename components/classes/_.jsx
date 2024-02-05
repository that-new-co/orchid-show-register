import { useEffect } from "react";
import { useDoc } from "use-pouchdb";

const ClassesModule = () => {
	const { doc, loading, error } = useDoc("classes", { db: "db_info" });

	useEffect(() => {
		console.log("doc", doc);
		console.log("loading", loading);
		console.log("error", error);
	}, [doc, loading, error]);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="flex flex-col items-center w-full overflow-hidden">
			<div className="flex flex-row w-5/6 mt-8 font-bold">CLASS LIST </div>
			<div className="flex flex-col items-center w-5/6 px-4 overflow-auto">
				{doc.classes.map((c, index) => {
					return (
						<div key={index} className="flex flex-row w-full gap-4 ">
							<div className="flex">{c.classNum}</div>
							<div className="flex flex-grow">{c.name}</div>
							<div className="flex">{c.team}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default ClassesModule;
