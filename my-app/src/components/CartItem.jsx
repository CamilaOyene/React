function CartItem({ item, remove }) {
    return (
      <li className="py-2">
        <span className="mr-4">{item.name}</span>
        <span className="mr-4">${item.price}</span>
        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={remove}>
          Eliminar
        </button>
      </li>
    );
  }
  
  export default CartItem;