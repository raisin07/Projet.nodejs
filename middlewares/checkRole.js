const roles = {
    USER: "USER",
    ADMIN: "ADMIN",
  };
  
  module.exports = function (roleToCheck, options = {}) {
    return function (req, res, next) {
      const user = req.user;
      const rolesHierarchy = Object.keys(roles);
  
      if (req.body && options.securedFields) {
        const securedFieldsFound = Object.keys(req.body).filter((field) =>
          options.securedFields.includes(field)
        );
        if (securedFieldsFound.length) {
          if (!user) return res.sendStatus(403);
          console.log("SecuredFields trouvé: " + securedFieldsFound.join(", "));
          if (
            rolesHierarchy.indexOf(user.role) >=
            rolesHierarchy.indexOf(roleToCheck)
          ) {
            console.log("SecuredFields: l'utilisateur a un rôle");
            return next();
          } else {
            console.log("SecuredFields: l'utilisateur n'a un rôle");
            return res.sendStatus(403);
          }
        } else {
          if (options.anonymous) return next();
          return user ? next() : res.sendStatus(403);
        }
      }
      if (options.anonymous) return next();
      if (!user) return res.sendStatus(403);
      
      if (
        rolesHierarchy.indexOf(user.role) >= rolesHierarchy.indexOf(roleToCheck)
      ) {
        console.log("l'utilisateur a un rôle");
        next();
      } else {
        console.log("l'utilisateur n'a un rôle");
        res.sendStatus(403);
      }
    };
  };