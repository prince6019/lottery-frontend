import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { useNotification } from 'web3uikit';
import { contractAddresses, contractAbi } from "../ContractData";
import "../lotteryentrance.css";
function LotteryEntrance() {

  const { isWeb3Enabled, chainId: chainHex } = useMoralis();
  const chainId = parseInt(chainHex);
  const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [entranceFee, setEntranceFee] = useState("0")
  const [numberOfPlayers, setNumberOfPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0")

  const dispatch = useNotification();

  const { runContractFunction: enterRaffle, isLoading, isFetching } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: lotteryAddress,
    functionName: "enterRaffle",
    msgValue: entranceFee,
    params: {},
  })



  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: lotteryAddress,
    functionName: "getEntranceFee",
    params: {},
  })

  const { runContractFunction: getPlayersNumber } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: lotteryAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: lotteryAddress,
    functionName: "getRecentWinner",
    params: {},
  })

  async function updateUi() {
    // console.log(await getEntranceFee());
    const entranceFeeFromCall = (await getEntranceFee()).toString()
    const numPlayersFromCall = (await getPlayersNumber()).toString()
    const recentWinnerFromCall = await getRecentWinner()
    setEntranceFee(entranceFeeFromCall)
    setNumberOfPlayers(numPlayersFromCall)
    setRecentWinner(recentWinnerFromCall)
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUi();
    }
  }, [isWeb3Enabled])


  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    })
  }

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      updateUi();
      handleNewNotification(tx);
    } catch (error) {
      // console.log(error);
    }
  }



  return (
    <div>
      Hello welcome to the lottery!
      {lotteryAddress ?
        <div>
          <button
            className='lotterybutton'
            disabled={isLoading || isFetching}
            onClick={async () => {
              await enterRaffle({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                // onError: (error) => console.log(error),
              })
            }}>
            {isLoading || isFetching ? "fetching" : "enterRaffle"}</button>
          <p>the Lottery entrance fee is {ethers.utils.formatUnits(entranceFee, "ether")} ETH</p>
          <p>the recent winner is {recentWinner}</p>
          <p>numbers of player in lottery are :{numberOfPlayers}</p>
        </div>
        : (<div> Please connect to a supported chain</div>
        )}
    </div>
  )
}

export default LotteryEntrance