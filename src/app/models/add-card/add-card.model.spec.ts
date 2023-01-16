import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {TestBed} from "@angular/core/testing";

import {AddCardModel} from "./add-card.model";

describe('Add Card Model', () => {
  let store: MockStore;
  let addCardModel: AddCardModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({providers: provideMockStore()})

    store = TestBed.inject(MockStore);
    addCardModel = new AddCardModel(store);
  });
});
