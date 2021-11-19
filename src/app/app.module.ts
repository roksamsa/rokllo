import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { TrelloService } from './services/trello.service';
import { BoardComponent } from './components/elements/board/board.component';
import { BoardListComponent } from './components/elements/board-list/board-list.component';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { BoardPageComponent } from './components/pages/board-page/board-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPageComponent },
    { path: 'board/:id', component: BoardPageComponent },
  ];

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        BoardListComponent,
        DashboardPageComponent,
        LoginComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        RouterModule
    ],
    providers: [
        CommonModule,
        TrelloService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
