# Chain Fusion Educate Series: Integrating ckBTC in DApps: A Comprehensive Guide with Taler

You can find here the content of the workshop we did thanks to Encode and their Educate Series. To put a little bit of context for new comers, we based our work on the design of Collateral Debt Position stablecoins. The goal was to rebuild a vault with some collateral and debt and fetch the Bitcoin price to compute the collateral ratio. There should probably be a replay video on Encode's channel so you can check that out to fully understand what's going on. 

The goal for you is to redo this canisters from scratch and make them work! 

Here are the different steps: 

Run: `dfx new vault` in your terminal. It will setup everything for you. Select `Rust` language for the backend. Add `React` for the frontend. Press `enter` (no selection). Then you should have a new `vault` repository that will be the base line for your work.  

To check if everything is okay you can try to deploy the mock canisters by running `dfx start --clean --background` then `dfx deploy`. Then you can then click on both local http addresses and play with the canisters on your browser. 

Once you have done that, you can start changing things a bit. Go to the `lib.rs` file and modify it with the content written in this repository as well as the `vault_backend.did` and `cargo.toml` files. 

As you can see in the code, your `vault_backend` canister is calling another canister: `let xrc_principal = Principal::from_text("bkyz2-fmaaa-aaaaa-qaaaq-cai").unwrap();`. 

This canister is the **Exchange Rate Canister** and it allows us to fetch the Bitcoin price. This canister has been developped by the Dfinity Foundation and you can download the   `.wasm` and `.did` files here on the `xrc` folder. It is also available on their github:  https://github.com/dfinity/exchange-rate-canister. Go to `releases` to have the `.wasm` file and find the `.did` file in the code. Then you can add both files on a new folder `xrc` right next to your `vault_backend` canister. 

Next step is to declare this new canister by modifying your `dfx.json` file with the one written in this repository. 

Okay, "theorically" you don't have to change your files now, you are good to go!

Run `dfx start --clean` on terminal, open a new one and run `dfx deploy xrc` wait a little bit and run `dfx canister id xrc` to check that it matches the principal written in the `lib.rs` file.

Happy? But it is software engineering so 99% chance it won't work. 

One thing is that the exchange rate canister is not supposed to run locally like that. While running `dfx start --clean` you might have seen those messages: "Using the default definition for the 'local' shared network because /Users/username/.config/dfx/networks.json does not define it." or "Using the default definition for the 'local' shared network because /Users/username/.config/dfx/networks.json not found."

You need to specify the local network. Run `touch /Users/username/.config/dfx/networks.json` then `nano /Users/username/.config/dfx/networks.json` and add this to the file: 

{
  "local": {
    "bind": "127.0.0.1:8080", 
    "type": "ephemeral", 
    "replica": {
      "subnet_type": "system"
    }
  }
}

Second thing is that the Exchange Rate Canister requires cycles to run properly so you have to add some cycles by running: `dfx canister deposit-cycles 10_000_000_000_000 xrc`. 

Once this is done, you can run the following commands again:

`dfx start --clean`
`dfx deploy xrc`
`dfx deploy vault_backend`

And try to collect the collateral ratio!s