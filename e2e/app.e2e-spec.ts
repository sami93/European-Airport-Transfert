import { MaterialReservationAngularPage } from './app.po';

describe('material-Reservation-angular App', () => {
  let page: MaterialReservationAngularPage;

  beforeEach(() => {
    page = new MaterialReservationAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
