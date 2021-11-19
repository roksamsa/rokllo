import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { TrelloService } from './services/trello.service';
import { BoardTileComponent } from './components/elements/board-tile/board-tile.component';
import { BoardListComponent } from './components/elements/board-list/board-list.component';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { BoardPageComponent } from './components/pages/board-page/board-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPageComponent },
    { path: 'board/:id', component: BoardPageComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        BoardTileComponent,
        BoardListComponent,
        BoardPageComponent,
        DashboardPageComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
    ],
    exports: [
        CommonModule,
        BrowserModule,
        RouterModule
    ],
    providers: [
        TrelloService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
