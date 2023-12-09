import { useState, useRef } from "react";

import { usePouch } from "use-pouchdb";

const Navbar = ({ docShowInfo }) => {
	const db = usePouch();
	const [editShowName, setEditShowName] = useState(false);

	const inputShowNameRef = useRef(null);

	const onShowNameChange = () => {
		setEditShowName(!editShowName);
		docShowInfo.show_name = inputShowNameRef.current.value;
		db.put(docShowInfo)
			.then((result) => {
				console.log("result", result);
			})
			.catch((error) => {
				console.log("error", error);
			});
	};

	if (!docShowInfo) return null;
	return (
		<div className="w-full max-w-7xl navbar bg-base-100">
			<div className="flex-none dropdown">
				<button tabIndex={0} role="button" className="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-5 h-5 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>
				<ul
					tabIndex={0}
					className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border-slate-300 border mt-1"
				>
					<li onClick={() => setEditShowName(true)}>
						<a>Edit Show Name</a>
					</li>
					{/* <li>
						<a>Archive & Reset</a>
					</li> */}
				</ul>
			</div>
			<div className="flex-1 ml-2">
				<input
					className="text-xl normal-case border-black input w-96"
					type="text"
					defaultValue={docShowInfo.show_name}
					placeholder="Search"
					disabled={!editShowName}
					onBlur={() => onShowNameChange()}
					ref={inputShowNameRef}
				/>
			</div>
			<div className="flex-none">
				<div className="text-xs">App Version: Multi-User/Online</div>
			</div>
		</div>
	);
};

export default Navbar;
