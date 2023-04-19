const {Alchemy, Network} = require('alchemy-sdk');
const fs = require('fs')

const config = {
    // Alchemy API key
    apiKey: '',
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const main = async () => {
    // Read verifiable wallets from file
    const wallets = fs.readFileSync('./wallets.txt', 'utf8').toLowerCase().split(/\r?\n/);
    // NFT contract address
    const address = '0x75ad4c505E5b4Bb65b832c91eB76529cE07220F1';

    // Get owners
    const owners = await alchemy.nft.getOwnersForContract(address);

    let numberOfHolders = 0;
    for (let i = 0; i < wallets.length; i++) {
        if (owners.owners.includes(wallets[i])) {
            console.log(wallets[i])
            numberOfHolders++
        }
    }
    console.log(`Quantity of NFTs: ${numberOfHolders}`)
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();