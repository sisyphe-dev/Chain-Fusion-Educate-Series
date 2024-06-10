export const idlFactory = ({ IDL }) => {
  const Vault = IDL.Record({ 'btal' : IDL.Nat64, 'ckbtc' : IDL.Nat64 });
  return IDL.Service({
    'get_health_factor' : IDL.Func(
        [IDL.Nat64, IDL.Nat64],
        [IDL.Float32],
        ['query'],
      ),
    'get_vaults' : IDL.Func([], [IDL.Vec(Vault)], ['query']),
    'open_vault' : IDL.Func([IDL.Nat64, IDL.Nat64], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
