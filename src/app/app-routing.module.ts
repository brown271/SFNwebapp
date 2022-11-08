import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'send-emails',
    loadChildren: () => import('./send-emails/send-emails.module').then( m => m.SendEmailsPageModule)
  },
  {
    path: 'create-group',
    loadChildren: () => import('./create-group/create-group.module').then( m => m.CreateGroupPageModule)
  },
  {
    path: 'edit-groups',
    loadChildren: () => import('./edit-groups/edit-groups.module').then( m => m.EditGroupsPageModule)
  },
  {
    path: 'register-members',
    loadChildren: () => import('./register-members/register-members.module').then( m => m.RegisterMembersPageModule)
  },
  
  {
    path: 'search-accounts',
    loadChildren: () => import('./search-accounts/search-accounts.module').then( m => m.SearchAccountsPageModule)
  },
  {
    path: 'search-events',
    loadChildren: () => import('./search-events/search-events.module').then( m => m.SearchEventsPageModule)
  },
  {
    path: 'create-events',
    loadChildren: () => import('./create-events/create-events.module').then( m => m.CreateEventsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
