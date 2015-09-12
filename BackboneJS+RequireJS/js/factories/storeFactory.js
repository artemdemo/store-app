define(['../common'], function(common){

    var storeFactory = {};

    storeFactory.renderPrice = function (price) {
        return common.currency + price.toFixed(2);
    };

    return storeFactory;

});