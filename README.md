## SpaceX

SpaceX launch data visualization using React, Apollo and GraphQL.

### Quick Start

The repo has been divided into `client` and `server` modules. The express app serves the static files generated by the React client. Make sure you have node > 10 installed.

```
# 1. Clone the repo
git clone https://github.com/rxhl/spacex-graphql.git && cd spacex-graphql

# 2. Install server node_modules
npm install

# 3. Install client node_modules
cd ./client && npm install

# 4. Start both servers concurrently
cd ../ && npm run dev
```

### Build

Run `$ npm run build` inside the client directory. This would create a `public` directory at the root level that can be served by the express server.
