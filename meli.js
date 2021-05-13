const fetch = require("node-fetch");

let sourceArray = [165551415, 4821889, 25679280, 179571326];

const getDataByArrayofSellerIds = (sourceArray) => {
  sourceArray.map((item) => getDataBySellerId(item));
};

const printData = (item, data, seller_id) => {
  console.log("---------");
  console.log(`item_id: ${item.id}`);
  console.log(`title: ${item.title}`);
  console.log(`seller_id: ${seller_id}`);
  console.log(`category_id: ${item.category_id}`);
  console.log(`category_name: ${data.name}`);
};
//gets id, title, category and category name based on an specific seller_id
const getDataBySellerId = (seller_id) => {
  fetch(`https://api.mercadolibre.com/sites/MLA/search?seller_id=${seller_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(
        `Printing results of articles published by seller_id: ${seller_id}`
      );
      data.results.map((item) => {
        fetch(`https://api.mercadolibre.com/categories/${item.category_id}`)
          .then((res) => res.json())
          .then((data) => {
            printData(item, data, seller_id);
          });
      });
    });
};

getDataByArrayofSellerIds(sourceArray);
