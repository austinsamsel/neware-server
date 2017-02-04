#NEWARE Server

## ship code

1. Run `now` to ship.

2. after testing deploy, set the alias to neware-server like:

`now alias https://neware-server-___________.now.sh neware-server`

3. The new instance will be available at https://neware-server.now.sh

## secrets

Secrets are saved locally and not committed to git. Secrets are located in a .env file, and pulled into the app via the [dotenv](https://github.com/motdotla/dotenv) package. 

    # .env
    GREETING=hi
    NAME=hightops

example of use:
     
    // index.js
    var greeting = process.env.GREETING;
    var name = process.env.NAME;

    module.exports = function() {
      return `${greeting}, ${name}!!`;
    }

To deploy secrets, we add them to Now like this:

`now secret add greeting Hello`
`now secret add name User`

Then in the package.json, we reference the secrets while deploying. When the environment is built on Now then the secret values are updated.

    "deploy": "now -e GREETING=@greeting NAME=@name"

Run `now secret` for help.

reference: [Configure secrets and environment variables with Zeit's Now](source: https://egghead.io/lessons/tools-configure-secrets-and-environment-variables-with-zeit-s-now)


