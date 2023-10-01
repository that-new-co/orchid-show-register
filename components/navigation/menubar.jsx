import React from "react";

const Menubar = ({ module, setModule }) => {
	return (
		<div className="flex justify-between w-full gap-5 px-6">
			<button
				className="btn btn-primary btn-sm"
				onClick={() => setModule("exhibitor")}
			>
				Exhibitors & Orchids
			</button>

			<button
				className="btn btn-primary btn-sm"
				onClick={() => setModule("class")}
			>
				Classes
			</button>
			<button
				className="btn btn-primary btn-sm"
				onClick={() => setModule("table")}
			>
				Tables
			</button>

			<button
				className="btn btn-primary btn-sm"
				onClick={() => setModule("summary")}
			>
				Summary
			</button>
			<button
				className="btn btn-primary btn-sm"
				onClick={() => setModule("summary")}
			>
				Schedule
			</button>
			<button
				className="btn btn-primary btn-sm"
				onClick={() => setModule("ribbon")}
			>
				Ribbons
			</button>
			<button
				className="btn btn-primary btn-sm"
				onClick={() => setModule("trophy")}
			>
				Trophies
			</button>
		</div>
	);
};

export default Menubar;
