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

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export { generateTokens };
