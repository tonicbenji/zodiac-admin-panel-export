import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, LoginComponent, RegisterComponent, PagesComponent, PagesEditComponent, PoolsComponent,
    PoolsEditComponent, CategoriesComponent, CategoriesEditComponent, ProductsComponent, ProductsEditComponent,
    RolesComponent, RolesEditComponent, UsersComponent, UsersEditComponent, PoolSpaGuidesComponent, AssistanceComponent, FaqComponent, 
    BuilderContactRequestComponent, DealerComponent, PasswordUpdateComponent, WarrantyComponent, WarrantyEditComponent, MicroSitesComponent,SnippetsComponent, BookServiceComponent, 
    BookServiceEditComponent, AssistantComponent, BannerComponent, BookGroupComponent, PoolCataloguesComponent, TagComponent } from './components';
import { AuthGuard, GuestGuard } from './guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'pages', component: PagesComponent, canActivate: [AuthGuard] },
    { path: 'pages/:id', component: PagesComponent, canActivate: [AuthGuard] },
    { path: 'poolspaguides', component: PoolSpaGuidesComponent, canActivate: [AuthGuard] },
    { path: 'poolspaguides/:id', component: PoolSpaGuidesComponent, canActivate: [AuthGuard] },
    { path: 'poolcatalogues', component: PoolCataloguesComponent, canActivate: [AuthGuard] },
    { path: 'poolcatalogues/:id', component: PoolCataloguesComponent, canActivate: [AuthGuard] },
    { path: 'assistance', component: AssistanceComponent, canActivate: [AuthGuard] },
    { path: 'assistance/:id', component: AssistanceComponent, canActivate: [AuthGuard] },
    { path: 'pools', component: PoolsComponent, canActivate: [AuthGuard] },
    { path: 'pools/:id', component: PoolsComponent, canActivate: [AuthGuard] },
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'categories/:id', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'products/:id', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
    { path: 'roles/:id', component: RolesComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'users/:id', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
    { path: 'faq/:id', component: FaqComponent, canActivate: [AuthGuard] },
    { path: 'dealers', component: DealerComponent, canActivate: [AuthGuard] },
    { path: 'dealers/:id', component: DealerComponent, canActivate: [AuthGuard] },
    { path: 'password-update/:token', component: PasswordUpdateComponent },
    { path: 'warranties', component: WarrantyComponent, canActivate: [AuthGuard] },
    { path: 'warranties/:id', component: WarrantyComponent, canActivate: [AuthGuard] },
    { path: 'bookservices', component: BookServiceComponent, canActivate: [AuthGuard] },
    { path: 'bookservices/:id', component: BookServiceComponent, canActivate: [AuthGuard] },
    { path: 'microsites', component: MicroSitesComponent, canActivate: [AuthGuard] },
    { path: 'microsites/:id', component: MicroSitesComponent, canActivate: [AuthGuard] },
    { path: 'snippets', component: SnippetsComponent, canActivate: [AuthGuard] },
    { path: 'assistant', component: AssistantComponent, canActivate: [AuthGuard] },
    { path: 'banners', component: BannerComponent, canActivate: [AuthGuard] },
    { path: 'banners/:id', component: BannerComponent, canActivate: [AuthGuard] },
    { path: 'bookgroups', component: BookGroupComponent, canActivate: [AuthGuard] },
    { path: 'bookgroups/:id', component: BookGroupComponent, canActivate: [AuthGuard] },
    { path: 'tags', component: TagComponent, canActivate: [AuthGuard] },
    { path: 'tags/:id', component: TagComponent, canActivate: [AuthGuard] },

    // reports
    { path: 'reports/builder-contact-requests', component: BuilderContactRequestComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);