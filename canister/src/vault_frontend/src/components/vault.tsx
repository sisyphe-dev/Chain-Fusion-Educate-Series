import '../components/vault.css';

interface VaultProps {
  collateral: number, 
  debt: number, 
  index: number, 
}

export default function Vault (props: VaultProps) {
  return (
    <>
    <div className='container'> 
        <div className='vault-box'>
            <span style={{fontWeight:'bold'}}>Vault {props.index}</span>
            <span>Collateral: {Number(props.collateral)}</span>
            <span>Debt: {Number(props.debt)}</span>
            <span>Health Factor: {props.index}</span>
        </div>

    </div>
    </>
  );
}
