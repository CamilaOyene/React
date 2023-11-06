import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import './ShoppingHistory.css';

function ShoppingHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const purchaseHistoryRef = collection(db, 'ShoppingHistory');

        const querySnapshot = await getDocs(purchaseHistoryRef);

        const historyData = [];

        querySnapshot.forEach((doc) => {
          const purchaseData = doc.data();
          historyData.push(purchaseData);
        });

        setPurchaseHistory(historyData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al cargar el historial de compras: ', error);
      }
    };
    fetchPurchaseHistory();
  }, []);

  function formatDate(timestamp) {
    const date = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const purchaseDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedDate = purchaseDate.toLocaleString(undefined, options);
    return formattedDate;
  }

  function calculateTotalPrice(purchase) {
    let totalPrice = 0;
    purchase.products.forEach((product) => {
      totalPrice += product.precio;
    });
    return totalPrice;
  }

  return (
    <div className="conteinerShoppingHistory">
      <h1 className="historyTitle">Este es tu historial de compras</h1>
      {purchaseHistory.length === 0 ? (
        <div className="conteinerDiv">
          <h2>No ha realizado compras aún.</h2>
          <div className="loader"> </div>
        </div>
      ) : (
        purchaseHistory.map((purchase, index) => (
          <div key={index} className="ticket">
            <h4>Compra realizada el dia {formatDate(purchase.date)}</h4>
            <ul>
              {purchase.products.map((product, productIndex) => (
                <li key={productIndex}>
                  {product.nombre}
                  <span> - ${product.precio}</span>
                </li>
              ))}
            </ul>
            <p>
              <strong>Precio total: ${calculateTotalPrice(purchase)}</strong>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
export default ShoppingHistory;
