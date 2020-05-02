import { Store } from '@ngrx/store';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthServise } from '../auth/auth.Service';
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>()
  userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthServise,
    private store : Store<AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe(({user})=>{
      this.isAuthenticated = !!user
      console.log(user)
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((response: Response) => {
      console.log(response);
    });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  // onSelect(feature: string) {
  //     this.featureSelected.emit(feature);
  // }

}
