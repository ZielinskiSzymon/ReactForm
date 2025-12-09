export const peselToDate = (pesel) => {
  if (!/^\d{11}$/.test(pesel)) return null;
  const yy = parseInt(pesel.slice(0, 2), 10);
  let mm = parseInt(pesel.slice(2, 4), 10);
  const dd = parseInt(pesel.slice(4, 6), 10);
  let fullYear;

  if (mm >= 1 && mm <= 12) {
    fullYear = 1900 + yy;
  } else if (mm >= 21 && mm <= 32) {
    fullYear = 2000 + yy;
    mm -= 20;
  } else if (mm >= 41 && mm <= 52) {
    fullYear = 2100 + yy;
    mm -= 40;
  } else if (mm >= 61 && mm <= 72) {
    fullYear = 2200 + yy;
    mm -= 60;
  } else if (mm >= 81 && mm <= 92) {
    fullYear = 1800 + yy;
    mm -= 80;
  } else {
    return null;
  }

  const date = new Date(fullYear, mm - 1, dd);
  if (
    date.getFullYear() !== fullYear ||
    date.getMonth() !== mm - 1 ||
    date.getDate() !== dd
  ) {
    return null;
  }

  return {
    date: date.toISOString().split("T")[0],
    plecCode: parseInt(pesel.slice(9, 10), 10),
  };
};

export const peselToGender = (pesel) => {
  if (!/^\d{11}$/.test(pesel)) return null;

  const plecDigit = parseInt(pesel.slice(9, 10), 10);
  return plecDigit % 2 === 0 ? "Kobieta" : "Mężczyzna";
};

export const peselIsValid = (pesel) => {
  if (!/^\d{11}$/.test(pesel)) return false;

  const wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sumaKontrolna = 0;
  for (let i = 0; i < 10; i++) {
    sumaKontrolna += parseInt(pesel[i], 10) * wagi[i];
  }

  const cyfraKontrolna = (10 - (sumaKontrolna % 10)) % 10;

  return cyfraKontrolna === parseInt(pesel[10], 10);
};
