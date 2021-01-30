module.exports = {
  apps : [{
    name        : "SoClose",
    script      : "./main.js",
    watch       : true,
    ignore_watch: ["./data", "node_modules"],
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}
