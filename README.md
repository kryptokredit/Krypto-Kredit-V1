# Introduction

Teaser: https://lvpr.tv/?v=a3b5m85lnqmjdefv

Pitch Deck: https://docs.google.com/presentation/d/1W_Ufe8uo_mZriEN3jOlWteSjfGKherPPN1x5GoRaW4w/edit#slide=id.g215acbd223f_0_5

Krypto Kredit is a Web3 Dapp that allows users to build credit by taking off chain transaction data and putting them on chain through NFT invocing and validators. Currently, only 23% of the worlds population has access to credit. This project was built to reach 99% of people by tackling cash transactions. This front end is used to interact with Krypto Kredit smart contracts to create and sign invoices from an invoicer and a payer.

## Integration on ETHDenver 2023 Hackaton

Use this address as validator: `0x0582fB623317d4B711Da3D7658cd6f834b508417`

## SPECTRAL FINANCE

We've integrated both their API and SDK solution to validate our costumer. You can check for other users scores (via API) and get your own credit score with their SDK. 

## HUMA FINANCE

With the integration of Huma evaluation agent (EA) we can monitor the Krypto Kredit invoice subgraphs and checks for metrics for underwriting risk. The Huma EA uses a combination of invoice count, invoices paid, invoices sent, along with metrics on if any invoices have been paid late or if user has recieved any derogatory mark NFTs. Once metrics have been tabulated credit limits are issued to the user and he is granted a line of credit.

## METAMASK SNAPS

We've built 2 snap functions to give our users a better experience in every plataform that uses our invoices. 

`getPendingInvoices` : Will get the number of pending invoices you have. <br>
`payLatestInvoice` : Will sign the older invoice you have to your wallet

## POLYGON

We've got advantage of the the low fee transactions and the stability of the network to perform at our peak. We've integrated our technology so in the future we can ad ID implementations for our users via this rollup solution.

## SCROLL

We've deployed fully on Scroll and we've been planning to implement our validitor system with their zKproof technology to upgrade the trust in the system by validation transactions in a secure way that can benefit the anonimity of the user.

## THE GRAPH

Our multigraph implementation let's the ecosystem gather all the information the user needs to have a clearer understanding of a users finantial transactions on and off chain. We're trying to implement a new social score that will give our users the capabilities of getting transactional freedom.

Current Graph, fetch from polygon network to feed our user analytics.

Factory Graph: `https://api.thegraph.com/subgraphs/name/luiscmogrovejo/factory-graph`<br>
Default Certificate Graph: `https://api.thegraph.com/subgraphs/name/luiscmogrovejo/bad-kredit`<br>
Transaction Certification Graph: `https://api.thegraph.com/subgraphs/name/luiscmogrovejo/good-token`<br>
Validator Graph`https://api.thegraph.com/subgraphs/name/luiscmogrovejo/validator-token`<br>

## DEPLOYMENTS

All our contracs have been  fully deployed and verified.

Project URL = `https://kryptokredit.netlify.app/`

Contracts repo: https://github.com/kryptokredit/Smart-Contracts

MUMBAI

Factory Deployed: `0x0F97AAB884B8d1A49B0a4941B77fe08D8Ad19696` <br>
KryptoKredits Deployed: `0x4388CD730ee501d6A0617A7Ef9D92511e77c5895`<br>
Bad Deployed: `0x81A8C712Bc9a0E83d797522006806b81DA21273B`<br>
Goodd Deployed: `0x43F45be24ab2F025be425bfe295C18D3E71cc65f`<br>
Validator Deployed: `0x6508912957F7DC9b0c5964C59b6572E6F2AeF3DA`<br>

SCROLL

Factory Deployed: `0xdC0Ab650c385b47c0360035dE8145f6a035cAbE5`<br>
KryptoKredits Deployed: `0xAF81ac4A2C1D1A5470835938875ed2512fD219Bb`<br>
Bad Deployed: `0xCf4e15754470fa72912F1927b8BCBC0822a3CbBb`<br>
Goodd Deployed: `0x538e51be5122cB37FDDDd00E34eD8208A6F1BF01`<br>
Validator Deployed: `0x345B24D5f4A8Bfd81133bad3df8C3c0D9a989Ee8`<br>

To get started with this project, follow these steps:

Clone this repository using the following command: `git clone https://github.com/kryptokredit/krypto-kredit-dapp.git`

Navigate to the project directory and install the required dependencies using yarn:

`cd krypto-kredit-dapp`<br>
`yarn install`

Start the development server using the following command: `yarn start`

This will start the development server and open the application in your default browser at `http://localhost:3000`.

## Contribution
We welcome contributions to this project! To contribute, please follow these steps:

Fork the repository Create a new branch: git checkout -b my-branch-name Make your changes and commit them: git commit -am 'Add some feature' Push to the branch: git push origin my-branch-name Create a new Pull Request We will review your changes and merge them if they meet the project's guidelines.

If you have any questions, feel free to contact us on Twitter at @example_username.

### License
MIT License

Copyright (c) [2023] [KryptoKredit]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
