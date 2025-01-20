"use client";
import React from "react";
import { ComboboxDemo } from "../SearchBar/combo";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function handleSignIn() {
  {
    window.location.href = "server/auth/google";
  }
}

export function NavbarWithSubmenu() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-gray-600"
      >
        <a href="#" className="flex items-center">
          Sales
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-gray-600"
      >
        <a href="#" className="flex items-center">
          New In
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-gray-600"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium text-gray-600"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 dark:bg-gray-900">
      <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Junglee Movies
        </Typography>
        <div className="hidden items-center gap-x-2 lg:flex">
          <div className="relative flex w-full gap-2 md:w-max">
            <ComboboxDemo />
          </div>
          <Button
            size="md"
            className="rounded-lg "
            color="blue"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
