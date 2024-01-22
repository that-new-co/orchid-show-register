import { useState, useEffect } from "react";

import { usePouch } from "use-pouchdb";

const Orchid = ({ exhibitor, addingOrchid, setAddingOrchid }) => {
	const db = usePouch();
	const [formData, setFormData] = useState({
		id: "",
		class: "",
		entry: "",
		space: "",
		name: "",
		size: "",
		color: "",
	});
	const [nextId, setNextId] = useState(1);
	const [mode, setMode] = useState(addingOrchid ? "add" : "edit");

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("formData:", formData);
	};

	// useEffect(() => {
	// 	db.rel
	// 		.find("orchid")
	// 		.then((res) => {
	// 			console.log("res", res);
	// 			if (res.orchids.length === 0) {
	// 				setFormData((prevFormData) => ({ ...prevFormData, id: 1 }));
	// 			} else {
	// 				setFormData((prevFormData) => ({
	// 					...prevFormData,
	// 					id: res.orchids[res.orchids.length - 1].id + 1,
	// 				}));
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log("err", err);
	// 		});
	// }, [exhibitor]);

	useEffect(() => {
		console.log("orchid.jsx: mode", mode);
	}, [mode]);

	return (
		<form
			className="flex flex-col items-center justify-start w-full border border-gray-300 rounded-md shadow-md "
			onSubmit={handleSubmit}
		>
			<div className="flex justify-between w-full">
				<div className="flex justify-start w-2/5 p-2 text-xl font-bold capitalize">
					{mode} Orchid
				</div>
				<div className="flex justify-center w-1/5 p-2">
					<button className="capitalize btn btn-sm btn-secondary" type="submit">
						{mode === "edit" ? "Update" : mode}
					</button>
				</div>
				<div className="flex justify-end w-2/5 p-2 "></div>
			</div>
			<div className="flex items-end justify-center w-full gap-2 px-4 ">
				<label className="flex flex-col w-fit">
					<span className="pb-1 text-center label-text">OID</span>
					<input
						type="text"
						name="id"
						value={formData.id}
						className="w-12 p-2 text-center input input-bordered"
						autoComplete="off"
						readOnly
					/>
				</label>
				<label className="flex flex-col flex-grow">
					<span className="px-2 pb-1 label-text">Class</span>
					<input
						type="text"
						className="w-full p-2 select select-bordered"
						placeholder="Class #"
						name="class"
						value={formData.class}
						onChange={handleChange}
					/>
				</label>
				<label className="flex flex-col w-fit">
					<span className="px-2 pb-1 label-text">Entry</span>
					<input
						type="text"
						className="p-2 w-28 select select-bordered"
						placeholder="Entry #"
						name="entry"
						value={formData.entry}
						onChange={handleChange}
					/>
				</label>
				<label className="flex flex-col w-fit">
					<span className="px-2 pb-1 label-text">Space</span>
					<input
						type="text"
						className="p-2 w-28 select select-bordered"
						placeholder="Space #"
						name="space"
						value={formData.space}
						onChange={handleChange}
					/>
				</label>
			</div>
			<div className="flex items-end justify-center w-full gap-2 p-4 ">
				<label className="flex flex-col flex-grow w-1/2">
					<span className="px-2 pb-1 label-text">Orchid Name</span>
					<input
						type="text"
						name="orchid"
						placeholder="required"
						value={formData.orchid}
						onChange={handleChange}
						className="w-full p-2 input input-bordered"
						autoComplete="off"
					/>
				</label>
				<label className="flex flex-col w-1/4 ">
					<span className="px-2 pb-1 label-text">Size</span>
					<input
						type="text"
						name="size"
						placeholder="required"
						value={formData.size}
						onChange={handleChange}
						className="w-full max-w-xs p-2 input input-bordered"
						autoComplete="off"
					/>
				</label>
				<label className="flex flex-col w-1/4 ">
					<span className="px-2 pb-1 label-text">Color</span>
					<div className="flex w-full h-12 px-2 border border-gray-300 rounded-lg">
						<input
							className="flex w-1/3"
							type="text"
							name="color"
							placeholder="required"
							value={formData.color}
							onChange={handleChange}
						/>
					</div>
				</label>
			</div>
			<div className="flex items-end justify-center w-full gap-2 px-4 pb-4 ">
				<label className="flex flex-col flex-grow w-1/2">
					<span className="px-2 pb-1 label-text">Pod Parent</span>
					<input
						type="text"
						name="podparent"
						placeholder="required"
						value={formData.podparent}
						onChange={handleChange}
						className="w-full p-2 input input-bordered"
						autoComplete="off"
					/>
				</label>
				<label className="flex flex-col flex-grow w-1/2">
					<span className="px-2 pb-1 label-text">Pollen Parent</span>
					<input
						type="text"
						name="pollenparent"
						placeholder="required"
						value={formData.pollenparent}
						onChange={handleChange}
						className="w-full p-2 input input-bordered"
						autoComplete="off"
					/>
				</label>
			</div>
		</form>
	);
};
export default Orchid;
