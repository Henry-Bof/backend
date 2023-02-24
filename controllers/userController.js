const Favourites = require("../models/FavouritesModel");
const Fav = require("../models/FavouritesModel");
const Order = require("../models/OrderModel");
const Transaction = require("../models/TransactionsModel");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../middlewares/jwt-auth");
const Affiliate = require("../models/AffiliateModel");
const { Op } = require("sequelize");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json('Could not get all available users!');
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const allRegisteredUsers = User.destroy({
      where: { id: id },
      force: true,
    });
    if(allRegisteredUsers === 0) {
      return res.status(500).json('User with that ID was not found!')
    }
      res.status(500).json(`You have successfully deleted user with id ${id}`);
  } catch (error) {
    return res.status(500).json('Could not delete this user!');
  }

};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Transaction,
          as: "transactions",
        },
        {
          model: Order,
          as: "orders",
        },
        {
          model: Favourites,
        },
      ],
    });
    res.json(user);
  } catch (e) {
    return res.status(500).json(`Could not fetch user with id ${id}`);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const phone = req.body.phone;
  const job = req.body.job;
  const gender = req.body.gender;
  const streetAddress = req.body.streetAddress;
  const email = req.body.email;
  const postCode = req.body.postCode;
  const city = req.body.city;
  const country = req.body.country;
  const dayOfBirth = req.body.dayOfBirth;
  const monthOfBirth = req.body.monthOfBirth;
  const yearOfBirth = req.body.yearOfBirth;
  const verifiedPassport = req.body.verifiedPassport;
  const verifiedAddress = req.body.verifiedAddress;
  const verifiedFunding = req.body.verifiedFunding;
  const ballance = req.body.ballance;
  const status = req.body.status;
  const role = req.body.role;
  const comment = req.body.comment;
  const agent = req.body.agent;
  try {
    const user = await User.findByPk(id);
    const updatedUser = await user.update({
      firstName,
      lastName,
      password,
      phone,
      job,
      gender,
      streetAddress,
      email,
      postCode,
      city,
      country,
      dayOfBirth,
      monthOfBirth,
      yearOfBirth,
      verifiedPassport,
      verifiedAddress,
      verifiedFunding,
      ballance,
      status,
      role,
      comment,
      agent
    });

    res.json(updatedUser);
  } catch (e) {
    return res.status(500).json(`You were not able to update this user data!`);
  }
};

const changeUserPassword = async (req, res) => {
  const id = req.params.id;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.findByPk(id);
    const updatedUser = await user.update({
      password: hashedPassword,
    });

    res.json(updatedUser);
  } catch (e) {
    return res.status(500).json('Failed to change your password!');
  }
};

const changeUserAgent = async (req, res) => {
  const id = req.params.id;
  const agent = req.body.agent;

  try {
    const user = await User.findByPk(id);
    const updateUserAgent = await user.update({
      agent,
    });
    res.json(updateUserAgent);
  } catch (error) {
    res.status(500).json('Failed to change agent!')
  }
};


const changeUserBallance = async (req, res) => {
  const id = req.params.id;
  const ballance = req.body.ballance;

  try {
    const user = await User.findByPk(id);
    const updatedUserBallance = await user.update({
      ballance,
    });
    res.json(updatedUserBallance);
  } catch (error) {
    res.status(500).json('Failed to change user balance!')
  }
};

const changeUserStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const statusUpdateDate = +new Date();

  try {
    const user = await User.findByPk(id);
    const updatedUserstatus = await user.update({
      status,
      statusUpdateDate
    });
    res.json(updatedUserstatus);
  } catch (error) {
    res.status(500).json('Failed to change user status!')
  }
};

const changeUserProfit = async (req, res) => {
  const id = req.params.id;
  const profit = req.body.profit;

  try {
    const user = await User.findByPk(id);
    const updatedUserProfit = await user.update({
      profit,
    });
    res.json(updatedUserProfit);
  } catch (error) {
    res.status(500).json('Failed to change user profit!')
  }
};

