function EmptyInvoice() {
	return (
		<div className="flex items-center justify-center flex-col">
			<picture>
				<source media="(width < 768px)" srcSet="email-campaign-mobile.png" />
				<source media="(width >= 768px)" srcSet="email-campaign.png" />
				<img src="email-campaign.png" alt="email campaign banner" />
			</picture>

			<h2 className="text-2xl font-bold text-light-heading tracking-tight mt-10.5 md:mt-16.5">
				There is nothhing to see here
			</h2>
			<p className="mt-6 text-sm font-semibold text-light-body wrap text-center mb-36">
				Create an invoice by clicking the <br />
				New button and get started
			</p>
		</div>
	);
}

export default EmptyInvoice;
