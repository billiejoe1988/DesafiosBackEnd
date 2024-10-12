export const getAll = async (req, res, next) => {
  try {
    res.render("chat");
  } catch (error) {
    res.render("error");
  }
};
