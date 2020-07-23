export const getCurrentDateTime = () => {
    const dateTimeNow = new Date();
    return `${dateTimeNow.toLocaleDateString("pt-BR")} at ${dateTimeNow.toLocaleTimeString("pt-BR")}`;
};

export const convertDateToUnix = date => {
    return date.getTime() / 1000; 
}

export const convertUnixToDate = unix => {
    return new Date(unix*1000);
}

export const getCurrentDateTimeSubtractedNDays = (n) => {
    let dateTimeNow = new Date();
    console.log(convertUnixToDate(dateTimeNow.setDate(dateTimeNow.getDate() - n))); 
}