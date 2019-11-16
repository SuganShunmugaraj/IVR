import { Component, OnInit } from '@angular/core';
 import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { filter , pairwise} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Cuserve';

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.router.events
    .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
    ).subscribe((e: any) => {
        localStorage.setItem('previousurl' , e[0].urlAfterRedirects);
    });
  }

}
