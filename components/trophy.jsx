import next from "next";
import { useState, useEffect } from "react";

import { usePouch } from "use-pouchdb";

const Trophy = () => {
	const db = usePouch();
	const [formData, setFormData] = useState({
		id: "",
		num: "",
		name: "",
		sponsor: "",
	});
	const [nextId, setNextId] = useState(0);
	const [trophies, setTrophies] = useState([]);

	useEffect(() => {
		console.log("trophies", trophies);
		if (trophies.length === 0) return;
		setNextId(trophies[trophies.length - 1].id + 1);
	}, [trophies]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("formData:", formData);
		db.rel
			.find("trophy")
			.then((res) => {
				const nextId = res.trophies[res.trophies.length - 1].id + 1;
				return db.rel.save("trophy", {
					id: nextId,
					num: formData.num,
					name: formData.name,
					sponsor: formData.sponsor,
				});
			})
			.then((res) => {
				db.rel.find("trophy").then((res) => {
					setTrophies(res.trophies);
				});
			})
			.catch((err) => {
				console.log("err:", err);
			});
	};

	return null;

	return (
		<>
			<form
				className="flex flex-col items-center justify-start w-full "
				onSubmit={handleSubmit}
			>
				<div className="flex p-4 font-bold">Add a Trophy</div>
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
						<span className="label-text">Trophy #</span>
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
						<span className="label-text">Trophy Name</span>
						<input
							type="text"
							name="name"
							placeholder="Type here"
							value={formData.name}
							onChange={handleChange}
							className="w-full max-w-xs p-2 input input-bordered"
							autoComplete="off"
						/>
					</label>

					<label className="flex flex-col">
						<span className="label-text">Trophy Sponsor</span>
						<input
							type="text"
							name="sponsor"
							placeholder="Type here"
							value={formData.sponsor}
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
						<th>Trophy #</th>
						<th>Trophy</th>
						<th>Sponsor</th>
					</tr>
				</thead>

				<tbody>
					{trophies.map((trophy, key) => {
						return (
							<tr className="border" key={key}>
								<td className="border">{trophy.id}</td>
								<td className="border">{trophy.num}</td>
								<td className="border">{trophy.name}</td>
								<td className="border">{trophy.sponsor}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Trophy;
