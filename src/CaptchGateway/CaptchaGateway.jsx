/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useEffect } from 'react'
import { clusterApiUrl, PublicKey, Connection } from '@solana/web3.js'
import {
  GatewayProvider, useGateway,
} from '@civic/solana-gateway-react'
import { useWallet } from '@solana/wallet-adapter-react'

import {
  Container, IconContainer, StyledExpandButton,
} from '../Style'
import useGetGatewayStatus from '../useGetGatewayStatus'

import '@solana/wallet-adapter-react-ui/styles.css'
import { CivilGatewayStatus } from '../CivilGatewayStatus'

const env = {
  gatekeeperNetwork: new PublicKey('ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6'),
  clusterUrl: clusterApiUrl('devnet'),
  cluster: 'devnet',
}

function StatusIcon() {
  const { gatewayStatus } = useGateway()

  return (
    <IconContainer >
       {`Captcha Pass Status: ${CivilGatewayStatus[gatewayStatus]}`}
        <img
          src="https://civic.me/static/media/bot_icon.f8d363e6d1ab7990da7126f8fa6a67ab.svg"
          alt=""
        />
    </IconContainer>
  )
}

function RequestGatewayTokenDesktop() {
  const { requestGatewayToken } = useGateway()
  const { gatewayStatus } = useGateway()
  return (
    <Container>
      <StatusIcon placement="right" />
      <b>⟶</b>
      <StyledExpandButton
        iconButton
        margin={0}
        type="submit"
        onClick={requestGatewayToken}
        width="150px"
        
      >
        <span style={{ marginLeft: '10px' }}>
          {CivilGatewayStatus[gatewayStatus]}
        </span>

      </StyledExpandButton>
    </Container>
  )
}

export function CaptchaGatewayDesktop() {
  const wallet = useWallet()
  const { publicKey } = wallet
  const { gatekeeperNetwork, cluster } = env
  const conn = new Connection(clusterApiUrl('devnet'), 'processed')
  if (!conn || !publicKey) return null
  return (
    <GatewayProvider
      connection={conn}
      wallet={wallet}
      gatekeeperNetwork={gatekeeperNetwork}
      cluster={cluster}
      options={{
        autoShowModal: true,
      }}
    >
      <RequestGatewayTokenDesktop />
    </GatewayProvider>
  )
}
