import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  Bars3Icon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type NavbarProps = {
  className?: string;
};

export default function Navbar({ className }: NavbarProps) {
  return (
    <Disclosure
      as="nav"
      className={`bg-zinc-900 border-t-2 border-emerald-600 ${className}`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-1 sm:px-2 lg:px-4">
            <div className="relative flex h-12 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center text-white gap-4">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    alt="Your Company"
                  />
                  react-pdf-tailwind-repl
                </div>
              </div>

              <div className="lg:ml-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Settings</span>
                    <AdjustmentsHorizontalIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    className="flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Download pdf file</span>
                    <ArrowDownTrayIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Share link</span>
                    <LinkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
