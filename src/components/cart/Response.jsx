import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const EpaycoResponse = () => {
  const [state, setState] = useState("");
  const [amount, setAmount] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const query = queryString.parse(location.search);
      const ref = query.ref_payco;

      try {
        const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${ref}`);
        const result = await response.json();
        const data = result.data;
        setState(data["x_response"]);
        setAmount(data["x_amount"]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <>
      <h1>Página de respuesta</h1>
      <p><strong>Amount: </strong> {amount}</p>
      <p><strong>Response: </strong> {state}</p>
    </>
  );
};

export default EpaycoResponse;
