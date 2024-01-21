// "use client";

import { useEffect } from "react";
// import { SessionProvider } from "next-auth/react";

import Head from "next/head";

import "@/styles/globals.css";

export default function App({
	Component,
	pageProps: {
		// session,
		...pageProps
	},
}) {
	useEffect(() => {
		window.addEventListener("beforeinstallprompt", function (event) {
			event.preventDefault();
			// console.log("beforeinstallprompt fired");
			window.deferredPrompt = event;
		});

		// if ("serviceWorker" in navigator) {
		// 	navigator.serviceWorker
		// 		.register("/service-worker.js")
		// 		.then(function (registration) {
		// 			console.log("[_app] sw registered:", registration.scope);
		// 		})
		// 		.catch(function (error) {
		// 			console.log("[_app] sw registration error:", error);
		// 		});
		// }
	}, []);

	return (
		// <SessionProvider session={session}>
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
		</>
		// </SessionProvider>
	);
}
