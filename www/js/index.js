ons.ready(function () {
    GetData.getHomeData();
    ons.disableDeviceBackButtonHandler();
})

function gotoCategory(category) {
    var myNavigator = document.getElementById('myNavigator');
    myNavigator.pushPage('./views/category.html', {
        data: {
            category: category
        }
    })
}

function changeTab(page, highlight) {
    document.querySelector('ons-navigator').resetToPage(page);
    setTabHighlight(highlight);
}

function setTabHighlight(tabNo) {
    for (var tab = 1; tab <= 3; tab++) {
        var target = '#tab' + tab;
        if (tabNo == tab) {
            $(target).addClass('hightlight-bottom-toolbar');
        } else {
            $(target).removeClass('hightlight-bottom-toolbar');
        }
    }
}

function gotodetailProdcut(name, cat) {
    var data = {
        name: name,
        cat: cat
    }
    var myNavigator = document.getElementById('myNavigator');
    myNavigator.pushPage('./views/detail.html', {
        data: {
            data: data
        }
    })
}


function addtocart(data) {
    var cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
        cart = []
    }
    var product = JSON.stringify(data[0])
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart));
    ons.notification.toast('Added item to cart!!', { timeout: 1000 });
}

function removeCartProduct(index) {
    var cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
        cart = []
    }
    if (cart.length < 1) {
        console.log(index)
    } else {
        cart.splice(index, 1)
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart));
        GetData.getCart()
    }
}

// getalldata();
// function search(data) {
//     console.log(data)
//     const fillterproduct = (needle, heystack) => {
//         let query = needle.toLowerCase();
//         return heystack.filter(item => item.toLowerCase().indexOf(needle) >= 0);
//     }
//     console.log(fillterproduct(data, alldata))
// }

// var alldata = [];
// function getalldata() {
//     var i = 0
//     db.collection("products").get()
//         .then(function (querySnapshot) {
//             querySnapshot.docs.forEach(function (products) {
//                 alldata.push(products.data().goods[0].name)
//                 console.log(alldata)
//                 i++;
//             })
//         })
// }

function openQRScanner() {

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        var myNavigator = document.getElementById('myNavigator');
        myNavigator.pushPage('./views/scan.html')
    }

}