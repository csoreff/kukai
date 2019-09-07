interface Net {
    NAME: string;
    API_URL: string;
    NODE_URL: string;
    BLOCK_EXPLORER_URL: string;
    CHAIN_ID: string;
    OTHERNODESURLS: string[];
}

export class Constants {
    // Select Zeronet, Alphanet or Mainnet
    // readonly NET: Net = this.alphanet();
    // readonly NET: Net = this.zeronet();
    NET: Net = this.alphanet();

    changeNodeURL(url) {
        this.NET.NODE_URL = url;
    }
    getCurrentNodeURL() {
        return this.NET.NODE_URL;
    }

    getNetworkName() {
        return this.NET.NAME;
    }

    zeronet(): Net {
        const ZERONET: Net = {
            NAME: 'Zeronet',
            API_URL: 'https://api.zeronet.tzscan.io/',
            NODE_URL: 'https://zeronet-node.tzscan.io/',
            BLOCK_EXPLORER_URL: 'https://zeronet.tzscan.io/',
            CHAIN_ID: 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK',
            OTHERNODESURLS: ['https://zeronet-node.tzscan.io/', 'https://zeronet-node.tzscan.io/']
        };
        return ZERONET;
    }
    alphanet(): Net {
        const ALPHANET: Net = {
            NAME: 'Alphanet',
            API_URL: 'https://api.alphanet.tzscan.io/',
            NODE_URL: 'https://rpcalpha.tzbeta.net/',
            BLOCK_EXPLORER_URL: 'https://alphanet.tzscan.io/',
            CHAIN_ID: 'Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd',
            OTHERNODESURLS: ['https://rpcalpha.tzbeta.net/', 'https://alphanet-node.tzscan.io/']
        };
        return ALPHANET;
    }
    mainnet(): Net {
        let n = Math.floor(Math.random() * 5) + 1;
        if (n > 3) { n += 1; }
        const MAINNET: Net = {
            NAME: 'Mainnet',
            API_URL: 'https://api' + n + '.tzscan.io/',
            NODE_URL: 'https://mainnet.tezrpc.me/',
            BLOCK_EXPLORER_URL: 'https://tzscan.io/',
            CHAIN_ID: 'Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd',
            OTHERNODESURLS: ['https://rpc.tzbeta.net/', 'https://mainnet-node.tzscan.io/', 'https://mainnet.tezrpc.me/']
        };
        return MAINNET;
    }
}
