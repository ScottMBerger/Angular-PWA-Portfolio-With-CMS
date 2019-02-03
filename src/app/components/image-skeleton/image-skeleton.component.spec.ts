import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSkeletonComponent } from './image-skeleton.component';

describe('ImageSkeletonComponent', () => {
  let component: ImageSkeletonComponent;
  let fixture: ComponentFixture<ImageSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSkeletonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
