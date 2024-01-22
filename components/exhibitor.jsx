import { useState, useEffect } from "react";

import Orchid from "@/components/exhibitor/orchid";
import { AiOutlineSave, AiOutlineEdit } from "react-icons/ai";

import { useAllDocs, usePouch } from "use-pouchdb";
import { set } from "idb-keyval";

const Exhibitor = () => {
	const db = usePouch();
	const osr_data = useAllDocs({
		include_docs: true,
		startkey: "001",
	});
	const [formData, setFormData] = useState({
		_id: "",
		_rev: "",
		type: "",
		org: "",
		lname: "",
		fname: "",
		email: "",
		phone: "",
		address: "",
		orchids: [],
	});
	const [exhibitors, setExhibitors] = useState([]);
	const [exhibitor, setExhibitor] = useState({});
	const [orchids, setOrchids] = useState([]);
	const [orchid, setOrchid] = useState({});
	const [mode, setMode] = useState("view"); // view, edit, delete
	const [changed, setChanged] = useState(false);

	useEffect(() => {
		if (osr_data.rows.length === 0) return;
		// console.log("osr_data", osr_data);
		setExhibitors(osr_data.rows.map((row) => row.doc));
		exhibitor._id &&
			db.get(exhibitor._id).then((res) => {
				setExhibitor(res);
			});
	}, [osr_data]);

	useEffect(() => {
		if (exhibitors.length === 0) return;
		// console.log("exhibitors", exhibitors);
	}, [exhibitors]);

	useEffect(() => {
		if (!exhibitor) return;
		setFormData(exhibitor);
	}, [exhibitor]);

	const addExhibitor = () => {
		setOrchid({});
		const id =
			exhibitors.length > 0
				? (+osr_data.rows[osr_data.rows.length - 1].doc._id + 1)
						.toString()
						.padStart(3, "0")
				: "001";
		const fData = {
			_id: id,
			_rev: "",
			type: "",
			org: "",
			lname: "",
			fname: "",
			email: "",
			phone: "",
			address: "",
			orchids: [],
		};
		setFormData(fData);
		db.put(fData)
			.then((res) => {
				// console.log("res", res);
			})
			.then(() => {
				db.get(id).then((res) => {
					setExhibitor(res);
				});
			})

			.catch((err) => {
				console.log("err", err);
			});
		setMode("edit");
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
		setChanged(true);
	};

	const handleSubmit = (event) => {
		// console.log("formData:", formData);
		event.preventDefault();
		db.put(formData)
			.then((res) => {
				// console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
		setChanged(false);
	};

	const addOrchid = () => {
		formData.orchids.push({
			entry:
				exhibitor._id +
				"-" +
				(exhibitor.orchids.length + 1).toString().padStart(2, "0"),
		});
		db.put(formData)
			.then((res) => {
				// console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
		setOrchid(formData.orchids[formData.orchids.length - 1]);

		console.log("addOrchid");
	};

	return (
		<div className="flex w-full gap-8">
			<div className="flex flex-col w-1/4 pl-6 my-6 overflow-hidden">
				<div className="flex flex-col w-full gap-2">
					<div className="flex flex-row justify-between">
						<div>Exhibitor List</div>
						<button
							className="text-sm capitalize btn btn-xs btn-secondary"
							onClick={() => addExhibitor()}
						>
							Add Exhibitor
						</button>
					</div>

					<div>
						{exhibitors.map((exhibitor, key) => {
							if (exhibitor._id !== "show_info")
								return (
									<div
										className="flex border"
										key={key}
										onClick={() => {
											setExhibitor(exhibitor);
											setMode("view");
										}}
									>
										<div className="p-2 border-r">{exhibitor._id}</div>

										<div className="p-2 whitespace-nowrap">
											{exhibitor.type === "ind" || exhibitor.org === ""
												? exhibitor.fname + " " + exhibitor.lname
												: exhibitor.org}
										</div>
									</div>
								);
						})}
					</div>
				</div>
			</div>
			<div className="flex flex-col flex-grow w-3/4 gap-4 pr-6 my-6 ">
				{formData._id && (
					<>
						<form
							className={`flex flex-col items-center justify-start w-full border border-gray-300 rounded-md shadow-md ${
								mode === "edit" && "bg-slate-100"
							}`}
							onSubmit={handleSubmit}
						>
							<div className="flex justify-between w-full px-4 pt-2">
								<div className="flex justify-start ">
									<div className="flex justify-start text-xl font-bold capitalize">
										{!formData.org && !formData.fname && !formData.lname && (
											<div>Add Name / Organization</div>
										)}
										{formData.org
											? formData.org
											: formData.fname + " " + formData.lname}
									</div>
								</div>
								<div className="flex justify-start p-2">
									{mode === "view" && (
										<div
											className="flex btn btn-xs"
											onClick={() => setMode("edit")}
										>
											Click to Edit
											<AiOutlineEdit size={25} />
										</div>
									)}
									{mode === "edit" && (
										<div
											type="submit"
											className="flex btn btn-xs hover:cursor-pointer "
											onClick={() => setMode("view")}
										>
											<AiOutlineSave size={25} /> & View
										</div>
									)}
								</div>
							</div>
							<div className="flex items-end justify-center w-full gap-2 px-4 ">
								<div className="flex w-1/4 gap-2">
									<label className="flex flex-col w-1/3">
										<span className=" label-text">EX#</span>
										<input
											type="text"
											name="_id"
											placeholder="Type here"
											value={formData._id}
											className="p-2 text-start input input-bordered"
											autoComplete="off"
											readOnly
										/>
									</label>
									<label className="flex flex-col w-2/3">
										<span className="label-text">Type</span>
										{mode === "view" ? (
											<input
												type="text"
												name="type"
												placeholder="select"
												value={formData.type}
												className="w-full max-w-xs p-2 input input-bordered"
												autoComplete="off"
												readOnly
											/>
										) : (
											<select
												className="p-2 select select-bordered"
												placeholder="select"
												name="type"
												value={formData.type}
												onChange={handleChange}
												onBlur={changed ? handleSubmit : null}
											>
												<option value="">Select</option>
												<option value="ind">Individual</option>
												<option value="soc">Society</option>
												<option value="com">Commercial</option>
											</select>
										)}
									</label>
								</div>

								<label className="flex flex-col w-1/4">
									<span className="label-text">Organization</span>
									<input
										type="text"
										name="org"
										placeholder="optional"
										value={formData.org}
										onChange={handleChange}
										onBlur={changed ? handleSubmit : null}
										className="w-full max-w-xs p-2 input input-bordered"
										autoComplete="off"
										readOnly={mode === "view"}
									/>
								</label>
								<label className="flex flex-col w-1/4">
									<span className="label-text">First Name</span>
									<input
										type="text"
										name="fname"
										placeholder="required"
										value={formData.fname}
										onChange={handleChange}
										onBlur={changed ? handleSubmit : null}
										className="w-full max-w-xs p-2 input input-bordered"
										autoComplete="off"
										readOnly={mode === "view"}
									/>
								</label>
								<label className="flex flex-col w-1/4">
									<span className="label-text">Last Name</span>
									<input
										type="text"
										name="lname"
										placeholder="required"
										value={formData.lname}
										onChange={handleChange}
										onBlur={changed ? handleSubmit : null}
										className="w-full max-w-xs p-2 input input-bordered"
										autoComplete="off"
										readOnly={mode === "view"}
									/>
								</label>
							</div>
							<div className="flex items-end justify-center w-full gap-2 px-4 pt-2 pb-4">
								<label className="flex flex-col w-1/4">
									<span className="label-text">Email</span>
									<input
										type="email"
										name="email"
										placeholder="required"
										value={formData.email}
										onChange={handleChange}
										onBlur={changed ? handleSubmit : null}
										className="w-full max-w-xs p-2 input input-bordered"
										autoComplete="off"
										readOnly={mode === "view"}
									/>
								</label>
								<label className="flex flex-col w-1/4 ">
									<span className="label-text">Phone</span>
									<input
										type="phone"
										name="phone"
										placeholder="required"
										value={formData.phone}
										onChange={handleChange}
										onBlur={changed ? handleSubmit : null}
										className="w-full max-w-xs p-2 input input-bordered"
										autoComplete="off"
										readOnly={mode === "view"}
									/>
								</label>
								<label className="flex flex-col w-1/2">
									<span className="label-text">Address</span>
									<div className="flex w-full h-12 px-2 bg-white border border-gray-300 rounded-lg">
										<input
											className="flex w-full"
											name="address"
											placeholder="input single line address"
											value={formData.address}
											onChange={handleChange}
											onBlur={changed ? handleSubmit : null}
											readOnly={mode === "view"}
										/>
									</div>
								</label>
							</div>
						</form>
						<div className="flex flex-row justify-between gap-4 ">
							<div className="flex flex-col gap-4">
								<div
									className="flex flex-col normal-case bg-white border-gray-300 btn "
									onClick={addOrchid}
								>
									<div>Add</div>
									<div>Orchid</div>
								</div>
								{exhibitor.orchids.length > 0 && (
									<div
										className="flex flex-col bg-white border-gray-300 btn "
										onClick={() => setOrchid({})}
									>
										<div>Orchids</div>
									</div>
								)}
							</div>
							<div className="flex flex-col flex-grow">
								{orchid.entry && (
									<Orchid exhibitor={exhibitor} orchid={orchid} />
								)}
								{exhibitor.orchids.length > 0 && (
									<div className="flex flex-col flex-grow pr-6">
										{exhibitor.orchids.map((orchid, key) => {
											return (
												<div key={key} onClick={() => setOrchid(orchid)}>
													{orchid.entry}
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Exhibitor;
