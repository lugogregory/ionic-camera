import { Component, OnInit } from '@angular/core';
import { UserPhoto } from '../models/user-photo.model';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

public photoGallery: UserPhoto[] = [];

constructor(private photoService: PhotoService) { }

async ngOnInit() {
  await this.photoService.loadSaved();
  this.photoGallery = this.photoService.getPhotos();
}

addPhotoToGallery() {
  this.photoService.addNewToGallery();
}

}
