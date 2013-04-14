// Teh Javascripts!
$(function() {
    //Create a backbone view to accept user input
    var UserInputView = Backbone.View.extend({

        //All views have a DOM element at all times (el) whether they've been inserted into the page or not
        //Views can be rendered at any time and inserted into the DOM at once
        //Which means high-performance UI rendering!

        //this.el is created from the view's tagName, className, id and attributes properties
        //If these aren't specified, el is an empty div

        // Here we use the section in our html #UserInput
        el: '#UserInput',

        //Each view accepts an events object to specify which events the view will trigger
        //Backbone searches for the elements inside el, so el should contain the
        // elements you give the events object (here button is insite #UserInput)
        events: {
            'click button' : 'addToHelloCollection'
        },

        initialize: function() {
            this.HelloListView = new HelloListView();
        },

        addToHelloCollection: function(e) {
            var hello = new Hello({
                name: this.$('input').val()
            });
            this.HelloListView.collection.add(hello);
        }

    });

    //Create Backbone Model to hold application data
    //Each hello message will be a model
    //A list of hello messages will be a Backbone Collection

    //Hello is the model with a property name which we set to name
    var Hello = Backbone.Model.extend({
        initialize: function() {
            this.name = 'name'
        }
    });

    //HelloList is the collection of the Hello models
    var HelloList = Backbone.Collection.extend({
        model: Hello
    });

    //Each model and collection can have it's own view to render itself
    //So we create HelloView with the render method to generate html output
    //As the view is not associated with any existing DOM elements, and Backbone
    // needs a wrapper tag to surround rendered output, we give a tagName property of li
    //So when Hello model generates it's HTML (with render method), it will be surrounded by li tag
    var HelloView = Backbone.View.extend({
        tagName: 'li',
        render: function() {
            $(this.el).html('Hello ' + this.model.get('name'));
            return this;
        }
    });

    //Create a backbone view to show accepted inputs as a list
    //This view will use the empty ol element #HelloList to render
    //the HelloListView which is created in the UserInputView
    var HelloListView = Backbone.View.extend({

        el : '#HelloList',

        initialize: function() {
            _.bindAll(this, 'render', 'appendToHelloUL');
            this.collection = new HelloList();
            this.collection.bind('add', this.appendToHelloUL);
        },

        render: function() {
            $.each(this.collection.models, function(i, helloModel) {
                self.appendToHelloUL(helloModel);
            });
        },

        appendToHelloUL: function(helloModel) {
            var helloView = new HelloView({
                model: helloModel
            });
            $(this.el).append(helloView.render().el);
        }

    });

    //Create an instance of the view UserInputView
    //This will run initialize of the UserInputView
    new UserInputView();



});