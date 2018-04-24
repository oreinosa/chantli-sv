import { CategoriesService } from './categories/categories.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { DelProductComponent } from './products/del-product/del-product.component';
import { UpdProductComponent } from './products/upd-product/upd-product.component';
import { ProductsService } from './products/products.service';
import { MatTableModule, MatAutocompleteModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { CategoriesComponent } from './categories/categories.component';
import { TableProductsComponent } from './products/table-products/table-products.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { TableCategoriesComponent } from './categories/table-categories/table-categories.component';
import { UpdCategoryComponent } from './categories/upd-category/upd-category.component';
import { DelCategoryComponent } from './categories/del-category/del-category.component';
import { MenusComponent } from './menus/menus.component';
import { AddMenuComponent } from './menus/add-menu/add-menu.component';
import { UpdMenuComponent } from './menus/upd-menu/upd-menu.component';
import { TableMenusComponent } from './menus/table-menus/table-menus.component';
import { ProductByCategoryPipe } from './menus/product-by-category.pipe';
import { UploaderModule } from '../uploader/uploader.module';
import { DelMenuComponent } from './menus/del-menu/del-menu.component';
import { StatusesComponent } from './statuses/statuses.component';
import { WorkplacesComponent } from './workplaces/workplaces.component';
import { AddWorkplaceComponent } from './workplaces/add-workplace/add-workplace.component';
import { DelWorkplaceComponent } from './workplaces/del-workplace/del-workplace.component';
import { UpdWorkplaceComponent } from './workplaces/upd-workplace/upd-workplace.component';
import { WorkplacesService } from './workplaces/workplaces.service';
import { UsersComponent } from './users/users.component';
import { UpdUserComponent } from './users/upd-user/upd-user.component';
import { TableUsersComponent } from './users/table-users/table-users.component';
import { TableWorkplacesComponent } from './workplaces/table-workplaces/table-workplaces.component';
import { UsersService } from './users/users.service';

@NgModule({
  imports: [
    SharedModule,
    UploaderModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    ProductsComponent,
    AddProductComponent,
    DelProductComponent,
    UpdProductComponent,
    CategoriesComponent,
    TableProductsComponent,
    AddCategoryComponent,
    TableCategoriesComponent,
    UpdCategoryComponent,
    DelCategoryComponent,
    MenusComponent,
    AddMenuComponent,
    UpdMenuComponent,
    TableMenusComponent,
    ProductByCategoryPipe,
    DelMenuComponent,
    StatusesComponent,
    WorkplacesComponent,
    AddWorkplaceComponent,
    DelWorkplaceComponent,
    UpdWorkplaceComponent,
    UsersComponent,
    UpdUserComponent,
    TableUsersComponent,
    TableWorkplacesComponent,
  ],
  providers: [ProductsService, CategoriesService, WorkplacesService, UsersService]
})
export class AdminModule { }
