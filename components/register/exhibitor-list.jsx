import { set } from "idb-keyval";

const ExhibitorList = ({
	exhibitors,
	setExhibitor,
	addExhibitor,
	setOrchidIndex,
	downloadList,
}) => {
	return (
		<div className="flex flex-col overflow-hidden">
			<div className="flex flex-col w-full gap-2 overflow-hidden">
				<div className="flex flex-row justify-between">
					<div>Exhibitor List</div>
					<button
						className="text-sm capitalize btn btn-xs btn-secondary"
						onClick={addExhibitor}
					>
						Add Exhibitor
					</button>
				</div>

				<div className="flex flex-col overflow-auto no-scrollbar">
					{exhibitors.map((exhibitor, key) => {
						if (exhibitor._id !== "show_info")
							return (
								<div
									className="flex border"
									key={key}
									onClick={() => {
										setExhibitor(exhibitor);
										setOrchidIndex();
									}}
								>
									<div className="p-2 border-r">{exhibitor.num}</div>

									<div className="p-2 whitespace-nowrap">
										{exhibitor.type === "ind" || exhibitor.org === ""
											? exhibitor.fname + " " + exhibitor.lname
											: exhibitor.org}
									</div>
								</div>
							);
					})}
				</div>
				<button
					className="text-sm capitalize btn btn-xs btn-secondary"
					onClick={downloadList}
				>
					Download Exhibitor List
				</button>
			</div>
		</div>
	);
};
export default ExhibitorList;
