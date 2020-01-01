
module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        content: {
            type: DataTypes.STRING(140),
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(200),    // 이미지는 서버에 저장, 이미지에 대한 서버 주소 DB 저장
            allowNull: true,
        },     
    },
    {
        timestamp: true,
        paranoid: true,
    })
);