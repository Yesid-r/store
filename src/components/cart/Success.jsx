import React from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Success = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  
  const collectionId = searchParams.get('collection_id');
  const collectionStatus = searchParams.get('collection_status');
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const externalReference = searchParams.get('external_reference');
  const paymentType = searchParams.get('payment_type');
  const merchantOrderId = searchParams.get('merchant_order_id');
  const preferenceId = searchParams.get('preference_id');
  const siteId = searchParams.get('site_id');
  const processingMode = searchParams.get('processing_mode');
  const merchantAccountId = searchParams.get('merchant_account_id');
  console.log('success')


  return (
    <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded shadow p-8 m-4 md:max-w-sm md:mx-auto">
            <div className="text-center">
            <h1 className="text-2xl">Compra realizada con exito</h1>

            {paymentId && <p>Referencia de pago: {paymentId}</p>}
            {status && <p>Stado: {status}</p>}
            <div className="mt-4">
                <a href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Ir al inicio
                </a>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Success