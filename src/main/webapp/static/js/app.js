; $(function () {
    const init = () => {
        initBuyBtn();
        $('#addToCart').click(addProductToCart);
        $('#addProductPopup .count').change(calculateCost);
        $('#loadMore').click(loadMoreProducts);
        initSearchForm();
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
        if (count >= min && count <= max) {
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

    const initSearchForm = () => {
        /*  // original code whithout select all when all checkboxes are selected
                $('#allCategories').click(function () {
                    $('.categories .search-option').prop('checked', $(this).is(':checked'));
                });
                $('.categories .search-option').click(function () {
                    $('#allCategories').prop('checked', false);
                });
                $('#allProducers').click(function () {
                    $('.producers .search-option').prop('checked', $(this).is(':checked'));
                });
                $('.producers .search-option').click(function () {
                    $('#allProducers').prop('checked', false);
                });
         */
        checkboxer('#allProducers', '.producers .search-option');
        checkboxer('#allCategories', '.categories .search-option');
    };

    function checkboxer(select_all, select_one) {
        // https://www.sanwebe.com/2014/01/how-to-select-all-deselect-checkboxes-jquery
        //select all checkboxes
        $(select_all).change(function () {  //"select all" change 
            $(select_one).prop('checked', $(this).prop('checked')); //change all ".checkbox" checked status
        });
        //".checkbox" change 
        $(select_one).change(function () {
            //uncheck "select all", if one of the listed checkbox item is unchecked
            if (false == $(this).prop('checked')) { //if this item is unchecked
                $(select_all).prop('checked', false); //change "select all" checked status to false
            }
            //check "select all" if all checkbox items are checked
            if ($(select_one + ':checked').length == $(select_one).length) {
                $(select_all).prop('checked', true);
            }
        });
    }

    init();

});