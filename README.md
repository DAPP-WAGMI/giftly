# Giftly: Web3-Native Gift Card Service

Giftly is a web3 gift card service powered by Polygon and IPFS. Users can send NFT gift cards to express their love and gratitude to others. Make someone's day special with Giftly.

## Smart Contracts

The Giftly Protocol Contract is hosted on [`/contracts`](contracts).

## Frontend

All the web app client side code is hosted on [`/frontend`](frontend).

## Cron Server

The cron server for the scheduled gift card send is hosted on [`/cron-server`](cron-server).

### Context

There's too much extracting, scheming, pumping, and dumping in web3 - and not enough love and gratitude. As a result, we've built Giftly.

Giftly is a web3 gift card service powered by Polygon and IPFS. Users can send NFT gift cards to express their love and gratitude to others.

Each gift card can be charged with either native tokens or ERC20s for a given amount (e.g. 0.01ETH, 0.02ETH, 0.05ETH, 0.1ETH, custom value). The sender will mint an NFT that represents that value attached with a message and design of their choice. The recipient will be able to claim the value on the gift card through the Giftly Protocol (and also keep the card as a souvenir).

Giftly takes a 2% fee from each gift card purchase. 1% of that fee will go to charities, 1% will go to the treasury for exciting rewards drops for top Gifters and Giftees.

In the long-term, we aim to build a standard for vendors (i.e. NFT marketplaces like Opensea or Zora) to accept our gift cards for users making purchases on their platform and be able to sell their own branded gift cards.

Make someone's day special with Giftly.

### How it's Made

- Network: Polygon

We benefit from Polygon's fast transaction speed and low gas fees.

- File Storage: IPFS

We benefit from IPFS's flexible, easy-to-use, reliable NFT metadata storage system.

Frontend:

- NextJS
- RainbowKit
- Ethers
- Wagmi
- Chakra UI

Backend:

- Firebase
- Hardhat

Host Service:

- IPFS (Fleek)
