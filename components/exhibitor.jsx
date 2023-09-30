import { useState, useEffect } from "react";

import { usePouch } from "use-pouchdb";

const Exhibitor = () => {
	const db = usePouch();
	const [formData, setFormData] = useState({
		id: "",
		num: "",
		type: "",
		org: "",
		lname: "",
		fname: "",
	});
	const [nextId, setNextId] = useState(1);
	const [exhibitors, setExhibitors] = useState([]);

	useEffect(() => {
		db.rel
			.find("exhibitor")
			.then((res) => {
				setExhibitors(res.exhibitors);
			})
			.catch((err) => {
				if (err.status === 404) {
					setExhibitors([]);
				}
			});
	}, []);

	useEffect(() => {
		console.log("exhibitors", exhibitors);
		if (exhibitors.length === 0) {
			setNextId(1);
			return;
		}
		setNextId(exhibitors[exhibitors.length - 1].id + 1);
	}, [exhibitors]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("formData:", formData);
		db.rel.save("exhibitor", {
			id: nextId,
			num: formData.num,
			type: formData.type,
			org: formData.org,
			lname: formData.lname,
			fname: formData.fname,
		});
	};

	return (
		<div className="flex w-full">
			<div className="flex flex-col w-1/3 pl-6 pr-3 my-6 overflow-hidden border-r">
				<div className="flex flex-col w-full">
					<div>Exhibitors</div>

					<div>
						{exhibitors.map((exhibitor, key) => {
							return (
								<div className="flex border" key={key}>
									<div className="p-2 border-r">{exhibitor.id}</div>
									<div className="p-2">
										{exhibitor.type === "ind"
											? exhibitor.fname + " " + exhibitor.lname
											: exhibitor.org}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="flex flex-col w-2/3">
				<form
					className="flex flex-col items-center justify-start w-full "
					onSubmit={handleSubmit}
				>
					<div className="flex items-end justify-center w-full gap-2 p-4 ">
						<label className="flex flex-col">
							<span className="label-text">#</span>
							<input
								type="text"
								name="id"
								placeholder="Type here"
								value={nextId}
								className="w-full max-w-[100px] p-2 input input-bordered"
								autoComplete="off"
								readOnly
							/>
						</label>
						<label className="flex flex-col w-48">
							<span className="label-text">Type</span>
							<select
								className="w-48 p-2 select select-bordered"
								placeholder="Select"
							>
								<option disabled="disabled" selected="selected">
									Select
								</option>
								<option value="ind">Individual</option>
								<option value="tab">Table</option>
							</select>
						</label>

						<label className="flex flex-col">
							<span className="label-text">Organization</span>
							<input
								type="text"
								name="org"
								placeholder="Type here"
								value={formData.org}
								onChange={handleChange}
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
							/>
						</label>
						<label className="flex flex-col">
							<span className="label-text">Last Name</span>
							<input
								type="text"
								name="lname"
								placeholder="Type here"
								value={formData.lname}
								onChange={handleChange}
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
							/>
						</label>
						<label className="flex flex-col">
							<span className="label-text">First Name</span>
							<input
								type="text"
								name="fname"
								placeholder="Type here"
								value={formData.fname}
								onChange={handleChange}
								className="w-full max-w-xs p-2 input input-bordered"
								autoComplete="off"
							/>
						</label>

						<button className="btn btn-ghost" type="submit">
							Add Exhibitor
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Exhibitor;
