import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "./Utils";
import { signInWithNearWallet, signOutNearWallet } from "./near-api";

export default function UserWidget() {

  return window.walletConnection.isSignedIn() ? (
    <>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="btn">
            {window.accountId}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-200" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                  onClick={signOutNearWallet}
                >
                  Sign out
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  ) : (
    <button
      onClick={signInWithNearWallet}
      className="primary-btn"
    >
      Sign in
    </button>
  );
}
