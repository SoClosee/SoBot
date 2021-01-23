//USE THIS ONLY IF USING PM2
module.exports = {
    apps : [{
      name        : "SoClose",
      script      : "./main.js",
      watch       : true,
      ignore_watch: ["./data", "node_modules", "./logs"],
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
         "NODE_ENV": "production"
      }
    }]
  }
  
