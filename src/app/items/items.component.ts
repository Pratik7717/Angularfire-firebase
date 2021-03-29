import { Component, OnInit } from '@angular/core';
import { Item } from '../models/Item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items:Item[]=[];
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe((response)=>{
      console.log(response);
      this.items=response;
    });
  }

  deleteItem(event:any,item:any){
    this.itemService.deleteItem(item);
  }

}
