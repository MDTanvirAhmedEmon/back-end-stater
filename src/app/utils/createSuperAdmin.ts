import { Admin } from "../modules/admins/admin.model";

const superUser = {
    firstName: "Super",
    lastName: "Admin",
    email: "superadmin777@gmail.com",
    password: "superAdmin777%$",
    role: "super_admin",
    chatId: "admin77De5497Ed",
    status: "in-progress",
}

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await Admin.findOne({ role: "super_admin" });

  if (!isSuperAdminExits) {
    await Admin.create(superUser);
  }
};

export default seedSuperAdmin;
