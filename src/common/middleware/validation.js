export const validation = (schema) => {
  return async (req, res, next) => {
    let errorResult = [];

    for (const key of Object.keys(schema)) {
      if (!schema[key]) continue;
      const result = await schema[key].safeParseAsync(req[key]);

      if (!result.success) {
        result.error.issues.forEach((e) => {
          errorResult.push({
            key,
            path: e.path[0],
            message: e.message,
          });
        });
      }
    }
    if (errorResult.length > 0) {
      return res
        .status(400)
        .json({ message: "validation error", error: errorResult });
    }
    next();
  };
};
