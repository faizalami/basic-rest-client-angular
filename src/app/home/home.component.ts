import {Component, Inject, OnInit} from '@angular/core';
import {ItemsService, Item} from '../services/items.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ItemsService
  ]
})
export class HomeComponent implements OnInit {

  public items: any[] = [];

  constructor(
    @Inject(ItemsService) private itemsService: ItemsService,
    private router: Router
  ) {
    console.log('Home Component');
    this.refreshItems();
  }

  editItem(id: string) {
    this.router.navigate(['update', id]);
  }

  deleteItem(id: string) {
    this.itemsService.delete(id).subscribe(value => {
      this.refreshItems();
    });
  }

  refreshItems() {
    this.itemsService.getAll().subscribe(value => {
      this.items = value.data;
    }, error => {
      console.log('error', error);
    });
  }

  ngOnInit() {
  }

}
