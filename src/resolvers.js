const pg = require('pg');

const client = new pg.Client({
  user:'postgres',
  host: 'localhost',
  database: 'authdemo',
  port: 5432
});

let connected = false;
const clientConnected = (err) => {
  if (err) {
    console.error("Error");
    console.error(err);
  } else {
    connected = true;
  }
};

const resolvers = {
  Query: {
    async getArtist (root, args, ctx, info) {
      if (!connected) {
        await client.connect(clientConnected);
      }
      if (!args.id) {}
      const resp = await client.query(`
         select * from artist
         where id = ${args.id} and
         google_id = '${ctx.google_id}'
      `);
      return resp.rows[0];
    },
    async getTrack (root, args, ctx, info) {
      console.log('client', client);
      if (!connected) {
        await client.connect(clientConnected);
      }
      const resp = await client.query(`
        select t.* from track as t
        join album on t.album_id = album.id
        join artist on artist.id = album.artist_id
        where t.id = ${args.id} and
        artist.google_id = '${ctx.google_id}'
      `);
      return resp.rows[0];
    }
  },
  Artist: {
    async albums (artist, args, ctx, info) {
      const resp = await client.query(`
         select * from album
         join artist on artist.id = album.artist_id
         where artist_id = ${artist.id} and
         google_id = '${ctx.google_id}'
      `);
      return resp.rows;
    }
  },
  Track: {
    // returns all fields of album, but authorizing only album belonging to the given user's
    // session id
    async album(track, args, ctx, info) {
      const resp = await client.query(`
        select a.* from album as a
        join track on track.album_id = a.id
        join artist on a.artist_id = artist.id
        where track.id = ${track.id} and
        artist.google_id = '${ctx.google_id}'
        `);
      return resp.rows[0];
    }
  }
};

module.exports = resolvers;
