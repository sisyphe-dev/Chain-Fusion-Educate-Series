use candid::{CandidType, Deserialize, Principal};
use ic_cdk::{init, query, update};
use ic_xrc_types::{Asset, AssetClass, GetExchangeRateRequest, GetExchangeRateResult};
use std::cell::RefCell;

#[derive(Clone, Copy, CandidType, Deserialize)]
struct Vault {
    ckbtc: u64,
    btal: u64,
}

impl Vault {
    fn new(ckbtc: u64, btal: u64) -> Self {
        Vault { ckbtc, btal }
    }

    fn collateral_ratio(self, price: u64) -> f32 {
        (self.ckbtc * price / self.btal) as f32
    }
}

thread_local! {
   static VAULTS: RefCell<Vec<Vault>> = RefCell::new(vec![])
}

#[init]
fn set_vault() {
    VAULTS.with(|vs| {
        let mut vaults = vs.borrow_mut();
        vaults.push(Vault::new(10, 1_000));
    });
}

#[update]
fn open_vault(ckbtc: u64, btal: u64) {
    VAULTS.with(|vs| {
        let mut vaults = vs.borrow_mut();
        vaults.push(Vault::new(ckbtc, btal));
    });
}

#[query]
fn get_vaults() -> Vec<Vault> {
    VAULTS.with(|vs| {
        let vaults = vs.borrow();
        let mut res = vec![];
        for vault in vaults.iter() {
            res.push(*vault);
        }
        res
    })
}

#[update]
async fn get_collateral_ratio(index: usize) -> f32 {
    let price = fetch_btc_price().await;
    VAULTS.with(|vs| {
        let vaults = vs.borrow();
        vaults[index].collateral_ratio(price)
    })
}

async fn fetch_btc_price() -> u64 {
    const COST_CYCLE: u64 = 10_000_000_000;

    let btc = Asset {
        symbol: "BTC".to_string(),
        class: AssetClass::Cryptocurrency,
    };

    let usd = Asset {
        symbol: "USD".to_string(),
        class: AssetClass::FiatCurrency,
    };

    let args = GetExchangeRateRequest {
        base_asset: btc,
        quote_asset: usd,
        timestamp: None,
    };

    let xrc_principal = Principal::from_text("bkyz2-fmaaa-aaaaa-qaaaq-cai").unwrap();

    let (xrc_res,): (GetExchangeRateResult,) = ic_cdk::api::call::call_with_payment(
        xrc_principal,
        "get_exchange_rate",
        (args,),
        COST_CYCLE,
    )
    .await
    .unwrap();

    match xrc_res {
        GetExchangeRateResult::Ok(exchange_rate_res) => exchange_rate_res.rate,
        GetExchangeRateResult::Err(_) => 0,
    }
}
