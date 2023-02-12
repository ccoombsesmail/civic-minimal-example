/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react'
import { clusterApiUrl, PublicKey, Connection } from '@solana/web3.js'
import {
    Badge,
    GatewayProvider, useGateway,
} from '@civic/solana-gateway-react'
import { useWallet } from '@solana/wallet-adapter-react'

import {
    Container, IconContainer, StyledExpandButton,
} from '../Style'

import '@solana/wallet-adapter-react-ui/styles.css'
import { CivilGatewayStatus } from '../CivilGatewayStatus'

const env = {
    gatekeeperNetwork: new PublicKey('uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv'),
    clusterUrl: clusterApiUrl('devnet'),
    cluster: 'devnet',
}

function StatusIcon() {
    const { gatewayStatus } = useGateway()

    return (
        <IconContainer >
            {`Uniqueness Pass Status: ${CivilGatewayStatus[gatewayStatus]}`}
            <img
                src="https://civic.me/static/media/uniqueness.c7a0f0195d44b27436f30aee36620cae.svg"
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

export function CaptchaGatewayDesktopUnique() {
    const wallet = useWallet()
    const { publicKey } = wallet
    const { gatekeeperNetwork, cluster } = env
    const conn = new Connection(clusterApiUrl('devnet'), 'processed')
    if (!conn || !publicKey) return null
    return (
        <>
            <Badge gatekeeperNetwork={gatekeeperNetwork} publicKey={publicKey} connection={conn}/>
            <GatewayProvider
                connection={conn}
                wallet={wallet}
                gatekeeperNetwork={gatekeeperNetwork}
                cluster={cluster}
                options={{
                    autoShowModal: false,
                }}
            >
                <RequestGatewayTokenDesktop />
            </GatewayProvider>
        </>
    )
}
