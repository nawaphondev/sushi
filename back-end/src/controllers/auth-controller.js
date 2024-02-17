const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { createUser, getUserByUsername, getUserById, updateUserById } = require("../services/user.service");
const { createCart } = require("../services/cart.service");

exports.register = async (req, res, next) => {
  const { username, password, confirmPassword, email, phoneNumber } = req.body;
  try {
    // validation
    if (!(username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("confirm password not match");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);
    const data = {
      username,
      password : hashedPassword,
      email,
      phoneNumber,
      userType: 'CUSTOMER'
    };

    const rs = await createUser(data);
    await createCart({userId: rs.id})
    // console.log(rs)

    res.json({ msg: 'Register successful' })
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  // console.log(req.body)
  const {username, password} = req.body
  try {
    // validation
    if( !(username.trim() && password.trim()) ) {
      throw new Error('username or password must not blank')
    }
    // find username in db.user
    const user = await getUserByUsername(username)
    // check password
    const pwOk = await bcrypt.compare(password, user.password)
    if(!pwOk) {
      throw new Error('invalid login')
    }
    // issue jwt token 
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })
    // console.log(token)
    res.json({token : token})
  }catch(err) {
    console.log(err)
    next(err)
  }
};

//change password
exports.changePassword = async (req,res,next) => {
  const {currentPassword, newPassword, confirmPassword, id} = req.body
  try {
    if(!(currentPassword && newPassword && confirmPassword)) {
      throw new Error('fulfill all inputs')
    }
    if(newPassword !== confirmPassword) {
      throw new Error('confirm password not match')
    }

    const user = await getUserById(id)
    const pwOk = await bcrypt.compare(currentPassword, user.password)
    if(!pwOk) {
      throw new Error('invalid password')
    }
    const hashedPassword = await bcrypt.hash(newPassword, 8)
    await updateUserById(id, {password: hashedPassword})
    res.json({msg: 'password changed'})
  }catch(err) {
    next(err)
  }
}

exports.getme = (req,res,next) => {
  res.json(req.user)
}