import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user/user.component';
import { PostsListComponent } from './posts/post-list/post-list.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EmployeeComponent } from './posts/employee/employee.component';
import { NoSanitizePipe } from './shared/sanitize.pipe';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostsListComponent,
    UserListComponent,
    UserComponent,
    EmployeeComponent,
    NoSanitizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  entryComponents: [EmployeeComponent],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule { }
