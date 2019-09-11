import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';  // Init the TranslateService

import { WalletService } from '../../services/wallet.service';
import { CoordinatorService } from '../../services/coordinator.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    isCollapsed = false;

    NETWORK;
    param = {value: 'world'};  // Test translation

    constructor(
        public translate: TranslateService,
        private router: Router,
        public walletService: WalletService,
        private coordinatorService: CoordinatorService
    ) {
        translate.addLangs(['en', 'fr', 'ru', 'jp', 'kor', 'por']);

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        const browserLang = translate.getBrowserLang();
        console.log('browserLang ', browserLang);
        translate.use(browserLang.match(/en|fr|ru|jp|kor|por/) ? browserLang : 'en');

        this.NETWORK = walletService.NETWORK;
    }

  ngOnInit() {}

  testChange(lang: string) {
    console.log('lang in testChange() ', lang);
  }

  returnLanguage(lang: string) {

    // this.translate.use(lang);
    // console.log('lang ', lang);

    const map: Map<string, string> = new Map([
        ['en', 'English'],
        ['cn', '中国'],
        ['es', 'Español'],
        ['fr', 'Français'],
        ['ru', 'Pусский'],
        ['jp', '日本語'],
        ['kor', '한국어'],
        ['por', 'Português'],
        ['swe', 'Svenska']
    ]);

    const language = map.get(lang);

    return language;
  }

  changeNodeURL(url: string) {
    this.walletService.NETWORK.setCurrentNodeURL(url);
    console.log('Current Node URL ', this.walletService.NETWORK.NET.NODE_URL);
  }

  returnCurrentNode(url: string) {

    // console.log('Current Node URL ', url);

    const map: Map<string, string> = new Map([
        // Mainnet
        ['https://rpc.tzbeta.net/', 'Tezos Foundation'],
        ['https://mainnet.tezrpc.me/', 'TezRPC'],
        ['https://tezos-rpc.nodes.polychainlabs.com/', 'Polychain Labs'],
        ['https://mainnet-node.tzscan.io/', 'Tzscan'],
        //['https://teznode.letzbake.com/]', 'LETZBAKE']
        // Other mainnet nodes: Galleon public nodes, Simple-staking, Polychain, tplus.dev

        // Alphanet
        ['https://rpcalpha.tzbeta.net/', 'Tezos Foundation Alphanet'],
        ['https://alphanet-node.tzscan.io/', 'Tzscan Alphanet'],

        // Zeronet
        ['https://rpczero.tzbeta.net/', 'Tezos Foundation Zeronet'],
        ['https://zeronet-node.tzscan.io/', 'Tzscan Zeronet']
    ]);

    const currentNode = map.get(url);

    return currentNode;
  }

  logout() {
        this.coordinatorService.stopAll();
        this.walletService.clearWallet();
        this.router.navigate(['']);
  }
}
