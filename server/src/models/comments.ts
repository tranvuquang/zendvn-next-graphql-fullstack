module.exports = (sequelize: any, DataTypes: any) => {
  const comments = sequelize.define("comments", {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    pid: {
      allowNull: false,
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
    comment_content: {
      type: DataTypes.STRING,
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

  return comments;
};
