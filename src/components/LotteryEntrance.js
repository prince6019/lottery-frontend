import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis';
import { contractAddresses, contractAbi } from "../ContractData";
import { useWeb3Contract } from 'react-moralis';

function LotteryEnrance() {

  const { isWeb3Enabled, chainId: chainHex } = useMoralis();
  const chainId = parseInt(chainHex);
  const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [entranceFee, setEntranceFee] = useState("");
  // const {
  //   runContractFunction: enterRaffle } = useWeb3Contract({
  //     abi: contractAbi,
  //     contractAddress: contractAddresses,
  //     functionName: "enterRaffle",
  //     msgValue: entranceFee,
  //     params: {},
  //   })
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: contractAddresses,
    functionName: "getEntranceFee",
    params: {},
  })

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUi() {
        console.log(await getEntranceFee());
        // const feefromcall = (await getEntranceFee()).toString()

        // setEntranceFee(feefromcall);
      }
      updateUi();
    }

  }, [isWeb3Enabled])

  return (
    <div>
      Hello welcome to the lottery!
      {lotteryAddress ?
        <div>
          <button> Enter Lottery</button>
          <p>the Lottery entrance fee is {entranceFee}</p>
        </div>
        : (<div> no raffle address detected</div>
        )}
    </div>
  )
}

export default LotteryEnrance