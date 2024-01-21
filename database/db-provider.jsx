import { useEffect } from "react";

import PouchDb from "pouchdb";
import { Provider } from "use-pouchdb";

const uri = process.env.IBM_CLOUDANT_API_URI;
const test = process.env.GOOGLE_CLIENT_SECRET;
console.log("[_app] test:", test);
console.log("[_app] uri:", uri);

const db_remote = new PouchDb(uri);
// const db_remote = new PouchDb(
// 	"https://apikey-v2-ccvcb2e0adna2wa7a7266w63uzyeid7r6js8nsv9dz1:d0effff001a849e572c0ae0c2485cc3b@b3c6740e-5250-4ac6-b9aa-f7561324f9cd-bluemix.cloudantnosqldb.appdomain.cloud/osr_remote"
// );
// IBM Cloudant allows only certain characters in the database name.  lowercase letters, digits, and any of the characters _, $, (, ), +, -, and / are allowed. The database name must begin with a letter

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
