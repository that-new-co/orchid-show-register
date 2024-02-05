import { useState, useEffect } from "react";

import { usePouch } from "use-pouchdb";

const Orchid = ({ exhibitor, orchidIndex, classes, update }) => {
	const db = usePouch();
	const [formData, setFormData] = useState({
		entry: "",
		type: "",
		class: "",
		space: "",
		name: "",
		size: "",
		color: "",
	});
	const [mode, setMode] = useState("view");

	const toggleMode = () => {
		setMode(mode === "view" ? "edit" : "view");
	};

	useEffect(() => {
		setFormData({ ...formData, ...exhibitor.orchids[orchidIndex] });
	}, [exhibitor, orchidIndex]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleUpdate = (formData) => {
		exhibitor.orchids[orchidIndex] = formData;
		update(exhibitor);
	};

	console.log("formData", formData);

	const updateClassName = (classNum) => {
		const cName = classes.find((c) => c.classNum === classNum);
		console.log("cName", cName);
	};

	console.log(
		"test",
		classes.find((c) => c.classNum === +formData.class)
	);

	!formData.entry && <div>Loading...</div>;

	return (
		<form
			className={`flex flex-col items-center justify-start w-full gap-4 pt-2 pb-5 border border-gray-300 rounded-md shadow-md ${
				mode === "edit" && "bg-slate-100"
			}
					`}
			onSubmit={() => handleUpdate(formData)}
		>
			<div className="flex items-end justify-between w-full px-4">
				<div className="flex items-center justify-start ">
					<div className="flex justify-start text-lg font-bold capitalize">
						{!formData.name && <div>[Orchid Name]</div>}
						{formData.name}
					</div>
				</div>

				<div className="flex items-end " onClick={toggleMode}>
					<label className="flex gap-2 cursor-pointer label">
						<span className="label-text">Read</span>
						<input type="checkbox" className="toggle toggle-success" />
						<span className={`label-text ${mode === "edit" && "font-bold"}`}>
							Edit
						</span>
					</label>
				</div>
			</div>
			<div className="flex items-end justify-center w-full gap-2 px-4 ">
				<label className="flex flex-col flex-grow w-1/2">
					<span className="px-2 pb-1 label-text">Plant Name</span>
					<input
						type="text"
						name="name"
						placeholder="required"
						value={formData.name}
						onChange={handleChange}
						onBlur={() => handleUpdate(formData)}
						className="w-full p-2 input input-bordered"
						autoComplete="off"
						readOnly={mode === "view"}
					/>
				</label>
				<label className="flex flex-col w-1/6">
					<span className="px-2 pb-1 text-start label-text">Plant #</span>
					<input
						type="text"
						name="entry"
						placeholder="Plant #"
						value={formData.entry}
						onChange={handleChange}
						onBlur={() => handleUpdate(formData)}
						className="w-full p-2 text-center input input-bordered"
						autoComplete="off"
						readOnly={mode === "view"}
					/>
				</label>
				<label className="flex flex-col w-1/6">
					<span className="px-2 pb-1 label-text">Space #</span>
					<input
						type="text"
						className="w-full p-2 text-center input input-bordered"
						placeholder="Space #"
						name="space"
						value={formData.space}
						onChange={handleChange}
						onBlur={() => handleUpdate(formData)}
						readOnly={mode === "view"}
					/>
				</label>
				<label className="flex flex-col w-1/6">
					<span className="px-2 pb-1 label-text">Class #</span>
					<input
						type="text"
						className="w-full p-2 text-center input input-bordered"
						placeholder="Class #"
						name="class"
						value={formData.class}
						onChange={handleChange}
						onBlur={() => {
							handleUpdate(formData);
							updateClassName(formData.class);
						}}
						readOnly={mode === "view"}
					/>
				</label>
			</div>
			<div className="flex items-end justify-center w-full gap-2 px-4 ">
				<label className="flex flex-col w-full ">
					<span className="label-text">Class</span>

					<input
						type="text"
						className="w-full p-2 text-center input input-bordered"
						placeholder="Class Name"
						value={classes.find((c) => c.classNum === +formData.class)?.name}
						readOnly
					/>
				</label>
			</div>
		</form>
	);
};
export default Orchid;
