
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING
      },
      language_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_bot: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      is_blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },{
      tableName: 'users',
      freezeTableName: true
    })

      /*******   ASSOCIATION-METHODS    *******/
    User.associate = function(models) {

    //   this.hasMany(models.Chat, {
    //     foreignKey: 'user_id'
    //   })
  
    }

    return User
}