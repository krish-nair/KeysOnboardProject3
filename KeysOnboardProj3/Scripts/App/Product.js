var nullProduct = {
    Id: '',
    Name: '',
    Price: ''
};

$(document).ready(function () {
    ko.validation.init({

        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        errorClass: 'errorStyle',
        messageTemplate: null

    }, true);

    function ProductViewModel(data) {
        self = this;

        self.Id = data.Id;
        self.Name = ko.observable(data.Name).extend({
            required: {
                params: true,
                message: "Please Enter Product Name!"
            }
        });
        self.Price = ko.observable(data.Price).extend({
            required: {
                params: true,
                message: "Please Enter Product Price!"
            }
        });

        self.ModelErrors = ko.validation.group(self);
        self.IsValid = ko.computed(function () {
            self.ModelErrors.showAllMessages();
            return self.ModelErrors().length == 0;
        });
    }
    function ProductsViewModel() {

        var self = this;

        self.Product = ko.observable();

        self.Products = ko.observableArray(); // Contains the list of products

        // Initialize the view-model
        $.ajax({
            url: 'Products/GetAllProducts',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.Products(data); //Put the response in ObservableArray
            }
        });

        //Show create window
        self.showAddUI = function () {
            self.Product(new ProductViewModel(nullProduct));
            $(".errorStyle").hide();

        };

        //Add new product
        self.create = function () {
            if (self.Product().Name() != "" &&
                self.Product().Price() != "") {
                $.ajax({
                    url: 'Products/AddProduct',
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(self.Product),
                    success: function (data) {
                        self.Products.push(data);
                        self.Product(new ProductViewModel(nullProduct));
                        $('#myCreateModal').modal('hide');
                    }
                }).fail(
                    function (xhr, textStatus, err) {
                        alert(err);
                    });
            }
            else {
                $(".errorStyle").show();
                //alert('All the values are required !!');
            }
        };

        //Show edit window
        self.showEditUI = function (product) {
            self.Product(new ProductViewModel(product));

        };

        // Update product details
        self.update = function () {
            if (self.Product().Name() != "" &&
                self.Product().Price() != "") {
                $.ajax({
                    url: 'Products/EditProduct',
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(self.Product),
                    success: function (data) {
                        self.Products.removeAll();
                        self.Products(data);
                        self.Product(new ProductViewModel(nullProduct));
                        $('#myEditModal').modal('hide');
                    }
                })
                    .fail(
                    function (xhr, textStatus, err) {
                        alert(err);
                    });
            }
            else {
                //alert('Please Enter All the Values !!');
            }
        };

        //Show delete window
        self.showDeleteUI = function (product) {
            self.Product(product);
        };

        // Delete product
        self.delete = function (product) {
            var id = product.Id;

            $.ajax({
                url: 'Products/DeleteProduct/' + id,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: id,
                success: function (data) {
                    self.Products.remove(product);
                }
            }).fail(
                function (xhr, textStatus, err) {
                    self.status(err);
                });
        };

    }
    ko.applyBindings(new ProductsViewModel());
});

