// Teh Javascripts!
$(function() {

    //Model
    var Videogame = Backbone.Model.extend({
        defaults: {
            title: 'title',
            publisher: 'publisher'
        }
    });

    //Collection
    var VideogameCollection = Backbone.Collection.extend({
        model: Videogame
    });

    //View
    var ListView = Backbone.View.extend({
        el: $('.wrapper'), //attaches this.el to an existing element

        events: {
            'click button#add': 'addVideogame'
        },

        //initialize called right away when a new ListView is created
        initialize: function() {
            _.bindAll(this, 'render', 'addVideogame', 'appendVideogame'); // fixes loss of context for 'this' within methods

            //initialize instantiates a collection and binds it's add event to it's own method appendItem
            this.collection = new VideogameCollection;
            this.collection.bind('add', this.appendVideogame);

            this.counter = 0;
            this.render(); //self renders view - otherwise view could be rendered by other means
        },

        // the function in charge of rendering the view - needs to be manually called by user
        render: function() {
            var self = this;

            $(this.el).append("<button id='add'>Add list item</button><ul></ul>");
            _(this.collection.models).each(function(videogame) {
                self.appendVideogame(videogame);
            }, this);
        },

        addVideogame: function() {
            this.counter++;
            var videogame = new Videogame();
            videogame.set({
                title: videogame.get('title') + this.counter // modify item defaults
            });
            this.collection.add(videogame);
        },

        appendVideogame: function(videogame){
          $('ul', this.el).append("<li>"+videogame.get('title')+" "+videogame.get('publisher')+"</li>");
        }

    });

    //Instantiate the listview app
    var listview = new ListView();

});