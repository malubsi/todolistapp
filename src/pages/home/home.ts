import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items = [];

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController,
    public dataService: Data) {
      this.refresh();
  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.onDidDismiss((item) => {
      if (item) { this.saveItem(item); }
    });
    addModal.present();
  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  clearPage() {
    let confirm = this.alertCtrl.create({
      title: 'Excluir todos os itens',
      message: 'Tem certeza que deseja excluir todos os itens?',
      buttons: [
        { text: 'Não', handler: () => {}},
        { text: 'Sim', handler: () => { this.removeAll();}}
      ]
    });
    confirm.present();
  }

  removeItem(index) {
      this.items.splice(index, 1);
      this.dataService.save(this.items);
  }

  removeAll(){
    let size = this.items.length;
    this.items.splice(0,size);
    this.dataService.save(this.items);
  }

  refresh() {
    this.dataService.getData().then((todos) => {
      if (todos) { this.items = JSON.parse(todos);}});
  }

}