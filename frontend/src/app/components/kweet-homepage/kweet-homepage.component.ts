import { Component, OnInit } from '@angular/core';
import { User   } from '../../../models/User';
import { Kweet } from '../../../models/Kweet';
import { KweetService } from '../../services/kweet/kweet.service';

@Component({
  selector: 'app-kweet-homepage',
  templateUrl: './kweet-homepage.component.html',
  styleUrls: ['./kweet-homepage.component.scss']
})
export class KweetHomepageComponent implements OnInit {
  user: User;
  visitedUser: User;
  kweets: Kweet[];
  searchContent: string;
  searchedKweets: Kweet[];
  private contentLoaded = false;

  constructor(private kweetService: KweetService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.visitedUser = JSON.parse(localStorage.getItem('visitedUser'));
    this.kweetService.getTimeline(this.user.userId).subscribe(data => {
      this.kweets = data;
      for (const kweet of this.kweets) {
        kweet.date = new Date(kweet.date);
      }
    });
  }

  isContentLoaded() {
    return this.contentLoaded;
  }

  searchKweet() {
    this.kweetService.searchKweet(this.searchContent).subscribe( data => {
      this.searchedKweets = data;
    });
  }
}
