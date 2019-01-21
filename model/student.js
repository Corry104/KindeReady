module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student",{
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
      age : {
        type : DataTypes.INTEGER,
        allowNull : true,
        validate : {
            len : [1,2],
            isNumeric: true          // will only allow numbers
        }
      }, 
      avatar : {
        type : DataTypes.STRING,
        allowNull : true
      }
    },{
    //   unit1 : {
    //     progress : {
    //       type : DataTypes.INTEGER,
    //       defaultValue : 0
    //     }, 
    //     complete : {
    //       type : DataTypes.BOOLEAN,
    //       defaultValue : false
    //     }
    //   },
    //   unit2 : {
    //     progress : {
    //       type : DataTypes.INTEGER,
    //       defaultValue : 0
    //     }, 
    //     complete : {
    //       type : DataTypes.BOOLEAN,
    //       defaultValue : false
    //     }
    //   }
    // },{
        timestamps : false
    });

    Student.associate = function(models) {
      Student.belongsTo(models.User, {
        foreignKey: "userId"
      });
    };
    return Student;
  };