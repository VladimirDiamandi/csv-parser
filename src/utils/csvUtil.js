/**
 * Converting csv text to json format
 * @param {string} text - Row text from Texarea or from uploaded file with data in csv format.
 * @return {json} result - json in format {titles: [], data: []}
 */
export const textToJson = (text) => {
  let result = {
    titles: [],
    data: []
  };
  const json = text.split("\n");
  if (!json.length) {
    throw new Error('wrong csv');
  }
  result.titles = json[0].split(',');
  result.data = [];
  for (let i = 1; i < json.length; i++) {
    result.data.push(json[i].split(','));
  }
  return result;
}

/**
 * Converting json with csv into ant design table format
 * @param {json} json - Row text from Texarea or from uploaded file with data in csv format.
 * @return {json} result - json in format {columns: [], data: []}
 */
export const toTable = (json) => {
  let result = {
    columns: [],
    data: []
  };

  result.columns = json.titles.map(title => ({
    title: title,
    dataIndex: title,
    key: title,
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => {
      if (Number(parseFloat(a[title])) === parseFloat(a[title]) && parseFloat(a[title]) % 1 !== 0) {
        return a[title] - b[title];
      }
      if (typeof a[title] === 'string') {
        return a[title].localeCompare(b[title]);
      }
      if (a[title] === undefined) {
        return 0;
      }
      return a[title].length - b[title].length;
    },
  }));

  json.data.forEach( (values, key) => {
    let item = {key};
    for (let i = 0; i < json.titles.length; i++) {
      const title = json.titles[i];
      item[title] = values[i];
    }
    result.data.push(item);
  });

  return result;
}

/**
 * Converting json with csv into ant react-charts format
 * @param {json} json - Row text from Texarea or from uploaded file with data in csv format.
 * @return {json} result - json in format [{label: [], data: []}]
 */
export const toGraph = (json) => {
  let result = [{
    label: 'Graph',
    data: json.data
  }];

  return result;
}