import { textToJson, toTable, toGraph } from './csvUtil';

const text = "task,hours\nFB,2\nBE,4";

test('convert text to json', () => {
    const json = textToJson(text);
    const correctJson = { titles: [ 'task', 'hours' ], data: [ [ 'FB', '2' ], [ 'BE', '4' ] ] };
    expect(json).toEqual(correctJson);
    console.log('JSON', json);
});

test('convert json to table data', () => {
  const json = textToJson(text);
  const tableJson = toTable(json);

  expect(tableJson).toHaveProperty('columns');
  expect(tableJson).toHaveProperty('data');
});

test('convert json to graph data', () => {
  const json = textToJson(text);
  const graphJson = toGraph(json);

  expect(graphJson[0]).toHaveProperty('data');
});