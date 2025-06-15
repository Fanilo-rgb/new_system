const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable ${key} not found`);
  }

  return value
}

export const PORT = getEnv("PORT", "8080");
export const NODE_ENV = getEnv("NODE_ENV");