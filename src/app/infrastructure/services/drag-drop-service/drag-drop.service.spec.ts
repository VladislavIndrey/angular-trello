import { TestBed } from '@angular/core/testing';

import { DragDropServiceService } from './drag-drop.service';

describe('DragDropServiceService', () => {
  let service: DragDropServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragDropServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
