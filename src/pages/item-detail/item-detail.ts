import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Data } from '../../providers/data';

@Component({
    selector: 'page-item-detail',
    templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

    title;
    description;

    constructor(public navParams: NavParams, 
    private dataService: Data, public view: ViewController) {}

    ionViewDidLoad() {
        this.title = this.navParams.get('item').title;
        this.description = this.navParams.get('item').description;
    }

}