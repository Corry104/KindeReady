module.exports = function(sequelize, DataTypes) {
    sequelize.define("Activity",{
      title : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      content : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      complete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
      }
    },{
        timestamps : false
    });

    Activity.associate = function(models) {
        Activity.belongsTo(models.Unit, {
          foreignKey: "activityId"
        });
    };
  return Activity;
};