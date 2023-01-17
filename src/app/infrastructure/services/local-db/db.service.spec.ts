import {DbService} from "./db.service";

describe('Db Service', () => {
  it('Db Service constructor should create db name correctly',  () => {
    const dbName = new DbService().name;
    expect(dbName).toEqual('trello');
  });
});
