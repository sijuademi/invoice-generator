import ThemeToggle from "./ThemeToggle";

function Sidebar() {
	return (
		<div className="bg-brand-sidebar lg:h-screen lg:rounded-r-3xl lg:flex lg:flex-col lg:items-center grid grid-cols-[4.5rem_auto_5rem] ">
			<div className="bg-brand-purple lg:w-full lg:h-26 md:h-20 h-18 rounded-r-3xl flex flex-col justify-end">
				<div className="bg-brand-purple-light w-full lg:h-13 h-9 md:h-9 flex justify-center rounded-tl-3xl relative">
					<div
						className="lg:h-10 lg:w-10 h-7 w-7 bg-white rounded-full -rotate-90 absolute z-10 -lg:top-5 -top-3.5"
						style={{
							clipPath:
								"polygon(100% 30%, 50% 50%, 100% 70%, 100% 100%, 0% 100%, 0% 0%, 100% 0%)",
						}}
					/>
				</div>
			</div>

			<div className="flex-1 flex lg:flex-col">
				<div className="text-white font-2xl flex-1"></div>

				<div className="flex items-center justify-center">
					<ThemeToggle />
				</div>
			</div>

			<div className="lg:border-t border-l  border-light-muted w-full flex justify-center items-center lg:py-6">
				<img src="Oval.png" alt="Avatar" className="h-10 w-10" />
			</div>
		</div>
	);
}

export default Sidebar;
