import { useEffect, useState, useRef } from "react";

import { saveAs } from "file-saver";

import ExhibitorList from "./exhibitor-list";
import Exhibitor from "./exhibitor";

import { startingExhibitors } from "@/database/exhibitors";

import { useDoc, useAllDocs, usePouch } from "use-pouchdb";
import { set } from "idb-keyval";

const Register = () => {
	const db = usePouch();
	const { rows, state } = useAllDocs({
		include_docs: true,
	});
	const { doc, loading, error } = useDoc("classes", { db: "db_info" });

	const [classes, setClasses] = useState([]);

	useEffect(() => {
		if (loading) return;
		if (error) return;
		if (!doc) return;
		setClasses(doc.classes);
	}, [doc]);

	const [exhibitors, setExhibitors] = useState([]);
	const [exhibitor, setExhibitor] = useState(null);
	const [orchidIndex, setOrchidIndex] = useState(null);
	const nextId = useRef();

	// setExhibitors after loading docs from Database
	useEffect(() => {
		if (rows.length === 0) return;
		const row_object = {
			rows: rows,
		};
		console.log("rows", rows);
		console.log("row_object", row_object);
		// saveAs(
		// 	new Blob([JSON.stringify(row_object, null, 2)], {
		// 		type: "application/json",
		// 	}),
		// 	"exhibitors.json"
		// );
		nextId.current = (+rows[rows.length - 1].doc._id + 1)
			.toString()
			.padStart(3, "0");
		setExhibitors(rows.map((row) => row.doc));
	}, [rows]);

	// adds an exhibitor if there are no exhibitors
	// useEffect(() => {
	// 	if (state === "done") {
	// 		if (rows.length === 0) {
	// 			nextId.current = "001";
	// 			addExhibitor();
	// 		}
	// 	}
	// }, [state]);

	// selects the first exhibitor on page load
	useEffect(() => {
		if (exhibitors.length === 0) return;
		if (!exhibitor) {
			setExhibitor(exhibitors[0]);
			setOrchidIndex();
		}
	}, [exhibitors]);

	const addExhibitor = () => {
		db.put({
			_id: new Date().toISOString(),
			_rev: "",
			num: "",
			type: "",
			org: "",
			lname: "",
			fname: "",
			email: "",
			phone: "",
			address: "",
			orchids: [],
		})
			.then((res) => {
				db.get(nextId.current).then((res) => {
					setExhibitor(res);
				});
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const addStarterList = () => {
		console.log("startingExhibitors");
		const docs = startingExhibitors.map((exhibitor) => {
			return exhibitor.doc;
		});
		console.log("docs", docs);
		db.bulkDocs(docs)
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const update = (exhibitor) => {
		db.put(exhibitor)
			.then((res) => {
				db.get(exhibitor._id).then((res) => {
					setExhibitor(res);
				});
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const downloadList = () => {
		console.log("exhibitors", exhibitors);
		const row_object = {
			rows: rows,
		};
		saveAs(
			new Blob([JSON.stringify(row_object, null, 2)], {
				type: "application/json",
			}),
			"exhibitors.json"
		);
	};

	if (!exhibitor)
		return (
			<div className="flex w-full gap-8 overflow-hidden">
				<div className="flex flex-col w-1/4 gap-4 pl-6 my-6 overflow-hidden">
					<div
						className="btn"
						onClick={() => {
							nextId.current = "001";
							addExhibitor();
						}}
					>
						Add Exhibitor
					</div>
					<div className="btn" onClick={addStarterList}>
						Add Starter List
					</div>
				</div>
			</div>
		);

	return (
		<div className="flex w-full gap-8 overflow-hidden">
			<div className="flex flex-col w-1/4 pl-6 my-6 overflow-hidden">
				<ExhibitorList
					exhibitors={exhibitors}
					setExhibitor={setExhibitor}
					addExhibitor={addExhibitor}
					setOrchidIndex={setOrchidIndex}
					downloadList={downloadList}
				/>
			</div>
			<div className="flex flex-col flex-grow w-3/4 gap-4 pr-6 my-6 overflow-hidden">
				<Exhibitor
					exhibitor={exhibitor}
					orchidIndex={orchidIndex}
					setOrchidIndex={setOrchidIndex}
					update={update}
					classes={classes}
				/>
			</div>
		</div>
	);
};

export default Register;
