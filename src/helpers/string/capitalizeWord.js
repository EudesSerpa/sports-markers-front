export const capitalizedWord = (word) => {
  const capitalizedLetter = word.split("")[0].toUpperCase();

  return capitalizedLetter + word.substring(1);
};
