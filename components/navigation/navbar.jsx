import { useState, useRef } from "react";

import { usePouch } from "use-pouchdb";
import { classList } from "@/components/classes/classes";

const Navbar = ({ docShowInfo }) => {
	const db = usePouch();
	const classes_db = usePouch("classes_db");
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

	const loadClassList = () => {
		const cList = classList.map((c) => {
			return {
				_id: "c" + c.number.toString().padStart(3, "0"),
				title: c.title,
				team: c.team,
			};
		});
		classes_db.bulkDocs(cList);
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
					<li onClick={loadClassList}>
						<a>Load Class List</a>
					</li>
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
				<div className="text-xs">
					App Version: Single-User / Device Specific
				</div>
			</div>
		</div>
	);
};

export default Navbar;
