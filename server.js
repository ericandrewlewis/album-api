const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5678;
const { Album, SuggestedAlbumChange } = require('./models');
const app = express();

app.use(bodyParser.json());

// Send back all albums denormalized.
app.get('/albums', async (request, response) => {
  const albums = await Album.findAll();
  const albumsJSON = albums.map(album => album.toJSON());
  for (let i = 0; i < albums.length; i++) {
    const suggestedEdits = await albums[i].getSuggestedAlbumChanges();
    albumsJSON[i].suggestedEdits = suggestedEdits;
  }
  response.json(albumsJSON);
});

app.post('/accept-suggested-album-change/:id', async (request, response) => {
  const id = Number(request.params.id);
  const suggestedAlbumChange = await SuggestedAlbumChange.findById(id);
  const album = await Album.findById(suggestedAlbumChange.albumId);
  album.name = suggestedAlbumChange.name;
  await album.save();
  await suggestedAlbumChange.destroy();
  response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});