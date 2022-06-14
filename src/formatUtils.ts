export const formatNumberAsUSD = (
    value: number,
    minimumFractionDigits = 0
): string =>
    new Intl.NumberFormat(undefined, USDFormat(minimumFractionDigits)).format(
        value
    );

export const USDFormat = (minimumFractionDigits = 0) => ({
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits,
});
