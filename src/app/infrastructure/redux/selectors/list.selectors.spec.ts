import {listInitialState} from "../reducers/list.reducer";
import {selectLists, selectOrderedLists} from "./list.selectors";

describe('List Selector', () => {
  const mockLists = {
    list: {
      lists: [
        {
          id: 1,
          title: 'title1',
          prevId: undefined,
          nextId: 2,
        },
        {
          id: 2,
          title: 'title2',
          prevId: 1,
          nextId: undefined,
        },
      ],
    }
  };

  const emptyMock = {
    list: {
      lists: [],
    },
  };

  it('#selectLists should correctly select lists', () => {
    const result = selectOrderedLists(mockLists);
    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual(1);
    expect(result[1].title).toEqual('title2');
  });

  it('#selectLists should return empty array if lists is empty', () => {
    const result = selectOrderedLists(emptyMock);
    expect(result.length).toEqual(0);
  });
});
