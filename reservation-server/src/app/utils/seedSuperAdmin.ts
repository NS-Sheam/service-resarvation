import config from "../config";
import { User } from "../modules/user/user.model";

const admin = {
  userName: config.super_admin_userName,
  email: config.super_admin_email,
  password: config.super_admin_password,
  phone: "01700000000",
  role: "admin",
  isDeleted: false,
  isEmailVerified: true,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({ role: "admin" });
  if (!isSuperAdminExist) {
    await User.create(admin);
  }
};

export default seedSuperAdmin;
