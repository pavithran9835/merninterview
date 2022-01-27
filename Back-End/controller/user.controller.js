const User = require("../model/user.model");
const Images = require("../model/images.model");

exports.createUser = async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  const phoneExists = await User.findOne({ phone: req.body.phone });
  if (phoneExists)
    return res.status(400).json({ error: "Mobile Number already exists" });

  const codeExists = await User.findOne({ code: req.body.code });
  if (codeExists) return res.status(400).json({ error: "Code already exists" });

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    code: req.body.code,
  });

  await user
    .save()
    .then((user) => {
      res.status(200).json({ user, message: "New User created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "unable to create user" });
    });
};

exports.getUser = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const user = await User.findOne({ _id: _id });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const user = await User.find({ isDeleted: false });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editUser = async (req, res) => {
  const { userData } = req.body;
  const _id = req.params.id;

  await User.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        code: userData.code,
      },
    },
    { new: true }
  ).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    res.status(200).json({ user });
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;

    await User.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
      { new: true }
    ).exec((error, user) => {
      if (error) return res.status(400).json({ error });
      res.status(200).json({ user });
    });
  } catch (err) {
    res.status(400).json({ error: "unable to delete user" });
  }
};
