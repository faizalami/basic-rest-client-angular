import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemsService, Item} from '../services/items.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    ItemsService
  ]
})
export class FormComponent implements OnInit {
  private id = null;
  private pageTitle = 'New Item';
  private item = new Item();
  private isEdit = false;
  constructor(
    @Inject(ItemsService) private itemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.isEdit = true;
      this.itemsService.getById(this.id).subscribe(value => {
        this.item.initValues(value.data);
        this.pageTitle = 'Edit Item ' + this.item.name;
      });
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.itemsService.update(this.id, this.item).subscribe(value => {
        this.router.navigate(['/']);
      });
    } else {
      this.itemsService.create(this.item).subscribe(value => {
        this.router.navigate(['/']);
      });
    }
  }

  ngOnInit() {
  }

}
