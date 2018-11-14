document.addEventListener('init', function (event) {
    var page = event.target;
    if (page.id == 'home') {
        GetData.getHomeData()
    } else if (page.id == 'allproducts') {
        GetData.getAllproducts()
    } else if (page.id == 'cat') {
        var category = page.data.category
        GetData.getProductByCat(category);
    } else if (page.id == 'detail') {
        var data = page.data.data;
        GetData.getdetailProduct(data.name, data.cat);
    } else if (page.id == 'cart') {
        GetData.getCart()
    } else if (page.id == 'scan') {
        window.QRScanner.scan(function (err, text) {
            console.log("start scan...");

            if (err) {
                // an error occurred, or the scan was canceled (error code `6`)
                console.log(err)
            } else {
                // The scan completed, display the contents of the QR code:
                console.log(text)
                QRScanner.hide();
                $("#btTool").show()
                var name = text.split(",")[0]
                var cat = text.split(",")[1]
                var data = {
                    name: name,
                    cat: cat
                }
                var myNavigator = document.getElementById('myNavigator');
                myNavigator.popPage()
                setTimeout(() => {
                    myNavigator.pushPage('./views/detail.html', {
                        data: {
                            data: data
                        }
                    })
                }, 1000);
            }
        });
        setTimeout(() => {
            window.QRScanner.show(function (status) {
                $("#scan").children().removeClass("page__background")
                $("#btTool").hide()
            })
        }, 500);
    }else if(page.id == "logout"){
        setTimeout(() => {
        QRScanner.hide()
    }, 500);
    }
});

document.querySelector('ons-navigator').addEventListener('postpush', function (event) {
    if (event.enterPage.id == 'home' || event.enterPage.id == 'allproducts' || event.enterPage.id == 'cart') {
        var icon = '<ons-icon class="toolbaricon" size="30px" icon="fa-shopping-bag"></ons-icon>'
        $('#icon').html(icon)
    } else {
        var back = '<div class="left"><ons-back-button>Back</ons-back-button></div>'
        $('#icon').html(back)
        document.querySelector('ons-back-button').onClick = function () {
            window.QRScanner.hide()
            $("#btTool").show()
            $("#scan").children().addClass("page__background")
            document.querySelector('ons-navigator').popPage()
        };
    }
})

document.querySelector('ons-navigator').addEventListener('postpop', function (event) {
    if (event.enterPage.id == 'home' || event.enterPage.id == 'allproducts' || event.enterPage.id == 'cart') {
        var icon = '<ons-icon class="toolbaricon" size="30px" icon="fa-shopping-bag"></ons-icon>'
        $('#icon').html(icon)
    } else {
        var back = '<div class="left"><ons-back-button>Back</ons-back-button></div>'
        $('#icon').html(back)
        document.querySelector('ons-back-button').onClick = function (e) {
            document.querySelector('ons-navigator').popPage()
        };
    }
})