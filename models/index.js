var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});


var Page = db.define('page', {
  title: {
      type: Sequelize.STRING,
      allowNull: false
  },
  urlTitle: {
      type: Sequelize.STRING,
      allowNull: false,
      //validate: {isUrl: true}
      get() {
        const tempUrlTitle = this.getDataValue('urlTitle');

        return '/wiki/' + tempUrlTitle;
      },
  },
  content: {
      type: Sequelize.TEXT,
      allowNull: false
  },
  status: {
      type: Sequelize.ENUM('open', 'closed')
  },
  date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
  }
});

var User = db.define('user', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {isEmail: true}
  }
});

module.exports = {
db,//when they key and the value are the same we don't need to write them as key value pairs, just the name
Page: Page,
User: User
};
