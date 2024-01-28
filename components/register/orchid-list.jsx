const OrchidList = ({ exhibitor, orchidIndex, setOrchidIndex }) => {
	return (
		<>
			<div className="flex flex-row justify-between p-2 border border-gray-300 rounded-md">
				<div className="flex w-[12%]">Entry#</div>
				<div className="flex w-[12%]">Class#</div>
				<div className="flex w-[12%]">Space#</div>
				<div className="flex w-[40%]">Orchid Name</div>
				<div className="flex w-[12%]">Size</div>
				<div className="flex w-[12%]">Color</div>
			</div>

			{exhibitor.orchids.length > 0 && (
				<div className="flex flex-col flex-grow overflow-auto no-scrollbar">
					{exhibitor.orchids.map((orchid, key) => {
						return (
							<div
								key={key}
								onClick={() => setOrchidIndex(key)}
								className="flex flex-row justify-between p-2 border border-gray-300 rounded-md hover:bg-gray-100"
							>
								<div className="flex w-[12%] border">{orchid.entry}</div>
								<div className="flex w-[12%] border">{orchid.class}</div>
								<div className="flex w-[12%] border">{orchid.space}</div>
								<div className="flex w-[40%] border">{orchid.name}</div>
								<div className="flex w-[12%] border">{orchid.size}</div>
								<div className="flex w-[12%] border">{orchid.color}</div>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};
export default OrchidList;
