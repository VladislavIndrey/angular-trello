interface Priority {
  id: number;
  name: string;
  color: string;
}

export class AddCardModel {
  get priorities(): Priority[] {
    return this._priorities;
  }

  private _priorities: Priority[] = [
    {id: 0, name: 'On Track', color: '#219653'},
    {id: 1, name: 'At Risk', color: '#F2994A'},
    {id: 2, name: 'Off Track', color: '#EB5757'},
    {id: 3, name: 'Highest', color: '#b42f2f'},
    {id: 4, name: 'Critical', color: '#cc6f1c'},
    {id: 5, name: 'Act soon', color: '#0baf51'},
    {id: 6, name: 'Lowest', color: '#4388e7'},
    {id: 7, name: 'To be done', color: '#854fe7'},
    {id: 8, name: 'Asap', color: '#d3269d'},
    {id: 9, name: 'Daily goal', color: '#4e33de'},
    {id: 10, name: 'Other', color: '#e1c622'},
  ];
  private _priority: Priority = this._priorities[0];
}
