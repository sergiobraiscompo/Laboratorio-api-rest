import * as model from '#dals/index.js';
import * as apiModel from './accomodation.api-model.js';
import { mapAccomodationListFromModelToApi } from './accomodation.mappers.js';

describe('pods/accomodation/accomodation.mappers spec', () => {
  describe('mapAccomodationListFromModelToApi', () => {
    it('should return empty array when it feeds AccomodationList equals undefined', () => {
      // Arrange
      const accomodationList: apiModel.Accomodation[] = undefined;

      // Act
      const result = mapAccomodationListFromModelToApi(accomodationList);

      // Assert
      const expectedResult: model.Accomodation[] = [];
      expect(result).toEqual(expectedResult);
    });
  });
});