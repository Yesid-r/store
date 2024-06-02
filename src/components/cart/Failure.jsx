import React from 'react'

const Failure = () => {
    return (
        
            <div class='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
                <div class='max-w-md mx-auto space-y-6'>

                    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div class="mx-auto max-w-screen-sm text-center">
                            <h1 class="mb-4 text-4xl font-bold ">Algo salio mal...</h1>
                            <p class="mb-4 text-1xl font-mono">Tu compra no fue realizada con exito.</p>
                            <a href="/" class="inline-block w-full px-5 py-3 mb-4 text-lg tracking-wider text-center text-white transition duration-200 bg-slate-950 rounded shadow-lg hover:bg-primary-700 focus:outline-none">Volver al inicio</a>
                        </div>
                    </div>

                </div>
            </div>
        
    )
}

export default Failure