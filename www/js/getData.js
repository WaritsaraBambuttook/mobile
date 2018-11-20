// Initialize Firebase
var config = {
    apiKey: "AIzaSyC3g2Wsw91T9pfZ9E2SjG1Lq4v7U9SwjLo",
    authDomain: "shopee-45110.firebaseapp.com",
    databaseURL: "https://shopee-45110.firebaseio.com",
    projectId: "shopee-45110",
    storageBucket: "shopee-45110.appspot.com",
    messagingSenderId: "352502270934"
};
firebase.initializeApp(config);
var db = firebase.firestore();
// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});



var GetData = {
    getHomeData: function () {
        var modal = document.querySelector('ons-modal');
        modal.show();
        //การดึหข้อมูลจากที่เราสร้างไว้ใน firebase
        //UI,home เป็นตัวที่เราสร้างไว้ใน firebase เป็นการเข้าถึงข้อมูล
        var docRef = db.collection("UI").doc("home");
        docRef.get().then(function (doc) {
            if (doc.exists) {
                //Display data
                var data = doc.data();
                $('#appname').html(data.appname);
                var style = "background: url('images/" + data.slides[0] + "') no-repeat center; background-size: contain;'";
                $('#carousel1').attr('style', style)
                var icon_template = $('#icon_template').html();
                var html = ejs.render(icon_template, { categories: data.categories });
                $('#icons').html(html);
                setTimeout(function () {
                    modal.hide();
                }, 500);
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log(error);
        });
    },
    getProductByCat: function (category) {
        var modal = document.querySelector('ons-modal');
        modal.show();
        var docRef = db.collection("products").doc(category);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                var data = doc.data();
                data.goods.forEach(function (data) {
                    data.cat = doc.id
                })
                var icon_template = $('#products_template').html();
                var html = ejs.render(icon_template, { data: data.goods });
                $('#productCategory').html(html);
                modal.hide()
            } else {
                console.log("No such document!");
                modal.hide()
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    },
    getdetailProduct: function (name, cat) {
        console.log(name, cat)
        var modal = document.querySelector('ons-modal');
        modal.show();
        var docRef = db.collection("products").doc(cat)
        docRef.get().then(function (doc) {
            var data = doc.data()
            product = data.goods.filter(function (data) {
                return data.name == name
            })
            var icon_template = $('#Detailproducts_template').html();
            var html = ejs.render(icon_template, { data: product });
            $('#detailProducts').html(html);
            modal.hide()
        })
    },
    getAllproducts: function () {
        var modal = document.querySelector('ons-modal');
        modal.show();
        var docRef = db.collection("products")

        docRef.get().then(function (querySnapshot) {
            var products = []
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                data.goods.forEach(function (goods) {
                    goods.cat = doc.id
                    products.push(goods)
                })
            });
            var icon_template = $('#products_template').html();
            var html = ejs.render(icon_template, { data: products });
            $('#allProducts').html(html);
            modal.hide()
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    },
    getCart: function () {
        var modal = document.querySelector('ons-modal');
        modal.show();
        var cart = JSON.parse(localStorage.getItem('cart'))
        if (cart == null) {
            cart = []
        }
        if (cart.length < 1) {
            var cart_template = $('#cart_template').html();
            var html = ejs.render(cart_template, { cart: cart });
            $('#cartProducts').html(html);
            setTimeout(() => {
                modal.hide()
            }, 800);
        } else {
            var data = cart.map(function(product){
                return JSON.parse(product)
            })
            var cart_template = $('#cart_template').html();
            var html = ejs.render(cart_template, { cart: data });
            $('#cartProducts').html(html);
            setTimeout(() => {
                modal.hide()
            }, 800);
        }
    }
}
