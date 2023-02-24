/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["admin", "trgns"],
  staff: ["trgns"],
  user: ["admin", "staff", "user"],
  onlyGuest: [],
};

export default authRoles;
