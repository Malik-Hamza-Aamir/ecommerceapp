import { ShoppingCart } from 'lucide-react';
import { Categories } from "./Categories";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = async () => {
  const session = await getServerSession(options);
  console.log("session :", session);
  const nameInitials = session?.user?.name.slice(0, 2).toUpperCase();

  return (
    <div className="border-b min-h-16 px-[6rem] flex items-center justify-between">
      <div className='flex items-center'>
        <div>Logo</div>
        <Categories />
      </div>

      <div className='flex items-center'>
        <Input placeholder='Search Products' />
        <Button size="icon" variant="outline" className="mx-2 px-2"><ShoppingCart size={18} /></Button>
        {
          session?.user ? (
            <Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback>{nameInitials}</AvatarFallback>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Avatar>
          ) : (
            <Link href="/"><Button size="sm">Sign in</Button></Link>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
