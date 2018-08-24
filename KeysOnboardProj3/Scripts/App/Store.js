var nullStore = {
    Id: '',
    Name: '',
    Address: ''
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

    function StoreViewModel(data) {
        self = this;

        self.Id = data.Id;
        self.Name = ko.observable(data.Name).extend({
            required: {
                params: true,
                message: "Please Enter Store Name!"
            }
        });
        self.Address = ko.observable(data.Address).extend({
            required: {
                params: true,
                message: "Please Enter Store Address!"
            }
        });

        self.ModelErrors = ko.validation.group(self);

        self.IsValid = ko.computed(function () {
            self.ModelErrors.showAllMessages();
            return self.ModelErrors().length == 0;
        });

    }

    function StoresViewModel() {

        var self = this;

        self.Store = ko.observable();
        self.Stores = ko.observableArray();

        // Initialize the view-model
        $.ajax({
            url: 'Stores/GetAllStores',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.Stores(data);
            }
        });

        //Show create window
        self.showAddUI = function () {
            self.Store(new StoreViewModel(nullStore));
            $(".errorStyle").hide();
        };


        //Add New Store
        self.create = function () {
            if (self.Store().Name() != "" &&
                self.Store().Address() != "") {
                $.ajax({
                    url: 'Stores/AddStore',
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(self.Store),
                    //error: function (err) {
                    //    //alert(err.status + " - " + err.statusText);
                    //    console.log(err.status + " - " + err.statusText);
                    //    console.log(err.responseText);

                    //},
                    success: function (data) {

                        self.Store(new StoreViewModel(nullStore));
                        
                        self.Stores.push(data);
                        
                        $("#myCreateModal").modal("hide");
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
        }

        //Edit a store 
        self.showEditUI = function (store) {
            self.Store(new StoreViewModel(store));
        };


        // Update Store details
        self.update = function () {
            if (self.Store().Name() != "" &&
                self.Store().Address() != "") {
                $.ajax({
                    url: 'Stores/EditStore',
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(self.Store),
                    success: function (data) {
                        self.Stores.removeAll();
                        self.Stores(data);
                        self.Store(new StoreViewModel(nullStore));
                        $('#myEditModal').modal('hide');
                    }
                }).fail(
                    function (xhr, textStatus, err) {
                        alert(err);
                    });
            }
            else {
                // alert('Please Enter All the Values !!');
            }
        }

        self.showDeleteUI = function (store) {
            self.Store(store);
        };

        // Delete Store details
        self.delete = function (store) {
            var id = store.Id;
            $.ajax({
                url: 'Stores/DeleteStore/' + id,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: id,
                success: function (data) {
                    self.Stores.remove(store);
                }
            }).fail(
                function (xhr, textStatus, err) {
                    self.status(err);
                });
        }


    }
    ko.applyBindings(new StoresViewModel());
});

