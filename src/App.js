import { useMoralis } from 'react-moralis';
import './App.css';
import Header from './components/Header';
import LotteryEntrance from "./components/LotteryEntrance";

const supportedChains = ["31337", "5"];
function App() {

  const { isWeb3Enabled, chainId } = useMoralis();

  return (
    <div className="App">
      <Header />
      {isWeb3Enabled ? (
        <div>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <div className="lotteryEntrance">
              <LotteryEntrance />
            </div>
          ) : (
            <div>{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
          )}
        </div>
      ) : (
        <div>Please connect to a Wallet</div>
      )}
    </div>
  );
}

export default App;
