// async function render() {
//     try {
//         const cartList = await $.ajax({
//             url: '',
//             type: 'GET',
//         });

//         cartList.map((ele) => {
//             const cartItem = `
//                 <div class="cart-item-image">
//                     <img src="" alt="">
//                 </div>
//                 <div class="cart-item-info">
//                     <div class="cart-item-info-name">
            
//                     </div>
//                     <div class="cart-item-info-price">
            
//                     </div>
//                     <div class="cart-item-info-quantity">
            
//                     </div>
//                     <div class="cart-item-del">
                        
//                     </div>
//                 </div>
//             `;
//             $('.cart-item').append(cartItem);
//         })
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// render();
