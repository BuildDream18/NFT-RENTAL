import React from "react";
import { useQuery, gql } from "@apollo/client";

import AutoInput from "./AutoInput";
import { CurrencySelector } from "./CurrencySelector";
import { initContract, newLease } from "./NftContract";


function TokenAutoInput({ className, accountId, selected, setSelected }) {
  const GET_TOKENS = gql`
    query GetTokens($account_id: String!) {
      mb_views_nft_tokens(
        where: {owner: {_eq: $account_id}, burned_timestamp: {_is_null: true}},  ) {
        owner
        media
        title
        token_id
        description
        minter
        nft_contract_icon
        nft_contract_id
      }
    }
  `;


  const { loading, error, data } = useQuery(GET_TOKENS, { variables: { account_id: accountId } });
  if (loading) return <AutoInput className={className} loading={true} />;
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  return <AutoInput
    className={className}
    selected={selected}
    setSelected={setSelected}
    options={data.mb_views_nft_tokens.map(({ token_id, title, nft_contract_id, media, }) => {
      return {
        id: `${nft_contract_id} ${token_id}`,
        name: `${title || token_id} @ ${nft_contract_id}`,
        token_id: token_id,
        contract_id: nft_contract_id,
        media: media,
      }
    }
    )}
  />;
}


export default function NewLendingPage() {
  const [selectedToken, setSelectedToken] = React.useState(null);
  const [borrower, setBorrower] = React.useState("");
  const [durationMinute, setDurationMinute] = React.useState(0);
  const [durationHour, setDurationHour] = React.useState(0);
  const [durationDay, setDurationDay] = React.useState(0);
  const [rentCurrency, setRentCurrency] = React.useState(window.CURRENCY_OPTIONS[0]);
  const [rent, setRent] = React.useState(0);

  let onSubmit = async () => {
    let contract = await initContract(selectedToken.contract_id);
    let expiration =
      Math.trunc(Date.now() / 1000) +
      durationDay * 24 * 3600 +
      durationHour * 3600 +
      durationMinute * 60;

    newLease(contract, selectedToken.token_id, borrower, expiration, rentCurrency.address, rent);
  };

  return (
    <>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl mb-8 font-semibold text-gray-900">
            New Lease
          </h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="flex flex-col space-y-8 divide-y divide-gray-200">

              <div className="space-y-6 sm:space-y-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  NFT Info
                </h3>

                <div className="sm:flex sm:flex-row justify-between">
                  <div className="w-2/3 space-y-6 sm:space-y-4">

                    <div className="sm:flex sm:flex-row">
                      <label className="block sm:w-1/2 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" >
                        Token
                      </label>
                      <div className="mt-1 sm:w-1/2 sm:mt-0">
                        <TokenAutoInput
                          className="input max-w-lg"
                          accountId={window.accountId}
                          selected={selectedToken}
                          setSelected={setSelectedToken}
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          Choose the token you want to lend
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:w-1/3 sm:px-8">
                    <label className="block text-sm font-medium text-gray-700 pb-4">
                      NFT Image
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <div className="flex items-center">
                        <span className="h-36 w-36 overflow-hidden  bg-gray-100">
                          <img src={selectedToken?.media} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Lease Info
                </h3>

                <div className="space-y-6 sm:space-y-4">
                  <div className="sm:flex sm:flex-row">
                    <label htmlFor="contract_addr" className="block sm:w-1/3 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" >
                      Borrower
                    </label>
                    <div className="mt-1 sm:w-2/3 sm:mt-0">
                      <input
                        type="text"
                        className="input max-w-lg"
                        value={borrower}
                        onChange={(e) => setBorrower(e.target.value)}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        The account you want to lend the NFT to
                      </p>
                    </div>
                  </div>

                  <div className="sm:flex sm:flex-row">
                    <label htmlFor="contract_addr" className="block sm:w-1/3 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" >
                      Rent Duration
                    </label>
                    <div className="mt-1 sm:w-2/3 sm:mt-0">
                      <div className="flex flex-row space-x-2 max-w-lg">
                        <div>
                          <div className="text-sm">Days</div>
                          <input
                            type="number"
                            className={"input" + (durationDay >= 0 ? "" : " input-error")}
                            value={durationDay}
                            onChange={(e) => setDurationDay(e.target.value)}
                          />
                        </div>
                        <div>
                          <div className="text-sm">Hours</div>
                          <input
                            type="number"
                            className={"input" + (durationHour >= 0 ? "" : " input-error")}
                            value={durationHour}
                            onChange={(e) => setDurationHour(e.target.value)}
                          />
                        </div>
                        <div>
                          <div className="text-sm">Minutes</div>
                          <input
                            type="number"
                            className={"input" + (durationMinute >= 0 ? "" : " input-error")}
                            value={durationMinute}
                            onChange={(e) => setDurationMinute(e.target.value)}
                          />
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        How long you want to rent your NFT
                      </p>
                    </div>
                  </div>

                  <div className="sm:flex sm:flex-row">
                    <label htmlFor="contract_addr" className="block sm:w-1/3 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" >
                      Rent
                    </label>
                    <div className="mt-1 sm:w-2/3 sm:mt-0">
                      <div className="flex flex-row space-x-2 max-w-lg">
                        <div className="w-36">
                          <CurrencySelector
                            selected={rentCurrency}
                            setSelected={setRentCurrency} />
                        </div>
                        <input
                          type="number"
                          className={"input" + (rent >= 0 ? "" : " input-error")}
                          value={rent}
                          onChange={(e) => setRent(e.target.value)}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        How much rent the borrower should pay you
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end space-x-4">
                <a className="btn" href="/app" >
                  Cancel
                </a>
                <button className="primary-btn" onClick={(_) => onSubmit()} >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
