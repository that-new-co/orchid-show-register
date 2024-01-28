import React, { useEffect, useState } from "react";

import Orchid from "./orchid";
import OrchidList from "./orchid-list";

import { AiOutlineSave, AiOutlineEdit } from "react-icons/ai";

const Exhibitor = ({
	exhibitor,
	orchidIndex,
	setOrchidIndex,
	update,
	classes,
}) => {
	const [formData, setFormData] = useState({});
	const [mode, setMode] = useState("view");

	useEffect(() => {
		setFormData({ ...formData, ...exhibitor });
	}, [exhibitor, orchidIndex]);

	const handleUpdate = (event, formData) => {
		event.preventDefault();
		update(formData);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const addOrchid = (exhibitor) => {
		exhibitor.orchids.push({
			entry:
				exhibitor._id +
				"-" +
				(exhibitor.orchids.length + 1).toString().padStart(2, "0"),
			type: "",
			class: "",
			space: "",
			name: "",
			size: "",
			color: "",
		});
		update(exhibitor);
		setOrchidIndex(exhibitor.orchids.length - 1);
	};

	if (!formData._id) return null;

	return (
		<>
			<form
				className={`flex flex-col items-center justify-start w-full border border-gray-300 rounded-md shadow-md ${
					mode === "edit" && "bg-slate-100"
				}`}
				onSubmit={(event) => handleUpdate(event, formData)}
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
							<div className="flex btn btn-xs" onClick={() => setMode("edit")}>
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
									onBlur={(event) => handleUpdate(event, formData)}
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
							onBlur={(event) => handleUpdate(event, formData)}
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
							onBlur={(event) => handleUpdate(event, formData)}
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
							onBlur={(event) => handleUpdate(event, formData)}
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
							onBlur={(event) => handleUpdate(event, formData)}
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
							onBlur={(event) => handleUpdate(event, formData)}
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
								onBlur={(event) => handleUpdate(event, formData)}
								readOnly={mode === "view"}
							/>
						</div>
					</label>
				</div>
			</form>
			<div className="flex flex-row justify-between w-full gap-4 overflow-hidden">
				<div className="flex flex-col w-1/6 gap-4 overflow-hidden">
					<div
						className="flex flex-col w-full normal-case bg-white border-gray-300 btn "
						onClick={() => addOrchid(formData)}
					>
						<div>Add</div>
						<div>Orchid</div>
					</div>
					{exhibitor.orchids.length > 0 && (
						<div
							className="flex flex-col w-full bg-white border-gray-300 btn "
							onClick={() => setOrchidIndex()}
						>
							<div>Orchid</div>
							<div>List</div>
						</div>
					)}
					{orchidIndex > -1 &&
						exhibitor.orchids.map((orchid, key) => {
							return (
								<div
									key={key}
									className="flex flex-col w-full normal-case bg-white border-gray-300 btn "
									onClick={() => setOrchidIndex(key)}
								>
									<div>Entry</div>
									<div>{orchid.entry}</div>
								</div>
							);
						})}
				</div>
				<div className="flex flex-col w-5/6 overflow-hidden">
					{orchidIndex > -1 && exhibitor.orchids.length !== 0 && (
						<Orchid
							exhibitor={exhibitor}
							orchidIndex={orchidIndex}
							classes={classes}
							update={update}
						/>
					)}
					{orchidIndex === undefined && (
						<OrchidList
							exhibitor={exhibitor}
							orchidIndex={orchidIndex}
							setOrchidIndex={setOrchidIndex}
						/>
					)}
				</div>
			</div>
		</>
	);
};
export default Exhibitor;
