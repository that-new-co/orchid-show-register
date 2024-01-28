import { useEffect } from "react";
import { useAllDocs, usePouch } from "use-pouchdb";

const ClassesModule = () => {
	const classes_db = usePouch("classes_db");
	const { rows, state } = useAllDocs({
		db: "classes_db",
		include_docs: true,
	});

	useEffect(() => {
		console.log("classes_db", classes_db);
		console.log("rows", rows);
		console.log("state", state);
	}, [classes_db, rows, state]);

	if (state.loading) return <div>Loading...</div>;

	return (
		<div className="flex flex-col items-center w-full overflow-hidden">
			<div className="flex flex-row w-5/6 mt-8 font-bold">CLASS LIST </div>
			<div className="flex flex-col items-center w-5/6 overflow-auto">
				{rows.map((row) => {
					return (
						<div key={row.id} className="flex flex-row w-full gap-4 ">
							<div className="flex">{row.doc._id}</div>
							<div className="flex flex-grow">{row.doc.title}</div>
							<div className="flex">{row.doc.team}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default ClassesModule;
