import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from '../../providers/share.service';
import { constants } from '../../constants';

@Pipe({ name: 'keys', pure: false })
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value);
  }
}

@Component({
  selector: 'app-calllog',
  templateUrl: './calllog.component.html',
  styleUrls: ['./calllog.component.scss']
})
export class CalllogComponent implements OnInit {
  flowSid: any;
  executionslist: any;
  dt: any;
  cols: any;
  callLogData: any;
  totalRecords: any;
  userInputs: any[];
  activePagination = 0;
  constructor(private route: ActivatedRoute,
    private shareService: ShareService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.flowSid = params['id'];
    });

    this.shareService.postData(constants.getCallLog, { flowSid: this.flowSid }).subscribe(res => {
      this.executionslist = res['executions'];
    });

    sessionStorage.getItem('activeivrpagination') ?
      this.activePagination = JSON.parse(sessionStorage.getItem('activeivrpagination')) : this.activePagination = null;
  }

  pageChange(ev) {
    sessionStorage.setItem('activeivrpagination', ev.first);
  }

  getUserInput(sid) {
    this.shareService.postData(constants.getCallLog + 'userinput', { flowSid: this.flowSid, sid: sid }).subscribe(res => {
      this.callLogData = res['executions'];
      this.userInputs = [];
      let index = 1;
      for (const key in this.callLogData.context.widgets) {
        if (this.callLogData.context.widgets[key].Digits) {
          const a = {};
          a['input-' + index++] = this.callLogData.context.widgets[key].Digits;
          this.userInputs = [...this.userInputs, a];
        }
      }
    });
  }
}
