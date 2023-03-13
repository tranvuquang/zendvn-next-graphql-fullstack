module.exports = (sequelize: any, DataTypes: any) => {
  const categories = sequelize.define("categories", {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  return categories;
};
