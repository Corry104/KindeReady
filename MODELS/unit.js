module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Unit",{
      title : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      complete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
      },
      progress : {
        type : DataTypes.INTEGER,
        allowNull : true,
    }
    },{
        timestamps : false
    });
  };