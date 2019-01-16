module.exports = function(sequelize, DataTypes) {
    sequelize.define("Image",{
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

    Image.associate = function(models) {
        Image.belongsTo(models.Activity, {
          foreignKey: "activityId"
        });
    };
  return Activity;
};