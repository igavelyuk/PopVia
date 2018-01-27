# CryptTwo install and test
## Codename: MeteorPurpleCryptoRabbitServer 
## Installation and instructions
### Just to not forget some small things and to avoid extra time to find and fix
[![Waffle.io - Columns and their card count](https://badge.waffle.io/736c7c74ac966777a078a1394df6810005fcfa8510528f063a24328f389a50eb.svg?columns=all)](https://waffle.io/popvia/MeteorPurpleCryptoRabbit)

#### 1.Dev environment
 * Node.js
 * Yarn
 * API services:
  * https://blockchain.info/api/blockchain_wallet_api
  * https://bitfinex.readme.io/v2/docs/rest-public
 * Info:
  * Satoshi i.e. divide by 100000000 (8zero)
#### 2. First start
  * Install Git, Node and Yarn (or NPM)
  ```bash
  sudo apt-get install -y curl
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt-get update && sudo apt-get install yarn
  sudo apt-get install git
  mkdir test_folder
  cd test_folder
  git clone https://github.com/EvilEpicCoder/PopVia.git
  ```
  * Install modules
  ```bash
  yarn add express ejs request body-parser bitcore-lib
  ```
#### 3. Test
  * Run
  ```
  node index.js
  ```
  Open browser on this address
  ```
  localhost:8080
  ```
#### 4. Node modules
 * express
 Is a light-weight web application framework to help organize your web application into an MVC architecture on the server side
 * request
 Is HTTP library with implemented methods GET, HEAD, PUT and DELETE.
 * bodyparser
 To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser . body-parser extract the entire body portion of an incoming request stream and exposes it.
 * bitcore
 A Bitcoin full node for building applications and services with Node.js
 Infrastructure to build Bitcoin and blockchain-based applications for the next generation of financial technology.
 * bitfinex-api-node (not used yet)
 This is the documentation for the Bitfinex Node reference implementation. You can find the code at https://github.com/bitfinexcom/bitfinex-api-node/tree/master
 * blockchain-wallet-service
  Is responsible for managing your Blockchain.info wallet. Your application interacts with this service locally via HTTP API calls.

  Version: `0.3a`
  Date: `12.10.2017`
