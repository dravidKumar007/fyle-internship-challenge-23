import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { RepoComponent } from './repo/repo.component';

const routes: Routes = [
  { path: "", component: SearchComponent },
  {path: ":name", component: RepoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }