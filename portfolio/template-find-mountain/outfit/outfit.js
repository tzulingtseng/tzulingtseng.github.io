// 網頁載入時先清空local storage
$(document).ready(function () {
  const product_records_first = JSON.parse(localStorage.getItem("products"));
  if (product_records_first !== null) {
    localStorage.removeItem("products");
  }
});

// nav rwd
let btn_nav = document.querySelector(".btn_nav");
let nav = document.querySelector(".nav");

btn_nav.onclick = function () {
  this.classList.toggle("change");
  nav.classList.toggle("nav_show");
};
// change mountain level
$("#div1").show();
$("#div2").hide();
$("#div3").hide();

$(".outfit-level").click(function () {
  $(".target").hide();
  $("#div" + $(this).attr("target")).show();
});

// each mountain level pre & next scroll
let buttonLeft = document.querySelectorAll(".outfit-prev");
let buttonRight = document.querySelectorAll(".outfit-next");
let slider = document.querySelectorAll(".slider");

for (let i = 0; i < buttonLeft.length; i++) {
  buttonLeft[i].addEventListener("click", function () {
    for (let k = 0; k < slider.length; k++) {
      slider[i].scrollLeft -= 180;
    }
  });
}

for (let i = 0; i < buttonRight.length; i++) {
  buttonRight[i].addEventListener("click", function () {
    for (let k = 0; k < slider.length; k++) {
      slider[i].scrollLeft += 180;
    }
  });
}

// canvas drag & drop
let canvasTarget = document.querySelector(".outfit-canvas-target");
let selectedImgs = [];
const canvas = new fabric.Canvas("canvas", {
  width: canvasTarget.clientWidth,
  height: canvasTarget.clientHeight,
});
window.onresize = function () {
  canvas.setDimensions({
    width: canvasTarget.clientWidth,
    height: canvasTarget.clientHeight,
  });
};
function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  // console.log("e.target.id",e.target.id); // for check
}
function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
  return false;
}
function handleDrop(e) {
  e.stopPropagation();
  document.getElementById("hide").style.display = "none";
  document.getElementById("newItemsNotice").style.display = "none";
  let id = e.dataTransfer.getData("text/plain");
  let img = document.getElementById(id);
  var newImage = new fabric.Image(img, {
    width: 0,
    height: 0,
    // Set the center of the new object based on the event coordinates relative
    left: e.layerX - 47,
    top: e.layerY - 70,
  });
  newImage.scaleToWidth(100);
  newImage.scaleToHeight(100);
  canvas.add(newImage);

  selectedImgs.push(id);
  saveData();
  return false;
}
function saveData() {
  console.log("selectedImgs save", selectedImgs);
  for (let i = 0; i < selectedImgs.length; i++) {
    let productId = document.getElementById(selectedImgs[i]).id;
    let productPicUrl = document
      .getElementById(selectedImgs[i])
      .getAttribute("src");
    let productBrand = document.getElementById(selectedImgs[i]).dataset
      .productbrand;
    let productName = document.getElementById(selectedImgs[i]).dataset
      .productname;
    let productPrice = document.getElementById(selectedImgs[i]).dataset.price;
    let productType = document.getElementById(selectedImgs[i]).dataset.type;

    let product_records = localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [];
    if (
      !product_records.some((v) => {
        return v.productName == productName;
      })
    ) {
      product_records.push({
        productId: productId,
        productPicUrl: productPicUrl,
        productBrand: productBrand,
        productName: productName,
        productPrice: productPrice,
        productType: productType,
      });
      localStorage.setItem("products", JSON.stringify(product_records));
    }
  }
  showSelectedData();
}
function showSelectedData() {
  let newItems = document.getElementById("newItems");
  newItems.innerHTML = "";

  let product_records = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  if (product_records) {
    let subtotal = 0;
    for (let i = 0; i < product_records.length; i++) {
      let addDiv = document.createElement("div");
      addDiv.className = "newItem";
      addDiv.innerHTML =
        '<div class="productPic"><img class="outfit-cover-fit" src="' +
        product_records[i].productPicUrl +
        '"/></div><div class="productName">' +
        product_records[i].productBrand +
        product_records[i].productName +
        "</div><div> " +
        parseInt(product_records[i].productPrice).toLocaleString() +
        "</div></div>";
      subtotal += parseInt(product_records[i].productPrice, 10);
      document.getElementById("newItems").appendChild(addDiv);
      document.getElementById("subtotal").innerText = subtotal.toLocaleString();
    }
  }
}
var images = document.querySelectorAll(".outfit-product-img img");
[].forEach.call(images, function (img) {
  img.addEventListener("dragstart", handleDragStart, false);
});

