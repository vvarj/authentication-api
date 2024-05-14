const { userMigrate } = require("./userMigrate");

const migrateDatas = async () => {
  await userMigrate();
};

module.exports = {
  migrateDatas,
};
