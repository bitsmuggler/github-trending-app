import { Component, OnInit } from '@angular/core';
import { StreamService } from './stream.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions, PickerButton } from '@ionic/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.page.html',
  styleUrls: ['./stream.page.scss'],
})
export class StreamPage implements OnInit {

  filter: Filter = { since: 'weekly', language: '' };
  trendingRepos: TrendingRepo[];

  constructor(private streamService: StreamService, private pickerController: PickerController) {
  }

  ngOnInit() {
    this.getTrendingRepos(null);
  }

  getRepos(event) {
    this.getTrendingRepos(event);
  }

  async showAdvancedPicker() {

    let languageColumns = [];

    languageColumns.push({ text: 'All', value: '' });

    for (let lang of [...new Set(this.trendingRepos.map(r => r.language))]) {
      if (lang) {
        languageColumns.push({
          text: lang, value: lang
        });
      }
    }

    let opts: PickerOptions = {
      cssClass: 'academy-picker',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Filter',
          cssClass: 'special-done',
          handler: (data) => {
            console.log('handler');
            console.log(data);
            this.filter.language = data.language.value;
            this.filter.since = data.time.value;
            this.getTrendingRepos(null);
          }
        }
      ],
      columns: [
        {
          name: 'time',
          options: [
            { text: 'Daily', value: 'daily' },
            { text: 'Weekly', value: 'weekly' },
            { text: 'Monthly', value: 'monthly' }
          ]
        },
        {
          name: 'language',
          options: languageColumns
        }
      ]
    };

    let picker = await this.pickerController.create(opts);
    picker.present();
  }

  private getTrendingRepos(event) {
    console.log('get trending repos');
    console.log(this.filter);
    this.streamService.getTrendingRepos(this.filter).subscribe((data: any) => {
      this.trendingRepos = data;
      if (event) {
        event.target.complete();
      }
    })
  }
}
