export function getRandomColor(usedColors) {
  let color;
  const newColors = new Set(usedColors);

  do {
    color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
  } while (newColors.has(color));

  return color;
}
