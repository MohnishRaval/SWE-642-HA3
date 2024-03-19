import { Component, OnInit } from '@angular/core';
import { from, merge, of, pipe } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  skip,
  take,
  tap,
} from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { IPost } from 'src/app/models/PostModel';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rxjs-playground',
  templateUrl: './rxjs-playground.component.html',
  styleUrls: ['./rxjs-playground.component.scss'],
})
export class RxjsPlaygroundComponent implements OnInit {
  constructor(private dataService: DataService) {}
  numbers = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  strings = from(['apple', 'banana', 'cherry', 'date', 'elderberry']);
  numbers1 = from([1, 2, 3, 4, 5]);
  numbers2 = from([6, 7, 8, 9, 10]);
  people = from([
    { name: 'John', age: 25 },
    { name: 'Alice', age: 35 },
    { name: 'Bob', age: 40 },
    { name: 'Jane', age: 28 },
  ]);
  names = [{ name: 'mohnish' }, { name: 'gotu' }, { name: 'boss' }];
  searchField = new FormControl('');
  currentPage = 1;
  pageSize = 20;
  posts: IPost[] = [];
  debounceFilteredValue: any;

  ngOnInit(): void {
    const evenNumbers = this.numbers.pipe(filter((x) => x % 2 === 0));
    console.log('challenge 1. Filter');
    evenNumbers.subscribe((evenNumber) => console.log(evenNumber));

    console.log('challenge 2. UpperCase');
    const upperCase = this.strings.pipe(map((x) => x.toUpperCase()));
    upperCase.subscribe((uppercase) => {
      console.log(uppercase);
    });

    console.log('challenge 3. Merge');
    const mergeNumbers = merge(this.numbers1, this.numbers2);
    mergeNumbers.subscribe((merged) => console.log(merged));

    console.log('Challenge 4. Map and Filter');
    this.people
      .pipe(
        filter((x) => x.age > 30),
        map((x) => x.name)
      )
      .subscribe((x) => console.log('name:' + x));

    console.log('Challenge 5. SwitchMap');
    this.dataService.getTodos();

    //Just delaying so Challenge 5 gets completed
    setTimeout(() => {
      console.log('Challenge 6. Pagination');
      this.loadPosts();
    }, 2000);

    console.log('Challenge 7. DebounceTime');
    this.searchField.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.debounceFilteredValue = this.names.filter((x) =>
        x.name.includes(value)
      );
      console.log(value);
    });

    console.log('Challenge 8. CatchError');
    this.dataService.mockErrorFunction().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log('Inside Subscribe Error=', error);
      }
    );
  }

  loadPosts = () => {
    this.dataService
      .getPosts(this.currentPage, this.pageSize)
      .subscribe((groupPosts) => {
        groupPosts.map((singlePost) => this.posts.push(singlePost));
        //console.log(this.posts);
      });
  };

  goToPage(desiredPage: number) {
    this.currentPage = desiredPage;
    this.loadPosts();
  }
}
