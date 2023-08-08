import React, { useState, useEffect } from 'react';
import Arweave from 'arweave';
import arconnect from 'arconnect'
// import '../utils/ArConnect';

const arweave = Arweave.init({
  host: 'arweave.net',
  protocol: 'https',
});

export default function LicensePage() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    arweave.wallets.getBalance('AjI__UjACNLiVgROvGyfJI66J5sz6P2a3zyZMQmMq4A').then((balance) => {
      let winston = balance;
      let ar = arweave.ar.winstonToAr(balance);

      setBalance({
        winston: winston,
        ar: ar,
      });

      setLoading(false);
    });
  }, []);

  const createTransaction = async () => {
    const key = 'AjI__UjACNLiVgROvGyfJI66J5sz6P2a3zyZMQmMq4A'
    // const transaction = await arweave.createTransaction(
    //   {
    //     data: "Hello, world!",
    //     tags: [
    //       {
    //         name: "License",
    //         value: "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8",
    //       },
    //     ],
    //   },
    //   key,
    // );

    // console.log("Transaction:", transaction);
    let transaction = await arweave.createTransaction({
        target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
        quantity: arweave.ar.arToWinston('10.5')
    }, key);
    
    await arweave.transactions.sign(transaction, key);
    
    console.log(transaction);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blur">
      <div className="bg-gray-800 p-8 rounded-lg">
        <h1 className="text-4xl text-white text-center ">License</h1>
        <h1 className="text-2xl font-medium  text-center pb-5 text-gray-400">Select the terms </h1>

        <fieldset class="mb-5">
        <legend class="sr-only">Checkbox variants</legend>
        <div class="flex items-start items-center mb-4">
            <input id="checkbox-2" aria-describedby="checkbox-2" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"/>
            <label for="checkbox-2" class="text-sm ml-3 font-medium -900">Derivation  with the value of "Allowed-With-Credit"</label>
        </div>
        <div class="relative mb-3" data-te-input-wrapper-init>
  
        <input
    type="number"
    class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInptNumber"
    placeholder="License Fee" />
  <label
    for="exampleFormControlInptNumber"
    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
    >License Fee
  </label>
  
</div>

        <div class="flex items-start items-center mb-4">
            <input id="checkbox-2" aria-describedby="checkbox-2" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"/>
            <label for="checkbox-2" class="text-sm ml-3 font-medium -900">use the present wallet as payment</label>
        </div>
        <div class="flex items-start items-center mb-4">
            <input id="checkbox-3" aria-describedby="checkbox-3" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"/>
            <label for="checkbox-3" class="text-sm ml-3 font-medium text-white-900">I am 18 years or older</label>
        </div>
       
        
        <div class="flex items-start mb-4">
            <div class="flex items-center h-5">
            <input id="shipping-2" aria-describedby="shipping-2" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"/>
            </div>
            <div class="text-sm ml-3">
            <label for="shipping-2" class="font-medium text-white-900">Free shipping via Flowbite</label>
            <div class="text-gray-500"><span class="font-normal text-xs">For orders shipped from Flowbite from <span class="font-medium">€ 25</span> in books or <span>€ 29</span> on other categories</span></div>
            </div>
        </div>

        <div class="flex items-start items-center">
            <label for="international-shipping-disabled" class="text-sm ml-3 font-medium text-gray-400">License Rights Duration</label>
        </div>
        <input
  type="number"
  class="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
  id="exampleFormControlInptExpires"
  placeholder="Expires in"
/>
<label
  for="exampleFormControlInptExpires"
  class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
  >Expires in
</label>
    </fieldset>
        <button
          onClick={createTransaction}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create License
        </button>
      </div>
    </div>
  );
}
