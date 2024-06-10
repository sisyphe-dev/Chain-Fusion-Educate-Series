dfx canister create xrc --specified-id bkyz2-fmaaa-aaaaa-qaaaq-cai
dfx canister create vault_backend --specified-id be2us-64aaa-aaaaa-qaabq-cai
dfx canister create ledger --specified-id br5f7-7uaaa-aaaaa-qaaca-cai

export CONTROLLER_ID=$(dfx identity get-principal)

dfx deploy ledger --argument '(variant { Init = record {
  token_name = "ckBTC";
  token_symbol = "ckBTC";
  fee_collector_account = opt record { owner = principal "'${CONTROLLER_ID}'";};
  minting_account = record { owner = principal "'${CONTROLLER_ID}'";};
  initial_balances = vec {};
  metadata = vec {};
  transfer_fee = 0;
  memo = opt 80;
  archive_options = record {
    trigger_threshold = 2000:nat64;
    num_blocks_to_archive = 1000:nat64;
    controller_id = principal "'${CONTROLLER_ID}'";
  };
  feature_flags = opt record { icrc2 = true };
}})'

dfx deploy xrc
dfx deploy vault_backend