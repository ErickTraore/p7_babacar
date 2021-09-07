'use strict';
module.exports = (sequelize, DataTypes) => {
    var Dislike = sequelize.define('Dislike', {
        messageId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Message',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        isDislike: DataTypes.INTEGER
    }, {});
    Dislike.associate = function(models) {
        // associations can be defined here

        models.User.belongsToMany(models.Message, {
            through: models.Like,
            foreignKey: 'userId',
            otherKey: 'messageId',
        });

        models.Message.belongsToMany(models.User, {
            through: models.Dislike,
            foreignKey: 'messageId',
            otherKey: 'userId',
        });

        models.Dislike.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        models.Dislike.belongsTo(models.Message, {
            foreignKey: 'messageId',
            as: 'message',
        });
    };
    return Dislike;
};