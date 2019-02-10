module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  });
  Location.associate = models => {
    Location.hasMany(models.Case);
  };
  return Location;
};
