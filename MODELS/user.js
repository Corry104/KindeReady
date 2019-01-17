const bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User",{
      firstName : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [1],
            isAlpha: true   // will only allow letters
        }
      },
      lastName : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [1],
            isAlpha: true   // will only allow letters
        }
      },
      email : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isEmail: true,  // checks for email format (foo@bar.com)
            len : [5]
        }
      },
      password : {
        type : DataTypes.STRING,
        allowNull : false,
      }
    },{
        timestamps : false
    },{
      hooks : {
          beforeCreate : (User , options) => {
              {
                  User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10) : "";
              }
          }
      }
  });
  
  User.beforeCreate(generateHash);
  User.beforeUpdate(generateHash);
  return User;
  function generateHash(User) {
    if (User === null) {
      throw new Error('No found employee');
    }
    else if (!User.changed('password')) return User.password;
    else {
      let salt = bcrypt.genSaltSync();
      return User.password = bcrypt.hashSync(User.password, salt);
    }
  }

  };

