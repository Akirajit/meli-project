const fetch = require("node-fetch");

const getDataByListOfSellerIds = (...ids) => {
  for (var id of ids) {
    getDataBySellerId(id);
  }
};

//gets id, title, category and category name based on an specific seller_id
const getDataBySellerId = (seller_id) => {
  fetch(`https://api.mercadolibre.com/sites/MLA/search?seller_id=${seller_id}`)
    .then((res) => res.json())
    .then((data) => {
      data.results.map((item) => {
        fetch(`https://api.mercadolibre.com/categories/${item.category_id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("---------");
            // console.log(seller_id);
            console.log(`item_id: ${item.id}`);
            console.log(`title: ${item.title}`);
            console.log(`category_id: ${item.category_id}`);
            console.log(`category_name: ${data.name}`);
          });
      });
    });
};

// getDataBySellerId(179571326);
getDataByListOfSellerIds(179571326);
