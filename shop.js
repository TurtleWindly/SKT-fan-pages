if (document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded', ready)
}
else
{
    ready()
}

function ready()
{
    var removeCartBtn = document.getElementsByClassName('cart-item-btn')
    for (var i = 0; i < removeCartBtn.length; i++)
    {
        var button = removeCartBtn[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInput = document.getElementsByClassName('cart-item-input')
    for (var i = 0; i < quantityInput.length; i++)
    {
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartBtn = document.getElementsByClassName('shop-item-btn')
    for (var i = 0; i < addToCartBtn.length; i++)
    {
        var addButton = addToCartBtn[i]
        addButton.addEventListener('click', addCartItem)
    }
    document.getElementsByClassName('cart-total-btn')[0].addEventListener('click', purchase)
}

function purchase(event)
{
    alert('you have some things! woohoo!')
    var cartItem = document.getElementsByClassName('cart-items')[0]
    while (cartItem.hasChildNodes())
    {
        cartItem.removeChild(cartItem.firstChild)
    }
    updateTotal()
}

function addCartItem(event)
{
    var addBtn = event.target
    var shopItem = addBtn.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var img = shopItem.getElementsByClassName('shop-item-img')[0].src
    addItemToCart(title, price, img)
}

function addItemToCart(title, price, img)
{
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemName = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemName.length; i++)
    {
        if (cartItemName[i].innerText == title)
        {
            alert('Already in cart')
            return
        }
    }
    var cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-img" src="${img}">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-item-input" type="number" value="1">
            <button class="cart-item-btn btn" role="button">Remove</button>
        </div>
    
    `
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cart-item-btn')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-item-input')[0].addEventListener('change', quantityChanged)
    updateTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0)
    {
        input.value = 1
    }
    updateTotal()
}

function removeCartItem(event)
{
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal()
{
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var totalPrice = 0
    for (var i = 0; i < cartRows.length; i++)
    {
        var cartRow = cartRows[i]
        var priceElt = cartRow.getElementsByClassName('cart-price')[0]
        var inputElt = cartRow.getElementsByClassName('cart-item-input')[0]
        var price = parseFloat( priceElt.innerText.replace('$', ''))
        var quantity = inputElt.value
        totalPrice += price * quantity
    }
    totalPrice = Math.round(totalPrice * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + totalPrice
}