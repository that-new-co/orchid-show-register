import { useState, useEffect } from "react";

import Orchid from "@/components/exhibitor/orchid";

import { useAllDocs, usePouch } from "use-pouchdb";
import { set } from "idb-keyval";

const Exhibitor = () => {
	const db = usePouch();
	const osr_data = useAllDocs({
		include_docs: true,
		startkey: "1",
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
	});
	const [nextId, setNextId] = useState(1);
	const [exhibitors, setExhibitors] = useState([]);
	const [exhibitor, setExhibitor] = useState({}); // [id, num, type, org, lname, fname, email, phone, street, city, state, zip]
	const [orchids, setOrchids] = useState([]);
	const [orchid, setOrchid] = useState({}); // [id, num, type, org, lname, fname, email, phone, street, city, state, zip]
	const [mode, setMode] = useState("add"); // add, edit, delete
	const [addingOrchid, setAddingOrchid] = useState(false);

	useEffect(() => {
		if (osr_data.rows.length === 0) return;
		console.log("osr_data", osr_data);
		setExhibitors(osr_data.rows.map((row) => row.doc));
		setFormData({
			...formData,
			_id: +osr_data.rows[osr_data.rows.length - 1].doc._id + 1,
		});
	}, [osr_data]);

	useEffect(() => {
		if (exhibitors.length === 0) return;
		console.log("exhibitors", exhibitors);
	}, [exhibitors]);

	useEffect(() => {
		if (!exhibitor) return;
		setFormData({ ...formData, ...exhibitor });
	}, [exhibitor]);

	useEffect(() => {
		if (osr_data.rows.length === 0) return;
		if (mode === "add") {
			setFormData({
				...formData,
				_id: +osr_data.rows[osr_data.rows.length - 1].doc._id + 1,
				_rev: "",
				type: "",
				org: "",
				lname: "",
				fname: "",
				email: "",
				phone: "",
				address: "",
			});
		} else if (mode === "edit") {
			setFormData({
				...formData,
				_id: exhibitor._id,
				_rev: exhibitor._rev,
				type: exhibitor.type,
				org: exhibitor.org,
				lname: exhibitor.lname,
				fname: exhibitor.fname,
				email: exhibitor.email,
				phone: exhibitor.phone,
				address: exhibitor.address,
			});
		}
	}, [mode]);

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
				_rev: formData._rev,
				num: formData.num,
				type: formData.type,
				org: formData.org,
				lname: formData.lname,
				fname: formData.fname,
				email: formData.email,
				phone: formData.phone,
				address: formData.address,
			})
				.then((res) => {
					console.log("res", res);
				})
				.catch((err) => {
					console.log("err", err);
				});
		} else if (mode === "edit") {
			db.put(formData)
				.then((res) => {
					console.log("res", res);
				})
				.catch((err) => {
					console.log("err", err);
				});
		}
	};

	if (!formData._id) return null;

	console.log("formData", formData);

	return (
		<div className="flex w-full gap-6">
			<div className="flex flex-col w-1/4 pl-6 my-6 overflow-hidden">
				<div className="flex flex-col w-full">
					<div className="flex flex-row justify-between">
						<div>Exhibitor List</div>
						<button
							className="capitalize btn btn-sm btn-secondary"
							onClick={() => setMode("add")}
						>
							Add
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
											setMode("edit");
										}}
									>
										<div className="p-2 border-r">{exhibitor._id}</div>
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
									// onClick={() => setAddingOrchid(true)}
								>
									Add Orchid
								</div>
							)}
						</div>
					</div>
					<div className="flex items-end justify-center w-full gap-2 px-4 ">
						<div className="flex w-1/4 gap-2">
							<label className="flex flex-col w-1/4">
								<span className=" label-text">ID</span>
								<input
									type="text"
									name="_id"
									placeholder="Type here"
									value={formData._id}
									className="p-2 text-center input input-bordered"
									autoComplete="off"
									readOnly
								/>
							</label>
							<label className="flex flex-col w-3/4">
								<span className="label-text">Type</span>
								<select
									className="p-2 select select-bordered"
									placeholder="Select"
									name="type"
									value={formData.type}
									onChange={handleChange}
								>
									<option disabled="disabled">Select</option>
									<option value="ind">Individual</option>
									<option value="soc">Society</option>
									<option value="com">Commercial</option>
								</select>
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
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
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
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
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
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
							/>
						</label>
					</div>
					<div className="flex items-end justify-center w-full gap-2 p-4 ">
						<label className="flex flex-col w-1/4">
							<span className="label-text">Email</span>
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
						<label className="flex flex-col w-1/4 ">
							<span className="label-text">Phone</span>
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
						<label className="flex flex-col w-1/2">
							<span className="label-text">Address</span>
							<div className="flex w-full h-12 px-2 border border-gray-300 rounded-lg">
								<input
									className="flex w-full"
									name="address"
									placeholder="input single line address"
									value={formData.address}
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
