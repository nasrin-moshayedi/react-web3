import { useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import {injected} from "./../Components/Connctor"
import Image from 'next/image'
import styles from '../styles/Home.module.css'

/**
 * @return {boolean}
 */

export default function Home() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const web3React = useWeb3React();

    async function connect() {
        try {
            await web3React.activate(injected);
            localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
            console.log(ex)
        }
    }

    async function disconnect() {
        try {
            web3React.deactivate()
            localStorage.setItem('isWalletConnected', false)
        } catch (ex) {
            console.log(ex)
        }
    }
    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage?.getItem('isWalletConnected') === 'true') {
                try {
                    await activate(injected)
                    localStorage.setItem('isWalletConnected', true)
                } catch (ex) {
                    console.log(ex)
                }
            }
        };
        connectWalletOnPageLoad().then(() => console.log("yess")).catch(() => console.log("oh noooo"))
    }, [])
    console.log(active, account,library)
    console.log({ web3React });
  return (
      <div className="flex flex-col items-center justify-center">
          <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
          {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
          <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
      </div>
  )
}