const changeUserEquity = async (req, res) => {
  const id = req.params.id;
  const equity = req.body.equity;

  try {
    const user = await User.findByPk(id);
    const updatedUserEquity = await user.update({
      equity,
    });
    res.json(updatedUserEquity);
  } catch (error) {
    res.status(500).json('Failed to change user equity!')
  }
};

const changeUserLastLogon = async (req, res) => {
  const id = req.params.id;
  const lastLogon = req.body.lastLogon;

  try {
    const user = await User.findByPk(id);
    const updatedUserStatus = await user.update({
      lastLogon,
    });
    res.json(changeUserLastLogon);
  } catch (error) {
    res.status(500).json('Failed to change user last logon!')
  }
};

const changeUserFreeMargin = async (req, res) => {
  const id = req.params.id;
  const freeMargin = req.body.freeMargin;

  try {
    const user = await User.findByPk(id);
    const updatedUserFreeMargin = await user.update({
      freeMargin,
    });
    res.json(updatedUserFreeMargin);
  } catch (error) {
    res.status(500).json('Failed to change user free margin!')
  }
};

const addComment = async (req, res) => {
  const id = req.params.id;
  const comment = req.body.comment;

  try {
    const user = await User.findByPk(id);
    const updateUserComment = await user.update({
      comment,
    });
    res.json(updateUserComment);
  } catch (error) {
    res.status(500).json('Failed to add comment!')
  }
};

const registerUser = async (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 12);
  const hashedAffiliatePassword = await bcrypt.hash('123456', 12);
  const offerName = req.body.offerName;
  const offerUrl = req.body.offerUrl;
  const offerDescription = req.body.offerDescription;
  const registrationDate = +new Date();
  const comment = req.body.comment;
  const ballance = '0';
  const existingUser = await User.findAll({
    where: {
      email: email,
    },
  });
  try {
    if (existingUser.length > 0) {
      return res.status(500).json({ message: "This user already exists!" });
    }

    if (req.headers.secret) {
      const affiliate = await Affiliate.findOne({
        where: {
          secret: req.headers.secret,
        },
      });
      const user = await User.create({
        email,
        firstName,
        lastName,
        phone,
        affiliateId: affiliate.id,
        password: hashedAffiliatePassword,
        offerName,
        offerUrl,
        offerDescription,
        registrationDate,
        comment,
        ballance
      });

      return res.status(200).json({
        success: true,
        data: `User ${user.email} was created successfully!`,
        autoLoginUrl: `https://bullchain-traders.com/?email=${user.email}`,
        id: user.id
        // autoLoginUrl: `http://localhost:3000/?email=${user.email}`,
      });
    } else {
      const user = await User.create({
        email,
        firstName,
        lastName,
        phone,
        password: hashedPassword,
        registrationDate,
        comment,
        ballance
      });
      return res.status(200).json({
        success: true,
        data: `User ${user.email} was created successfully!`,
      });
    }
  } catch (error) {
    return res.status(500).json('Failed to create user!');
  }
};

const getAutoLoginUrl = async (req, res) => {
  try {
    const email = req.query.email;

    return res.status(200).json({
      success: true,
      autoLoginUrl: `https://bullchain-traders.com/?email=${email}`,
      // autoLoginUrl: `http://localhost:3000/?email=${email}`,
    });
  } catch (error) {
    return res.status(500).json('Failed to auto login!');
  }
};

