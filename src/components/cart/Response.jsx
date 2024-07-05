import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { CircleCheckIcon, TriangleAlertIcon } from 'lucide-react';

const EpaycoResponse = () => {
  
  const location = useLocation();
  const [dataResponse, setDataResponse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const query = queryString.parse(location.search);
      const ref = query.ref_payco;

      try {
        const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${ref}`);
        const result = await response.json();
        const data = result.data;
        setDataResponse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.search]);

  const renderResponseMessage = () => {
    switch (dataResponse.x_cod_response) {
      case 1:
        return (
          <>
            <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción completada</h1>
            <p className="mt-4 text-muted-foreground">Referencia de pago: {dataResponse.x_ref_payco}</p>
            <p className="mt-2 text-muted-foreground">
              Total: {dataResponse.x_amount} {dataResponse.x_currency_code}
            </p>
            <p className="mt-2 text-muted-foreground">{dataResponse.x_response}</p>
          </>
        );
      case 2:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-red-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción rechazada</h1>
            <p className="mt-4 text-muted-foreground">{dataResponse.x_response_reason_text}</p>
          </>
        );
      case 3:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-yellow-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción pendiente</h1>
            <p className="mt-4 text-muted-foreground">La transacción está pendiente por aprobación.</p>
          </>
        );
      case 4:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-red-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción fallida</h1>
            <p className="mt-4 text-muted-foreground">No se culminó el flujo de creación de la transacción.</p>
          </>
        );
      case 6:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-blue-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción reversada</h1>
            <p className="mt-4 text-muted-foreground">Reintegro del dinero al cliente pagador.</p>
          </>
        );
      case 7:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-yellow-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción retenida</h1>
            <p className="mt-4 text-muted-foreground">La transacción está siendo auditada.</p>
          </>
        );
      case 8:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-blue-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción iniciada</h1>
            <p className="mt-4 text-muted-foreground">La transacción se ha iniciado correctamente.</p>
          </>
        );
      case 9:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-red-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción caducada</h1>
            <p className="mt-4 text-muted-foreground">El usuario no realizó el pago en el tiempo determinado.</p>
          </>
        );
      case 10:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-red-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción abandonada</h1>
            <p className="mt-4 text-muted-foreground">El usuario cerró el navegador antes de completar la transacción.</p>
          </>
        );
      case 11:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-red-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Transacción cancelada</h1>
            <p className="mt-4 text-muted-foreground">El usuario canceló la transacción.</p>
          </>
        );
      default:
        return (
          <>
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-gray-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Estado desconocido</h1>
            <p className="mt-4 text-muted-foreground">El estado de la transacción no es reconocido.</p>
          </>
        );
    }
  };

  return (
    <>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          {renderResponseMessage()}
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Ir a página de inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpaycoResponse;
