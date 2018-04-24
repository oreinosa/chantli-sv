import { DelMenuComponent } from './menus/del-menu/del-menu.component';
import { DelProductComponent } from './products/del-product/del-product.component';
import { UpdProductComponent } from './products/upd-product/upd-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableProductsComponent } from './products/table-products/table-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { UpdCategoryComponent } from './categories/upd-category/upd-category.component';
import { DelCategoryComponent } from './categories/del-category/del-category.component';
import { TableCategoriesComponent } from './categories/table-categories/table-categories.component';
import { MenusComponent } from './menus/menus.component';
import { AddMenuComponent } from './menus/add-menu/add-menu.component';
import { UpdMenuComponent } from './menus/upd-menu/upd-menu.component';
import { TableMenusComponent } from './menus/table-menus/table-menus.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { WorkplacesComponent } from './workplaces/workplaces.component';
import { AddWorkplaceComponent } from './workplaces/add-workplace/add-workplace.component';
import { UpdWorkplaceComponent } from './workplaces/upd-workplace/upd-workplace.component';
import { DelWorkplaceComponent } from './workplaces/del-workplace/del-workplace.component';
import { TableWorkplacesComponent } from './workplaces/table-workplaces/table-workplaces.component';
import { UsersComponent } from './users/users.component';
import { TableUsersComponent } from './users/table-users/table-users.component';
import { UpdUserComponent } from './users/upd-user/upd-user.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard], children: [
      {
        path: 'productos', component: ProductsComponent, data: { state: 'container' }, children: [
          { path: 'agregar', component: AddProductComponent, data: { state: 'add' } },
          { path: 'actualizar/:id', component: UpdProductComponent, data: { state: 'update' } },
          { path: 'eliminar/:id', component: DelProductComponent, data: { state: 'delete' } },
          { path: '', pathMatch: 'full', component: TableProductsComponent, data: { state: 'table' } }
        ]
      },
      {
        path: 'categorias', component: CategoriesComponent, data: { state: 'container' }, children: [
          { path: 'agregar', component: AddCategoryComponent, data: { state: 'add' } },
          { path: 'actualizar/:id', component: UpdCategoryComponent, data: { state: 'update' } },
          { path: 'eliminar/:id', component: DelCategoryComponent, data: { state: 'delete' } },
          { path: '', pathMatch: 'full', component: TableCategoriesComponent, data: { state: 'table' } }
        ]
      },
      {
        path: 'menus', component: MenusComponent, data: { state: 'container' }, children: [
          { path: 'agregar', component: AddMenuComponent, data: { state: 'add' } },
          { path: 'actualizar/:id', component: UpdMenuComponent, data: { state: 'update' } },
          { path: 'eliminar/:id', component: DelMenuComponent, data: { state: 'delete' } },
          { path: '', pathMatch: 'full', component: TableMenusComponent, data: { state: 'table' } }
        ]
      },
      {
        path: 'lugares-de-trabajo', component: WorkplacesComponent, data: { state: 'container' }, children: [
          { path: 'agregar', component: AddWorkplaceComponent, data: { state: 'add' } },
          { path: 'actualizar/:id', component: UpdWorkplaceComponent, data: { state: 'update' } },
          { path: 'eliminar/:id', component: DelWorkplaceComponent, data: { state: 'delete' } },
          { path: '', pathMatch: 'full', component: TableWorkplacesComponent, data: { state: 'table' } }
        ]
      },
      {
        path: 'usuarios', component: UsersComponent, data: { state: 'container' }, children: [
          // { path: 'agregar', component: AddWorkplaceComponent, data: { state: 'add' } },
          { path: 'actualizar/:id', component: UpdUserComponent, data: { state: 'update' } },
          // { path: 'eliminar/:id', component: DelWorkplaceComponent, data: { state: 'delete' } },
          { path: '', pathMatch: 'full', component: TableUsersComponent, data: { state: 'table' } }
        ]
      },
      { path: '', pathMatch: 'full', redirectTo: 'menus' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
