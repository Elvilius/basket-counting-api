import { body, validationResult } from 'express-validator';


export const validateError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};


export default [
  body('name').isEmail(),
  validateError,
];
