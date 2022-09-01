import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserWarningComponent } from './delete-user-warning.component';

describe('DeleteUserWarningComponent', () => {
  let component: DeleteUserWarningComponent;
  let fixture: ComponentFixture<DeleteUserWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserWarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
