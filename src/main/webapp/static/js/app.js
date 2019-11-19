; $(function () {
    const init = () => {
        initBuyBtn();
        $('#addToCart').click(addProductToCart);
        $('#addProductPopup .count').change(calculateCost);
        $('#loadMore').click(loadMoreProducts);
    };

    const showAddProductPopup = function () {
        const idProduct = $(this).attr('data-id-product');
        const product = $('#product' + idProduct);
        $('#addProductPopup').attr('data-id-product', idProduct);
        $('#addProductPopup .product-image').attr('src', product.find('.thumbnail img').attr('src'));
        $('#addProductPopup .name').text(product.find('.name').text());
        const price = product.find('.price').text();
        $('#addProductPopup .price').text(price);
        $('#addProductPopup .category').text(product.find('.category').text());
        $('#addProductPopup .producer').text(product.find('.producer').text());
        $('#addProductPopup .count').val(1);
        $('#addProductPopup .cost').text(price);
        $('#addToCart').removeClass('hidden');
        $('#addToCartIndicator').addClass('hidden');
        $('#addProductPopup').modal({
            show: true
        });
    };

    const initBuyBtn = () => {
        $('.buy-btn').click(showAddProductPopup);
    };

    const addProductToCart = () => {
        const idProduct = $('#addProductPopup').attr('data-id-product');
        const count = parseInt($('#addProductPopup .count').val());
        $('#addToCart').addClass('hidden');
        $('#addToCartIndicator').removeClass('hidden');

        // these 3 lines below are just for this demo
        const initialCount = parseInt($('#currentShoppingCart #total-count').text());
        const initialCost = parseFloat($('#currentShoppingCart #total-cost').text());
        const cost = initialCost + count * parseFloat($('#addProductPopup .price').text().replace(/\D+/, ''));

        setTimeout(() => {
            const data = {
                totalCount: count + initialCount,
                totalCost: cost.toFixed(2)
            };
            $('#currentShoppingCart .total-count').text(data.totalCount);
            $('#currentShoppingCart .total-cost').text(data.totalCost);
            $('#addProductPopup').modal('hide');
            $('#currentShoppingCart').removeClass('hidden');
        }, 800);
    };

    const calculateCost = () => {
        const priceStr = $('#addProductPopup .price').text();
        const moneySymbol = priceStr.match(/\D+/);
        const price = parseFloat(priceStr.replace(moneySymbol, ''))
        const count = parseInt($('#addProductPopup .count').val());
        const min = parseInt($('#addProductPopup .count').attr('min'));
        const max = parseInt($('#addProductPopup .count').attr('max'));
        if(count >= min && count <= max) {
            const cost = price * count;
            $('#addProductPopup .cost').text(moneySymbol + cost.toFixed(2));
        } else {
            $('#addProductPopup .count').val(1);
            $('#addProductPopup .cost').text(priceStr);
        }
    };
    
    const loadMoreProducts = () => {
        $('#loadMore').addClass('hidden');
        $('#loadMoreIndicator').removeClass('hidden');
        setTimeout(() => {
            $('#loadMoreIndicator').addClass('hidden');
            $('#loadMore').removeClass('hidden');
        }, 800);
    };

    init();

});