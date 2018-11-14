import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { routes } from './routes';
import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.services';
import { AuthGuard } from './guards/auth.guards.service';
import { UserService } from './services/users.services';
import { ListCreatorComponent } from './lists/creator/list.creator.component';
import { FormsModule } from '@angular/forms';
import { ListService } from './services/lists.services';
import { ListComponent } from './lists/list.component';
import { TodoCreatorComponent } from './todos/creator/todos.creator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListCreatorComponent,
    ListComponent,
    TodoCreatorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, UserService, ListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
