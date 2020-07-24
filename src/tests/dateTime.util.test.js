const getCurrentDateTime = () => {
  const dateTimeNow = new Date();
  return `${dateTimeNow.toLocaleDateString("pt-BR")} at ${dateTimeNow.toLocaleTimeString("pt-BR")}`;
};

describe('Test method of generating a string with the current date and time', () => {
  it('The method is self-sufficient', () => {
    const currentDateTime = getCurrentDateTime();
    expect(currentDateTime).toBeDefined();
    expect(currentDateTime).toBeTruthy(); 
    expect(currentDateTime).toMatch(/at/);
  });
});
