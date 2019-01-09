const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'some_app_name',
  dialect: 'postgres'
});

const Album = sequelize.define('album', {
  name: Sequelize.STRING
});

const SuggestedAlbumChange = sequelize.define('suggestedAlbumChange', {
  name: Sequelize.STRING
});

Album.hasMany(SuggestedAlbumChange, { onDelete: 'cascade' });
SuggestedAlbumChange.belongsTo(Album);


module.exports = {
  // Export models
  Album,
  SuggestedAlbumChange,
  sequelize: sequelize
};