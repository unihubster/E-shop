;$(function(){
    const init = function () {
        initBuyBtn();
    };

    const showAddProductPopup = function () {
        const idProduct = $(this).attr('data-id-product');
        const product = $('#product'+idProduct);
        $('#addProductPopup').attr('data-id-product', idProduct);
		$('#addProductPopup .product-image').attr('src', product.find('.thumbnail img').attr('src'));
        $('#addProductPopup .name').text(product.find('.name').text());
        const price = product.find('.price').text();
        $('#addProductPopup .price').text(price);
        $('#addProductPopup .category').text(product.find('.category').text());
        $('#addProductPopup .producer').text(product.find('.producer').text());
        $('#addProductPopup .count').val(1);
        $('#addProductPopup .cost').text(price);
        $('#addProductPopup').modal({
            show:true
        });
    };

    const initBuyBtn = function () {
        $('.buy-btn').click(showAddProductPopup);
    }

    init();

});