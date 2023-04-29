import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatActiveComponent } from './chat-room/chat-active/chat-active.component';
import { ContactListComponent } from './chat-room/contact-list/contact-list.component';
import { ChatHistoryComponent } from './chat-room/chat-active/chat-history/chat-history.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RedirectComponent } from './redirect/redirect.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FirstWordPipe } from './pipes/first-word.pipe';
import { LoadingComponent } from './utils/loading/loading.component';
import { ToastMessageComponent } from './utils/toast-message/toast-message.component';
import { OptionMenuComponent } from './option-menu/option-menu.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { GroupListComponent } from './group-chat/group-list/group-list.component';
import { GroupActiveComponent } from './group-chat/group-active/group-active.component';

const appRoutes: Routes = [
  {path: 'add', component: AddContactComponent},
  {path: 'chat', component: ChatRoomComponent},
  {path: 'groups', component: GroupChatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'redirect', component: RedirectComponent},
  {path: '', component: LoginComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    ChatActiveComponent,
    ContactListComponent,
    ChatHistoryComponent,
    LoginComponent,
    RegisterComponent,
    RedirectComponent,
    AddContactComponent,
    FirstWordPipe,
    LoadingComponent,
    ToastMessageComponent,
    OptionMenuComponent,
    GroupChatComponent,
    GroupListComponent,
    GroupActiveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    PickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
