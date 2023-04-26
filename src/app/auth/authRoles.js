/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["Administrador", "Trabajadores Prisma"],
  staff: ["Trabajadores Prisma"],
  user: ["Administrador", "Trabajadores Prisma", "Cliente"],
  onlyGuest: [],
};

export default authRoles;
