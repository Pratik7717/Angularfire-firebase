import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection:AngularFirestoreCollection<Item>;
  items:Observable<any[]>;
  itemDoc!: AngularFirestoreDocument<Item>;

  constructor(firestore: AngularFirestore) {
     this.itemsCollection=firestore.collection('Items');
    // this.items = this.itemsCollection.valueChanges();
    // console.log('items',this.items)
    this.items = firestore.collection('Items').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      }))
    );


  }

  getItems()
  {
    return this.items;
  }

  addItem(item: Item){
    this.itemsCollection.add(item);
  }

  deleteItem(item:Item)
  {
    this.itemDoc=this.itemsCollection.doc(`Items/${item.id}`);
    this.itemDoc.delete();
  }
}
