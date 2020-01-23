
module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,           // not null 옵션
        unique: true,              // unique 옵션
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    }, 
    {
        timestamp: true,    // 생성일, 수정일
        paranoid: true,     // 삭제일(복구용), 삭제일이 NULL이 아니라면 삭제된 데이터로 판단
    })
  );