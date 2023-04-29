import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupActiveComponent } from './group-active.component';

describe('GroupActiveComponent', () => {
  let component: GroupActiveComponent;
  let fixture: ComponentFixture<GroupActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupActiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
