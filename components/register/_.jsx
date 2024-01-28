import { useEffect, useState, useRef } from "react";

import ExhibitorList from "./exhibitor-list";
import Exhibitor from "./exhibitor";

import { useAllDocs, usePouch } from "use-pouchdb";

const Register = () => {
	const db = usePouch();
	const { rows, state } = useAllDocs({
		include_docs: true,
		startkey: "001",
	});
	const classes_db = usePouch("classes_db");
	const { rows: class_rows, state: class_state } = useAllDocs({
		db: "classes_db",
		include_docs: true,
	});

	const [classes, setClasses] = useState([]);

	useEffect(() => {
		if (class_state === "done") setClasses(class_rows.map((row) => row.doc));
	}, [class_state]);

	const [exhibitors, setExhibitors] = useState([]);
	const [exhibitor, setExhibitor] = useState(null);
	const [orchidIndex, setOrchidIndex] = useState(null);
	const nextId = useRef();

	// setExhibitors after loading docs from Database
	useEffect(() => {
		if (rows.length === 0) return;
		nextId.current = (+rows[rows.length - 1].doc._id + 1)
			.toString()
			.padStart(3, "0");
		setExhibitors(rows.map((row) => row.doc));
	}, [rows]);

	// adds an exhibitor if there are no exhibitors
	useEffect(() => {
		if (state === "done") {
			if (rows.length === 0) {
				nextId.current = "001";
				addExhibitor();
			}
		}
	}, [state]);

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
			_id: nextId.current,
			_rev: "",
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

	if (!exhibitor) return null;

	return (
		<div className="flex w-full gap-8 overflow-hidden">
			<div className="flex flex-col w-1/4 pl-6 my-6 overflow-hidden">
				<ExhibitorList
					exhibitors={exhibitors}
					setExhibitor={setExhibitor}
					addExhibitor={addExhibitor}
					setOrchidIndex={setOrchidIndex}
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