const autoLoginUser = async (req, res) => {
  try {
    const email = req.query.email;

    if (email) {
      const existingUser = await User.findAll({
        where: {
          email: email,
        },
        include: [
          {
            model: Favourites,
          },
        ],
      });
      if (existingUser.length === 0) {
        res.status(500).json('No user registered with that email!')
      }
      const foundUser = existingUser[0];

      const accessToken = generateAccessToken({
        id: foundUser.id,
        email: foundUser.email,
      });

      // const result = {
      //   success: true,
        // autoLoginUrl: `https://bullchain-traders.com/?email=${foundUser.email}`,
      //   autoLoginUrl: `http://localhost:3000/?email=${foundUser.email}`,
      // };

      const result = { foundUser, accessToken };
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json('Failed to auto login!');
  }
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const lastLogon = +new Date();
  // to try await User.update({lastLogon: lastLogon})
  const existingUser = await User.findAll({
    where: {
      email: email,
    },
    include: [
      {
        model: Favourites,
      },
    ],
  });

  try {
    if (existingUser.length > 0) {
    
      const foundUserFromArr = existingUser[0];
      const foundUser = await foundUserFromArr.update({
        
        lastLogon
      })
      bcrypt.compare(password, foundUser.password, (err, isMatch) => {
        if (err) {
          res.status(500).json('Something went wrong with the password!')
        }
        
        if (!isMatch) {
          return res.json({ success: false, message: "Passwords do not match!" });
        } else {
          const accessToken = generateAccessToken({
            id: foundUser.id,
            email: foundUser.email,
          });
          const result = { success: true, foundUser, accessToken };
          
          return res.status(200).json(result);
        }
    })
  } else {
        res.json({
          success: false,
          message: "No user registered with this email",
        });
      
  }} catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getUsersWithAffiliate = async (req, res) => {
  try {
    const affiliate = await Affiliate.findOne({
      where: {
        secret: req.headers.secret,
      },
    });
    let users = await User.findAll({
      raw: true,
      where: {
        affiliateId: affiliate.id,
      },
    });
    const modifiedUsers = users.map(user => 
      Number(user?.ballance) >= 250 
      ? {...user, ballance: "250"} 
      : user);
    res.json({ success: true, data: modifiedUsers });
  } catch (error) {
    return res.status(500).json('Could not get users with that affilaite!');
  }
};

const getFilteredUsersAffiliate = async (req, res) => {
  try {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const orderBy = req.query.orderBy;

    const filters = {};
    const filterOrderBy = [];

    if (orderBy) {
      filterOrderBy.push(orderBy);
    }

    if (fromDate && toDate)
      filters.registrationDate = {
        [Op.between]: [fromDate, toDate],
      };

    const affiliate = await Affiliate.findOne({
      where: {
        secret: req.headers.secret,
      },
    });

    const users = await User.findAll({
      raw: true,
      where: [filters, {
        affiliateId: affiliate.id
      }],
      order: filterOrderBy,
      attributes: { exclude: ["password", "role", "affiliateId"] },
    });

    const modifiedUsers = users.map(user => Number(user?.ballance) >= 250 ? {...user, ballance: "250"} : user);


    res.json({ succes: true, data: modifiedUsers });
  } catch (error) {
    return res.status(500).json('Could not get filtered users by affiliate!');
  }
};

const getFilteredUserStatuses = async (req, res) => {
  try {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const orderBy = req.query.orderBy;

    const filters = {};
    const filterOrderBy = [];
    
    if (orderBy) {
      filterOrderBy.push(orderBy);
    }

    if (fromDate && toDate)
      filters.statusUpdateDate = {
        [Op.between]: [fromDate, toDate],
      };

    const affiliate = await Affiliate.findOne({
      where: {
        secret: req.headers.secret,
      },
    });

    const usersStatuses = await User.findAll({
      where: [filters, {
        affiliateId: affiliate.id
      }],
      order: filterOrderBy,
      raw: true,
      attributes: { exclude: ["affiliateId", "registrationDate", "lastLogon", "password","firstName","lastName","email","phone","job","gender","country","city","streetAddress","postCode","dayOfBirth","monthOfBirth","yearOfBirth","ballance","equity","freeMargin","profit","verifiedAddress","verifiedFunding","verifiedPassport","role","offerName","offerUrl","offerDescription", "comment"] },
    });

    res.json({ succes: true, data: usersStatuses });
  } catch (error) {
    return res.status(500).json('Could not get filtered users statuses!');
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getUser,
  registerUser,
  addComment,
  loginUser,
  updateUser,
  changeUserPassword,
  changeUserBallance,
  changeUserAgent,
  changeUserStatus,
  changeUserProfit,
  changeUserEquity,
  changeUserFreeMargin,
  changeUserLastLogon,
  getUsersWithAffiliate,
  autoLoginUser,
  getAutoLoginUrl,
  getFilteredUsersAffiliate,
  getFilteredUserStatuses
};
