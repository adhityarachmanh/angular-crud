import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Books } from '../models/books';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @Output addBook: EventEmitter<any> = new EventEmitter()
  update: boolean = false;
  books: Books[];
  authors: Authors[];
  book: Object = {
    title: '',
    genre: ''
  }
  constructor(private _data: DataService) {

  }
  loadData() {
    this._data.getData("books").subscribe(data => {
      this.books = data
    })
    this._data.getData("authors").subscribe(data => {
      this.authors = data
    })

  }
  ngOnInit() {
    this.loadData()
  }
  onSubmit() {
    if (!this.update) {
      this._data.postData("books", this.book).then(() => {
        this.loadData()
      }).catch(err => {
        console.log(err)
      })
    } else {
      this._data.putData("books", this.book).then(() => {
        this.loadData()
      }).catch(err => {
        console.log(err)
      })
    }
  }
  getAuthors(ID) {
    let name: string;
    this._data.getOneData("authors", ID).subscribe((res) => {
      name = res.name
    })
    return name
  }
  cancelUpdate() {
    this.update = false,
      this.book = {
        title: '',
        genre: ''
      }
  }
  onUpdate(item) {
    this.update = true
    this.book = {
      ...item
    }
  }

  onDelete(ID: string) {
    this._data.deleteData("books", ID).then(() => {
      this.loadData()
    })
  }

}
