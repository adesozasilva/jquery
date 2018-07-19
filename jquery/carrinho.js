$(function() {
	atualiza();
	$('.remove-item').click(removeItem);
	$('.undo').click(undo);
	$('.carrinho tbody tr').hover(destaca, limpa);
	$('.alterna-propaganda').click(alternaPropagandas);	
	$('.carrinho').each(function() {
         $(this).find('tr:nth-child(3n)').each(function() {
			umaPropaganda().insertAfter($(this));
		});
	});
});

var umaPropaganda = function() {
     var propagandas = ["Seca gelo por apenas R$ 1,99",
                    "Pente para careca por apenas R$ 2,99",
                    "Mais uma propaganda por apenas R$ 3,99",
     ];
     var posicao = Math.floor(propagandas.length * Math.random());
     var tr = $('<tr>').addClass('propaganda').append($('<td>'));
     var texto = propagandas[posicao];
     tr.find('td').attr('colspan', 6).text(texto);
     return tr;
}

var destaca = function() {
	$(this).addClass('destacado');
    $(this).find('.remove-item').show();
}

var limpa = function() {
	$(this).removeClass('destacado');
    $(this).find('.remove-item').hide();
}

var atualiza = function() {	
	var carrinhos = $('.carrinho');
    carrinhos.each( function() {
    var qtde = 0;
    var total = 0;
    var carrinho = $(this);
    var itens = carrinho.find('.item-total:visible');
	    itens.each(function( index, value) {
		   total += parseFloat( $(value).text() );
	    });
	    carrinho.find('.qtde-total').text(itens.length);
	    carrinho.find('.valor-total').text(total);
    });
}

var removeItem = function(event) {
		event.preventDefault();
		$(this).closest('tr').fadeOut();
		atualiza();
}

var alternaPropagandas = function(event) {
	event.preventDefault();
	$(".propaganda").fadeToggle();
	$(".alterna-propaganda").toggle();
};


var undo = function() {
      var carrinhos = $(this).closest('.carrinho')
      carrinhos.each(function() {
      	 carrinho = $(this);
      	 carrinho.find('tr:visible').removeClass('recuperado');
         carrinho.find('tr:hidden').addClass('recuperado').fadeIn();
         atualiza();
      });
      
}
