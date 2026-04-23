import { ChevronDown, Plus, PlusIcon } from "lucide-react";
import Button from "./ui/Button";
import FilterDropdown from "./invoice/FilterDropdown";
import { useInvoices } from "../contextapi/InvoiceContext";
import { useState } from "react";

function Header({ setDrawerOpen }) {
	const { filter, setFilter } = useInvoices();

	return (
		<div className="flex justify-between items-baseline py-9 lg:py-20 md:py-16">
			<div>
				<h2 className="text-light-heading font-bold capitalize text-2xl md:text-4xl">
					invoices
				</h2>
				<p className="text-light-body dark:text-secondary text-sm">
					<span className="md:hidden block">X invoices</span>
					<span className="hidden md:block">There are 7 total invoices</span>
				</p>
			</div>
			<div className="flex text-light-heading gap-4 md:gap-6 items-center">
				<FilterDropdown filter={filter} onChange={setFilter} />
				<Button
					onClick={() => setDrawerOpen(true)}
					className="bg-brand-purple flex gap-2 md:gap-3 items-center"
					// type="btn-primary"
				>
					<Plus className="h-4 w-4 md:h-6 md:w-6 bg-white rounded-full text-brand-purple" />{" "}
					<div className="pt-1 text-white">
						<span className="hidden md:block">New Invoice</span>{" "}
						<span className=" md:hidden">New</span>
					</div>
				</Button>
			</div>
		</div>
	);
}

export default Header;
