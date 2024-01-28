import { useEffect } from "react";

import PouchDb from "pouchdb";
import { Provider } from "use-pouchdb";

// While under development, sync with a local CouchDB instance to visualize the data.
const db_remote = new PouchDb("http://localhost:5984/osr_couchdb");
const db_remote_classes = new PouchDb(
	"http://localhost:5984/osr_classes_couchdb"
);

const DatabaseProvider = ({ db_name, children }) => {
	const db = new PouchDb(db_name, { auto_compaction: true });
	const db_classes = new PouchDb("osr_classes", { auto_compaction: true });

	useEffect(() => {
		db.setMaxListeners(20);
		db_classes.setMaxListeners(20);
		db.compact().catch(function (err) {
			console.log("[_app] db.compact Error:", err);
		});
		db_classes.compact().catch(function (err) {
			console.log("[_app] db_classes.compact Error:", err);
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
		const syncHandler_db_classes = db_classes
			.sync(db_remote_classes, {
				live: true,
				retry: true,
			})
			.on("paused", function () {
				// console.log("[_app] db_classes.sync Paused.");
			})
			.on("active", function (info) {
				// console.log("[_app] db_classes.sync Active:", info);
			})
			.on("error", function (err) {
				console.log("[_app] db_classes.sync Error:", err);
			});

		return () => {
			syncHandler_db.cancel();
			syncHandler_db_classes.cancel();
		};
	}, []);

	return (
		<Provider
			default="local"
			databases={{
				local: db,
				classes_db: db_classes,
			}}
		>
			{children}
		</Provider>
	);
};

export default DatabaseProvider;
