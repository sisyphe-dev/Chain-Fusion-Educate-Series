import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Vault { 'btal' : bigint, 'ckbtc' : bigint }
export interface _SERVICE {
  'get_health_factor' : ActorMethod<[bigint, bigint], number>,
  'get_vaults' : ActorMethod<[], Array<Vault>>,
  'open_vault' : ActorMethod<[bigint, bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
