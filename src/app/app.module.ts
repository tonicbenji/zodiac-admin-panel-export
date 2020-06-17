import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatListModule, MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatExpansionModule } from '@angular/material';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxGeoautocompleteModule } from 'ngx-geoautocomplete';

// used to create fake backend
import { fakeBackendProvider } from './helpers';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import {
    HomeComponent, LoginComponent, RegisterComponent, PagesComponent, PagesEditComponent, PoolsComponent,
    PoolsEditComponent, CategoriesComponent, CategoriesEditComponent, ProductsComponent, ProductsEditComponent,
    RolesComponent, RolesEditComponent, UsersComponent, UsersEditComponent, FeaturesComponent, ResourcesComponent, SpecificationsComponent,
    FeaturesEditComponent, ResourcesEditComponent, SpecificationsEditComponent, ProductImagesComponent,
    ProductImagesEditComponent, SectionComponent, SliderSectionItemComponent, PoolSpaGuidesComponent, TenStepSectionItemComponent,
    PoolMediaComponent, PoolMediaEditComponent, AssistanceComponent, SkuComponent, SkuEditComponent, AccordionSectionItemComponent,
    FaqComponent, FaqEditComponent, BuilderContactRequestComponent, DealerComponent, DealerEditComponent, PasswordUpdateComponent,
    PasswordEditComponent, WarrantyComponent, WarrantyEditComponent, MicroSitesComponent,SnippetsComponent,SnippetEditComponent, BookServiceComponent, BookServiceEditComponent, AssistantComponent,
    BannerComponent, BannerEditComponent, BookGroupComponent, BookGroupEditComponent, PoolCataloguesComponent, TagComponent, TagEditComponent
} from './components';

import { AlertComponent, LoginDialogComponent, AutoCompleteComponent } from './shared/components'
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { DataTablesModule } from 'angular-datatables';
import { AuthenticationService } from './services';

@NgModule({
    imports: [
        DataTablesModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        FormsModule,
        EditorModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatCardModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatListModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatMomentDateModule, 
        NgxGeoautocompleteModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginDialogComponent,
        AutoCompleteComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        PagesComponent,
        PagesEditComponent,
        PoolsComponent,
        PoolsEditComponent,
        CategoriesComponent,
        CategoriesEditComponent,
        ProductsComponent,
        ProductsEditComponent,
        RolesComponent,
        RolesEditComponent,
        UsersComponent,
        UsersEditComponent,
        FeaturesComponent,
        ResourcesComponent,
        SpecificationsComponent,
        FeaturesEditComponent,
        ResourcesEditComponent,
        SpecificationsEditComponent,
        ProductImagesComponent,
        ProductImagesEditComponent,
        SectionComponent,
        SliderSectionItemComponent,
        PoolSpaGuidesComponent,
        TenStepSectionItemComponent,
        PoolMediaComponent,
        PoolMediaEditComponent,
        AssistanceComponent,
        SkuComponent,
        SkuEditComponent,
        AccordionSectionItemComponent,
        FaqComponent,
        FaqEditComponent,
        BuilderContactRequestComponent,
        DealerComponent,
        DealerEditComponent,
        PasswordUpdateComponent,
        PasswordEditComponent,
        WarrantyComponent, 
        WarrantyEditComponent,
        MicroSitesComponent,
        SnippetsComponent,
        SnippetEditComponent,
        BookServiceComponent, 
        BookServiceEditComponent,
        AssistantComponent,
        BannerComponent,
        BannerEditComponent,
        BookGroupComponent,
        BookGroupEditComponent,
        PoolCataloguesComponent,
        TagComponent,
        TagEditComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MAT_DATE_LOCALE, useValue: 'en-AU'},
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        FeaturesEditComponent,
        ResourcesEditComponent,
        SpecificationsEditComponent,
        ProductImagesEditComponent,
        SectionComponent,
        SliderSectionItemComponent,
        TenStepSectionItemComponent,
        PoolMediaEditComponent,
        SkuEditComponent,
        AccordionSectionItemComponent,
        PasswordEditComponent
    ]
})

export class AppModule { }