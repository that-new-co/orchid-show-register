import { Storage } from "@google-cloud/storage";

const storage = new Storage({
	projectId: process.env.PROJECT_ID,
	credentials: {
		client_email: process.env.CLIENT_EMAIL,
		private_key: process.env.PRIVATE_KEY_1 + process.env.PRIVATE_KEY_2,
	},
});

export default async function handler(context, res) {
	const { method } = context;

	const setFileMetadata = async (filename) => {
		await storage.bucket("offline-pwa").file(filename).setMetadata({
			contentType: "application/json",
			cacheControl: "no-store",
		});
	};

	switch (method) {
		case "POST":
			try {
				// console.log("[ api/upload ] POST...");
				const filename = context.body.filename;
				const json = context.body.json;
				const myBucket = storage.bucket("offline-pwa");
				const file = myBucket.file(filename);
				const contents = json;
				await file
					.save(contents, { contentType: "application/json" })
					.then(() =>
						console.log(`[ api/upload ] Upload complete: ${filename} `)
					)
					.catch((err) => console.error("ERROR:", err));
				setFileMetadata(filename);
				res.status(200).json({ success: true });
			} catch (error) {
				console.log(error);
			}
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
