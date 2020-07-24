const numericValueFormatter = (value) => {
  return Number(value) > 1
    ? Number(value).toLocaleString("pt-BR")
    : Number(value).toFixed(6).replace(".", ",");
};

const abbreviateNumber = (value) => {
  let n = Number(value);
  if (n < 1e3) n = n.toLocaleString("pt-BR");
  if (n >= 1e3 && n < 1e6) n = (n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) n = (n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) n = (n / 1e9).toFixed(1) + "B";
  return n.replace(".", ",");
};

const percentageFormatter = (value) => {
  return (Number(value) * 100).toFixed(2).replace(".", ",") + "%";
};

describe("Test number and currency formatting", () => {
  it("Test if a large number is formatted to pt-BR standards", () => {
    const testNumber = numericValueFormatter(1234.56789);
    expect(testNumber).toBeDefined();
    expect(testNumber).toBeTruthy();
    expect(testNumber).toMatch("1,234.568");
  });

  it("Test if a small number is formatted to pt-BR standards", () => {
    const testNumber = numericValueFormatter(0.987654321);
    expect(testNumber).toBeDefined();
    expect(testNumber).toBeTruthy();
    expect(testNumber).toMatch("0,987654");
  });

  it("Test how null is formatted to pt-BR standards", () => {
    const testNumber = numericValueFormatter(null);
    expect(testNumber).toBeDefined();
    expect(testNumber).toBeTruthy();
    expect(testNumber).toMatch("0,000000");
  });

  it("Test how undefined is formatted to pt-BR standards", () => {
    const testNumber = numericValueFormatter(undefined);
    expect(testNumber).toBeDefined();
    expect(testNumber).toBeTruthy();
    expect(testNumber).toMatch("NaN");
  });

});

describe("Test number and currency abbreviation", () => {
  it("Test if a large number is abbreviated to desired standards", () => {
    const testNumber = abbreviateNumber(123456789);
    expect(testNumber).toBeDefined();
    expect(testNumber).toBeTruthy();
    expect(testNumber).toMatch("123,5M");
  });

  it("Test if an average number is abbreviated to desired standards", () => {
    const testNumber = abbreviateNumber(987654);
    expect(testNumber).toBeDefined();
    expect(testNumber).toBeTruthy();
    expect(testNumber).toMatch("987,7K");
  });

  it("Test if a small number is abbreviated to desired standards", () => {
    const testNumber = abbreviateNumber(567.425);
    expect(testNumber).toBeDefined();
    expect(testNumber).toBeTruthy();
    expect(testNumber).toMatch("567,425");
  });

  it("Test how null is formatted", () => {
    const testNumber = abbreviateNumber(null);
    expect(testNumber).toBeDefined();
    expect(testNumber).toBeTruthy();
    expect(testNumber).toMatch("0");
  });

});

describe("Test percent number formatting to percentage", () => {
    it("Test if an average percent number is formatted to desired percentage standards", () => {
      const testNumber = percentageFormatter(1);
      expect(testNumber).toBeDefined();
      expect(testNumber).toBeTruthy();
      expect(testNumber).toMatch("100,00%");
    });
  
    it("Test if a small number is formatted to desired percentage standards", () => {
      const testNumber = percentageFormatter(0.0082415);
      expect(testNumber).toBeDefined();
      expect(testNumber).toBeTruthy();
      expect(testNumber).toMatch("0,82%");
    });
  
    it("Test how null is formatted to desired percentage standards", () => {
      const testNumber = percentageFormatter(null);
      expect(testNumber).toBeDefined();
      expect(testNumber).toBeTruthy();
      expect(testNumber).toMatch("0,00%");
    });
  
    it("Test how undefined is formatted to desired percentage standards", () => {
      const testNumber = percentageFormatter(undefined);
      expect(testNumber).toBeDefined();
      expect(testNumber).toBeTruthy();
      expect(testNumber).toMatch("NaN%");
    });
  
  });
