module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'bus-booking',
      script: 'bin/www',
      env: {
        "NODE_ENV": 'production',
        "PORT": 8080
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }

  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js --env production'
    },
    dev: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js --env developement',
      env: {
        NODE_ENV: 'developement'
      }
    }
  }
};