const User = require("../models/user.model");
const { generateJwtToken } = require("../utils");

class AuthService {
  async registerUser(body) {
    const { email, name, password } = body;
    const user = await User.create({ email, name, password });
    if (user) {
      return this.IssueToken(user);
    }
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    console.log(user,"user")
    return user;
  }

  IssueToken(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateJwtToken({
        id: user._id,
        email: user.email,
        role: user.role,
      }),
    };
  }
}

const AuthUserService = new AuthService();

module.exports = { AuthUserService };
