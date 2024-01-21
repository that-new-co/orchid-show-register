import { useEffect } from "react";

import PouchDb from "pouchdb";
import { Provider } from "use-pouchdb";

const db_remote = new PouchDb(
	"http://localhost:5984/osr_couchdb"
	// "http://admin:9muidrwFUNsvXfD@localhost:5984/osr_couchdb"
);

const DatabaseProvider = ({ db_name, children }) => {
	const db = new PouchDb(db_name, { auto_compaction: true });

	useEffect(() => {
		db.setMaxListeners(20);
		db.compact()
			.then(function (result) {
				// console.log("[_app] db.compact:", result);
			})
			.catch(function (err) {
				console.log("[_app] db.compact Error:", err);
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

		return () => {
			syncHandler_db.cancel();
		};
	}, []);

	return (
		<Provider
			default="local"
			databases={{
				local: db,
			}}
		>
			{children}
		</Provider>
	);
};

export default DatabaseProvider;
