module.exports = function(sequelize, DataTypes) {
    return sequelize.define("User",{
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
        validate : {
            len : [8],
            isUppercase: true,   // checks for uppercase
            isDecimal: true,     // checks for any numbers
        }
      }
    },{
        timestamps : false
    });
    
  };