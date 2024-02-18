import { User } from "../modules/user/user.model";

const admin = {
  userName: "sakib",
  email: "sakib@gmail.com",
  password: "12345678",
  phone: "01700000000",
  role: "admin",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({ role: "admin" });
  if (!isSuperAdminExist) {
    await User.create(admin);
  }
};

export default seedSuperAdmin;
