export const scrollTo = (id: string) => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error(`Element with id '${id}' not found.`);
  }
};
