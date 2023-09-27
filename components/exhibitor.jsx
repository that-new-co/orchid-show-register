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
	const [nextId, setNextId] = useState(0);
	const [exhibitors, setExhibitors] = useState([]);

	useEffect(() => {
		db.rel
			.find("exhibitor")
			.then((res) => {
				setTrophies(res.trophies);
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
		db.rel
			.find("exhibitor")
			.then((res) => {
				const nextId = res.exhibitors[res.exhibitors.length - 1].id + 1;
				return db.rel.save("exhibitor", {
					id: nextId,
					num: formData.num,
					name: formData.name,
					sponsor: formData.sponsor,
				});
			})
			.then((res) => {
				db.rel.find("exhibitor").then((res) => {
					setExhibitors(res.exhibitors);
				});
			})
			.catch((err) => {
				console.log("err:", err);
			});
	};

	return (
		<>
			<form
				className="flex flex-col items-center justify-start w-full "
				onSubmit={handleSubmit}
			>
				<div className="flex p-4 font-bold">Add Exhibitor</div>
				<div className="flex items-end justify-center w-full gap-2 p-4 ">
					<label className="flex flex-col">
						<span className="label-text">ID</span>
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
					<label className="flex flex-col">
						<span className="label-text">Exhibitor #</span>
						<input
							type="text"
							name="num"
							placeholder="Type here"
							value={formData.num}
							onChange={handleChange}
							className="w-full max-w-[100px] p-2 input input-bordered"
							autoComplete="off"
						/>
					</label>

					<label className="flex flex-col">
						<span className="label-text">Type</span>
						<input
							type="text"
							name="type"
							placeholder="Type here"
							value={formData.type}
							onChange={handleChange}
							className="w-full max-w-xs p-2 input input-bordered"
							autoComplete="off"
						/>
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
						Add Trophy
					</button>
				</div>
			</form>
			<table className="table max-w-lg px-4 table-xs table-pin-cols">
				<thead>
					<tr>
						<th>ID</th>
						<th>Exhibitor #</th>
						<th>Type</th>
						<th>Organization</th>
						<th>Name: Last</th>
						<th>First</th>
					</tr>
				</thead>

				<tbody>
					{exhibitors.map((exhibitor, key) => {
						return (
							<tr className="border" key={key}>
								<td className="border">{exhibitor.id}</td>
								<td className="border">{exhibitor.num}</td>
								<td className="border">{exhibitor.name}</td>
								<td className="border">{exhibitor.sponsor}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Exhibitor;
