export const privacy = (privacyType) => {
  return (req, res, next) => {
    const { user } = req.session;
    switch (privacyType) {
      case "PRIVATE":
        if (user) next();
        else res.redirect("/login");
        break;
      case "NO_AUTHENTICATED":
        if (!user) next();
        else res.redirect("/");
    }
  };
};
export const authRoles = (role) => {
  return async (req, res, next) => {
    if (req.user.role != role)
      return res.status(403).send({
        status: "error",
        error: "no tienes permiso para acceder aqui",
      });
    next();
  };
};
