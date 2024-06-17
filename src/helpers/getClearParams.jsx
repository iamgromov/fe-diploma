export const getClearParams = (params = {}) => {
  const cleanParams = {};

  for (const param in params) {
    const value = params[param];
    if (value !== "") {
      cleanParams[param] = value;
    }
  }

  return cleanParams;
};
