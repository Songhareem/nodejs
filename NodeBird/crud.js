
// crud test

const models = require("./models");

/*/ insert
models.User.create({
    user_email:"qjwm5011@naver.com",
    password:"1111",
    name:"송하민",
})
.then(function(results) {
    console.log("create success" + results);
})
.catch(function(err) {
    console.log(err);
});
//*/

/*/ update
models.User.update({password: '0000'}, {where: {name: '송하민'}})
  .then(function(result) {
     console.log("update seccess" + result);
  })
  .catch(function(err) {
     console.error(err);
  });
//*/

/*/ select All
models.User.findAll()
  .then(function(results) {
     console.log("fineAll success");
     console.log(results[0].dataValues); // results[0] = User[0]
  })
  .catch(function(err) {
     console.error(err);
  });
//*/

/*/ select One
models.User.findOne({
    where: {user_email:"qjwm5011@naver.com"}
})
.then(function(results) {
    console.log("findOne success");
    console.log(results.dataValues);
})
.catch(function(err) {
    console.error(err);
})
//*/

/*/ delete
models.User.destroy({
    where: {user_email:"qjwm5011@naver.com"}
})
.then(function(results) {
    console.log("delete success" + results);
})
.catch(function(err) {
    console.log(err);
});
//*/
