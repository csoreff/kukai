import { Component, OnInit, Input } from '@angular/core';

import { WalletService } from '../../services/wallet.service';
import { OperationService } from '../../services/operation.service';
import { MessageService } from '../../services/message.service';
import { ExportService } from '../../services/export.service';
import { CoordinatorService } from '../../services/coordinator.service';

@Component({
    selector: 'app-broadcast',
    templateUrl: './broadcast.component.html',
    styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {

    InputImportWalletFileStep1 = 'Choose file';
    InputImportWalletFileStep2 = 'Choose file';
    InputImportOperationFileStep2 = 'Choose file';
    InputImportOperationFileStep3 = 'Choose file';

    unsigned = '';
    signed = '';
    pwd = '';
    pwdPlaceholder = '';

    isFullWallet = false;

    constructor(
        public walletService: WalletService,
        private operationService: OperationService,
        private messageService: MessageService,
        private exportService: ExportService,
        private coordinatorService: CoordinatorService
    ) { }

    ngOnInit() {
        if (this.walletService.wallet && this.walletService.isFullWallet()) {
            this.init();
        }

        this.isFullWallet = this.walletService.isFullWallet();
    }

    init() {
        this.pwdPlaceholder = 'Password';
    }

    handleViewOnlyWalletFileInput(files: FileList) {
        const walletFileInput = files.item(0);
        this.InputImportWalletFileStep1 = walletFileInput.name;
    }

    handleWalletFileInput(files: FileList) {
        const walletFileInput = files.item(0);
        this.InputImportWalletFileStep2 = walletFileInput.name;
    }

    /*
    handleUnsignedOperationFileInput(files: FileList) {
        const operationFileInput = files.item(0);
        this.InputImportOperationFileStep2 = operationFileInput.name;
    }

    handleSignedOperationFileInput(files: FileList) {
        const signedOperationFileInput = files.item(0);
        this.InputImportOperationFileStep3 = signedOperationFileInput.name;
    }
    */
    broadcast() {
        if (this.signed) {
            const signed = this.signed;
            this.signed = '';

            this.operationService.broadcast(signed).subscribe(
                (ans: any) => {
                    console.log(JSON.stringify(ans));
                    if (ans.success) {
                        this.messageService.addSuccess('Operation successfully broadcasted to the network: ' + ans.payload.opHash);
                        this.coordinatorService.setBroadcast();
                    } else {
                        this.messageService.addWarning('Couldn\'t retrive operation hash!');
                    }
                },
                err => {
                    this.messageService.addError('Node responded with an error!');
                    console.log(JSON.stringify(err));
                }
            );
        }
    }

    handleSignedOperationFileInput(files: FileList) {
        console.log('Files length: ' + files.length);
        const fileToUpload = files.item(0);
        this.InputImportOperationFileStep3 = fileToUpload.name;

        const reader = new FileReader();
        reader.readAsText(fileToUpload);

        reader.onload = () => {
            if (reader.result) {
                const data = JSON.parse(reader.result);

                if (data.signed === true && data.hex) {
                    this.signed = data.hex;
                } else {
                    this.messageService.addWarning('Not an unsigned operation!');
                }
            } else {
                this.messageService.addError('Failed to read file!');
            }
        };
    }

    sign() {
        if (this.pwd) {
          console.log('sign');
          const pwd = this.pwd;
          this.pwd = '';
          const keys = this.walletService.getKeys(pwd);
          if (keys) {
            const signed = this.operationService.sign(this.unsigned, keys.sk);
            this.signed = signed.sbytes;
          }
        }
      }

    download() {
        this.exportService.downloadOperationData(this.signed, true);
    }

    handleUnsignedOperationFileInput(files: FileList) {
        const fileToUpload = files.item(0);
        this.InputImportOperationFileStep2 = fileToUpload.name;

        const reader = new FileReader();
        reader.readAsText(fileToUpload);

        reader.onload = () => {
            if (reader.result) {
                const data = JSON.parse(reader.result);

                if (data.signed === false && data.hex) {
                    this.unsigned = data.hex;
                } else {
                this.messageService.addWarning('Not an unsigned operation!');
                }
            } else {
                this.messageService.addError('Failed to read file!');
            }
        };
    }
}
