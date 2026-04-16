export const formatZhDate = (date: Date) =>
  new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);

export const toLegacyPath = (id: string, date: Date) => {
  const tail = id.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, "").toLowerCase();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `/${year}/${month}/${day}/${tail}/`;
};

export const toLegacySegments = (id: string, date: Date) => {
  const tail = id.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, "").toLowerCase();
  return [
    `${date.getFullYear()}`,
    `${date.getMonth() + 1}`.padStart(2, "0"),
    `${date.getDate()}`.padStart(2, "0"),
    tail
  ];
};
