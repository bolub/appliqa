export const useFilterParams = (category?: string, experience?: string) => {
  const fromUrlCat =
    decodeURIComponent(category as string) !== "undefined"
      ? decodeURIComponent(category as string)
      : "";
  const fromUrlEx =
    decodeURIComponent(experience as string) !== "undefined"
      ? decodeURIComponent(experience as string)
      : "";

  const categories = fromUrlCat.split(",").filter(Boolean);
  const experiences = fromUrlEx.split(",").filter(Boolean);

  return { categories, experiences };
};
