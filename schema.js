const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const fetch = require('node-fetch');

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => {
    return {
      flight_number: { type: GraphQLInt },
      mission_name: { type: GraphQLString },
      launch_year: { type: GraphQLString },
      launch_date_local: { type: GraphQLString },
      launch_success: { type: GraphQLBoolean },
      rocket: { type: RocketType }
    };
  }
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => {
    return {
      rocket_id: { type: GraphQLString },
      rocket_name: { type: GraphQLString },
      rocket_type: { type: GraphQLString }
    };
  }
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      // List of LaunchType
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return fetch('https://api.spacexdata.com/v3/launches')
          .then(res => res.json())
          .then(data => data)
          .catch(err => console.error(err));
      }
    },
    launch: {
      // Single LaunchType
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then(res => res.json())
          .then(data => data)
          .catch(err => console.error(err));
      }
    },
    rockets: {
      // List of rockets
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return fetch('https://api.spacexdata.com/v3/rockets')
          .then(res => res.json())
          .then(data => data)
          .catch(err => console.error(err));
      }
    },
    rocket: {
      // Single rocket
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return fetch(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(res => res.json())
          .then(data => data)
          .catch(err => console.error(err));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
