import { useEffect } from "react";

import PouchDb from "pouchdb";
import { Provider } from "use-pouchdb";

// While under development, sync with a local CouchDB instance to visualize the data.
const db_remote = new PouchDb("http://localhost:5984/osr");
const db_remote_info = new PouchDb("http://localhost:5984/osr_info");

const DatabaseProvider = ({ db_name, children }) => {
	const db = new PouchDb(db_name, { auto_compaction: true });
	const db_info = new PouchDb("osr_info", { auto_compaction: true });

	useEffect(() => {
		db.setMaxListeners(20);
		db_info.setMaxListeners(20);
		db.compact().catch(function (err) {
			console.log("[_app] db.compact Error:", err);
		});
		db_info.compact().catch(function (err) {
			console.log("[_app] db_info.compact Error:", err);
		});
		const syncHandler_db = db
			.sync(db_remote, {
				live: true,
				retry: true,
			})
			.on("paused", function () {
				// console.log("[_app] db.sync Paused.");
			})
			.on("active", function (info) {
				// console.log("[_app] db.sync Active:", info);
			})
			.on("error", function (err) {
				console.log("[_app] db.sync Error:", err);
			});
		const syncHandler_db_info = db_info
			.sync(db_remote_info, {
				live: true,
				retry: true,
			})
			.on("paused", function () {
				// console.log("[_app] db_info.sync Paused.");
			})
			.on("active", function (info) {
				// console.log("[_app] db_info.sync Active:", info);
			})
			.on("error", function (err) {
				console.log("[_app] db_info.sync Error:", err);
			});

		return () => {
			syncHandler_db.cancel();
			syncHandler_db_info.cancel();
		};
	}, []);

	return (
		<Provider
			default="local"
			databases={{
				local: db,
				db_info: db_info,
			}}
		>
			{children}
		</Provider>
	);
};

export default DatabaseProvider;
