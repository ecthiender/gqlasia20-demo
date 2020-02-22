const { gql } = require('apollo-server');

const typeDefs = gql`
  type Artist {
      id: Int!
      name: String!
      google_id: String!
      albums: [Album!]!
    }

  type Album {
      id: Int!
      title: String!
      artist_id: Int!
      tracks: [Track]!
  }

  type Track {
      id: Int!
      title: String!
      duration: Int!
      album_id: Int!
      album: Album!
  }

  type Query {
    getArtist(id: Int): Artist
    getTrack(id: Int): Track
  }
`;

module.exports = typeDefs;
