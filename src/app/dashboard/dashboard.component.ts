import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totallyCharged: boolean = false; // use to know when show the info

  totalRooms: number = 0;
  notifiedRooms: number = 0;
  mostNotifiedRoom: string = '';
  countRR: number = 0;

  constructor(
    private notificationService: NotificationService
  ) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
    this.getTotalRooms();
    this.getNotifiedRooms();
    this.getMostNotifiedRoom();
    this.getCountOfRR();
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['L', 'M', 'M', 'J', 'V'],
          series: [
              [12, 17, 7, 17, 23]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);

      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['Minas', 'Elect.', 'Metro', 'Serv.', 'Deca.', 'Bien.', 'Labs.', 'Est.', 'I+D', 'Const.', 'E1+E2', 'Mecan.'],
        series: [
          [54, 44, 32, 78, 55, 45, 32, 43, 56, 61, 75, 89]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 100,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
      
  }

  private getTotalRooms(){
    this.notificationService.getTotalRooms().subscribe((resp:any) => {
      this.totalRooms = resp.total
    })
  }

  private getNotifiedRooms(){
    this.notificationService.getNotifiedRooms().subscribe((resp:any) => {
      this.notifiedRooms = resp.count
    })
  }

  private getMostNotifiedRoom(){
    this.notificationService.getMostNotifiedRoom().subscribe((resp:any) => {
      this.mostNotifiedRoom = resp.name
    })
  }

  private getCountOfRR(){
    this.notificationService.getCountOfRR().subscribe((resp:any) => {
      this.countRR = resp.count
    })
  }
}
