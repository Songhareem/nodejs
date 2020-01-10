
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.Hashtag = require('./Hashtag')(sequelize, Sequelize);

// 일대일 관계
//db.User.hasOne(db.Post);  // 주가 되는것이 hasOne
//db.Post.belongsTo(db.User);

// 일대다 관계
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

// 다대다 관계
db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'}); // through에는 새로 생기는 모델명 입력
db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});

// following follower 다대다 관계
db.User.belongsToMany(db.User, 
  {through: 'Follow', as: 'Followers', foreignKey: 'followingId'});  // as 매칭 모델 이름
db.User.belongsToMany(db.User, 
  {through: 'Follow', as: 'Following', foreignKey: 'followerId'}); // foreignKey: 상대 테이블 아이디

// 좋아요 좋아요 취소
db.User.belongsToMany(db.Post, {through : 'Like'});
db.Post.belongsToMany(db.User, {through : 'Like'});

module.exports = db;
