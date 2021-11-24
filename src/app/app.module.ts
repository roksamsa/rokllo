import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TrelloService } from './services/trello.service';
import { GlobalService } from './services/global.service';
import { BoardTileComponent } from './components/elements/board-tile/board-tile.component';
import { BoardListComponent } from './components/elements/board-list/board-list.component';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { BoardPageComponent } from './components/pages/board-page/board-page.component';
import { HeaderComponent } from './components/elements/header/header.component';
import { ProfileMenuComponent } from './components/elements/profile-menu/profile-menu.component';
import { ListCardComponent } from './components/elements/list-card/list-card.component';

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
        LoginComponent,
        HeaderComponent,
        ProfileMenuComponent,
        ListCardComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        DragDropModule,
    ],
    exports: [
        CommonModule,
        BrowserModule,
        RouterModule,
    ],
    providers: [
        TrelloService,
        GlobalService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
