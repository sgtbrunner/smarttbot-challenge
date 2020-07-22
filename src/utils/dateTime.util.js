export const getCurrentDateTime = () => {
    const dateTimeNow = new Date();
    return `${dateTimeNow.toLocaleDateString("pt-BR")} at ${dateTimeNow.toLocaleTimeString("pt-BR")}`;
};