import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { DropMenu } from '../types/types';
import { NavLink } from 'react-router-dom';



export default function DropDown({ item }: DropMenu) {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm[0.8rem] text-white font-semibold leading-6">
        <span>{item.name}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
                  <div>
                    <NavLink className="font-semibold text-gray-900" to={item.linkOne as string}>{item.catFirst}</NavLink>
                  </div>
                  <div>
                    <NavLink className="font-semibold text-gray-900" to={item.linkTwo as string}>{item.catTwo}</NavLink>
                  </div>
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}