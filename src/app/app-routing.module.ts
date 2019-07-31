import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { MyCardComponent } from './my-card/my-card.component';

const routes: Routes = [
  { path: '', component: MyCardComponent},
  { path: 'my-card', loadChildren: './my-card/my-card.module#MyCardModule' },
  { path: '**', redirectTo: '/my-card', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
