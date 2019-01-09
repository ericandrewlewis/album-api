const { Album, SuggestedAlbumChange } = require('./models');

const main = async () => {
  // Delete everything in the database.
  await Album.destroy({
    where: {}
  });
  await SuggestedAlbumChange.destroy({
    where: {}
  });

  const lemonade = await Album.create({
    name: 'Lemondae',
  });

  const lemonadeCorrection = await SuggestedAlbumChange.create({
    name: 'Lemonade',
  });

  await lemonadeCorrection.setAlbum(lemonade);

  process.exit();
};

main();