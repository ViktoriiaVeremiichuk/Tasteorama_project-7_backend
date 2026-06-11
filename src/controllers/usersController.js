export const getCurrentUser = async (req, res) => {
  const { _id, name, email, avatar } = req.user;

  res.json({
    _id,
    name,
    email,
    avatar,
  });
};