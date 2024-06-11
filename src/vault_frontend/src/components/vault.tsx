import '../components/vault.css';

interface VaultProps {
  ckbtc: number, 
  btal: number, 
  index: number, 
}

export default function Vault (props: VaultProps) {
  return (
    <>
    <div className='container'> 
        <div className='vault-box'>
            <span style={{fontWeight:'bold'}}>Vault {props.index}</span>
            <span>Collateral: {Number(props.ckbtc)}</span>
            <span>Debt: {Number(props.btal)}</span>
            <span>Health Factor: {props.index}</span>
        </div>

    </div>
    </>
  );
}
