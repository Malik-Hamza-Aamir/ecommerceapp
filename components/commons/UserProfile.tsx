"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    userImg: string;
    nameInitials: string;
    userEmail: string;
}

const UserProfile = ({ userImg, nameInitials, userEmail }: Props) => {
    const router = useRouter();
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
    }

    return (
        <Avatar>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <AvatarImage src={userImg} />
                    <AvatarFallback>{nameInitials}</AvatarFallback>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        <h2>My Account</h2>
                        <p>{userEmail}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href="/dashboard/profile">
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/dashboard/billing">
                            <DropdownMenuItem>
                                Billing
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/dashboard/stores">
                            <DropdownMenuItem>
                                Stores
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/dashboard/purchases">
                            <DropdownMenuItem>
                                Purchase History
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Avatar>
    )
}

export default UserProfile