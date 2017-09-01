import { Component, OnInit } from '@angular/core';

import { PicItem } from '../model/pic-item';
import { JsonPlaceholderService } from '../services/json-placeholder.service';

@Component({
  selector: 'app-pic-list',
  templateUrl: './pic-list.component.html',
  styleUrls: ['./pic-list.component.scss'],
  providers: [JsonPlaceholderService]
})
export class PicListComponent implements OnInit {

  Math: any;

  refreshing: boolean;
  placeholderList: Array<PicItem>;
  picList: Array<PicItem>;
  currentPage: number;

  opened: boolean;
  loading: boolean;
  currentImage: PicItem;

  constructor(private jsonPlaceholderService: JsonPlaceholderService) { }

  ngOnInit() {
    this.Math = Math;
  }

  onRefreshPicList = () => {
    this.refreshing = true;
    this.jsonPlaceholderService.getImages()
      .then(images => {
        this.placeholderList = images;
        this.currentPage = 1;
        this.calculateCurrentPage();
        this.refreshing = false;
      });
  }

  calculateCurrentPage = () => {
    this.picList = this.placeholderList.slice(0 + (35 * (this.currentPage - 1)), 35 * this.currentPage);
  }

  onNext = () => {
    this.currentPage++;
    this.calculateCurrentPage();
  }

  onPrevious = () => {
    this.currentPage--;
    this.calculateCurrentPage();
  }

  onShowPicModal = (eventItem: PicItem) => {
    this.currentImage = eventItem;
    this.opened = true;
    this.loading = true;
  }

  onImageModalLoaded = () => {
    this.loading = false;
  }

  closeImageModal = () => {
    this.opened = false;
  }

}
