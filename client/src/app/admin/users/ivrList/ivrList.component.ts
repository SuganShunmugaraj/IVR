import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from '../../../providers/share.service';
import { constants } from '../../../constants';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'admin-ivrlist',
  templateUrl: './ivrlist.component.html',
  styleUrls: ['./ivrlist.component.scss']
})
export class IvrlistComponent implements OnInit {
  cuserveJson: any = {};
  editType: boolean;
  register: any = {};
  userId: any;
  dataSource: any;
  cols: any;
  totalRecords: any = 10;
  activePagination = 0;
  jsonDataString: any;
  callLogData: any;
  jsonData: any;

  constructor(
    private route: ActivatedRoute,
    private shareService: ShareService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userid'];
      this.userId ? (this.editType = true, this.getuserDetail()) : null;
    });

    this.cols = [
      { field: 'ivrName', header: 'IVR Name' },
      { field: 'createdAt', header: 'Created At' },
      { field: 'createdBy.name', header: 'Created By' },
      { field: 'approved', header: 'Status' }
    ];
    localStorage.getItem('activeivrlistpagination') ?
      this.activePagination = JSON.parse(localStorage.getItem('activeivrlistpagination')) : this.activePagination = null;
  }

  pageChange(ev) {
    localStorage.setItem('activeivrlistpagination', ev.first);
  }
  getuserDetail() {
    this.shareService.getData(constants.getCustomer + this.userId).subscribe((res) => {
      this.register = res['data'][0];
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
    this.shareService.getData(constants.getIvr + 'getByUser/' + this.userId).subscribe((res) => {
      this.dataSource = res['ivr'];
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }

  deleteIvr(data, i) {
    this.confirmationService.confirm({
      message: 'Are you sure want to delete?',
      accept: () => {
        this.shareService.delete(constants.getIvr + data._id).subscribe(res => {
          this.getuserDetail();
          this.messageService.add({ severity: 'sucess', summary: 'Deleted Sucessfully', detail: res['message'] });
        });
      }
    });
  }

  viewCallLogs(data) {
    const input = {
      twilioNumber: data.twilioNumber
    };
    this.shareService.postData(constants.getCallLog, input).subscribe(res => {
      this.callLogData = res['calls'];
    });
  }


  filterNode(node: object, Index?: number, parent?: object) {
    let numSeconds: number;
    let count: number;
    // #keyCode
    let keyCode = parent && parent['keyCode'] ? parent['keyCode'] : this.register['defaultKeyCode'];
    if (Index > -1) {
      if (keyCode.split(',').length === 1) {
        Index = Index + 1;
        keyCode = keyCode + ',' + Index;
      } else {
        Index = Index + 1;
        keyCode = keyCode + ',,,' + Index;
      }
    }
    numSeconds = (keyCode.split(',').length - 1) * 2;
    node['data'] = {
      'action': node['label'] || 'No Data',
      'company': this.register['companyName'],
      'keyCode': keyCode,
      'hasInputs': 'false',
      'numSeconds': numSeconds
    };

    // #delete
    delete node['id'];
    delete node['label'];
    delete node['type'];
    delete node['twilioId'];
    delete node['styleClass'];
    delete node['expanded'];
    delete node['nodeType'];

    // #recall children node
    if (node['children'] && node['children'].length) {
      // remove split node
      let splitIndex = -1;
      let splitChildren = [];
      for (let j = 0; j < node['children'].length; j++) {
        const child = node['children'][j];
        if (child.type === 'split') {
          splitChildren = child.children;
          splitIndex = j;
        }
      }

      if (splitIndex > -1) {
        node['children'].splice(splitIndex, 1);
        // node['children'] = node['children'].concat(splitChildren);
        node['children'] = splitChildren;
      }
      const filter = node['children'].filter((obj) => {
        if (obj && obj !== null) {
          return obj;
        }
      });
      node['children'] = filter;

      for (let i = 0; i < node['children'].length; i++) {
        const child = node['children'][i];
        if (child.nodeType === 'timeout') {
          // remove (No Input) node
          delete node['children'][i];
        } else {
          if (keyCode === undefined) {
            this.filterNode(child, i);
          } else {
            const parent = {
              keyCode: keyCode,
              count: count
            };
            this.filterNode(child, i, parent);
          }
        }
      }
    }
  }

  // outer function
  generateCuserveJson(node: object, twilioassignednumber: string) {
    if (this.register && this.register['companyName']) {
      this.register['defaultKeyCode'] = twilioassignednumber + '';
      // #delete trigger node - not required
      delete node['id'];
      delete node['label'];
      delete node['type'];
      delete node['twilioId'];
      delete node['styleClass'];
      delete node['expanded'];
      node['data'] = {
        'action': node['data'].message || node['data'].options,
        'company': this.register['companyName'],
        /* "keyCode": this.register['companyIvrNumber'], */
        'keyCode': twilioassignednumber,
        'hasInputs': 'false',
        'numSeconds': 0
      };
      if (node['children'].length > 0) {
        //  call initial start node
        this.filterNode(node['children'][0], undefined, this.register['defaultKeyCode']);
      }
    } else {
      return this.messageService.add(
        {
          severity: 'error', summary: 'Error Message',
          detail: 'Please configure company IVR number and company name'
        });
    }
    const gatherinputChildren = node['children'][0]['children'];
    node['children'].splice(0, 1);
    node['children'] = gatherinputChildren;
    return node;
  }

  copyJson(data: object, type: string, twilioassignednumber: string) {
    if (type === 'twilio') {
      this.jsonDataString = JSON.parse(data['ivrJson']);
      const mainChild = [];
      for (let i = 1; i < this.jsonDataString.states.length; i++) {
        if (i == 1) {
          this.jsonDataString.states[i].properties.offset.x = 50;
          this.jsonDataString.states[i].properties.offset.y = 150;
        }
        for (let j = 0; j < this.jsonDataString.states[i].transitions.length; j++) {
          const nodeCount = 1;
          const child_widget = [];
          if (this.jsonDataString.states[i].transitions[j].next != null) {
            child_widget.push(i, j);
          }
          mainChild[this.jsonDataString.states[i].transitions[j].next] = (child_widget);
        }
      }
      for (let i = 1; i < this.jsonDataString.states.length; i++) {
        if (i !== 1) {
          if (mainChild[this.jsonDataString.states[i].sid]) {
            let xax = mainChild[this.jsonDataString.states[i].sid][1];
            let yax = mainChild[this.jsonDataString.states[i].sid][0];
            if (xax === 0) {
              xax = -2 * 2;
            } else {
              xax = mainChild[this.jsonDataString.states[i].sid][1] * 2;
            }
            if (yax === 0) {
              yax = 2 * 1.5;
            } else {
              yax = mainChild[this.jsonDataString.states[i].sid][0] * 1.5;
            }
            this.jsonDataString.states[i].properties.offset.x = 150 * xax;
            this.jsonDataString.states[i].properties.offset.y = 150 * yax;
          }
        }
      }
      this.jsonData = this.jsonDataString;
      this.jsonDataString = JSON.stringify(this.jsonData);
    }

    if (type === 'cuserve') {
      this.cuserveJson = JSON.parse(data['orginalJson']);
      this.jsonData = this.generateCuserveJson(this.cuserveJson[0], twilioassignednumber);
      this.jsonDataString = JSON.stringify(this.jsonData);
    }
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.jsonData = null;
    document.body.classList.remove('modal-open');
  }

  copied(ev) {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'JSON is Copied to Clipboard' });
  }

  uploadToCompanyCuserve(data) {
    this.cuserveJson = JSON.parse(data.orginalJson);
    const jsonData = this.generateCuserveJson(this.cuserveJson[0], data.assignedNumber);
    const payload = {
      company: data.createdBy.companyName,
      name: data.ivrName,
      tree: jsonData,
      populateCheckpoints: true
    };
    this.shareService.postData(constants.addIvr, payload).subscribe(res => {
    });
  }


  uploadIvrToCuserve(data) {
    const payload = {
      name: data.createdBy.companyName,
      ivrName: data.ivrName,
      baseKeyCode: data.assignedNumber,
      displayName: data.createdBy.companyName.replace(/\s+/g, '-').toLowerCase(),
      logoUrl: data.createdBy.companyLogo,
      category: data.createdBy.category,
      customerCare: data.assignedNumber
    };
    data.createdBy.tagline ? payload['tagline'] = data.createdBy.tagline : payload['tagline'] = null;

    this.shareService.postData(constants.addCompany, payload).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Company detail uploaded sucessfully' });
    }, (err) => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
    });
  }


}
