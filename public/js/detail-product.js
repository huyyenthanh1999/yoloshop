
const btn = document.querySelector("button");

btn.addEventListener("click", (e) => {
  // lay id

  // lay so luong

  // tao obj
  const newCartItem = {
    productId: "615d2755a4bb5cf7be279ca6",
    quantity: 2,
  };
  const newCartItem1 = {
    productId: "615d278aa4bb5cf7be279caa",
    quantity: 1,
  };
  const listData = JSON.parse(localStorage.getItem("listData")) || [];

  listData.push(newCartItem);
  listData.push(newCartItem1);
  console.log(listData);

  // luu local
  localStorage.setItem("listData", JSON.stringify(listData));
});
