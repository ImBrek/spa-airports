import { transformSuggestions } from '../index';

test('Transform list to tree', () => {
  const source = [
    { name: 'City1', airport_name: 'A1' },
    { name: 'City2', airport_name: 'A2' },
    { name: 'City2', airport_name: 'A1' },
    { name: 'City3', airport_name: 'A1' },
    { name: 'City4', airport_name: 'A2' },
    { name: 'City4', airport_name: 'A1' },
  ];

  const result = [
    { name: 'City1', airportName: 'A1', isGrouped: false },
    { name: 'City2' },
    { name: 'City2', airportName: 'A1', isGrouped: true },
    { name: 'City2', airportName: 'A2', isGrouped: true },
    { name: 'City3', airportName: 'A1', isGrouped: false },
    { name: 'City4' },
    { name: 'City4', airportName: 'A1', isGrouped: true },
    { name: 'City4', airportName: 'A2', isGrouped: true },
  ]

  expect(transformSuggestions(source)).toEqual(result);
});
