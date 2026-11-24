import jwt from 'jsonwebtoken';

const generateTokens = (user, companyId = null, supplierId = null) => {
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role, // Global role
    companyId: companyId, // Specific context if selected
    supplierId: supplierId,
  };

  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be configured');
  }

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export { generateTokens };
