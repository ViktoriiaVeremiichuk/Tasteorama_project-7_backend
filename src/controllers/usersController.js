import createHttpError from 'http-errors';

export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw createHttpError(401, 'Not authenticated');
    }

    const { _id, name, email, avatar } = req.user;

    res.status(200).json({
      _id,
      name,
      email,
      avatar,
    });
  } catch (err) {
    next(err);
  }
};