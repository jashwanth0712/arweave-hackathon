import React, { useState, useEffect } from 'react';
import Arweave from 'arweave';
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
        <h1 className="text-4xl text-white text-center pb-5">License</h1>
        <fieldset class="mb-5">
        <legend class="sr-only">Checkbox variants</legend>
        <div class="flex items-start items-center mb-4">
            <input id="checkbox-2" aria-describedby="checkbox-2" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"/>
            <label for="checkbox-2" class="text-sm ml-3 font-medium text-white-900">I want to get promotional offers</label>
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
            <input id="international-shipping-disabled" aria-describedby="international-shipping-disabled" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" disabled=""/>
            <label for="international-shipping-disabled" class="text-sm ml-3 font-medium text-gray-400">Eligible for international shipping (disabled)</label>
        </div>
    </fieldset>
        <button
          onClick={createTransaction}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create Transaction
        </button>
      </div>
    </div>
  );
}
