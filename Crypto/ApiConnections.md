#### Create Wallet API https://blockchain.info/api/blockchain_wallet_api
http://localhost:3000/api/v2/create
 * 2.Method: POST or GET
 * $password The password for the new wallet. Must be at least 10 characters in length.
 * $api_code An API code with create wallets permission.
 * $priv A private key to add to the wallet (Wallet import format preferred). (Optional)
 * $label A label to set for the first address in the wallet. Alphanumeric only. (Optional)
 * $email An email to associate with the new wallet i.e. the email address of the user you are creating this wallet on behalf of. (Optional)

#### Making Outgoing Payments
http://localhost:3000/merchant/$guid/payment?password=$main_password&second_password=$second_password&to=$address&amount=$amount&from=$from&fee=$fee

  * $main_password Your Main Blockchain Wallet password
  * $second_password Your second Blockchain Wallet password if double encryption is enabled.
  * $to Recipient Bitcoin Address.
  * $amount Amount to send in satoshi.
  * $from Send from a specific Bitcoin Address (Optional)
  * $fee Transaction fee value in satoshi (Must be greater than default fee) (Optional)

#### Send Many Transactions
http://localhost:3000/merchant/$guid/sendmany?password=$main_password&second_password=$second_password&recipients=$recipients&fee=$fee
  * $main_password Your Main Blockchain wallet password
  * $second_password Your second Blockchain Wallet password if double encryption is enabled.
  * $recipients Is a JSON Object using Bitcoin Addresses as keys and the amounts to send as values (See below).
  * $from Send from a specific Bitcoin Address (Optional)
  * $fee Transaction fee value in satoshi (Must be greater than default fee) (Optional)

#### Fetching the wallet balance
http://localhost:3000/merchant/$guid/balance?password=$main_password

#### Listing Addresses
http://localhost:3000/merchant/$guid/list?password=$main_password

#### Getting the balance of an address
http://localhost:3000/merchant/$guid/address_balance?password=$main_password&address=$address
  * $main_password Your Main Blockchain wallet password
  * $address The bitcoin address to lookup

#### Generating a new address
http://localhost:3000/merchant/$guid/new_address?password=$main_password&second_password=$second_password&label=$label
  * $main_password Your Main Blockchain wallet password
  * $second_password Your second Blockchain Wallet password if double encryption is enabled.
  * $label An optional label to attach to this address. It is recommended this is a human readable string e.g. "Order No : 1234". You May use this as a reference to check balance of an order (documented later)

#### Archiving an address
http://localhost:3000/merchant/$guid/archive_address?password=$main_password&second_password=$second_password&address=$address
  * $main_password Your Main Blockchain wallet password
  * $address The bitcoin address to archive

#### Unarchive an address
http://localhost:3000/merchant/$guid/unarchive_address?password=$main_password&second_password=$second_password&address=$address
  * $main_password Your Main Blockchain wallet password
  * $address The bitcoin address to unarchive
