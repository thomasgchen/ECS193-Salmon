module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define('Case', {
    caseNum: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    confidence: DataTypes.STRING,
    species: DataTypes.STRING,
    age: DataTypes.STRING,
    pathogen: DataTypes.STRING,
    numFish: DataTypes.INTEGER,
    fish: DataTypes.BOOLEAN,
    numPositive: DataTypes.INTEGER,
    prevalence: DataTypes.DOUBLE,
    comments: DataTypes.STRING,
    precipitationYearly: DataTypes.DOUBLE,
    temperatureMax: DataTypes.DOUBLE
  });
  Case.associate = models => {
    Case.belongsTo(models.Location);
  };
  return Case;
};
