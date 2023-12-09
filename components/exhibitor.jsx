import { useState, useEffect } from "react";

import Orchid from "@/components/exhibitor/orchid";

import { useAllDocs, usePouch } from "use-pouchdb";

const Exhibitor = () => {
	const db = usePouch();
	const osr_data = useAllDocs({
		include_docs: true,
		startkey: "1",
	});
	const [formData, setFormData] = useState({
		_id: "-",
		type: "",
		org: "",
		lname: "",
		fname: "",
		email: "",
		phone: "",
		street: "",
		city: "",
		state: "",
		zip: "",
	});
	const [nextId, setNextId] = useState(1);
	const [exhibitors, setExhibitors] = useState([]);
	const [exhibitor, setExhibitor] = useState({}); // [id, num, type, org, lname, fname, email, phone, street, city, state, zip]
	const [orchids, setOrchids] = useState([]);
	const [orchid, setOrchid] = useState({}); // [id, num, type, org, lname, fname, email, phone, street, city, state, zip]
	const [mode, setMode] = useState("add"); // add, edit, delete
	const [addingOrchid, setAddingOrchid] = useState(false);

	useEffect(() => {
		console.log("osr_data", osr_data);
		if (osr_data.length === 0) return;
		setExhibitors(osr_data.rows.map((row) => row.doc));
	}, [osr_data]);

	useEffect(() => {
		if (!exhibitors) return;
		console.log("exhibitors", exhibitors);
	}, [exhibitors]);

	// useEffect(() => {
	// 	console.log("exhibitor", exhibitor);
	// 	setFormData(exhibitor);
	// }, [exhibitor]);

	// useEffect(() => {
	// 	console.log("exhibitors", exhibitors);
	// 	if (exhibitors.length === 0) {
	// 		setNextId(1);
	// 		return;
	// 	}
	// 	setNextId(exhibitors[exhibitors.length - 1].id + 1);
	// }, [exhibitors]);

	// useEffect(() => {
	// 	console.log("orchids,", orchids);
	// }, [orchids]);

	// useEffect(() => {
	// 	setFormData((prevFormData) => ({ ...prevFormData, _id: nextId }));
	// }, [nextId]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("formData:", formData);
		if (mode === "add") {
			db.put({
				_id: formData._id.toString(),
				num: formData.num,
				type: formData.type,
				org: formData.org,
				lname: formData.lname,
				fname: formData.fname,
				email: formData.email,
				phone: formData.phone,
				street: formData.street,
				city: formData.city,
				state: formData.state,
				zip: formData.zip,
			})
				.then((res) => {
					console.log("res", res);
				})
				.catch((err) => {
					console.log("err", err);
				});
		} else if (mode === "edit") {
			const exhibitorDoc = {
				...exhibitor,
				type: formData.type,
				org: formData.org,
				lname: formData.lname,
				fname: formData.fname,
				email: formData.email,
				phone: formData.phone,
				street: formData.street,
				city: formData.city,
				state: formData.state,
				zip: formData.zip,
			};
			db.put(exhibitorDoc)
				.then((res) => {
					console.log("res", res);
				})
				.catch((err) => {
					console.log("err", err);
				});
		}
	};

	if (!formData) return null;

	return (
		<div className="flex w-full gap-6">
			<div className="flex flex-col w-1/4 pl-6 my-6 overflow-hidden">
				<div className="flex flex-col w-full">
					<div>Exhibitor List</div>

					<div>
						{exhibitors.map((exhibitor, key) => {
							return (
								<div
									className="flex border"
									key={key}
									onClick={() => {
										setExhibitor(exhibitor);
										setMode("edit");
									}}
								>
									<div className="p-2 border-r">{exhibitor.id}</div>
									<div className="p-2">
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
			<div className="flex flex-col flex-grow w-3/4 pr-6 my-6">
				<form
					className="flex flex-col items-center justify-start w-full border border-gray-300 rounded-md shadow-md "
					onSubmit={handleSubmit}
				>
					<div className="flex justify-between w-full">
						<div className="flex justify-start w-2/5 p-2 text-xl font-bold capitalize">
							{mode} Exhibitor
						</div>
						<div className="flex justify-center w-1/5 p-2">
							<button
								className="capitalize btn btn-sm btn-secondary"
								type="submit"
							>
								{mode === "edit" ? "Update" : mode}
							</button>
						</div>
						<div className="flex justify-end w-2/5 p-2 ">
							{mode === "edit" && (
								<div
									className="capitalize border-gray-300 btn btn-sm btn-ghost"
									onClick={() => setAddingOrchid(true)}
								>
									Add Orchid
								</div>
							)}
						</div>
					</div>
					<div className="flex items-end justify-center w-full gap-2 px-4 ">
						<label className="flex flex-col w-fit">
							<span className="pb-1 text-center label-text">ID</span>
							<input
								type="text"
								name="_id"
								placeholder="Type here"
								value={formData._id}
								className="w-12 p-2 text-center input input-bordered"
								autoComplete="off"
								readOnly
							/>
						</label>
						<label className="flex flex-col w-fit">
							<span className="px-2 pb-1 label-text">Type</span>
							<select
								className="p-2 w-28 select select-bordered"
								placeholder="Select"
								name="type"
								value={formData.type}
								onChange={handleChange}
							>
								<option disabled="disabled">Select</option>
								<option value="ind">Individual</option>
								<option value="tab">Table</option>
							</select>
						</label>

						<label className="flex flex-col flex-grow">
							<span className="px-2 pb-1 label-text">Organization</span>
							<input
								type="text"
								name="org"
								placeholder="optional"
								value={formData.org}
								onChange={handleChange}
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
							/>
						</label>
						<label className="flex flex-col flex-grow">
							<span className="label-text">Last Name</span>
							<input
								type="text"
								name="lname"
								placeholder="required"
								value={formData.lname}
								onChange={handleChange}
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
							/>
						</label>
						<label className="flex flex-col flex-grow">
							<span className="label-text">First Name</span>
							<input
								type="text"
								name="fname"
								placeholder="required"
								value={formData.fname}
								onChange={handleChange}
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
							/>
						</label>
					</div>
					<div className="flex items-end justify-center w-full gap-2 p-4 ">
						<label className="flex flex-col flex-grow w-1/4">
							<span className="px-2 pb-1 label-text">Email</span>
							<input
								type="email"
								name="email"
								placeholder="required"
								value={formData.email}
								onChange={handleChange}
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
							/>
						</label>
						<label className="flex flex-col flex-grow w-1/5 ">
							<span className="px-2 pb-1 label-text">Phone Number</span>
							<input
								type="phone"
								name="phone"
								placeholder="required"
								value={formData.phone}
								onChange={handleChange}
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
							/>
						</label>
						<label className="flex flex-col flex-grow ">
							<span className="px-2 pb-1 label-text">Address</span>
							<div className="flex w-full h-12 px-2 border border-gray-300 rounded-lg">
								<input
									className="flex w-1/3"
									name="street"
									placeholder="street"
									value={formData.street}
									onChange={handleChange}
								/>
								<input
									className="flex w-1/3"
									name="city"
									placeholder="city"
									value={formData.city}
									onChange={handleChange}
								/>
								<input
									className="flex w-1/6"
									name="state"
									placeholder="state"
									value={formData.state}
									onChange={handleChange}
								/>
								<input
									className="flex w-1/6"
									name="zip"
									placeholder="zip"
									value={formData.zip}
									onChange={handleChange}
								/>
							</div>
						</label>
					</div>
				</form>
				{addingOrchid && (
					<Orchid
						exhibitor={exhibitor}
						addingOrchid={addingOrchid}
						setAddingOrchid={setAddingOrchid}
					/>
				)}
				<div className="flex flex-col flex-grow w-3/4 pr-6 my-6">
					{orchids &&
						orchids.map((orchid, key) => {
							if (orchid.exhibitor === exhibitor.id)
								return (
									<div key={key}>
										{orchid.id}: {orchid.orchid}
									</div>
								);
						})}
				</div>
			</div>
		</div>
	);
};

export default Exhibitor;
