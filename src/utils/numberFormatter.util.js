export const numericValueFormatter = value => {
    return Number(value) > 1
    ? Number(value).toLocaleString("pt-BR")
    : Number(value).toFixed(6).replace(".", ",")
};
  
export const abbreviateNumber = value => {
    let n = Number(value);
    if (n < 1e3) n = n.toLocaleString("pt-BR");
    if (n >= 1e3 && n < 1e6) n = ((n / 1e3).toFixed(1) + "K");
    if (n >= 1e6 && n < 1e9) n = ((n / 1e6).toFixed(1) + "M");
    if (n >= 1e9 && n < 1e12) n = ((n / 1e9).toFixed(1) + "B");
    return n.replace(".", ",")
};

export const percentageFormatter = value => {
    return (Number(value) * 100).toFixed(2).replace(".", ",") + "%";
}