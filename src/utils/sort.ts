export const sortByDate = (data: any[], key: string, order: "asc" | "desc") =>
  data.sort((a, b) =>
    order === "asc"
      ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
      : new Date(b[key]).getTime() - new Date(a[key]).getTime()
  );
