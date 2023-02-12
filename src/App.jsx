import React, {
  memo,
  useMemo,
} from 'react'

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { CaptchaGatewayDesktop } from './CaptchGateway/CaptchaGateway';
import styled from 'styled-components'
import { CaptchaGatewayDesktopUnique } from './UniquenessGateway/UniquenessGateway';


const Container = styled('div')`
  width: 100vw;
  height: 60vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

`

export function App() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network, false), [network])

  const wallets = useMemo(
    () => [
      new TorusWalletAdapter({ params: { showTorusButton: true } }),
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
    ],
    [network],
  )
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect={true}
      >
        <WalletModalProvider>
          <Container >
            <WalletMultiButton />
            <CaptchaGatewayDesktop />
            {/* <CaptchaGatewayDesktopUnique /> */}
          </Container>
           
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
