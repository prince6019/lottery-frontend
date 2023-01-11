import { ConnectButton } from "web3uikit";
import "../header.css";
function Header() {
    return (
        <div className="header">
            <h1>Decentralized Lottery</h1>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}

export default Header