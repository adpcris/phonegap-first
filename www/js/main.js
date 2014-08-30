var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

/* the next function is commented to keep it clean and use the following one to test the alert messages */
/*
    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
            self.showAlert('Store Initialized', 'Info');
        });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }
*/
    initialize: function() {

        var self = this;/* added */
        this.store = new MemoryStore(function(){
            self.showAlert('Yeah man the Store is Initialized', 'Info');/* added */
        });

        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }

};

app.initialize();