canvasTarget.addEventListener("dragover", handleDragOver, false);
canvasTarget.addEventListener("drop", handleDrop, false);

//add cart
$(".outfit-cart").click(function () {
  let product_records = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];

  if (product_records.length === 0) {
    Swal.fire({
      icon: "error",
      title: "請先拖曳商品，組合穿搭！",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    //display none -> block
    let cartDisplay = $(".cart-num").css("display");
    if (cartDisplay === "none") {
      $(".cart-num").css("display", "block");
      $(".cart-num").text(product_records.length);
      Swal.fire({
        icon: 'success',
        title: '已加入購物車',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
});

// html2canvas save postcard
$("#save").click(function (e) {
  let product_records = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  if (product_records.length === 0) {
    Swal.fire({
      icon: "error",
      title: "請先拖曳商品，製作明信片！",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    html2canvas(document.getElementById("canvasBox")).then(function (canvas) {
      var a = document.createElement("a");
      a.href = canvas
        .toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream");
      a.download = "image.jpg";
      a.click();
    });
  }
});

// facebook分享按鈕
$(".fb-share-button").click(function fbWindow() {
  window.open(
    `https://www.facebook.com/dialog/share?app_id=168633835347111&href=http://127.0.0.1:5501/outfit.html&hashtag=%23%E6%89%BE%E9%9D%A0%E5%B1%B1%E5%BB%BA%E8%AD%B0%E7%A9%BF%E6%90%AD%E5%80%8B%E4%BA%BA%E5%8C%96%E6%98%8E%E4%BF%A1%E7%89%87`,
    "facebook-share-dialog",
    // 'width=800,height=600'
    "height=600, width=800, top=" +
      ($(window).height() / 2 - 300) +
      ", left=" +
      ($(window).width() / 2 - 400) +
      ""
  );
});

// twitter分享按鈕
$(".twitter-share-button").click(function twitterWindow() {
  window.open(
    "http://twitter.com/share?text=%23%E6%89%BE%E9%9D%A0%E5%B1%B1%20%23%E5%BB%BA%E8%AD%B0%E7%A9%BF%E6%90%AD%20%23%E5%80%8B%E4%BA%BA%E5%8C%96%E6%98%8E%E4%BF%A1%E7%89%87&url=http://127.0.0.1:5501/outfit.html",
    "twitter-share-dialog",
    "height=600, width=800, top=" +
      ($(window).height() / 2 - 300) +
      ", left=" +
      ($(window).width() / 2 - 400) +
      ""
  );
  return false;
});

// line分享按鈕
$(".line-share-button").click(function twitterWindow() {
  window.open(
    "https://social-plugins.line.me/lineit/share?text=%23%E6%89%BE%E9%9D%A0%E5%B1%B1%20%23%E5%BB%BA%E8%AD%B0%E7%A9%BF%E6%90%AD%20%23%E5%80%8B%E4%BA%BA%E5%8C%96%E6%98%8E%E4%BF%A1%E7%89%87&url=http://127.0.0.1:5501/outfit.html",
    "line-share-dialog",
    "height=600, width=800, top=" +
      ($(window).height() / 2 - 300) +
      ", left=" +
      ($(window).width() / 2 - 400) +
      ""
  );
  return false;
});
