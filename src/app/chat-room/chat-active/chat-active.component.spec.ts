import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatActiveComponent } from './chat-active.component';

describe('ChatActiveComponent', () => {
  let component: ChatActiveComponent;
  let fixture: ComponentFixture<ChatActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatActiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
