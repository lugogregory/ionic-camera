import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { UserPhoto } from '../models/user-photo.model';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

public photoGallery: UserPhoto[] = [];

constructor(private photoService: PhotoService, public actionSheetController: ActionSheetController) { }

async ngOnInit() {
  await this.photoService.loadSaved();
  this.photoGallery = this.photoService.getPhotos();
}

addPhotoToGallery() {
  this.photoService.addNewToGallery();
}

public async showActionSheet(photo: UserPhoto, position: number) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Are you sure delete this photo?',
    buttons: [{
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.photoService.deletePicture(photo, position);
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // Nothing to do, action sheet is automatically closed
        }
    }]
  });
  await actionSheet.present();
}

}
