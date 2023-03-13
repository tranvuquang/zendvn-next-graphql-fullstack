module.exports = (sequelize: any, DataTypes: any) => {
  const posts = sequelize.define("posts", {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    uid: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
    },
  });

  // Users.associate = (models: any) => {
  //   Users.hasMany(models.Likes, {
  //     onDelete: "cascade",
  //   });

  //   Users.hasMany(models.Posts, {
  //     onDelete: "cascade",
  //   });
  // };

  return posts;
};
