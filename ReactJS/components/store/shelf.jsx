var Shelf = React.createClass({
    getInitialState: function() {
        return {
            items: StoreService.currentCategory.items
        };
    },

    renderCategoryItems: function() {
        return $.map( StoreService.menu, function(cat, i) {
            var id = String(cat.id) + i;
            return <SingleCategory key={id} cat={cat} />;
        });
    },

    renderProducts: function() {
        return $.map( this.state.items, function(product, i) {
            var id = String(product.id) + i;
            return <SingleProduct key={id} product={product} />;
        });
    },

    componentWillMount: function() {
        emitter.on('change-category', function(newCat) {
            this.setState({ items: newCat.items });
        }.bind(this));
    },

    render: function() {
        return (
            <div className="shelfContainer">
                <div className="categoriesContainer">
                    <ul className="list clearRow">
                        {this.renderCategoryItems()}
                    </ul>
                </div>
                <div className="itemsContainer">
                    <ul className="list">
                        {this.renderProducts()}
                    </ul>
                </div>
            </div>
        );
    }
});

var SingleCategory = React.createClass({
    getInitialState: function() {
        var active = false;
        if ( this.props.cat.id == StoreService.currentCategory.id ) active = true;
        return {
            active: active
        };
    },
    toggle: function() {
        StoreService.changeCategory(this.props.cat);
        emitter.emit('change-category', this.props.cat);
        this.setState({
            active: !this.state.active
        });
    },
    componentWillMount: function() {
        emitter.on('change-category', function(newCat) {
            var active = false;
            if ( newCat.id == this.props.cat.id ) active = true;
            this.setState({ active: active });
        }.bind(this));
    },
    render: function() {
        var catClass = this.state.active ? 'item active' : 'item';
        return ( <li className={catClass} onClick={this.toggle}>{this.props.cat.category}</li> );
    }
});

var SingleProduct = React.createClass({
    addToCart: function() {
        emitter.emit('add-to-cart', this.props.product);
    },
    render: function() {
        return (
            <li className="item clearRow" onClick={this.addToCart}>
                <div className="clearRow">
                    <div className="name left">{this.props.product.name}</div>
                    <div className="price right">{ StoreService.renderPrice( this.props.product.price ) }</div>
                </div>
                <div className="description muted-text">{this.props.product.description}</div>
            </li>
        );
    }
});