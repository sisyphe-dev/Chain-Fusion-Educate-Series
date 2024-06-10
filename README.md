# Chain-Fusion-Educate-Series
You can find here the content of the workshop ICP Chain Fusion Educate: Integrating ckBTC in DApps: A Comprehensive Guide with Taler


While trying to deploy the xrc canister (and maybe others) in a local framework you might be confronted to this message: 

`using the default definition for the 'local' shared network because /Users/username/.config/dfx/networks.json does not exist.`

In that case create the file: 

`touch /Users/username/.config/dfx/networks.json`

Modify the file: 

`nano /Users/username/.config/dfx/networks.json`

And add: 

`{
  "network_1": {
    "bind": "127.0.0.1:8080",
    "type": "ephemeral",
    "replica": {
      "subnet_type": "system"
    }
  }
}`