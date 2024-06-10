import { useState } from 'react';
import { vault_backend } from 'declarations/vault_backend';
import Vault from './components/vault';

function App() {
  const [vaults, setVaults] = useState([]);

  vault_backend.get_vaults().then((vs) => {
    setVaults(vs);
  });

  return (
    <main style={{display: 'flex', 
      alignItems: 'center', 
      flexDirection:'column', 
      height:800}}>
      <img src="/logo2.svg" alt="DFINITY logo" />  
      {vaults.map((vault, index) => (
        <Vault collateral={vault.collateral} debt={vault.debt} index={index} />
      ))}
    </main>
  );
}

export default App;
