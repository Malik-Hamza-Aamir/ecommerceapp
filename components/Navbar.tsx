import { ShoppingCart } from 'lucide-react';
import { Categories } from "./Categories";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import UserProfile from './UserProfile';

const Navbar = async () => {
  const session = await getServerSession(options);
  const nameInitials: string = session?.user?.name.slice(0, 2).toUpperCase() as string;
  const userEmail: string = session?.user?.email as string;

  return (
    <div className="border-b min-h-16 px-[10%] flex items-center justify-between">
      <div className='flex items-center'>
        <Link href="/">
          <div>Logo</div>
        </Link>
        <Categories />
      </div>

      <div className='flex items-center'>
        <Input placeholder='Search Products' />
        <Button size="icon" variant="outline" className="mx-2 px-2"><ShoppingCart size={18} /></Button>
        {
          session?.user ? (
            <UserProfile nameInitials={nameInitials} userImg={session?.user?.image} userEmail={userEmail} />
          ) : (
            <Link href="/signinregister">
              <Button size="sm">Sign in</Button>
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
