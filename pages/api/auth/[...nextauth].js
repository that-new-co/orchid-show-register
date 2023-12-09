import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/database/mongodb";

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	theme: {
		logo: "/icon-512x512.png",
		brandColor: "#eba8fd",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			if (
				user.email === "chris@thatnewco.com" ||
				user.email === "iamchrisblanc@gmail.com" ||
				user.email === "thisischrisblanc@gmail.com" ||
				user.email === "whoischrisblanc@gmail.com" ||
				user.email === "tonyblanc@comcast.net" ||
				user.email === "crykey@gmail.com" ||
				user.email === "bobb252@gmail.com" ||
				user.email === "koowee03@bellsouth.net" ||
				user.email === "koowee033@gmail.com"
			) {
				return true;
			} else {
				console.log("Unauthorized");
				return false;
				// Or you can return a URL to redirect to:
				// return '/unauthorized'
			}
		},
	},
};
export default NextAuth(authOptions);
