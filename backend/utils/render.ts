export const renderCurrency = (amount: number | string = 0, currency: string = "NGN"): string => new Intl.NumberFormat("en-GB", {
   style: "currency",
   currency,
   currencyDisplay: "narrowSymbol",
   minimumFractionDigits: 0,
   maximumFractionDigits: 2,
}).format(parseFloat(amount?.toString() ?? 0) || 0);

export const renderNumber = (amount: number | string = 0): string => new Intl.NumberFormat("en-GB", {
   minimumFractionDigits: 0,
   maximumFractionDigits: 2,
}).format(parseFloat(amount.toString()) || 0);