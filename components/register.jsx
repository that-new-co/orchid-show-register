import { useState } from "react";

const register = () => {
	const [formData, setFormData] = useState({
		x_type: "",
		x_name: "",
		x_email: "",
		x_phone: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formData);
	};
	return (
		<form
			className="flex flex-col items-center justify-start "
			onSubmit={handleSubmit}
		>
			<div className="flex p-4 font-bold">Register an Exhibitor</div>
			<div className="flex">
				<div className="w-full max-w-[150px] m-2 form-control">
					<label className="label">
						<span className="label-text">Exhibitor Type</span>
						<select
							className="w-full max-w-xs p-2 select select-bordered"
							name="x_type"
							value={formData.x_type}
							onChange={handleChange}
							autoComplete="off"
						>
							<option disabled="disabled" selected="selected">
								Select
							</option>
							<option value="plant">Individual</option>
							<option value="table">Table</option>
						</select>
					</label>
				</div>
				<div className="w-full max-w-xs m-2 form-control">
					<label className="label">
						<span className="label-text">Exhibitor Name</span>
						<input
							type="text"
							name="x_name"
							placeholder="Type here"
							value={formData.x_name}
							onChange={handleChange}
							className="w-full max-w-xs p-2 input input-bordered"
							autoComplete="off"
						/>
					</label>
				</div>

				<button type="submit">Submit</button>
			</div>
		</form>
	);
};

export default register;
