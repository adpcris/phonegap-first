var app = {

    findByName: function() {
        console.log(this);
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
           $('.employee-list').html(self.employeeLiTpl(employees));
            console.log(this);
        });
    },

    initialize: function() {

        var self = this;/* added */
        this.store = new MemoryStore(function(){
            /* we don't need an alert to be shown every time, so for now we'll comment this bit */
            //self.showAlert('Yeah man the Store is Initialized', 'Info');/* added */

            /* we compile the templates defined in the index.html */
            console.log('HOME_TPL_CRISTINA::'+$('#home-tpl').html());
            try{
                this.homeTpl = Handlebars.compile($('#home-tpl').html());
                this.employeeLiTpl = Handlebars.compile($('#employee-li-tpl').html());
            }catch(error){
                console.log("CRIS_ERR:: "+error);
            }
            /* we call the function to render the html */
            self.renderHomeView();
        });

        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    /* We render the html through the controller instead of the html itself in order
     * to create a SINGLE PAGE APPLICATION which provides a more fluid experience for
     * the user and the possibility of using it off-line */
    renderHomeView: function(){
        $('body').html(this.homeTpl());
        /* the following line is the one that actually calls the one that makes all
         the work of looking for the words that the user's typing in the input */
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();